<?php
namespace Phpcmf\Model\Synlang;

use Phpcmf\Service;

class SaveDbAndCache extends \Phpcmf\Model
{
    /**
     * 语言文件路径
     * @var string
     */
    protected $filePath;

    /**
     * 当前语言代码
     * @var string
     */
    protected $lang;

    /**
     * 缓存的语言数组
     * @var array
     */
    protected static $langArray = [];

    /**
     * 配置信息
     * @var array
     */
    private $config;

    /**
     * 构造函数
     */
    public function __construct()
    {
        parent::__construct();
        $this->config = XR_M('app')->get_config('Synlang');
    }

    /**
     * 批量处理字符串翻译
     *
     * @param array|string $texts 需要翻译的文本
     * @param string $from 源语言代码
     * @param string $to 目标语言代码
     * @return array 翻译结果数组
     */
    public function batchString($texts, $from = 'zh', $to = 'en')
    {
        $originalTexts = (array)$texts;
        $normalizedTexts = array_map([$this, 'normalizeText'], $originalTexts);
        $this->lang = $to;
        $this->filePath = WRITEPATH . 'synlang/' . $to . '/';

        $cacheExists = false;
        if (is_dir($this->filePath)) {
            $dir = new \DirectoryIterator($this->filePath);
            foreach ($dir as $fileinfo) {
                if (!$fileinfo->isDot() && $fileinfo->getExtension() == 'php') {
                    $cacheExists = true;
                    break;
                }
            }
        }

        if (!$cacheExists) {
            $allTranslations = $this->getTranslationFromDatabase(null, $to);
            \Phpcmf\Service::M('Cache', 'synlang')->writeLangFile($allTranslations, $this->filePath);
        }
        $encodedTexts = array_map([$this, 'encodeText'], $normalizedTexts);
        $textMapping = array_combine($encodedTexts, array_map(function($orig, $norm) {
            return ['original' => $orig, 'normalized' => $norm];
        }, $originalTexts, $normalizedTexts));

        $translations = $this->getTranslations($encodedTexts, $from, $to);

        $missingTexts = array_diff_key($textMapping, $translations);

        if ($missingTexts) {
            $apiTranslations = $this->getApiTranslations($missingTexts, $from, $to);
            $translations = array_merge($translations, $apiTranslations);
        }
        return array_filter(array_map(function($k, $v) use ($textMapping) {
            return isset($textMapping[$k]) ? [
                'md5' => $k, 
                'text' => $textMapping[$k]['original'], 
                'normalized' => $textMapping[$k]['normalized'],
                'trans' => $v
            ] : null;
        }, array_keys($translations), $translations), function($item) {
            return $item !== null;
        });
    }

    /**
     * 获取翻译
     *
     * @param array $encodedTexts 编码后的文本数组
     * @param string $from 源语言代码
     * @param string $to 目标语言代码
     * @return array 翻译结果数组
     */
    protected function getTranslations(array $encodedTexts, string $from, string $to): array
    {
        $translations = $this->getCachedTranslations($encodedTexts, $to);
        $missingTexts = array_diff_key(array_flip($encodedTexts), $translations);

        if (!empty($missingTexts)) {
            $dbTranslations = $this->getTranslationFromDatabase(array_keys($missingTexts), $to);
            $translations = array_merge($translations, $dbTranslations);
        }

        return $translations;
    }

    /**
     * 从缓存获取翻译
     *
     * @param array $encodedTexts 编码后的文本数组
     * @param string $to 目标语言代码
     * @return array 缓存的翻译结果数组
     */
    private function getCachedTranslations(array $encodedTexts, string $to): array
    {
        $cachedTranslations = [];

        if (is_dir($this->filePath)) {
            $dir = new \DirectoryIterator($this->filePath);
            foreach ($dir as $fileinfo) {
                if (!$fileinfo->isDot() && $fileinfo->getExtension() == 'php') {
                    $filePath = $fileinfo->getPathname();
                    $chunk = include $filePath;
                    if (is_array($chunk)) {
                        $cachedTranslations = array_merge($cachedTranslations, $chunk);
                    }
                }
            }
        }

        return $cachedTranslations;
    }


    /**
     * 从API获取翻译
     *
     * @param array $texts 需要翻译的文本数组
     * @param string $from 源语言代码
     * @param string $to 目标语言代码
     * @return array API翻译结果数组
     */

    private function getApiTranslations(array $textMapping, string $from, string $to): array
    {
        if (empty($textMapping)) {
            log_message('error', 'Empty texts array provided for translation');
            return [];
        }

        if(!$this->config['open']){
            return [];
        }

        try {
            $translationService = XR_M($this->config['plat'], 'synlang');
            if (!$translationService) {
                throw new \RuntimeException('Unable to load translation service');
            }

            $normalizedTexts = array_column($textMapping, 'normalized');
            $translatedTexts = $translationService->translate($normalizedTexts, $from, $to);

            if (!isset($translatedTexts['code']) || !isset($translatedTexts['data'])) {
                throw new \RuntimeException('Invalid response from translation service');
            }

            if ($translatedTexts['code']) {

                $translations = $this->processApiTranslations($translatedTexts['data'], $textMapping, $to);

                if (!is_array($translations) || count($translations) < 2) {
                    throw new \RuntimeException('Invalid result from processApiTranslations');
                }

                $this->saveTranslationsToDatabase($translations[1], $to);
                $this->updateCache($translations[0], $to);

                return is_array($translations[0]) ? $translations[0] : [];

            } else {

                log_message('error', $translatedTexts['msg']);
                return [];

            }
        } catch (\Exception $e) {
            log_message('error', 'API translation failed: ' . $e->getMessage());
            return [];
        }
    }




    /**
     * 从数据库获取翻译 (优化版 - 仍使用拼接 SQL，务必注意安全)
     *
     * @param string[] $encodedTexts 需要查询的 MD5 哈希数组。必须确保这些值是安全的！
     * @param string   $to           目标语言代码 (例如 'en', 'fr')。
     * @return array<string, string> 返回 [md5 => translation] 格式的数组。
     */
    protected function getTranslationFromDatabase($encodedTexts, $to)
    {
        // 获取表前缀和目标表名
        $prefix = XR_M()->prefix;
        $table = $prefix . 'app_synlang_trans_' . $to;

        // 1. 检查目标翻译表是否存在
        if (!XR_M()->db->tableExists($table)) {
            log_message('error',"翻译目标表不存在: {$table}");
            return [];
        }

        // 2. 获取数据库连接实例 (确保获取方式正确)
        // 假设 XR_M()->db 返回的是框架的数据库操作对象
        $db = XR_M()->db;
        if (!$db) {
            log_message('error',"无法获取数据库实例用于翻译查询");
            return [];
        }

        $translationArray = []; // 初始化结果数组

        // --- 情况 A: $encodedTexts 为空，查询所有 (分页处理) ---
        if (empty($encodedTexts)) {
            // 优化建议：确保 `{$table}` 表的 `inputtime` 字段有数据库索引，以提高 ORDER BY 性能。
            $pageSize = 5000;        // 减少每批查询量，降低单次内存消耗 (原为 10000)
            $maxPagesPerRun = 5;     // 每次脚本执行最多处理的批次数
            $cacheKey = 'translation_current_page_' . $to; // 缓存 Key
            $page = (int)XR_L('cache')->get_data($cacheKey) ?: 1; // 当前页码
            $pagesExecuted = 0;     // 本次已执行页数

            //log_message('debug',"开始分页获取 {$to} 语言翻译，起始页: {$page}");

            do {
                $offset = (int)(($page - 1) * $pageSize); // 强制转为整数
                $safePageSize = (int)$pageSize;           // 强制转为整数

                // 构建分页查询 SQL (仍使用拼接，但 $offset, $safePageSize 是内部计算的整数)
                $query = "SELECT `md5`, `trans` FROM `{$table}` ORDER BY `inputtime` DESC LIMIT {$offset}, {$safePageSize}";

                // 执行查询
                $result = $db->query($query);
                if (!$result) {
                    log_message('error',"分页查询翻译失败: " . $db->error() ?: $query); // 记录详细错误
                    break; // 查询失败则跳出循环
                }
                $rows = $result->getResultArray();

                // 处理查询结果
                if ($rows) {
                    foreach ($rows as $row) {
                        if (isset($row['md5'], $row['trans'])) {
                            $translationArray[$row['md5']] = $row['trans'];
                        }
                    }
                    //log_message('debug',"分页获取 {$to} 语言翻译，页码: {$page}，获取数量: " . count($rows));
                } else {
                     //log_message('debug',"分页获取 {$to} 语言翻译，页码: {$page}，无更多数据");
                }

                $page++;
                $pagesExecuted++;
                // 更新缓存页码，设置 1 小时过期
                XR_L('cache')->set_data($cacheKey, $page, 3600);

                // 循环条件: 查到了数据 且 查满了页面大小 且 未超本次最大页数
            } while ($rows && count($rows) == $pageSize && $pagesExecuted < $maxPagesPerRun);

            // 如果未查满，说明是最后一页或中间出错退出，删除缓存标记
            if (!$rows || count($rows) < $pageSize) {
                //log_message('debug',"分页获取 {$to} 语言翻译完成或中断，删除缓存 Key: {$cacheKey}");
                XR_L('cache')->del_data($cacheKey);
            }

        // --- 情况 B: $encodedTexts 不为空，根据传入的 MD5 查询 ---
        } else {
            // **安全核心**: 严格验证和清理传入的 MD5 值
            $validMd5s = [];
            foreach ($encodedTexts as $md5) {
                // 1. 验证是否是合法的 32 位十六进制字符串 (MD5 格式)
                if (is_string($md5) && preg_match('/^[a-f0-9]{32}$/i', $md5)) {
                    // 2. **重要**: 使用框架提供的数据库字符串转义方法！
                    //    你需要确认 `XR_M()->db` 或 `XR_M()->db` 对象哪个提供了正确的转义方法。
                    //    常见方法名可能是: escape(), escape_str(), escapeString() 等。
                    //    `escape()` 通常会自动加引号，`escape_str()` 通常不加。
                    //    **请务必替换下面的 `$db->escapeString()` 为你的框架的实际方法！**
                    try {
                        // 假设 $db->escapeString() 存在且只转义内容，不加引号
                        $escapedMd5 = $db->escapeString($md5); // <--- 确认并替换此方法!!!
                        $validMd5s[] = "'" . $escapedMd5 . "'"; // 手动添加引号
                    } catch (\Throwable $e) {
                         log_message('error',"数据库字符串转义方法出错: " . $e->getMessage());
                         // 如果转义出错，可以选择跳过或采取其他错误处理
                         continue;
                    }
                } else {
                    XR_L('Log')->warning("传入了非法的 MD5 值，已忽略: " . print_r($md5, true));
                }
            }

            // 如果没有有效的 MD5 值，直接返回
            if (empty($validMd5s)) {
                //log_message('debug',"没有有效的 MD5 值用于查询 {$to} 语言翻译");
                return [];
            }

            // 优化：如果 MD5 列表非常大 (例如 > 500)，分块查询
            $chunkSize = 500; // 每个子查询处理的 MD5 数量
            $md5Chunks = array_chunk($validMd5s, $chunkSize);

            //log_message('debug',"开始根据 " . count($validMd5s) . " 个 MD5 查询 {$to} 语言翻译，分 " . count($md5Chunks) . " 块处理");

            foreach ($md5Chunks as $chunk) {
                $md5List = implode(',', $chunk); // 将当前块的 MD5 连接成字符串

                // 优化：移除 ORDER BY inputtime DESC，因为是按需查询，顺序通常不重要
                $query = "SELECT `md5`, `trans` FROM `{$table}` WHERE `md5` IN ({$md5List})";

                // 执行查询
                $result = $db->query($query);
                 if (!$result) {
                    log_message('error',"分块查询翻译失败: " . $db->error() ?: $query);
                    continue; // 当前块查询失败，继续下一块 (或选择中断)
                }
                $rows = $result->getResultArray();

                // 合并结果
                if ($rows) {
                    foreach ($rows as $row) {
                        if (isset($row['md5'], $row['trans'])) {
                            $translationArray[$row['md5']] = $row['trans'];
                        }
                    }
                }
            }
            //log_message('debug',"MD5 查询 {$to} 语言翻译完成，共获取 " . count($translationArray) . " 条结果");
        }

        return $translationArray;
    }


    /**
     * 从数据库获取翻译
     *
     * @param array $encodedTexts 编码后的文本数组
     * @param string $to 目标语言代码
     * @return array 数据库中的翻译结果数组
     */


/*
    protected function getTranslationFromDatabase($encodedTexts, $to)
    {
        $prefix = \Phpcmf\Service::M()->prefix;
        $table = $prefix.'app_synlang_trans_'.$to;

        if (!\Phpcmf\Service::M()->db->tableExists($table)) {
            return [];
        }

        $db = XR_M()->db;

        if (empty($encodedTexts)) {

            $pageSize = 10000;
            $maxPagesPerRun = 5;
            $cacheKey = 'translation_current_page_'.$to;
            $page = \Phpcmf\Service::L('cache')->get_data($cacheKey) ?: 1;
            $translationArray = [];
            $pagesExecuted = 0;

            do {
                $offset = ($page - 1) * $pageSize;
                $query = "SELECT `md5`, `trans` FROM `{$table}` ORDER BY `inputtime` DESC LIMIT ?, ?";
                $result = $db->query($query, [$offset, $pageSize])->getResultArray();
                
                foreach ($result as $row) {
                    if (isset($row['md5'], $row['trans'])) {
                        $translationArray[$row['md5']] = $row['trans'];
                    }
                }
                
                $page++;
                $pagesExecuted++;
                \Phpcmf\Service::L('cache')->set_data($cacheKey, $page, 3600);
            } while (count($result) == $pageSize && $pagesExecuted < $maxPagesPerRun);

            if (count($result) < $pageSize) {
                \Phpcmf\Service::L('cache')->del_data($cacheKey);
            }

        } else {

            $placeholders = implode(',', array_fill(0, count($encodedTexts), '?'));
            $query = "SELECT `md5`, `trans` FROM `{$table}` WHERE `md5` IN ({$placeholders}) ORDER BY `inputtime` DESC";
            $params = $encodedTexts;
            $result = $db->query($query, $params)->getResultArray();
            
            $translationArray = [];
            foreach ($result as $row) {
                if (isset($row['md5'], $row['trans'])) {
                    $translationArray[$row['md5']] = $row['trans'];
                }
            }

        }

        return $translationArray;
    }

*/






















    /**
     * 处理API翻译结果
     *
     * @param array $data API返回的翻译数据
     * @param string $to 目标语言代码
     * @return array 处理后的翻译数组
     */
    protected function processApiTranslations($data, $textMapping, $to)
    {
        $translations = [];
        foreach ($data as $item) {
            $normalizedText = $item['text'];
            $encodedText = $this->encodeText($normalizedText);
            
            if (isset($textMapping[$encodedText])) {
                $originalText = $textMapping[$encodedText]['original'];
                
                $translations[0][$encodedText] = $item['trans'];
                $translations[1][$encodedText] = [$originalText, $item['trans']];
            }
        }
        return $translations;
    }

    /**
     * 保存翻译到数据库
     *
     * @param array $translations 翻译数组
     * @param string $to 目标语言代码
     */
    protected function saveTranslationsToDatabase($translations, $to)
    {   


        try {
            XR_M()->trans_start();
            foreach ($translations as $encodedText => $translation) {

                XR_M()->db->table('app_synlang_trans_'.$to)->insert([
                    'md5' => $encodedText,
                    'word' => $translation[0],
                    'trans' => $translation[1],
                    //'siteid' => SITE_ID,
                    //'code' => $to,
                    'inputtime' => SYS_TIME,
                ]);
            }
            XR_M()->trans_comment();
        } catch (\Exception $e) {
            XR_M()->trans_rollback();
            log_message('error', 'Failed to save translation: ' . $e->getMessage());
        }
    }

    /**
     * 更新缓存
     *
     * @param array $translations 新的翻译数组
     * @param string $to 目标语言代码
     */

    private function updateCache($translations, $to)
    {
        try {
            // 检查 $translations 是否为空或 NULL
            if (empty($translations) || !is_array($translations)) {
                log_message('warning', 'Empty or invalid translations provided for language: ' . $to);
                return false; // 或者根据您的需求返回适当的值
            }

            // 获取缓存的翻译
            $cachedTranslations = $this->getCachedTranslations(array_keys($translations), $to);
            
            // 合并新的翻译和缓存的翻译
            $updatedTranslations = array_merge($cachedTranslations, $translations);
            
            // 写入更新后的翻译到缓存文件
            $cacheService = \Phpcmf\Service::M('Cache', 'synlang');
            if (!$cacheService) {
                throw new \RuntimeException('Unable to load Cache service');
            }
            
            $result = $cacheService->writeLangFile($updatedTranslations, $this->filePath);
            
            if ($result === false) {
                throw new \RuntimeException('Failed to write language file');
            }
            
            // 成功日志
            //log_message('info', 'Successfully updated translation cache for language: ' . $to);
            
        } catch (\Exception $e) {
            // 错误日志
            log_message('error', 'Error updating translation cache: ' . $e->getMessage());
            return false;
        }
        
        return true;
    }


    /**
     * 编码文本
     *
     * @param string $text 原文本
     * @return string 编码后的文本
     */
    public function encodeText($text)
    {   
        if(is_array($text)){
            var_dump($text);
            exit;
        }
        $text = dr_code2html($text);
        return md5($this->normalizeText($text));
    }

    /**
     * 规范化文本
     *
     * @param string $text 原文本
     * @return string 规范化后的文本
     */
    public function normalizeText($text)
    {
        // 将所有换行符（包括 \r\n, \r, \n）替换为空格
        $text = str_replace(["\r\n", "\r", "\n"], " ", $text);
        // 移除所有控制字符（除了换行符和制表符）
        $text = preg_replace('/[^\P{C}\n\t]+/u', '', $text);
        // 将多个连续的空白字符（包括空格、制表符等）替换为单个空格
        $text = preg_replace('/[^\S\n]+/', ' ', $text);
        // 移除字符串开头和结尾的所有空白字符（包括全角空格、不间断空格等）
        $text = preg_replace('/^\s+|\s+$/u', '', $text);
        // 将 HTML 实体转换回原始字符
        return dr_html2code($text);
    }
}
