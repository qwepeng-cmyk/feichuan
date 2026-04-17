<?php namespace Phpcmf\Controllers\Admin;
/* *
 *
 * 本Demo的语法参考： http://help.xunruicms.com/445.html
 *
 * */
class Trans extends \Phpcmf\Table
{   
    private $config;
    private $code;

    public function __construct()
    {
        parent::__construct();



$field  = [
  "word" => [
    "id" => "49",
    "name" => "原文",
    "fieldname" => "word",
    "fieldtype" => "Textarea",
    "relatedid" => "0",
    "relatedname" => "table-app_synlang_trans",
    "isedit" => "1",
    "ismain" => "1",
    "issystem" => "0",
    "ismember" => "1",
    "issearch" => "0",
    "disabled" => "0",
    "setting" => [
      "option" => [
        "value" => "",
        "fieldtype" => "MEDIUMTEXT",
        "fieldlength" => "",
        "width" => "",
        "height" => "",
        "css" => ""
      ],
      "validate" => [
        "xss" => "1",
        "required" => "0",
        "pattern" => "",
        "errortips" => "",
        "check" => "",
        "filter" => "",
        "tips" => "",
        "formattr" => ""
      ],
      "is_right" => "0"
    ],
    "displayorder" => "0"
  ],
  "trans" => [
    "id" => "50",
    "name" => "翻译",
    "fieldname" => "trans",
    "fieldtype" => "Textarea",
    "relatedid" => "0",
    "relatedname" => "table-app_synlang_trans",
    "isedit" => "1",
    "ismain" => "1",
    "issystem" => "0",
    "ismember" => "1",
    "issearch" => "0",
    "disabled" => "0",
    "setting" => [
      "option" => [
        "value" => "",
        "fieldtype" => "MEDIUMTEXT",
        "fieldlength" => "",
        "width" => "",
        "height" => "",
        "css" => ""
      ],
      "validate" => [
        "xss" => "1",
        "required" => "0",
        "pattern" => "",
        "errortips" => "",
        "check" => "",
        "filter" => "",
        "tips" => "",
        "formattr" => ""
      ],
      "is_right" => "0"
    ],
    "displayorder" => "0"
  ],
/*
  "md5" => [
    "id" => "50",
    "name" => "md5",
    "fieldname" => "md5",
    "fieldtype" => "Textarea",
    "relatedid" => "0",
    "relatedname" => "table-app_synlang_trans",
    "isedit" => "1",
    "ismain" => "1",
    "issystem" => "0",
    "ismember" => "1",
    "issearch" => "0",
    "disabled" => "0",
    "setting" => [
      "option" => [
        "value" => "",
        "fieldtype" => "MEDIUMTEXT",
        "fieldlength" => "",
        "width" => "",
        "height" => "",
        "css" => ""
      ],
      "validate" => [
        "xss" => "1",
        "required" => "0",
        "pattern" => "",
        "errortips" => "",
        "check" => "",
        "filter" => "",
        "tips" => "",
        "formattr" => ""
      ],
      "is_right" => "0"
    ],
    "displayorder" => "0"
  ],
*/
];


$config  = [
  "is_show_search_bar" => "0",
  "order_by" => "id DESC",
  "search_time" => "",
  "search_first_field" => "word",
  //"date_field" => "inputtime",
  "list_field" => [


    "word" => [
      "use" => "1",
      "name" => "原文",
      "width" => "",
      "func" => "title"
    ],
    "trans" => [
      "use" => "1",
      "name" => "翻译",
      "width" => "",
      "func" => "title"
    ],
    /*
    "md5" => [
      "use" => "1",
      "name" => "md5",
      "width" => "300",
      "func" => ""
    ],
    */
    "inputtime" => [
      "use" => "1",
      "name" => "时间",
      "width" => "220",
      "func" => "datetime"
    ]
  ]
];




        $this->config = \Phpcmf\Service::M('app')->get_config(APP_DIR);
        // 表单显示名称
        $this->name = dr_lang('翻译记录');
        // 模板前缀(避免混淆)
        $this->tpl_prefix = 'trans_';

        // 采用ajax列表请求
        $this->is_ajax_list = false;

        // 用于列表显示的字段

        $list_field = isset($config['list_field']) ? $config['list_field'] : [];

        $this->code = \Phpcmf\Service::L('input')->get('code');

        \Phpcmf\Service::M('SplitTable', 'synlang')->get_split($this->code);

//var_dump($code);

        $this->is_diy_where_list = 1;

        $table = 'app_synlang_trans';

        if($this->code){
            $table = $table.'_'.$this->code;
        }
        
        // 初始化数据表
        $this->_init([
            'table' => $table,  // （不带前缀的）表名字
            'field' => $field, // 可查询的字段
            'list_field' => $list_field,
            //'is_diy_where_list' => 1,
            'order_by' => isset($config['order_by']) && $config['order_by'] ? $config['order_by'] : 'id desc', // 列表排序，默认的排序方式
            'date_field' => isset($config['date_field']) && $config['date_field'], // 按时间段搜索字段，没有时间字段留空
            'search_first_field' => isset($config['search_first_field']) ? $config['search_first_field'] : '',
        ]);


        $this->mytable = [
        'foot_tpl' => '', // 底部按钮字符串
        'link_tpl' => '', // 右侧链接字符串
        'link_var' => 'html = html.replace(/\{id\}/g, row.id);', // 右侧链接的js变量替换，例如{id}表示id
        ];

        // 侧链接，加一个a标签链接
        $this->mytable['link_tpl'].= '<label><a href="'.dr_url('synlang/trans/edit',['code'=>$this->code]).'&id={id}" class="btn btn-xs red"> <i class="fa fa-user"></i> 修改</a></label>';
        // 底部按钮

        // 加入多选框按钮
        $this->mytable['foot_tpl'].= '<label class="table_select_all"><input onclick=dr_table_select_all(this)" type="checkbox"><span></span></label>';
        // 加入删除按钮
        $this->mytable['foot_tpl'].= '<label><button type="button" onclick="dr_table_option(\''.dr_url('synlang/trans/del',['code'=>$this->code]).'\', \''.dr_lang('你确定要删除它们吗？').'\')" class="btn red btn-sm"> <i class="fa fa-trash"></i> '.dr_lang('删除').'</button></label>';


        $this->mytable['foot_tpl'].= '<label><button class="btn dark btn-sm" onclick="dr_synlang_clear();return false;" > <i class="fa fa-reorder"></i> '.dr_lang('记录去重').'</button></label>';

        $this->mytable['foot_tpl'].= '<label><button class="btn green btn-sm tooltips" onclick="dr_synlang_refresh();return false;" data-container="body" data-placement="top" data-original-title="重新缓存，不会删数据库翻译记录"> <i class="fa fa-refresh"></i> '.dr_lang('更新缓存').'</button></label>';

        $this->mytable['foot_tpl'].= '<label><a class="btn blue btn-sm " href="'.dr_url('synlang/trans/add',['code'=>$this->code]).'"><i class="fa fa-plus"></i> '.dr_lang('添加记录').'</a></label>';

        $this->mytable['foot_tpl'].= '<label><button class="btn red btn-sm" onclick="dr_batchsave();return false;" > <i class="fa fa-search"></i> '.dr_lang('字符替换').'</button></label>';

// 加入新的按钮

//$this->mytable['foot_tpl'].= '<label><button type="button" onclick=dr_table_option(\''.dr_url('member/verify/edit').'\', \''.dr_lang('你确定要通过审核吗？').'\')" class="btn blue btn-sm"> <i class="fa fa-check-square-o"></i> '.dr_lang('测试').'</button></label>';


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
            'mytable' => $this->mytable,
            'showlang' => $showlang,
            'code' => $this->code,
        ]);


        $menu['译文语种'] = [APP_DIR.'/trans/index', 'fa fa-list-ul'];

        $menu['全记录管理'] = ['add:'.APP_DIR.'/trans/clear_data', 'fa fa-list-ul', '50%'];

        if($this->code){
            $menu[dr_synlang_func($this->code)] = [APP_DIR.'/trans/index{code='.$this->code.'}', 'fa fa-edit'];
        }

        // 把公共变量传入模板
        \Phpcmf\Service::V()->assign([
            // 搜索字段
            'field' => $field,
            'is_time_where' => $this->init['date_field'],
            'is_show_search_bar' => isset($config['is_show_search_bar']) ? $config['is_show_search_bar'] : 0,
            // 后台的菜单
            'menu' => \Phpcmf\Service::M('auth')->_admin_menu($menu)
        ]);
    }

    public function batch_replace_value(){


        $str1 = XR_L('input')->post('string');
        $str2 = XR_L('input')->post('replace');

        if(!$str1 || !$str2){
            $this->_json(0, '数据不齐全，无法替换');
        }

        $prefix = \Phpcmf\Service::M()->prefix;
        $table = $prefix.'app_synlang_trans_'.$this->code;

        if (!\Phpcmf\Service::M()->db->tableExists($table)) {
            $this->_json(0, dr_lang('数据表不存在'));
        }
        $sql = "UPDATE ".$table." SET trans = REPLACE(trans, '".$str1."', '".$str2."')";

        \Phpcmf\Service::M()->trans_start();
        $rt = \Phpcmf\Service::M()->db->query($sql);
        \Phpcmf\Service::M()->trans_comment();


        if ($rt) {
            $this->_json(1, '操作成功，请更新缓存');
        }else{
            \Phpcmf\Service::M()->trans_rollback();
            $this->_json(0, '操作失败，数据已回滚');
        }
    }

    public function keywords(){


        $dir = APPPATH. 'Views/keywords';

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        $key_txt = '';
        $key_num = 0;
        $key_path = $dir.'/key.txt';

        if (is_file($key_path)){
            $key_txt = file_get_contents($key_path);
            $key_num = dr_count(explode(PHP_EOL, $key_txt));
        }


        $key_content = array(
            $key_txt, 
            $key_num, 
            $key_path
        );



         if (IS_POST) {

            $keyword = \Phpcmf\Service::L('input')->post('keyword');

            @file_put_contents($key_content[2], $keyword);

            $this->_json(1, '操作成功');
        }


        \Phpcmf\Service::V()->assign([
            'key' => $key_content[0]

        ]);
        \Phpcmf\Service::V()->display('keywords.html');

    }



    public function refresh($dirname = '')
    {
        $basePath = WRITEPATH . 'synlang/';

        if (!empty($dirname)) {
            // 当 $dirname 存在时，删除指定目录下的文件
            $path = $basePath . $dirname . '/';
            if (!is_dir($path)) {
                $this->_json(0, dr_lang('指定的目录不存在'));
                return;
            }

            $deletedCount = $this->deleteFilesInDirectory($path);
            $this->_json(1, dr_lang('更新完成，共删除 ' . $deletedCount . ' 个文件'));
        } else {
            // 当 $dirname 为空时，删除 synlang 下的所有目录和文件
            if (is_dir($basePath)) {
                $this->deleteDirectory($basePath);

                // 重新创建 synlang 目录
                if (!mkdir($basePath, 0755, true)) {
                    $this->_json(0, dr_lang('无法重新创建 synlang 目录'));
                    return;
                }
            }


            $this->_json(1, dr_lang('更新完成，已清空'));
        }
    }

    private function deleteFilesInDirectory($path)
    {
        $deletedCount = 0;
        $iterator = new \DirectoryIterator($path);
        foreach ($iterator as $fileinfo) {
            if (!$fileinfo->isDot() && $fileinfo->isFile()) {
                if (@unlink($fileinfo->getPathname())) {
                    $deletedCount++;
                }
            }
        }
        return $deletedCount;
    }

    private function deleteDirectory($path)
    {
        if (!is_dir($path)) {
            return;
        }

        $iterator = new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new \RecursiveIteratorIterator($iterator, \RecursiveIteratorIterator::CHILD_FIRST);

        foreach ($files as $file) {
            if ($file->isDir()) {
                @rmdir($file->getRealPath());
            } else {
                @unlink($file->getRealPath());
            }
        }

        @rmdir($path);
    }




    //删除重复数据
    public function clear(){
        $prefix = \Phpcmf\Service::M()->prefix;

        $code = \Phpcmf\Service::L('input')->get('code');
        if(!$code){
            $this->_json(0, dr_lang('参数错误'));
        }

        $table = $prefix.'app_synlang_trans_'.$code;

        if (!\Phpcmf\Service::M()->db->tableExists($table)) {
            $this->_json(0, dr_lang('数据表不存在'));
        }


        $sql = 'DELETE t1 FROM '.$table.' t1 JOIN '.$table.' t2 ON t1.id < t2.id AND t1.md5 = t2.md5';
        $rt = \Phpcmf\Service::M()->db->query($sql);
        if ($rt) {
            $this->_json(1, dr_lang('更新完成'));
        }
    }

    //删除数据
    public function clear_data() {
        if (IS_POST) {
            $post = \Phpcmf\Service::L('input')->post('data');
            
            if (!$post || !$post['key']) {
                $this->_json(0, dr_lang('请勾选需要清空的语言'));
            }

            $prefix = \Phpcmf\Service::M()->prefix.'app_synlang_trans_';
            
            foreach ($post['key'] as $lang_code) {
                $table = $prefix . $lang_code;
                if (\Phpcmf\Service::M()->db->tableExists($table)) {
                    $sql = "TRUNCATE TABLE " . $table;
                    \Phpcmf\Service::M()->query($sql);
                }
            }

            $this->_json(1, dr_lang('操作成功'));
        }


        \Phpcmf\Service::V()->display('trans_clear_data.html');
        exit;
    }


    // 配置属性
    public function config() {
        $data = \Phpcmf\Service::L('cache')->get_file('table-config-app_synlang_trans', 'table');
        if (IS_POST) {
            $post = \Phpcmf\Service::L('input')->post('data');
            \Phpcmf\Service::L('cache')->set_file('table-config-app_synlang_trans', $post, 'table');
            $this->_json(1, dr_lang('操作成功'));
        }
        \Phpcmf\Service::V()->assign('data', $data);
        \Phpcmf\Service::V()->display($this->_tpl_filename('config'));
    }

    // 查看列表
    public function index() {

        $seofile = WRITEPATH.'config/app_client_seo_'.SITE_ID.'.php';
        $array = \Phpcmf\Service::R($seofile)?\Phpcmf\Service::R($seofile):[];
        $languages = array_values(array_unique(array_column($array, 'SITE_LANG')));


        if($this->config['sitelang'] != $this->config['sitelang_tpl']){
            $languages[] = $this->config['sitelang'];
        }

        $keyword = XR_L('input')->get('keyword');
        $field = XR_L('input')->get('field');
        $search_mod = XR_L('input')->get('search_mod');

        if($keyword && $search_mod){
            $this->init['field'][$field]['iswhere'] = 1;
        }
        

        list($tpl) = $this->_List();

        \Phpcmf\Service::V()->assign([
            'code' => $this->code,
            'languages' => $languages,
            'Langcomm' => $this->Langcomm,
            'Blang' => $this->Blang
        ]);

        \Phpcmf\Service::V()->display($tpl);
    }

    // 添加内容
    public function add() {
        list($tpl) = $this->_Post(0);

        \Phpcmf\Service::V()->display($tpl);
    }

    // 修改内容
    public function edit() {
        list($tpl) = $this->_Post(intval(\Phpcmf\Service::L('input')->get('id')));

        
        \Phpcmf\Service::V()->display($tpl);
    }

    // 删除内容
    public function del() {
        $this->_Del(
            \Phpcmf\Service::L('Input')->get_post_ids(),
            function($rows) {
                // 删除前的验证
                return dr_return_data(1, 'ok', $rows);
            },
            function($rows) {
                // 删除后的处理
                return dr_return_data(1, 'ok');
            },
            \Phpcmf\Service::M()->dbprefix($this->init['table'])
        );
    }

    /**
     * 获取内容
     * $id      内容id,新增为0
     * */
    protected function _Data($id = 0) {
        $row = parent::_Data($id);
        // 这里可以对内容进行格式化显示操处理
        return $row;
    }

    // 格式化保存数据
    protected function _Format_Data($id, $data, $old) {
        
        if (!$id) {
            // 当提交新数据时，把当前时间插入进去
            //$data[1]['inputtime'] = SYS_TIME;
        }
        return $data;
    }


    // 保存内容
    protected function _Save($id = 0, $data = [], $old = [], $func = null, $func2 = null) {
        return parent::_Save($id, $data, $old, function($id, $data, $old){

            // 验证数据
            /*
            if (!$data[1]['title']) {
                return dr_return_data(0, '标题不能为空！', ['field' => 'title']);
            }*/
            $md5 = \Phpcmf\Service::M('SaveDbAndCache', 'synlang')->encodeText($data[1]['word']);
            // 保存之前执行的函数，并返回新的数据
            if (!$id) {
                // 当提交新数据时，把当前时间插入进去
                $data[1]['md5'] = $md5;

            }elseif($old[1]['word'] != $data[1]['word']){

                $data[1]['md5'] = $md5;

            }

            $data[1]['inputtime'] = SYS_TIME;

            return dr_return_data(1, null, $data);
        }, function ($id, $data, $old) {
            // 保存之后执行的动作
        });
    }

}
