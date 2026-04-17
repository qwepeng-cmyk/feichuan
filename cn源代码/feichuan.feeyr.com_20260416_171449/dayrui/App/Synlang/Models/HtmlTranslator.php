<?php namespace Phpcmf\Model\Synlang;

class HtmlTranslator extends \Phpcmf\Model
{
    private $html;
    private $placeholders = [];
    private $originalContents = [];
    private $extractionRules = [
        ['meta[@name="keywords"]', 'content'],
        ['meta[@name="description"]', 'content'],
        ['meta[@property="og:title"]', 'content'],
        ['meta[@property="og:description"]', 'content'],
        ['input', 'placeholder'],
        ['textarea', 'placeholder'],
        ['a', 'title'],
    ];

    private $placeholderTypes = [
        'SPECIAL' => 'SPECIAL_PLACEHOLDER_',
        'CONTENT' => 'CONTENT_PLACEHOLDER_',
        'CUSTOM' => 'CUSTOM_PLACEHOLDER_'
    ];
    /**
     * 从 HTML 中提取文本内容并用占位符替换。
     *
     * @return $this
     */
    public function Htmlextract($html, $from, $to)
    {
        if(!$to){
            return $html;
        }

        //生成对应语言翻译记录表
        \Phpcmf\Service::M('SplitTable', 'synlang')->get_split($to);

        $this->html = $html;
        //一些特殊位置的内容提取
        $this->addExtractionRule(['div', 'data-title']);

        //用占位符替换特殊节点 (script、style、notrans)。
        $this->replaceSpecialNodes();

        //从 HTML 中提取文本节点并用占位符替换。
        $this->extractTextNodesWithPlaceholders();

        //根据提取规则从 HTML 中提取自定义节点并用占位符替换。
        $this->extractCustomNodesWithPlaceholders();

        // 在翻译前保存原始内容
        $this->saveOriginalContents();

        // 翻译内容并获取翻译结果
        $translationResults = $this->translateContent($from, $to);

        $this->fillPlaceholders();
        $getHtml = $this->getHtml();
        $UrlCache = is_file(APPSPATH.'Synlang/Models/UrlCache.php');
        if($UrlCache){
            // 检查翻译结果检查
            $result = $this->checkTranslationComplete();
            if (empty($result['untranslated'])) {
                //echo "翻译完全";
                // 保存缓存
                $cache = \Phpcmf\Service::M('UrlCache', 'synlang');
                $cache->setCache($getHtml, $to);
                // 清理过期缓存
                //$cache->cleanExpired();
            }
        }

        return $getHtml;
    }

    /**
     * 使用提供的翻译器翻译提取的文本内容。
     *
     * @param Translator $translator 翻译器实例
     * @return $this
     */

    public function translateContent($from='auto', $to='en')
    {
        $textsToTranslate = [];
        $translationResults = [
            'translated' => [],
            'untranslated' => []
        ];

        foreach ($this->placeholders as $placeholder => $content) {
            if ($this->isTranslatablePlaceholder($placeholder, $content['content'])) {
                $textsToTranslate[] = $content['content'];
            }
        }
        
        $resTrans = \Phpcmf\Service::M('SaveDbAndCache', 'synlang')->batchString($textsToTranslate, $from, $to);

        $translatedTexts = [];
        foreach ($resTrans as $key => $value) {
            if (!empty($value['trans'])) {
                $normalizedText = $value['normalized'];
                $translatedTexts[$normalizedText] = $value['trans'];
                $translationResults['translated'][] = [
                    'original' => $value['text'],
                    'normalized' => $value['normalized'],
                    'translated' => $value['trans']
                ];
            } else {
                $translationResults['untranslated'][] = $value['text'];
            }
        }

        foreach ($this->placeholders as $placeholder => &$content) {
            if(!trim($content['content'])){
                continue;
            }

            if ($this->isTranslatablePlaceholder($placeholder, $content['content'])) {
                $originalText = $content['content'];
                $normalizedText = \Phpcmf\Service::M('SaveDbAndCache', 'synlang')->normalizeText($originalText);
                
                if (isset($translatedTexts[$normalizedText])) {
                    $translatedContent = $translatedTexts[$normalizedText];
                    $replacedContent = str_replace($normalizedText, $translatedContent, $originalText);
                    if ($replacedContent === $originalText) {
                        $content['content'] = $translatedContent;
                    } else {
                        $content['content'] = $replacedContent;
                    }
                    $content['translated'] = !empty($translatedContent);
                } else {
                    $content['translated'] = false;
                }
            }
        }
        
        return $translationResults;
    }

    /**
     * 添加自定义提取规则。
     *
     * @param array $rule 提取规则,格式为 ['XPath 表达式', '属性名']
     */
    public function addExtractionRule($rule)
    {
        $this->extractionRules[] = $rule;
    }

    /**
     * 用原始或翻译后的内容填充占位符。
     *
     * @return $this
     */
    public function fillPlaceholders()
    {   
        $this->html = preg_replace_callback(
            '/<!--\[\[(SPECIAL|CONTENT|CUSTOM)_PLACEHOLDER_\d+\]\]-->/',
            function ($matches) {
                return $this->placeholders[$matches[0]]['content'];
            },
            $this->html
        );
        
        return $this;
    }

    /**
     * 获取翻译后的 HTML。
     *
     * @return string
     */
    public function getHtml()
    {   
        $pattern = '/' . preg_quote('<?xml encoding="UTF-8">', '/') . '/';
        $this->html = preg_replace($pattern, '', $this->html);
        return $this->html;
    }

    /**
     * 用占位符替换特殊节点 (script、style、notrans)。
     */
    private function replaceSpecialNodes()
    {
        $this->html = preg_replace_callback(
            '/<script[^>]*>[\s\S]*?<\/script>|<style[^>]*>[\s\S]*?<\/style>|\{notrans\}[\s\S]*?\{\/notrans\}/i',
            function ($matches) {
                return $this->createPlaceholder(
                    str_replace(['{notrans}','{/notrans}'], ' ', $matches[0]),
                    'SPECIAL'
                );
            },
            $this->html
        );
    }


    /**
     * 创建并返回配置好的 DOMDocument 和 DOMXPath 对象
     * @return array [$dom, $xpath]
     */
    private function createDOMObjects()
    {
        $dom = new \DOMDocument('1.0', 'UTF-8');
        libxml_use_internal_errors(true);

        // 预处理 HTML 内容
        $html = $this->html;
        
        // 使用 iconv 处理可能的编码问题
        if (!preg_match('//u', $html)) {
            $html = iconv('CP1252', 'UTF-8//IGNORE', $html);
        }
        
        // 确保 title 标签内容的正确编码
        $html = preg_replace_callback('/<title>(.*?)<\/title>/is', function($matches) {
            return '<title>' . htmlspecialchars($matches[1], ENT_QUOTES, 'UTF-8') . '</title>';
        }, $html);


        // 使用正则表达式匹配并调整 <!DOCTYPE html> 的位置
        $html = preg_replace('/^(.*?)(<\!DOCTYPE\s+html[^>]*>)/si', '$2$1', $html);


        // 添加 XML 声明和基本结构
        if (!preg_match('/^(?:<\?xml[^>]*>|\s*<!DOCTYPE|<html)/i', $html)) {
            $html = '<?xml encoding="UTF-8"><html><body>' . $html . '</body></html>';
        } else {
            $html = '<?xml encoding="UTF-8">' . $html;
        }
        
        // 使用 UTF-8 编码加载 HTML
        $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        $xpath = new \DOMXPath($dom);
        return [$dom, $xpath];
    }

    /**
     * 保存占位符内容并返回占位符
     * @param string $content 要保存的内容
     * @param string $type 占位符类型 (SPECIAL|CONTENT|CUSTOM)
     * @return string 生成的占位符
     */
    private function createPlaceholder($content, $type)
    {
        $placeholder = '<!--[[' . $this->placeholderTypes[$type] . count($this->placeholders) . ']]-->';
        $this->placeholders[$placeholder] = [
            'content' => $content,
            'type' => $type
        ];
        return $placeholder;
    }

    /**
     * 从 HTML 中提取文本节点并占位符替换。
     */
    private function extractTextNodesWithPlaceholders()
    {
        [$dom, $xpath] = $this->createDOMObjects();

        $nodes = $xpath->query('//text()');

        foreach ($nodes as $node) {
            $content = $node->nodeValue;

            if (strlen(trim($content)) > 0) {
                $processedContent = $this->processContentWithPlaceholders($content, 'CONTENT');
                $node->nodeValue = $processedContent;
            }
        }

        $this->html = html_entity_decode($dom->saveHTML(), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    /**
     * 根据提取规则从 HTML 中提取自定义节点并用占位符替换。
     */
    private function extractCustomNodesWithPlaceholders()
    {
        [$dom, $xpath] = $this->createDOMObjects();

        foreach ($this->extractionRules as $rule) {
            $nodePath = $rule[0];
            $attributeName = $rule[1];

            $nodes = $xpath->query("//$nodePath");

            foreach ($nodes as $node) {
                $content = $node->getAttribute($attributeName);

                if (strlen(trim($content)) > 0) {
                    $processedContent = $this->processContentWithPlaceholders($content, 'CUSTOM');
                    $node->setAttribute($attributeName, $processedContent);
                }
            }
        }

        $this->html = html_entity_decode($dom->saveHTML(), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    /**
     * 处理内容中的占位符，提取文本并替换为新占位符。
     */
    private function processContentWithPlaceholders(string $content, string $placeholderType): string
    {
        if (preg_match_all('/<!--\[\[SPECIAL_PLACEHOLDER_\d+\]\]-->/', $content, $matches, PREG_OFFSET_CAPTURE)) {
            $parts = [];
            $lastOffset = 0;

            foreach ($matches[0] as $match) {
                $placeholder = $match[0];
                $offset = $match[1];

                if ($offset > $lastOffset) {
                    $beforeText = substr($content, $lastOffset, $offset - $lastOffset);
                    $newPlaceholder = $this->createPlaceholder($beforeText, $placeholderType);
                    $parts[] = $newPlaceholder;
                }

                $parts[] = $placeholder;
                $lastOffset = $offset + strlen($placeholder);
            }

            if ($lastOffset < strlen($content)) {
                $afterText = substr($content, $lastOffset);
                $newPlaceholder = $this->createPlaceholder($afterText, $placeholderType);
                $parts[] = $newPlaceholder;
            }

            return implode('', $parts);
        } else {
            return $this->createPlaceholder($content, $placeholderType);
        }
    }

    /**
     * 检查占位符是否可翻译。
     *
     * @param string $placeholder 占位符
     * @param string $content 占位符对应的内容
     * @return bool
     */
    private function isTranslatablePlaceholder($placeholder, $content)
    {
        if (!isset($this->placeholders[$placeholder])) {
            return false;
        }
        
        $placeholderData = $this->placeholders[$placeholder];
        $isTranslatableType = in_array($placeholderData['type'], ['CONTENT', 'CUSTOM']);
        $isTranslatable = preg_match('/\p{L}+/u', $placeholderData['content']) !== 0;
        
        return $isTranslatableType && $isTranslatable;
    }

    /**
     * 检查给定的字符串是否为占位符。
     *
     * @param string $string 要检查的字符串
     * @return bool
     */
    private function isPlaceholder($string)
    {
        return strpos($string, '<!--[[SPECIAL_PLACEHOLDER_') === 0 || strpos($string, '<!--[[CONTENT_PLACEHOLDER_') === 0 || strpos($string, '<!--[[CUSTOM_PLACEHOLDER_') === 0;
    }

    public function encodeText($text)
    {   
        return \Phpcmf\Service::M('SaveDbAndCache', 'synlang')->encodeText($text);
    }

    /**
     * 保存原始内容
     */
    private function saveOriginalContents()
    {
        foreach ($this->placeholders as $placeholder => $content) {
            if ($content['type'] !== 'SPECIAL') {
                $this->originalContents[$placeholder] = $content['content'];
            }
        }
    }

    /**
     * 检查翻译完整性并与原文比对
     */
    public function checkTranslationComplete()
    {
        $untranslated = [];
        $isComplete = true;

        foreach ($this->placeholders as $placeholder => $content) {
            // 跳过 SPECIAL 类型的内容
            if ($content['type'] === 'SPECIAL') {
                continue;
            }
            
            // 获取原始内容
            $originalContent = $this->originalContents[$placeholder] ?? '';

            // 只检查需要翻译的占位符
            if ($this->isTranslatablePlaceholder($placeholder, $originalContent)) {
                // 检查翻译标记
                if (empty($content['translated'])) {
                    $isComplete = false;
                    $untranslated[] = $originalContent;
                }
            }
        }

        return [
            'isComplete' => $isComplete,
            'untranslated' => $untranslated
        ];
    }

}

