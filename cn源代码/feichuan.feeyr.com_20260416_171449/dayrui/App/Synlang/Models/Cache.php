<?php namespace Phpcmf\Model\Synlang;

class Cache extends \Phpcmf\Model
{
    private $config;
    
    public function __construct()
    {
        parent::__construct();
        $this->config = \Phpcmf\Service::M('app')->get_config('synlang');
    }

    public function synlang() {

    }

    
    public function synloop($synloop = []) {

        $synloop['pc'] = [

            'SITE_LANG' => $this->config['sitelang'],
            'SITE_TITLE' => SITE_NAME,
            'SITE_KEYWORDS' => '',
            'SITE_DESCRIPTION' => '',
            'SITE_PX' => 999999999999999,
            'SITE_FLAG' => isset($this->config['flag']) ? dr_get_file($this->config['flag']) : '',
            'SITE_NAME' => $this->config['sitename'],
            'SITE_DIR'=> 'pc',
            'SITE_URL' => SITE_URL,
            'SITE_DOMAIN'=> str_replace(['https://','http://','/'],'',SITE_URL),

            'lang' => $this->config['sitelang'],
            'title' => SITE_NAME,
            'keywords' => "",
            'description' => "",
            'px' => 999999999999999,
            'guoqi' => isset($this->config['flag']) ? dr_get_file($this->config['flag']) : '',
            'name' => $this->config['sitename'],
            'dir'=> 'pc',
            'url' => SITE_URL,
            'domain'=> str_replace(['https://','http://','/'],'',SITE_URL),
        ];


        //读取所有子站
        $site_key = \Phpcmf\Service::R(WRITEPATH.'config/app_client_name_'.SITE_ID.'.php');
        //读取子站SEO
        $site_seo = \Phpcmf\Service::R(WRITEPATH.'config/app_client_seo_'.SITE_ID.'.php');


        $map = [
            'SITE_TITLE' => 'title',
            'SITE_KEYWORDS' => 'keywords',
            'SITE_DESCRIPTION' => 'description',
            'SITE_LANG' => 'lang',
            'SITE_NAME' => 'name',
            'SITE_URL' => 'url',
            'SITE_FLAG' => 'guoqi',
            'SITE_PX' => 'px',
            'SITE_DIR' => 'dir',
            'SITE_DOMAIN' => 'domain',
        ];

        if($site_key){
            // $k en  $v 英文
            foreach ($site_key as $k => $v) {
                if($site_seo[$k]){

                    foreach($site_seo[$k] as $k2 => $v2){
                        if($map[$k2]){
                            $synloop[$k][$map[$k2]] = $synloop[$k][$k2] = $v2;
                        }
                    }
                }
                if(is_numeric($synloop[$k]['guoqi'])){
                    $synloop[$k]['SITE_FLAG'] = $synloop[$k]['guoqi'] = dr_get_file($synloop[$k]['guoqi']);
                }
                $synloop[$k]['SITE_NAME']   =   $synloop[$k]['name']   =   $v;
                $synloop[$k]['SITE_DIR']   =   $synloop[$k]['dir']    =   $k;
                $synloop[$k]['SITE_URL']   =   $synloop[$k]['url']    =   dr_http_prefix(\Phpcmf\Service::C()->get_cache('site', SITE_ID, 'client', $k)).'/';
                $synloop[$k]['SITE_DOMAIN']   =   $synloop[$k]['domain']      =   \Phpcmf\Service::C()->get_cache('site', SITE_ID, 'client', $k);
                if(!isset($synloop[$k]['px'])){
                    $synloop[$k]['SITE_PX']   =   $synloop[$k]['px'] =   0;
                }
            }
        }


        if(isset($synloop['pc']['px'])){
            // 提取 px 值到新数组
            $pxValues = array_column($synloop, 'px');

            // 使用array_multisort对数组进行排序
            array_multisort($pxValues, SORT_DESC, $synloop);
        }

        return $synloop;
    }

    //翻译入口
    public function cache($siteid = SITE_ID) {

        $menu = XR_M()->db->table('admin_menu')->where('mark', 'app-synlang-my')->get()->getRowArray();

        if ($menu) {
            \Phpcmf\Service::M('menu')->_add('admin', $menu['id'], [
                'name' => '预翻译处理',
                'icon' => 'fa fa-language',
                'uri' => 'synlang/prepare/index',
                'displayorder' => 0,
            ], '');
        }


        
        $this->deleteFiles(WRITEPATH.'synlang/');
    }

    public function deleteFiles($target) {
        if (is_dir($target)) {
            $iterator = new \RecursiveDirectoryIterator($target, \RecursiveDirectoryIterator::SKIP_DOTS);
            $files = new \RecursiveIteratorIterator($iterator, \RecursiveIteratorIterator::CHILD_FIRST);
            
            foreach ($files as $file) {
                if ($file->isDir()) {
                    @rmdir($file->getRealPath());
                } else {
                    @unlink($file->getRealPath());
                }
            }
            
            @rmdir($target);
        } elseif (is_file($target)) {
            @unlink($target);
        }
    }

/*
    public function deleteFiles($target) {
        if(is_dir($target)){
            $files = glob( $target . '*', GLOB_MARK ); // 获取目录下所有文件和文件夹的路径
            foreach( $files as $file ){
                if(is_dir($file)){
                    $this->deleteFiles( $file ); // 递归删除子文件夹中的文件
                } else {
                    @unlink( $file ); // 删除文件
                }
            }
            @rmdir( $target ); // 删除文件夹
        } elseif(is_file($target)) {
            @unlink($target); // 删除文件
        }
    }
*/


    public function getCache($string, $from='zh', $to='en') {

        $string = strtolower($string);

        // 尝试从已有的翻译结果中获取
        if ($this->lang && isset($this->lang[$string])) {
            return $this->lang[$string];
        }

        // 构建语言文件路径
        //$this->file = WRITEPATH . 'config/synlang_' . $to . '.php';

        $this->file = WRITEPATH  . 'synlang/' . $to . '/';

        // 如果语言文件存在，则加载语言数组
        if(is_dir($this->file)){

            $this->lang = $this->safeFile($this->file);

        }else{

            $this->lang = [];
            $this->createFile($this->lang, $this->file, $to);

        }

        $this->lang = array_change_key_case($this->lang, CASE_LOWER);
        
        // 尝试从新加载的翻译结果中获取
        if (isset($this->lang[$string])) {
            return $this->lang[$string];
        }

        return false;
    }

    //检查缓存文件是否安全
    public function safeFile1($filePath) {
        try {
            // 尝试包含文件
            $translations = @include $filePath;

            // 检查是否成功加载并且是一个数组
            if ($translations === false || !is_array($translations)) {
                throw new \Exception("Translation file is not valid.");
            }

            return $translations;
        } catch (\Throwable $e) {
            // 捕获所有错误和异常
            //error_log("Error in translation file: " . $e->getMessage());
            if (file_exists($filePath)) {
                @unlink($filePath);
                //error_log("Translation file deleted due to error: " . $filePath);
            }

            // 返回空数组
            return array();
        }
    }

    //检查缓存目录是否安全
    //public function safeDirectory($directory) {
    public function safeFile($directory) {

        //$directory = WRITEPATH  . 'synlang/jp/';
        $result = [];
        
        if (!is_dir($directory)) {
            //error_log("Invalid directory: " . $directory);
            return $result;
        }

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($directory, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::SELF_FIRST
        );

        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $filePath = $file->getPathname();
                try {
                    // 尝试包含文件
                    $translations = @include $filePath;

                    // 检查是否成功加载并且是一个数组
                    if ($translations === false || !is_array($translations)) {
                        throw new \Exception("Translation file is not valid: " . $filePath);
                    }

                    // 合并翻译数组
                    $result = array_merge($result, $translations);

                    // 清理内存
                    unset($translations);
                } catch (\Throwable $e) {
                    // 捕获所有错误和异常
                    //error_log("Error in translation file: " . $e->getMessage());
                    if (file_exists($filePath)) {
                        @unlink($filePath);
                        //error_log("Translation file deleted due to error: " . $filePath);
                    }
                }
            }
        }

        return $result;
    }


    /**
     * 写入语言文件
     *
     * @param array $langArray 语言数组
     */
    public function writeLangFile($langArray, $path)
    {
        if (!is_dir($path)) {
            if (!@mkdir($path, 0755, true)) {
                throw new \RuntimeException("Unable to create directory: $path");
            }
        }

        // 安全过滤和转义数组
        $langArray = $this->sanitizeArray($langArray);

        $chunks = array_chunk($langArray, 1500, true);
        $existingFiles = [];
        
        if (is_dir($path)) {
            $dir = new \DirectoryIterator($path);
            foreach ($dir as $fileinfo) {
                if (!$fileinfo->isDot() && $fileinfo->getExtension() == 'php') {
                    $existingFiles[] = $fileinfo->getFilename();
                }
            }
        }

        $currentFileCount = count($existingFiles);

        foreach ($chunks as $index => $chunk) {
            $chunkFile = $path . ($index + 1) . '.php';
            
            // 使用更安全的数组导出方法
            $content = "<?php\n// Auto-generated language cache\nreturn " . $this->safeVarExport($chunk) . ";";
            
            // 只在文件不存在或内容变化时写入
            if (!file_exists($chunkFile) || md5_file($chunkFile) !== md5($content)) {
                $tempFile = $chunkFile . '.tmp';
                
                // 先写入临时文件，成功后再重命名
                if (file_put_contents($tempFile, $content) === false) {
                    throw new \RuntimeException("Unable to write to temporary file: $tempFile");
                }
                
                if (!@rename($tempFile, $chunkFile)) {
                    @unlink($tempFile);
                    throw new \RuntimeException("Unable to rename temporary file to: $chunkFile");
                }
            }
        }

        // 删除多余的文件
        for ($i = count($chunks) + 1; $i <= $currentFileCount; $i++) {
            $oldFile = $path . $i . '.php';
            if (file_exists($oldFile)) {
                if (!@unlink($oldFile)) {
                    throw new \RuntimeException("Unable to delete file: $oldFile");
                }
            }
        }
    }

    // 安全过滤数组的辅助方法
    private function sanitizeArray($array)
    {
        foreach ($array as $key => &$value) {
            if (is_array($value)) {
                $value = $this->sanitizeArray($value);
            } elseif (is_string($value)) {
                // 移除可能导致语法错误的特殊字符
                $value = preg_replace('/[\x00-\x1F\x7F]/', '', $value);
            }
        }
        return $array;
    }

    // 更安全的数组导出方法
    private function safeVarExport($array, $indent = '')
    {
        if (!is_array($array)) {
            return var_export($array, true);
        }

        $output = "[\n";
        foreach ($array as $key => $value) {
            $output .= $indent . '    ' . var_export($key, true) . ' => ';
            
            if (is_array($value)) {
                $output .= $this->safeVarExport($value, $indent . '    ');
            } else {
                $output .= var_export($value, true);
            }
            
            $output .= ",\n";
        }
        $output .= $indent . ']';

        return $output;
    }



    public function createFile($array=[], $file='', $to='en', $code=1){

        if($code){
            ini_set('memory_limit', '1024M');
            
            $array = [];
            $all = XR_M()->table('app_synlang_trans')->where('code', $to)->getAll();
            if($all){

                foreach ($all as $value) {
                    $k = trim(stripslashes($value['word']));
                    $v = trim(stripslashes($value['trans']));
                    if(empty($v) || empty($k)){
                        continue;
                    }
                    $array[$k] = $v;
                }
            }
        }



        if($array){
            $this->lang = $array;
            /*
            uksort($array, function($a, $b) {
                return mb_strlen($b, 'UTF-8') - mb_strlen($a, 'UTF-8');
            });
            */
            //file_put_contents($file, '<?php return ' . var_export($array, true) . ';');

            $this->writeLangFile($array, $file);
        }


    }
    
}