<?php namespace Phpcmf\Model\Synlang;

class AliyunApi extends \Phpcmf\Model
{
    private const API_URL = 'https://mt.cn-hangzhou.aliyuncs.com';
    private const DEFAULT_TIMEOUT = 30;
    private const DEFAULT_CONNECT_TIMEOUT = 10;
    private const MAX_RETRIES = 3;
    private const MAX_LOG_LINES = 500;

    private $accessKeyId;
    private $accessKeySecret;
    private $version = '2018-10-12';
    private $format = 'JSON';
    private $config;
    private $apiquery;

    public function __construct()
    {
        parent::__construct();
        $this->config = \Phpcmf\Service::M('app')->get_config('Synlang');
        $this->accessKeyId = $this->config['aliyun']['accessKeyId'] ?? '';
        $this->accessKeySecret = $this->config['aliyun']['accessKeySecret'] ?? '';
        $this->apiquery = (int)($this->config['aliyun']['apiquery'] ?? 50);
    }

    public function translate($query, $from = 'auto', $to = 'zh', $test = 0)
    {
        $from = $this->langcode($from);
        $to = $this->langcode($to);

        $mapping = [
            'zh-CN' => 'zh',
            'zh-TW' => 'zh-tw'
        ];

        if($mapping[$from]){
            $from = $mapping[$from];
        }

        if($mapping[$to]){
            $to = $mapping[$to];
        }

        $query = is_array($query) ? $query : [$query];
        $query = array_slice($query, 0, $this->apiquery);

        $data = [];
        $mh = curl_multi_init();
        $handles = [];
        $responses = [];

        // 创建多个CURL句柄
        foreach ($query as $i => $text) {
            $params = [
                'Format' => 'json',
                'FormatType' => 'json',
                'SourceLanguage' => $from,
                'TargetLanguage' => $to,
                'SourceText' => $text,
                'Scene' => 'general',
                'Action' => 'TranslateGeneral',
                'Version' => $this->version,
                'AccessKeyId' => $this->accessKeyId,
                'SignatureMethod' => 'HMAC-SHA1',
                'SignatureVersion' => '1.0',
                'SignatureNonce' => uniqid(),
                'Timestamp' => gmdate('Y-m-d\TH:i:s\Z')
            ];
            
            $params['Signature'] = $this->generateSignature($params);
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://mt.cn-hangzhou.aliyuncs.com');
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, self::DEFAULT_TIMEOUT);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, self::DEFAULT_CONNECT_TIMEOUT);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/x-www-form-urlencoded',
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ]);
            
            $handles[$i] = [
                'handle' => $ch,
                'text' => $text
            ];
            curl_multi_add_handle($mh, $ch);
        }


        // 执行多线程请求
        $running = null;
        do {
            curl_multi_exec($mh, $running);
            curl_multi_select($mh);
        } while ($running > 0);

        // 获取响应数据
        foreach ($handles as $i => $item) {
            $ch = $item['handle'];
            $response = curl_multi_getcontent($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            

            if ($httpCode == 200) {
                $decoded = json_decode($response, true);


                if (isset($decoded['Code']) && $decoded['Code'] == 200) {
                    $data[] = [
                        'text' => $item['text'],
                        'trans' => $decoded['Data']['Translated']
                    ];
                }
            }
            
            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);
        }
        
        curl_multi_close($mh);

        return dr_return_data(1, 'ok', $data);
    }


    /**
     * 将语言代码转换为另一种语言代码
    */
    private function langcode($code, $from = 'Baidu', $to = 'Google')
    {
        return \Phpcmf\Service::M('My', 'synlang')->langcode($code, $from, $to);
    }

    private function validateConfig()
    {
        return !empty($this->accessKeyId) && !empty($this->accessKeySecret);
    }


    private function generateSignature($params) {
        ksort($params);
        $queryString = '';
        foreach ($params as $key => $value) {
            $queryString .= '&' . $this->percentEncode($key) . '=' . $this->percentEncode($value);
        }
        $stringToSign = 'POST&%2F&' . $this->percentEncode(substr($queryString, 1));

        $signature = base64_encode(
            hash_hmac('sha1', $stringToSign, $this->accessKeySecret . '&', true)
        );
        return $signature;
    }

    private function percentEncode($str) {
        return str_replace('%7E', '~', rawurlencode($str));
    }





/**
 * 单一CURL测试方法，用于测试阿里云翻译API
 * @param string $text 要翻译的文本
 * @param string $from 源语言
 * @param string $to 目标语言
 * @return array 翻译结果
 */
/*
public function translate3($text, $from = 'auto', $to = 'zh')
{
    $from = $this->langcode($from);
    $to = $this->langcode($to);

    if($from=='zh-CN'){
        $from='zh';
    }

    if($to=='zh-CN'){
        $to='zh';
    }

    $params = [
        'Format' => 'json',
        'FormatType' => 'json',
        'SourceLanguage' => $from,
        'TargetLanguage' => $to,
        'SourceText' => $text,
        'Scene' => 'general',
        'Action' => 'TranslateGeneral',
        'Version' => $this->version,
        'AccessKeyId' => $this->accessKeyId,
        'SignatureMethod' => 'HMAC-SHA1',
        'SignatureVersion' => '1.0',
        'SignatureNonce' => uniqid(),
        'Timestamp' => gmdate('Y-m-d\TH:i:s\Z')
    ];
    
    $params['Signature'] = $this->generateSignature($params);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, self::API_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, self::DEFAULT_TIMEOUT);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, self::DEFAULT_CONNECT_TIMEOUT);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded',
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);


    
    // 返回结果处理
    if ($httpCode == 200) {
        $decoded = json_decode($response, true);


        if (isset($decoded['Code']) && $decoded['Code'] == 200) {
            return dr_return_data(1, 'ok1', [
                'text' => $text,
                'trans' => $decoded['Data']['Translated'],
                'response' => $decoded
            ]);
        } else {
            return dr_return_data(0, '翻译失败: ' . ($decoded['Message'] ?? '未知错误'), [
                'response' => $decoded
            ]);
        }
    } else {
        return dr_return_data(0, 'HTTP错误: ' . $httpCode . ' - ' . $error, [
            'response' => $response
        ]);
    }
}
*/

}