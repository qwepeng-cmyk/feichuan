<?php
//增值服务，页面缓存
if(is_file(APPSPATH.'Synlang/Models/UrlCache.php') && defined('IS_CLIENT') && IS_CLIENT){
    \Phpcmf\Hooks::app_on('synlang', 'cms_run', function() {

        $config = \Phpcmf\Service::M('app')->get_config('synlang');
        $UrlCache = is_file(APPSPATH.'Synlang/Models/UrlCache.php');
        
        if($UrlCache && $config['cache_open']){

            $cache = \Phpcmf\Service::M('UrlCache', 'synlang');
            // 自定义设置
            $config['cache_time'] = (int)$config['cache_time'] ? $config['cache_time'] : 259200;
            $config['cache_hits'] = (int)$config['cache_hits'] ? $config['cache_hits'] : 100;
            $cache->setExpireTime($config['cache_time']);  // 3天过期
            $cache->setMaxHits($config['cache_hits']);        // 100次访问后过期
            // 获取缓存
            $content = $cache->getCache(IS_CLIENT);

            if($content){
                //生成静态页面
                if($config['html_open']){
                    $cache->createStaticPage($content, IS_CLIENT);
                }
                
                echo $content;
                exit;
            }

        }
    });
}
//增值服务，IP判断语言
if(is_file(APPSPATH.'Synlang/Models/IpLocator.php')){
    \Phpcmf\Hooks::app_on('appname', 'cms_init', function() {
        // 在网站初始化之后（不适用于静态页面）
        if (IS_ADMIN ) {
            return; // 后台跳过
        } elseif(IS_MEMBER) {
             return; // 用户中心跳过    
        } elseif (IS_API) {
             return; // api跳过
        } elseif(IS_API_HTTP) {
             return; // api跳过
        } elseif (in_array(\Phpcmf\Service::L('Router')->class, ['register', 'login', 'api', 'pay'])) {
            return; // 登录相关地址跳过
        }

        $IpLocator = is_file(APPSPATH.'Synlang/Models/IpLocator.php');
        if($IpLocator){
            //通过IP判断跳转到哪个子站
            $ip = \Phpcmf\Service::L('input')->ip_address();
            $jump = XR_M('IpLocator','Synlang')->jump($ip);


            if($jump['code'] && $jump['data']['url']){
                dr_redirect($jump['data']['url']);
            }
        }

        /*
        \Phpcmf\Service::L('input')->set_cookie('user_lang_choice', 0, 0);
        $ip = '85.214.195.118';
        $jump = XR_M('IpLocator','Synlang')->jump($ip);
        var_dump($jump);
        exit;
        */

    });
}

\Phpcmf\Hooks::app_on('synlang', 'module_show', function($data) {

    $config = \Phpcmf\Service::M('app')->get_config('synlang');
    $is_pc = false;
    if(isset($config['sitelang']) && isset($config['sitelang_tpl']) && $config['sitelang_tpl'] != $config['sitelang']){
        $is_pc = true;
    }

    if(IS_CLIENT || $is_pc){

        $cache_key = 'my_app_client_seo_' . SITE_ID;
        $array = \Phpcmf\Service::L('cache')->get_data($cache_key);

        if(!$array){
            $seofile = WRITEPATH.'config/app_client_seo_'.SITE_ID.'.php';
            $array = \Phpcmf\Service::R($seofile)?\Phpcmf\Service::R($seofile):[];
            \Phpcmf\Service::L('cache')->set_data($cache_key,$array);
        }

        if($array){

            $lang = $array[IS_CLIENT]['SITE_LANG'];

            if($is_pc){

                $lang = $config['sitelang'];

            }


            $title = dr_synlang($data['title'],$lang);

            $prefix = \Phpcmf\Service::M()->prefix;
            $table = $prefix . 'app_synlang_trans_'.$lang;


            if (\Phpcmf\Service::M()->db->tableExists($table)) {

                if (!\Phpcmf\Service::M()->db->fieldExists('field', $table)) {
                    \Phpcmf\Service::M()->query('ALTER TABLE `' . $table . '` ADD `field` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'字段名\'');
                }
                if (!\Phpcmf\Service::M()->db->fieldExists('mid', $table)) {
                    \Phpcmf\Service::M()->query('ALTER TABLE `' . $table . '` ADD `mid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'模块名称\'');
                }
                if (!\Phpcmf\Service::M()->db->fieldExists('cid', $table)) {
                    \Phpcmf\Service::M()->query('ALTER TABLE `' . $table . '` ADD `cid` int(10) unsigned DEFAULT NULL COMMENT \'文章id\'');
                }
        
                $sevenDaysAgo = strtotime('-7 days');   // 返回 Unix 时间戳

                $isrow = XR_M()
                    ->table('app_synlang_trans_'.$lang)
                    ->where('field', 'title')
                    ->where('cid',   $data['id'])
                    ->getRow();

                // 记录存在但已过期（超过 7 天）也视为“无”
                if ($isrow && $isrow['inputtime'] < $sevenDaysAgo) {
                    $isrow = false;
                }

                if(!$isrow){
                    $data = array(
                        'field' => 'title',
                        'mid' => MOD_DIR,
                        'cid' => $data['id'],
                        'inputtime' => SYS_TIME
                    );
                    \Phpcmf\Service::M()->db->table('app_synlang_trans_'.$lang)->where('trans', $title)->update($data);
                }
            }
        }
        //$languages = array_values(array_unique(array_column($array, 'SITE_LANG')));

    }
});


\Phpcmf\Hooks::app_on('synlang', 'cms_view', function() {
    if (ob_get_level() <= 1) {
        ob_start();
    }
});
/**
    * 模板加载之前 cms_view_display
    * 语言循环列表
    * 语言站点调用模板，默认强制 pc
**/
\Phpcmf\Hooks::app_on('synlang', 'cms_view_display', function($data, $file, $dir) {


    $config = \Phpcmf\Service::M('app')->get_config('synlang');

    if(!isset($config) || !$config['sitelang']){
        return;
    }

    $synloop = \Phpcmf\Service::M('Cache', 'synlang')->synloop();

    if(defined('IS_CLIENT') && IS_CLIENT){
        $syninfo = $synloop[IS_CLIENT];

        // 检查是否使用HTTPS
        $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443;
        // 获取协议
        $protocol = $isSecure ? 'https://' : 'http://';
        // 获取域名
        $domainName = $_SERVER['HTTP_HOST'];
        // 完整的URL
        $url = $protocol . $domainName;
        if(defined('FIX_WEB_DIR') && FIX_WEB_DIR){
            !defined('MY_SITE_URL') && define('MY_SITE_URL', $url.'/'.IS_CLIENT.'/'); 
        }else{
            !defined('MY_SITE_URL') && define('MY_SITE_URL', $url.'/'); 
        }


        $tpl_dir = (defined('IS_CLIENT_TPL') && IS_CLIENT_TPL) ? IS_CLIENT_TPL : IS_CLIENT;
        //主题风格目录
        $base_dir = $tpl_dir.'/'.SITE_TEMPLATE;
        
        $client_dir = $base_dir;
        $tpl_mod = 'pc';



        if(defined('IS_MOBILE') || (\Phpcmf\Service::IS_MOBILE_USER() && XR_C()->site_info[SITE_ID]['SITE_AUTO'])){
            //$client_dir = 'synlang/mobile/'.$base_dir;
            $tpl_mod = 'mobile';
        }



        //终端模板不存在
        if(!is_file(TPLPATH.$client_dir.'/home/index.html')) {

            \Phpcmf\Service::V()->init($tpl_mod);
            $dirname = XR_C()->module['dirname'];
            if($dirname){
                $mtp = dr_get_app_tpl($dirname).$tpl_mod.'/'.SITE_TEMPLATE.'/home/'.($dirname ? $dirname.'/' : '');
                if($mtp){
                    \Phpcmf\Service::V()->module($dirname);
                }
            }

        }





    }else{
        !defined('MY_SITE_URL') && define('MY_SITE_URL', SITE_URL); 
        $syninfo = $synloop['pc'];
    }

    !defined('SYN_TITLE') && define('SYN_TITLE', $syninfo['title']);
    !defined('SYN_NAME') && define('SYN_NAME', $syninfo['name']);
    !defined('SYN_GUOQI') && define('SYN_GUOQI', $syninfo['guoqi']);
    !defined('SYN_URL') && define('SYN_URL', $syninfo['url']);
    !defined('SYN_DIR') && define('SYN_DIR', $syninfo['dir']);
    !defined('SYN_LANG') && define('SYN_LANG', $syninfo['lang']);
    !defined('SYN_DOMAIN') && define('SYN_DOMAIN', $syninfo['domain']);


    XR_V()->set_value('synloop', $synloop);
    XR_V()->set_value('syninfo', $syninfo);



});


/*模板结束之后*/
\Phpcmf\Hooks::app_on('synlang', 'cms_view_end', function() {

        $config = \Phpcmf\Service::M('app')->get_config('synlang');

        if (IS_ADMIN ) {
            return; // 后台跳过
        }elseif (IS_API && $_GET['m']!='template') {
             return; // api跳过
        } elseif (IS_MEMBER && (isset($config['member']) && $config['member']==1)) { 
             return; // api跳过
        } elseif (in_array(\Phpcmf\Service::L('Router')->class, ['pay'])) {
            return; // 登录相关地址跳过
        }elseif(!\Phpcmf\Service::M('app')->get_config('synlang')){
            return;
        }


        $html = ob_get_clean();

        if(IS_CLIENT){

            //header('Content-Type: text/html; charset=utf-8');
            $client_file = WRITEPATH.'config/app_client_seo_'.SITE_ID.'.php';
            $client_data = \Phpcmf\Service::R($client_file);


            if($client_data[IS_CLIENT]['SITE_LANG'] && $client_data[IS_CLIENT]['SITE_LANG'] != $config['sitelang']){            
            
                $html = \Phpcmf\Service::M('HtmlTranslator', 'synlang')->Htmlextract(
                    $html, 
                    'auto', 
                    $client_data[IS_CLIENT]['SITE_LANG']
                );

            }

        }

        //主站SITEID=1指定语言显示
        if(!IS_CLIENT && SITE_ID == 1){

            if(isset($config['sitelang']) && isset($config['sitelang_tpl']) && $config['sitelang_tpl'] != $config['sitelang']){

                $html = \Phpcmf\Service::M('HtmlTranslator', 'synlang')->Htmlextract(
                    $html, 
                    'auto', 
                    $config['sitelang']
                );

            }else{
                $html = str_replace(['{notrans}','{/notrans}'],'',$html);
            }

        }else{
        //多网站非主站
            if(!isset($config['site'][SITE_ID]['istran']) || !$config['site'][SITE_ID]['istran'] || $config['site'][SITE_ID]['code'] == $config['site'][SITE_ID]['tpl']){

                $html = str_replace(['{notrans}','{/notrans}'],'',$html);

            }elseif(dr_is_app('sites')){

                $html = \Phpcmf\Service::M('HtmlTranslator', 'synlang')->Htmlextract(
                    $html, 
                    'auto', 
                    $config['site'][SITE_ID]['code']
                );
            }
            

        }


    ob_start();
    echo $html;
        
});



//重置缓存文件，清除翻译缓存
\Phpcmf\Hooks::app_on('synlang', 'update_cache', function() {
    \Phpcmf\Service::M('Cache', 'synlang')->cache();
});





//注意这里的语言标识是颠倒的
/*
  [0]=> {
    ["md5"]     =>  "27625e416e68df818898009e9e224070"
    ["text"]    =>  "没有引用jquery库"
    ["trans"]   => "Jqueryライブラリを参照していません"
  }
*/
function dr_synlang($html, $to='en', $from='auto'){

    if(!$to || empty($html)){
        return $html;
    }
    $trans = \Phpcmf\Service::M('SaveDbAndCache', 'synlang')->batchString($html, $from, $to);

    if(!$trans){
        return $html;
    }

    $arr = array_values($trans);

    if($arr[0]['trans'] && !is_array($arr[0]['trans'])){
        return ucfirst($arr[0]['trans']);
    }else{
        return $html;
    }
    
}


    // mytest是回调函数的名字
    // $value是传入的数据库值
    // $param是列表搜索的参数，可以忽略
    // $data是列表显示的全部值，可以忽略
    // $field是当前数据的字段属性数组，可以忽略

//后台列表，语言对照
function dr_synlang_func($value, $param = [], $data = [], $field = []) {
    // 下面给传入的值加粗操作
    //$config = \Phpcmf\Service::M('app')->get_config('synlang');
    $Blang = require APPPATH.'Models/Lang/Baidu.php';
    foreach ($Blang as $zm) {
        foreach ($zm as $k => $v) {
            if($v == $value){
                $html = $k." / ".$v;
            }
        }
    }
    return $html;
}


//目录模式，分页URL更正
function dr_synlang_pages($pages) {

    if(defined('IS_CLIENT') && IS_CLIENT){
        $pix = SITE_URL.IS_CLIENT.'/';
    }else{
        $pix = SITE_URL;
    }
    return dr_text_full($pages,$pix);



    /*
        if(defined('IS_CLIENT') && IS_CLIENT){
          $new_pages = str_replace('href="', 'href="/'.IS_CLIENT, $pages);
        }else{
          $new_pages = $pages;
        }
  
      return $new_pages;
      */
}



function dr_normalizeText($text) {
    // 移除所有空白字符
    $text = preg_replace('/\s+/', '', $text);
    
    // 转换为小写
    $text = strtolower($text);
    
    // 移除所有标点符号
    $text = preg_replace('/[^\p{L}\p{N}]/u', '', $text);
    
    // 确保使用UTF-8编码
    $text = mb_convert_encoding($text, 'UTF-8', 'UTF-8');
    
    return $text;
}


if (!function_exists('dr_client_url')) {
    function dr_client_url($name) {
        $data = \Phpcmf\Service::R(WRITEPATH.'config/app_client_url_'.SITE_ID.'.php');
        if ($name && $data && isset($data[$name]) && $data[$name]) {
            return $data[$name];
        }
        return SITE_URL;
    }
}
if (!function_exists('dr_client_domain_list_name')) {
    function dr_client_domain_list_name($value, $param = [], $data = [], $field = []) {


        $html = ' <a href="'.dr_http_prefix($data['domain']).'" target="_blank"> '.$value.' </a>';
        return $html;

    }
}
if (!function_exists('dr_select_lang_value')) {
    function dr_select_lang_value($value, $param = [], $data = [], $field = []) {
        $config = \Phpcmf\Service::M('app')->get_config(APP_DIR);
        $userDefinedArray = $config['showlang'];
        $baseArray = require APPPATH.'Models/Lang/Baidu.php';
        $showlang = [];
        foreach ($userDefinedArray as $kl => $vl) {
            foreach ($baseArray as $letter => $subArray) {
                if (array_key_exists($kl, $subArray)) {
                    if (!isset($showlang[$letter])) {
                        $showlang[$letter] = [];
                    }
                    $showlang[$letter][$kl] = $vl;
                    break;
                }
            }
        }
        $url = dr_url('synlang/client/save_value_edit',['name'=>'lang','id'=>$data['id']]);

        $html = '<select name="lang[]" id="dr_lang" class="form-control" onchange="dr_ajax_save(encodeURIComponent(this.value), \''.$url.'\',\''.$field['fieldname'].'\');">';
        $html .= '<option value="">--</option>';
        foreach($showlang as $zmk => $zm){
            $html .= '<optgroup label="'.$zmk.'">';
            foreach($zm as $k => $c){
                $html .= '<option value="'.$c.'"';
                if ($value==$c){
                    $html .= 'selected';
                }
                $html .= '>'.$k.'/'. $c.'</option>';
            }
            $html .= '</optgroup>';
        }
        $html .= '</select>';
        return $html;
    }
}

if (!function_exists('dr_client_model')) {
    function dr_client_model($value, $param = [], $data = [], $field = []) {


        $domain=1;
        if (strpos(dr_clearhtml($data['domain']), '/') !== false) {
            $domain=2;
        }

        $arr = [
            1 => '域名模式',
            2 => '目录模式',
        ];

        $ico = [1 => 'success', 2 => 'danger', 3 => 'info', 4 => 'warning'];

        $html.= '&nbsp;<span class="label label-'.($ico[$domain] ? $ico[$domain] : 'default').'">'.$arr[$domain].'</span>';
        return $html;


    }
}