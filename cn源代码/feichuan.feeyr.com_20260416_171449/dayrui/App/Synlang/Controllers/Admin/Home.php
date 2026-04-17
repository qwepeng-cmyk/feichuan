<?php namespace Phpcmf\Controllers\Admin;

class Home extends \Phpcmf\App
{

    private $config;
    private $is_cache;
    public $path;
    public $load_file;
    public $type;

    
    public function __construct()
    {
        parent::__construct();

        $this->is_cache = 0; //缓存开关
        $this->config = \Phpcmf\Service::M('app')->get_config(APP_DIR);


        $this->path = APPPATH.'Models/Storage/';
        $this->load_file = [];

        $local = dr_dir_map($this->path, 1);
        foreach ($local as $dir) {
            if (is_file($this->path.$dir.'/App.php')) {
                $cfg = require $this->path.$dir.'/App.php';
                if ($cfg['id']) {
                    $this->load_file[] = $this->path.$dir.'/Config.html';
                    $this->type[$cfg['id']] = $cfg;
                }
            }
        }

        $this->config['plat'] = isset($this->config['plat']) && $this->config['plat'] ? $this->config['plat'] : 'BaiduTransApi';

        $menu['API设置'] = [APP_DIR.'/home/app', 'fa fa-cog'];
        $menu['子站列表'] = [APP_DIR.'/client/index', 'fa fa-cogs'];
        $menu['使用说明'] = [APP_DIR.'/home/faq', 'fa fa-code'];
/*
        if (dr_is_app('sites')){
                $menu['多网站设置'] = [APP_DIR.'/home/site', 'fa fa-th'];
        }
*/
        $userDefinedArray = $this->config['showlang'];
        $baseArray = require APPPATH.'Models/Lang/Baidu.php';

        $showlang = [];

        foreach ($userDefinedArray as $key => $value) {
            foreach ($baseArray as $letter => $subArray) {
                if (array_key_exists($key, $subArray)) {
                    if (!isset($showlang[$letter])) {
                        $showlang[$letter] = [];
                    }
                    $showlang[$letter][$key] = $value;
                    break;
                }
            }
        }

        \Phpcmf\Service::V()->assign([
            'menu' => \Phpcmf\Service::M('auth')->_admin_menu(
                $menu
            ),
            'showlang' => $showlang,
            'selectlang' => $baseArray
        ]);

    }


    public function clearHtmlFiles($dir='') {
        $cache = \Phpcmf\Service::M('UrlCache', 'synlang')->clearAllStaticPages($dir);
        if($cache){
            $this->_json(1,'清除所有静态文件');
        }
    }




    public function faq() {
        \Phpcmf\Service::V()->display('faq.html');
    }


    public function app() {
        if (IS_POST) {

            $post = \Phpcmf\Service::L('input')->post('data');

            if(!isset($post['open'])){
                $post['open'] = 0;
            }

            if(!$post['sitelang_tpl']){
                $post['sitelang_tpl'] = $post['sitelang'] = 'zh';
            }

            if(!$post['sitelang']){
                $post['sitelang'] = $post['sitelang_tpl'];
            }

            if(!$post['sitename']){
                $post['sitename'] = '中文';
            }

            if ((!isset($post['flag']) || !$post['flag']) && is_file(WEBPATH.'/static/assets/18html/synlang/'.$post['sitelang'].'.png')) {
                $post['flag'] = SITE_URL.'static/assets/18html/synlang/'.$post['sitelang'].'.png';
            }

            $post['site'] = $this->config['site'];
            $post['module'] = $this->config['module'];
            $post['field'] = $this->config['field'];

            \Phpcmf\Service::M('app')->save_config(APP_DIR, $post);

            $this->_json(1, dr_lang('操作成功'));
        } 


        $page = intval(\Phpcmf\Service::L('input')->get('page'));
        
        \Phpcmf\Service::V()->assign([
            'iscache' => $this->is_cache,
            'page' => $page,
            'form' => dr_form_hidden(['page' => $page]),
            'data' => $this->config
        ]);

        \Phpcmf\Service::V()->display('app.html');
    }


    public function tpl() {

        \Phpcmf\Service::V()->display('tpl.html');
    }

    public function site() {



        $module = \Phpcmf\Service::L('cache')->get('module-'.SITE_ID.'-content');
        if (!$module) {
            $this->_admin_msg(0, dr_lang('未安装任何内容模块'));
        }

        if (IS_POST) {

            $post = \Phpcmf\Service::L('input')->post('data', true);


            $this->config['site'] = $post['site'];
            $this->config['module'] = $post['module'];
            $this->config['field'] = $post['field'];


            \Phpcmf\Service::M('app')->save_config(APP_DIR, $this->config);

            $this->_json(1, dr_lang('操作成功'));
        }

        $page = intval(\Phpcmf\Service::L('input')->get('page'));

        \Phpcmf\Service::V()->assign([
            'page' => $page,
            'data' => $this->config,
            'form' => dr_form_hidden(['page' => $page]),
            'site_info' => $this->site_info

        ]);
        \Phpcmf\Service::V()->display('site.html');
    }


    public function _get_row2($mid,$id) {

            $this->_module_init($mid, SITE_ID);
            $data = $this->content_model->get_data($id);
            return $data;

    }


    // 获取内容
    public function _get_row($mid,$id) {

        $cdata = $tables = $row = [];
        //$mytable = SITE_ID.'_'.$mid;
        // 主表
        $tables[] = $table = $mytable = SITE_ID.'_'.$mid;


        $row = XR_M()->table($table)->get($id);
        if (!$row) {
            // 主表不存在尝试判断分表
            $index = XR_M()->table($table.'_index')->get($id);
            if (!$index) {
                return [];
            }
            $row = XR_M()->table(dr_module_ctable($table, dr_cat_value($index['catid'])))->get($id);
            if (!$row) {
                return [];
            }
        }
        

        $cdata[$table] = $row;

        // 附表id
        $tableid = intval($row['tableid']);

        // 副表
        $tables[] = $table = $mytable.'_data_'.$tableid;
        $cdata[$table] = $data = XR_M()->table($table)->get($id);
        $data && $row = $row + $data;

        // 栏目模型数据
        if ((!XR_C()->is_hcategory && \Phpcmf\Service::C()->module['category_data_field']) or $is_more) {
            $tables[] = $table = $mytable.'_category_data';
            $cdata[$table] = $data = XR_M()->table($table)->get($id);
            if ($data) {
                $row = $row + $data;
            }
        }

        if ($is_table) {
            return [$row, $tables, $cdata];
        }

        return $row;
    }




    // 同步翻译
    public function edit() {
        
        $mid = dr_safe_filename($_GET['mid']);
        $row = \Phpcmf\Service::M('Module')->table('module')->where('dirname', $mid)->getRow();
        if (!$row) {
            $this->_json(0, dr_lang('此模块[%s]未安装', $mid));
        }


        $id = \Phpcmf\Service::L('input')->get('id');
        if (!$id) {
            $this->_json(0, dr_lang('内容不存在'));
        }

        $cats = [];

        if ($id) {
            $data = \Phpcmf\Service::M()->table_site($mid)->get($id);
            if ($data) {
                $cat = dr_cat_value($mid, $data['catid'], 'name');
                if ($cat) {
                    $cats[] = 'name = "'.$cat.'"';
                }
            }
        }
 

        $site = dr_string2array($row['site']);

        // 计算可用站点信息
        $list = [];
        foreach ($this->site_info as $siteid => $t) {
            $module = \Phpcmf\Service::L('cache')->get('module-'.$siteid.'-'.$mid);
            if (isset($site[$siteid]) && $module) {
                $my = [];
                $list[$siteid] = [
                    'name' => $t['SITE_NAME'],
                    'select' => \Phpcmf\Service::L('tree')->select_category(
                        \Phpcmf\Service::L('category', 'module')->get_category($module['mid'], $siteid),
                        $my,
                        'name="data['.$siteid.'][catid]" ',
                        '-不同步-',
                        1, 1
                    ),
                ];
            }
        }

        if (IS_POST) {

            //$key = SYS_TIME.$this->uid;
            //\Phpcmf\Service::L('cache')->set_auth_data($key, $list);
            //$this->_json(1, dr_lang('即将同步到其他站点'), ['url' => dr_url('synlang/home/add', ['mid'=>$mid, 'key'=>$key, 'ids'=>implode(',', $ids)])]);

            $ct = 0;
            $post = \Phpcmf\Service::L('input')->post('data');
            $form_lang = $this->config['site'][SITE_ID]['code'];
            $field_lang = $this->config['field'][$mid];
 

            //foreach ($ids as $id) {

                $data = $this->_get_row($mid,$id);
             
                //var_dump($data);
                //exit;


                foreach ($list as $siteid => $t) {

                    if ($post[$siteid]['catid']) {
                        // 初始化站点模块
                        //$this->_module_init($mid, $siteid);

                        $this->_module_init($mid);
                        $this->content_model = \Phpcmf\Service::M('Content', $mid);
                        $this->content_model->_init($mid, $siteid, $this->module['share']);



                        $to_lang = $post[$siteid]['code'];
                        if($post[$siteid]['field']){
                            $field_lang = $post[$siteid]['field'];
                        }


                        $fields = [];
                        // 主表字段
                        $fields[1] = $this->get_cache('table-'.$siteid, $this->content_model->dbprefix($siteid.'_'.$mid));
                        $cache = $this->get_cache('table-'.$siteid, $this->content_model->dbprefix($siteid.'_'.$mid.'_category_data'));
                        $cache && $fields[1] = array_merge($fields[1], $cache);

                        // 附表字段
                        $fields[0] = $this->get_cache('table-'.$siteid, $this->content_model->dbprefix($siteid.'_'.$mid.'_data_0'));
                        $cache = $this->get_cache('table-'.$siteid, $this->content_model->dbprefix($siteid.'_'.$mid.'_category_data_0'));
                        $cache && $fields[0] = array_merge($fields[0], $cache);

                        // 去重复
                        $fields[0] = array_unique($fields[0]);
                        $fields[1] = array_unique($fields[1]);


                        $field_type1 = [];
                        $field_type2 = [];
                        //模块字段获取
                        $field_type1 = $this->get_cache('module-'.$siteid.'-'.$mid,'field');
                        //栏目模型字段获取
                        $field_type2 = $this->get_cache('module-'.$siteid.'-'.$mid,'category_data_field');

                        $field_type = array_merge($field_type1, $field_type2);



                        $save = [];

                        // 主表附表归类
                        foreach ($fields as $ismain => $field) {
                            foreach ($field as $name) { 

                                isset($data[$name]) && $save[$ismain][$name] = $data[$name];

                                if(in_array($name,$field_lang)){

                                        $save[$ismain][$name] = \Phpcmf\Service::M('TransApi', 'synlang')->Ext($save[$ismain][$name],$form_lang,$to_lang,$field_type[$name]);
                                }
                            }
                        }



                        //var_dump($save[1]['title']);
                        //$save[1]['title'] = \Phpcmf\Service::M($this->config['plat'], 'synlang')->rehtml($save[1]['title'],$form_lang,$to_lang);
                        //$save[0]['content'] = \Phpcmf\Service::M($this->config['plat'], 'synlang')->rehtml($save[0]['content'],$form_lang,$to_lang);

                        //var_dump($save[1]['title']);
                        //exit;

                        $save[1]['uid'] = $save[0]['uid'] = $data['uid'];

                        $save[1]['url'] = '';
                        $save[1]['status'] = 9; //9表示正常发布，1表示审核里面
                        $save[1]['hits'] = 0;
                        $save[1]['displayorder'] = 0;
                        $save[1]['link_id'] = 0;
                        $save[1]['inputtime'] = $save[1]['updatetime'] = SYS_TIME;
                        $save[1]['inputip'] = '127.0.0.1';

                        $save[1]['catid'] = $save[0]['catid'] = $post[$siteid]['catid'];

                            
                            $rt = $this->content_model->save_content(0, $save);
                            if ($rt['code']) {
                                $ct++;
                            }
                        //}
                    }
                }
            //}
            $this->_json(1, dr_lang('本次同步%s条数据', $ct));
            exit;
        }


        \Phpcmf\Service::V()->assign([
            'ids' => $ids,
            'list' => $list,
            'form' => dr_form_hidden(),
            'data'  => $this->config,
            'mid'   => $mid
        ]);
        \Phpcmf\Service::V()->display('synlang.html');
        exit;
    }

    public function lang_index() {
        if (IS_POST) {

                $post = \Phpcmf\Service::L('input')->post('post');
                $data = \Phpcmf\Service::L('input')->post('data');

                $data = $data ? $data : [];



                if(!$post['lang']){
                    $this->_json(0, '【异常】：没有选择语言');
                }

                if(!$post['text']){
                    $this->_json(0, '【异常】：没有输入要翻译的文字');
                }

                if(!$data){
                    $data['plat'] = $this->config['plat'];
                }


                $tran = \Phpcmf\Service::M($data['plat'], 'synlang')->translate($post['text'], 'auto', $post['lang'], 1);

                if ($tran['code'] == 52000 || $tran['code'] == 1) {
                    $this->_json(1, 'ok', $tran['data'][0]['trans']);
                }
                $this->_json(0, '【异常】：'.dr_array2string($tran['msg']));
 
        } else {
            $this->_json(0, '请求异常');
        }
    }

}
