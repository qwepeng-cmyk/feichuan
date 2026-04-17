<?php
namespace Phpcmf\Model\Synlang;

/**
 * 百度翻译API
 * 
 * 该类使用百度翻译API提供的并发翻译功能，可以同时翻译多个查询字符串。
 * 使用前需要先在百度开发者中心申请API密钥(appid和secretKey)。
 */
class BaiduTransApi extends \Phpcmf\Model
{   //https://fanyi-api.baidu.com/ait/api/aiTextTranslate
    //private const API_URL = 'https://api.fanyi.baidu.com/api/trans/vip/translate';
    private const DEFAULT_TIMEOUT = 30;
    private const DEFAULT_CONNECT_TIMEOUT = 10;
    private const MAX_RETRIES = 3;
    private const MAX_LOG_LINES = 500;

    private $config;
    private $appid;
    private $secretKey;
    private $apiquery;
    private $apiurl;

    public function __construct()
    {
        parent::__construct();
        $this->config = \Phpcmf\Service::M('app')->get_config('Synlang');
        $this->appid = $this->config['baidu']['appid'] ?? null;
        $this->secretKey = $this->config['baidu']['appsecret'] ?? null;
        $this->apiquery = (int)($this->config['baidu']['apiquery'] ?? 1);

        if(!isset($this->config['baidu']['apiurl']) || $this->config['baidu']['apiurl']==1){
            $this->apiurl = 'https://api.fanyi.baidu.com/api/trans/vip/translate';
        }else{
            $this->apiurl = 'https://fanyi-api.baidu.com/ait/api/aiTextTranslate';
        }




    }

    /**
     * 翻译函数
     *
     * @param array|string $query 需要翻译的数组或字符串
     * @param string $from 源语言，默认为自动识别
     * @param string $to 目标语言，默认为中文
     * @param int $test 测试模式标志
     *
     * @return array 包含翻译结果的数组
     */
    public function translate($query, $from = 'auto', $to = 'zh', $test = 0)
    {
        if (!$this->validateConfig()) {
            return dr_return_data(0, 'AppId/AppSecret 不能为空');
        }

        if(!$query){
            return dr_return_data(0, '不能为空');
        }

        $query = is_array($query) ? $query : [$query];
        $query = array_slice($query, 0, $this->apiquery == 1 ? 10 : $this->apiquery);

        try {
            $results = $this->apiquery == 1
                ? $this->translateSingle($query, $from, $to)
                : $this->translateBatch($query, $from, $to);
                
            $error_code = $this->apiquery == 1 ? $results[0]['error_code'] : $results['error_code'];

            if (isset($error_code)) {
                if ($error_code == 54003) {
                    $this->config['baidu']['apiquery'] = 1;
                    \Phpcmf\Service::M('app')->save_config('Synlang', $this->config);
                    $this->logError('百度翻译接口并发不符');
                }
                if($test){
                    $error_data = [ 
                         '52001' => '请求超时 检查请求query是否超长，以及原文或译文参数是否在支持的语种列表里 ',
                         '52002' => '系统错误 请重试 ',
                         '52003' => '未授权用户 请检查appid是否正确或者服务是否开通 ',
                         '54000' => '必填参数为空 请检查是否少传参数 ',
                         '54001' => '签名错误 请检查您的签名生成方法 ',
                         '54003' => '访问频率受限 请降低您的调用频率，或在控制台进行身份认证后切换为高级版/尊享版 ',
                         '54004' => '账户余额不足 请前往管理控制台为账户充值 ',
                         '54005' => '长query请求频繁 请降低长query的发送频率，3s后再试 ',
                         '58000' => '客户端IP非法 检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改 ',
                         '58001' => '译文语言方向不支持 检查译文语言是否在语言列表里 ',
                         '58002' => '服务当前已关闭 请前往管理控制台开启服务 ',
                         '58003' => '此IP已被封禁 同一IP当日使用多个APPID发送翻译请求，则该IP将被封禁当日请求权限，次日解封。请勿将APPID和密钥填写到第三方软件中。 ',
                         '90107' => '认证未通过或未生效 请前往我的认证查看认证进度 ',
                         '20003' => '请求内容存在安全风险 请检查请求内容 ',
                    ];
                    
                    return dr_return_data(0, $error_code.'：'.$error_data[$error_code]);
                }
            }

            return dr_return_data(1, 'ok', $this->formatTranslationResults($results));
        } catch (\Exception $e) {
            $this->logError('Translation error: ' . $e->getMessage());
            return dr_return_data(0, '翻译请求失败：' . $e->getMessage());
        }
    }

    /**
     * 单次翻译处理
     */
    private function translateSingle($query, $from, $to)
    {
        $results = [];
        foreach ($query as $text) {
            $result = $this->sendTranslateRequest($text, $from, $to);
            if ($result !== null) {
                $results[] = $result;
            }
            usleep(200000);
        }
        return $results;
    }

    /**
     * 批量翻译处理
     */
    private function translateBatch($query, $from, $to)
    {
        $results = [];
        $batches = array_chunk($query, $this->apiquery);

        foreach ($batches as $batch) {
            $mh = curl_multi_init();
            $handles = [];

            foreach ($batch as $text) {
                $ch = $this->createCurlHandle($text, $from, $to);
                curl_multi_add_handle($mh, $ch);
                $handles[] = $ch;
            }

            $running = null;
            do {
                curl_multi_exec($mh, $running);
                curl_multi_select($mh);
            } while ($running > 0);

            foreach ($handles as $ch) {
                $response = curl_multi_getcontent($ch);
                $result = json_decode($response, true);
                if ($result) {
                    if (isset($result['error_code'])) {
                        return $result;
                    }
                    $results[] = $result;
                }
                curl_multi_remove_handle($mh, $ch);
                curl_close($ch);
            }
            curl_multi_close($mh);
            usleep(200000);
        }

        return $results;
    }

    /**
     * 创建CURL句柄
     */
    private function createCurlHandle($text, $from, $to)
    {
        $salt = rand(10000, 99999);
        $sign = $this->makeSign($text, $salt);

        $url = $this->apiurl . '?' . http_build_query([
            'q' => $text,
            'from' => $from,
            'to' => $to,
            'appid' => $this->appid,
            'salt' => $salt,
            'sign' => $sign,
            'needIntervene' => 1
        ]);

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => self::DEFAULT_TIMEOUT,
            CURLOPT_CONNECTTIMEOUT => self::DEFAULT_CONNECT_TIMEOUT,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ]
        ]);

        return $ch;
    }

    /**
     * 发送单个翻译请求
     */
    private function sendTranslateRequest($text, $from, $to)
    {
        $salt = rand(10000, 99999);
        $sign = $this->makeSign($text, $salt);

        $url = $this->apiurl . '?' . http_build_query([
            'q' => $text,
            'from' => $from,
            'to' => $to,
            'appid' => $this->appid,
            'salt' => $salt,
            'sign' => $sign,
            'needIntervene' => 1
        ]);

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => self::DEFAULT_TIMEOUT,
            CURLOPT_CONNECTTIMEOUT => self::DEFAULT_CONNECT_TIMEOUT,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ]
        ]);

        $response = curl_exec($ch);

        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            $this->logError('CURL Error: ' . $error);
            return null;
        }

        return json_decode($response, true);
    }

    /**
     * 生成签名
     */
    private function makeSign($query, $salt)
    {
        return md5($this->appid . $query . $salt . $this->secretKey);
    }

    /**
     * 验证配置是否完整
     */
    private function validateConfig()
    {
        return !empty($this->appid) && !empty($this->secretKey);
    }

    /**
     * 格式化翻译结果
     */
    private function formatTranslationResults($results)
    {
        $data = [];
        foreach ($results as $result) {
            if (isset($result['trans_result'][0]) && $result['trans_result'][0]['dst']) {
                $data[] = [
                    'text' => $result['trans_result'][0]['src'],
                    'trans' => $result['trans_result'][0]['dst']
                ];
            }
        }
        return $data;
    }

    /**
     * 记录错误日志
     */
    private function logError($message)
    {
        log_message('error', $message);
    }
}