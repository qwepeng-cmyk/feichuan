<?php namespace Phpcmf\Model\Synlang;

class My extends \Phpcmf\Model
{



    /**
     * 将语言代码转换为另一种语言代码
     *
     * @param string $code 要转换的语言代码
     * @param string $from 源语言代码类型
     * @param string $to 目标语言代码类型
     * @return string 转换后的语言代码
     */

    public function langcode($code, $from = 'Baidu', $to = 'Google')
    {   
        $langCodes = [
            'from'  =>  require 'Lang/'.$from.'.php',
            'to'    =>  require 'Lang/'.$to.'.php',
        ];


        if ($from == 'Baidu') {

            foreach ($langCodes['from'] as $category => $langs) {
                $key = array_search($code, $langs);



                if ($key !== false) {
                    //$this->langCodes[$to][$category][$key]  如果 Glang.php 也是二维数组 就要多加个  $category
                    return $langCodes['to'][$key] ?? $code;
                }
            }

        } else {

            $flatArray = [];
            array_walk_recursive($langCodes['from'], function($value, $key) use (&$flatArray) {
                $flatArray[$key] = $value;
            });
            $key = array_search($code, $flatArray);
            if ($key !== false) {
                foreach ($langCodes['to'] as $category => $langs) {
                    if (isset($langs[$key])) {
                        return $langs[$key];
                    }
                }
            }
        }
        return $code;
    }


















    /**
     * 发送 cURL 请求
     *
     * @param string $url 请求的 URL
     * @param array $headers 请求头
     * @param bool $isPost 是否为 POST 请求
     * @param int $timeout 超时时间(秒)
     * @param bool $isProxy 是否使用代理
     * @param bool $toUtf8 是否将响应内容转换为 UTF-8 编码
     * @param array $postData POST 请求数据
     * @return string|false 请求成功返回响应内容,失败返回 false
     */
    public function sendCurl(
        $url,
        $headers = [],
        $isPost = false,
        $timeout = 30,
        $isProxy = true,
        $toUtf8 = true,
        $postData = []
    ) {
        // to_curl
        try {

            $curl = curl_init();
            // 设置抓取的url
            curl_setopt($curl, CURLOPT_URL, $url);
            // 设置头文件的信息作为数据流输出
            curl_setopt($curl, CURLOPT_HEADER, 0);
            // 超时设置,以秒为单位
            curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
            // 设置请求头
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            // 设置获取的信息以文件流的形式返回，而不是直接输出。
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_POST, $isPost);

            // Operation timed out after 30000 milliseconds with 0 bytes received !!!!
            curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);

            if (!empty($postData)) {
                curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postData));
            }


            if ($response = curl_exec($curl)) {
                curl_close($curl);
                if ($toUtf8) {
                    return $this->to_utf8($response);
                } else {
                    return $response;
                }
            }

            if ($message = curl_error($curl)) {
                throw new Exception("get document error：$url => {$message}");
            }
            curl_close($curl);
        } catch (Exception $e) {
            // Just so so
        }

        if ($toUtf8) {
            return $this->to_utf8($response);
        } else {
            return $response;
        }
    }


    /**
     * 将字符串转换为 UTF-8 编码
     *
     * @param string $content 需要转换的字符串
     * @return string 转换后的 UTF-8 编码字符串
     */
    public function toUtf8($content)
    {
        // to_utf8

        $encode = mb_detect_encoding($content, ['ASCII', 'GB2312', 'GBK', 'UTF-8', 'EUC-CN', 'CP936']);

        if ('UTF-8' != $encode) {
            return @iconv($encode, 'UTF-8//IGNORE', $content);
        }

        return $content;

    }


    /**
     * 检查字符串是否只包含数字、特殊字符和空格
     *
     * @param string $str 需要检查的字符串
     * @return bool 如果字符串只包含数字、特殊字符和空格,则返回 true,否则返回 false
     */
    public function isNumericAndSpecialCharsOnly($str)
    {
        // isSnOnly
        return preg_match('/^[0-9!@#$%^&*()_+\-=\[\]{};:\'",.<>?\/\\|`~\s]+$/u', $str) === 1;
    }

    /**
     * 根据预设的分隔符将字符串分割成数组
     *
     * @param string $string 需要分割的字符串
     * @param array $preset 预设的分隔符数组
     * @return array 分割后的字符串数组
     */
    public function splitStringByPreset($string, $preset = [])
    {
        // preset_split_string
        if (!empty($preset)) {
            $pattern = '/' . implode('|', array_map('preg_quote', $preset)) . '/i';
            $splitArray = preg_split($pattern, $string);
            $splitArray = array_map('trim', array_filter($splitArray));
            return $splitArray;
        }

        return [$string];
    }

    /**
     * 检查字符串是否为有效字符串(不包含字母)
     *
     * @param string $str 需要检查的字符串
     * @return bool 如果字符串包含字母,则返回 false,否则返回 true
     */
    public function isValidString($str)
    {
        // isValidString
        if (preg_match('/\p{L}/u', $str)) {
            return false;
        }
        return true;
    }

    /**
     * 解析字符串,分割成单个字符或单词
     *
     * @param string $str 需要解析的字符串
     * @return array 解析后的字符串数组
     */
    public function parseString($str)
    {
        // parseString
        $result = [];
        $temp = '';
        $len = mb_strlen($str, 'UTF-8');

        for ($i = 0; $i < $len; $i++) {
            $char = mb_substr($str, $i, 1, 'UTF-8');
            if ($this->isLetter($char) || $char == ' ' || $char == '\'') {
                $temp .= $char;
            } else {
                if ($temp != '') {
                    $result[] = $temp;
                    $temp = '';
                }
            }
        }

        if ($temp != '') {
            $result[] = $temp;
        }

        return $result;
    }

    /**
     * 检查字符是否为字母
     *
     * @param string $char 需要检查的字符
     * @return bool 如果字符为字母,则返回 true,否则返回 false
     */
    public function isLetter($char)
    {
        // isLetter
        return preg_match('/[\p{L}\p{M}-]/u', $char);
    }

    /**
     * 检查字符是否不是字母、数字或下划线
     *
     * @param string $char 需要检查的字符
     * @return bool 如果字符不是字母、数字或下划线,则返回 true,否则返回 false
     */
    public function isNotLetterNumericOrUnderscore($char)
    {
        // isNotLetter
        return !preg_match('/[\p{L}\p{M}\p{N}\s_]/u', $char);
    }

    /**
     * 检查字符串是否包含非字母字符
     *
     * @param string $str 需要检查的字符串
     * @return bool 如果字符串包含非字母字符,则返回 true,否则返回 false
     */
    public function containsNonLetter($str)
    {
        // containsNonLetter
        $len = mb_strlen($str, 'UTF-8');
        for ($i = 0; $i < $len; $i++) {
            $char = mb_substr($str, $i, 1, 'UTF-8');
            if ($this->isNotLetterNumericOrUnderscore($char)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 将字符串从全角转换为半角
     *
     * @param string $str 需要转换的字符串
     * @return string 转换后的字符串
     */
    public function convertStringType($str)
    {
        // convertStrType
        $dbc = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９', 'Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ', 'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ', 'Ｊ', 'Ｋ', 'Ｌ', 'Ｍ', 'Ｎ', 'Ｏ', 'Ｐ', 'Ｑ', 'Ｒ', 'Ｓ', 'Ｔ', 'Ｕ', 'Ｖ', 'Ｗ', 'Ｘ', 'Ｙ', 'Ｚ', 'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ', 'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ', '－', '　', '：', '．', '，', '／', '％', '＃', '！', '＠', '＆', '（', '）', '＜', '＞', '＂', '＇', '？', '［', '］', '｛', '｝', '＼', '｜', '＋', '＝', '＿', '＾', '￥', '￣', '｀', '\''];
        $sbc = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', ' ', ':', '.', ',', '/', '%', ' #', '!', '@', '&', '(', ')', '<', '>', '"', '\'', '?', '[', ']', '{', '}', '\\', '|', '+', '=', '_', '^', '￥', '~', '`', '\''];
        return str_replace($dbc, $sbc, $str);
    }
}
