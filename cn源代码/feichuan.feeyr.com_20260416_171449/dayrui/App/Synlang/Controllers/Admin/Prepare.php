<?php

namespace Phpcmf\Controllers\Admin;

/**
 * 预翻译控制器
 * 通过循环访问URL来触发页面翻译
 */
class Prepare extends \Phpcmf\App
{
    // 并发请求数量限制
    private $concurrent_limit = 1;
    
    // 单个请求超时时间（秒）
    private $timeout = 30;
    
    // 重试次数
    private $retry_count = 5;
    
    public function __construct()
    {
        parent::__construct();
        $menu['预翻译管理'] = [APP_DIR.'/prepare/index', 'fa fa-language'];
        //$menu['搜索索引'] = [APP_DIR.'/prepare/search', 'fa fa-search'];
        // 显示表单页面
        \Phpcmf\Service::V()->assign([
            'menu' => \Phpcmf\Service::M('auth')->_admin_menu($menu)
        ]);
    }
    public function search(){

        \Phpcmf\Service::V()->display('prepare_search.html');

    }
    public function index(){
        $urls = [];
        
        // 获取需要预翻译的URL列表
        if (IS_POST) {
            $post = \Phpcmf\Service::L('input')->post('data');
            
            // 检查是处理单个URL还是批量URL
            if (isset($post['single_url'])) {
                // 处理单个URL
                $url = trim($post['single_url']);
                if (empty($url)) {
                    $this->_json(0, '请输入需要预翻译的URL');
                }
                
                // 访问单个URL
                $result = $this->visitUrl($url);
                
                $this->_json(1, 'URL处理完成', [
                    'url' => $url,
                    'success' => $result['success'] ? 1 : 0,
                    'detail' => $result
                ]);
            } else {
                // 批量处理URL
                $urls = explode("\n", trim($post['urls']));
                $urls = array_filter(array_map('trim', $urls));
                
                if (empty($urls)) {
                    $this->_json(0, '请输入需要预翻译的URL');
                }
            
                // 循环访问每个URL            
                $results = $this->visitUrls($urls);
                
                $this->_json(1, '预翻译任务已完成', [
                    'total' => count($urls),
                    'success' => $results['success'],
                    'failed' => $results['failed'],
                    'details' => $results['details']
                ]);
            }
        }
        // 显示表单页面
        \Phpcmf\Service::V()->assign([
            'urls' => implode("\n", $urls)
        ]);
        \Phpcmf\Service::V()->display('prepare_index.html');
    }
    
    /**
     * 循环访问URL列表（优化版本）
     */
    private function visitUrls($urls)
    {
        $success = 0;
        $failed = 0;
        $details = [];
        
        // 分批处理URL，避免一次性处理过多URL导致内存溢出
        $batches = array_chunk($urls, $this->concurrent_limit);
        
        foreach ($batches as $batch) {
            // 并发访问一批URL
            $batch_results = $this->visitUrlBatch($batch);
            
            foreach ($batch_results as $result) {
                if ($result['success']) {
                    $success++;
                } else {
                    $failed++;
                }
                $details[] = $result;
            }
            
            // 批次之间添加短暂延迟，避免对服务器造成过大压力
            usleep(100000); // 0.1秒
        }
        
        return [
            'success' => $success,
            'failed' => $failed,
            'details' => $details
        ];
    }
    
    /**
     * 并发访问一批URL
     */
    private function visitUrlBatch($urls)
    {
        $results = [];
        $multi_curl = curl_multi_init();
        $curl_handles = [];
        
        // 初始化多个curl句柄
        foreach ($urls as $index => $url) {
            // 确保URL格式正确
            if (!preg_match('/^https?:\/\//', $url)) {
                $url = 'http://' . $url;
            }
            
            $curl_handles[$index] = curl_init();
            curl_setopt($curl_handles[$index], CURLOPT_URL, $url);
            curl_setopt($curl_handles[$index], CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl_handles[$index], CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($curl_handles[$index], CURLOPT_TIMEOUT, $this->timeout);
            curl_setopt($curl_handles[$index], CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            curl_setopt($curl_handles[$index], CURLOPT_HEADER, true); // 获取响应头信息
            
            curl_multi_add_handle($multi_curl, $curl_handles[$index]);
        }
        
        // 执行并发请求
        $running = null;
        do {
            curl_multi_exec($multi_curl, $running);
            curl_multi_select($multi_curl);
        } while ($running > 0);
        
        // 获取结果
        foreach ($curl_handles as $index => $curl_handle) {
            $response = curl_multi_getcontent($curl_handle);
            $httpCode = curl_getinfo($curl_handle, CURLINFO_HTTP_CODE);
            $header_size = curl_getinfo($curl_handle, CURLINFO_HEADER_SIZE);
            $error = curl_error($curl_handle);

            // 分离响应头和响应体
            $header = substr($response, 0, $header_size);
            $body = substr($response, $header_size);
            
            curl_multi_remove_handle($multi_curl, $curl_handle);
            curl_close($curl_handle);
            
            $results[] = [
                'url' => $urls[$index],
                'http_code' => $httpCode,
                'success' => ($httpCode >= 200 && $httpCode < 400),
                'error' => $error,
                'message' => $error ? $error : ($httpCode >= 200 && $httpCode < 400 ? '访问成功' : 'HTTP错误: ' . $httpCode),
                'response_time' => curl_getinfo($curl_handle, CURLINFO_TOTAL_TIME), // 响应时间
                'content_length' => strlen($body) // 内容长度
            ];
        }
        
        curl_multi_close($multi_curl);
        
        return $results;
    }
    
    /**
     * 访问单个URL（带重试机制的版本）
     */
    private function visitUrl($url)
    {
        // 确保URL格式正确
        if (!preg_match('/^https?:\/\//', $url)) {
            $url = 'http://' . $url;
        }
        
        $attempt = 0;
        do {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, $this->timeout);
            curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            curl_setopt($ch, CURLOPT_HEADER, true); // 获取响应头信息
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
            $error = curl_error($ch);
            
            // 分离响应头和响应体
            $header = substr($response, 0, $header_size);
            $body = substr($response, $header_size);
            
            curl_close($ch);
            
            // 检查是否需要重试
            $should_retry = false;
            if ($error || ($httpCode >= 500 && $httpCode < 600) || $httpCode == 0) {
                $should_retry = ($attempt < $this->retry_count);
            }
            
            if ($should_retry) {
                $attempt++;
                // 重试前等待一段时间
                sleep(1 * $attempt); // 指数退避
                continue;
            }
            
            return [
                'url' => $url,
                'http_code' => $httpCode,
                'success' => ($httpCode >= 200 && $httpCode < 400),
                'error' => $error,
                'message' => $error ? $error : ($httpCode >= 200 && $httpCode < 400 ? '访问成功' : 'HTTP错误: ' . $httpCode),
                'response_time' => curl_getinfo($ch, CURLINFO_TOTAL_TIME), // 响应时间
                'content_length' => strlen($body) // 内容长度
            ];
        } while ($should_retry);
    }
    


public function getDataList() {

    // 建议：将 batchSize 调整为更合理的值
    $batchSize = 1000;

    $lang = XR_L('input')->get('lang') ?? 'en';
    $lastId = (int)XR_L('input')->get('lastId');

    $rows = $this->getTitlesBatch($lang, $lastId, $batchSize);

    if (empty($rows)) {
        $this->_json(3, '所有数据处理完毕。');
    }

    $processedCount = 0;
    $currentLastId = $lastId;
    $allChunksData = [];

    // 这个循环是正确的，因为 $r 已经是我们想要的格式
    foreach ($rows as $r) {
        $id = (int)$r['i'];
        $chunk = floor($id / 10000);
        if (!isset($allChunksData[$chunk])) {
            $allChunksData[$chunk] = [];
        }
        $allChunksData[$chunk][] = $r;
        $currentLastId = $id;
        $processedCount++;
    }

    foreach ($allChunksData as $chunk => $chunkData) {
        $cacheName = sprintf('%s_%03d', $lang, $chunk);

        $existingData = \Phpcmf\Service::L('cache')->get_file($cacheName, 'synlang_search');
        $existingData = $existingData ? dr_string2array($existingData) : [];
        if (!is_array($existingData)) {
            $existingData = [];
        }

        // --- 核心修复：替换 array_merge 为去重逻辑 ---
        $uniqueData = [];
        foreach ($existingData as $item) {
            if (isset($item['i'])) $uniqueData[$item['i']] = $item;
        }
        foreach ($chunkData as $item) {
            if (isset($item['i'])) $uniqueData[$item['i']] = $item;
        }
        $mergedData = array_values($uniqueData);
        // --- 修复结束 ---

        $dir = WRITEPATH . 'synlang_search/';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        \Phpcmf\Service::L('cache')->set_file($cacheName, dr_array2string($mergedData), 'synlang_search');
    }

    $data = [
        'lastId' => $currentLastId,
        'processed_count' => $processedCount
    ];

    $message = "成功处理 {$processedCount} 条记录，当前 ID: {$currentLastId}";
    $this->_json(1, $message, $data);
}




    public function getTitlesBatch(string $lang, int $lastId, int $limit){


        $category = \Phpcmf\Service::L('category', 'module')->get_category('share');
        $module = \Phpcmf\Service::M('Module')->All(1);
        if($module){
            $list = [];
            $return = [];

            foreach($module as $m){
                $row = XR_M()->table_site($m['dirname'])->select('id,title')->where('id > '.$lastId)->getAll($limit);

                foreach($row as $r){
                    $list[] = [
                        'm'=>$m['dirname'],
                        'i'=>$r['id'],
                        't'=>dr_synlang($r['title'],$lang)
                    ];
                }
                $return = array_merge($return, $list);

            }
        }

        return $return;

    }
    /**
     * 获取指定站点的所有URL
     * @param string $siteDir 站点目录
     * @return array URL列表
     */
    public function getSiteUrls()
    {

        $data = XR_L('input')->post('data');
        $domain = $data['domain'] ? $data['domain'] : SITE_URL;
        $num = (int)$data['num'] ? (int)$data['num'] : 10;

        $category = \Phpcmf\Service::L('category', 'module')->get_category('share');
        $module = \Phpcmf\Service::M('Module')->All(1);



        

        $url = [];
        $url[] = $domain;
        if($category){
            foreach($category as $v){
                $url[] = dr_url_prefix($v['url'],$domain);
            }
        }
        if($module){
            foreach($module as $m){
                $list = XR_M()->table_site($m['dirname'])->getAll($num);
                foreach($list as $v){
                    $url[] = dr_url_prefix($v['url'],$domain);
                }
            }
        }


        $this->_json(1, '获取成功', ['urls' => $url]);


        /*
        // 如果指定了站点目录，返回该站点的URL列表
        if ($siteDir && isset($siteUrls[$siteDir])) {
            return $this->_json(1, '获取成功', [
                'urls' => $siteUrls[$siteDir]
            ]);
        }
        
        // 如果没有指定站点目录，返回所有站点的URL列表
        if (!$siteDir) {
            $allUrls = [];
            foreach ($siteUrls as $urls) {
                $allUrls = array_merge($allUrls, $urls);
            }
            return $this->_json(1, '获取成功', [
                'urls' => array_values(array_unique($allUrls))
            ]);
        }
        
        // 站点不存在
        return $this->_json(0, '站点不存在');

        */
    }
}