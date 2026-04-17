<?php
namespace Phpcmf\Model\Synlang;

/**
 * GoogleTransApi 类用于调用谷歌翻译 API 进行文本翻译
 */
class GoogleTransApi extends \Phpcmf\Model
{
    const API_URL = 'https://googlertanslate.api.bdymkt.com/translates';
    const DEFAULT_TIMEOUT = 30;
    const DEFAULT_CONNECT_TIMEOUT = 10;

    private $config;
    private $appCode;

    /**
     * 构造函数
     */
    public function __construct()
    {
        parent::__construct();
        $this->config = \Phpcmf\Service::M('app')->get_config('Synlang');
        $this->appCode = $this->config['googleai']['appcode'];
    }

    /**
     * 翻译文本
     *
     * @param string|array $query 要翻译的文本或文本数组
     * @param string $from 源语言代码
     * @param string $to 目标语言代码
     * @return array 翻译结果数组
     */


    public function translate($query, $from = 'zh', $to = 'en')
    {

        // 检查配置项是否完整
        if (!$this->appCode) {
            return dr_return_data(0, 'AppCode 不能为空');
        }

        $from = $this->langcode($from);
        $to = $this->langcode($to);

        $query = is_array($query) ? $query : [$query];

        $query = array_values($query);

        $data = [
            "texts" => $query,
            "tls" => [$to],
            "sl" => $from
        ];


        $jsonData = dr_array2string($data);

        $date = gmdate('D, d M Y H:i:s T');
        $options = [
            CURLOPT_URL => self::API_URL,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $jsonData,
            CURLOPT_HTTPHEADER => [
                'x-bce-request-id: d2cf8273ac2f45f8baa58cfd2f1cb191',
                'User-Agent: Apache-HttpClient/4.5.6 (java 1.5), bce-sdk-java/0.10.132/Linux/3.10.0_3-0-0-22/Java_HotSpot(TM)_64-Bit_Server_VM/25.45-b02/1.8.0_45/en/',
                'Host: googlertanslate.api.bdymkt.com',
                'Content-Length: ' . strlen($jsonData),
                'X-Bce-Signature: AppCode/' . $this->appCode,
                'Date: ' . $date,
                'Content-Type: application/json; charset=utf-8',
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_TIMEOUT => self::DEFAULT_TIMEOUT,
            CURLOPT_CONNECTTIMEOUT => self::DEFAULT_CONNECT_TIMEOUT,
        ];

        $ch = curl_init();
        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);
        curl_close($ch);

        $return = dr_string2array($response);

        if ($return[0]['code']!=200) {
            return ['code' => 0, 'msg' => '接口异常，请联系充值平台'];
        }

        $data = [];
        if(is_array($return[0]['texts'])){

            foreach($query as $k => $v){

                if(empty($return[0]['texts'][$k])){
                    continue;
                }

                $data[] = [
                    'text' => $v,
                    'trans'=> $return[0]['texts'][$k]
                ];
            }

        }elseif(!empty($return[0]['texts'])){

            $data[] = [
                'text' => $query[0],
                'trans'=> $return[0]['texts']
            ];

        }


        return ['code' => 1, 'msg' => '成功', 'data' => $data];
    }

    private function langcode($code, $from = 'Baidu', $to = 'Google')
    {
        return \Phpcmf\Service::M('My', 'synlang')->langcode($code, $from, $to);
    }
}