<?php namespace Phpcmf\Controllers\Admin;

class Client extends \Phpcmf\Table
{
    private $config;
    private $type;
    private $default_site;

    public function __construct()
    {
        parent::__construct();


        $this->default_site = \Phpcmf\Service::R(WRITEPATH.'config/site.php')?\Phpcmf\Service::R(WRITEPATH.'config/site.php'):[];

        $this->config = \Phpcmf\Service::M('app')->get_config(APP_DIR);
        $this->config['plat'] = isset($this->config['plat']) && $this->config['plat'] ? $this->config['plat'] : 'BaiduTransApi';

        $this->type = $this->config['siteurl'];


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



        $list_field = [
            'displayorder' => [
                'use' => '1', // 1是显示，0是不显示
                'name' => '排序', //显示名称
                'width' => '80', // 显示宽度
                'func' => 'save_text_value', // 回调函数见：http://help.xunruicms.com/463.html
                'center' => '0', // 1是居中，0是默认
            ],
            'name' => [
                'use' => '1', // 1是显示，0是不显示
                'name' => '名称', //显示名称
                'width' => '200', // 显示宽度
                'func' => 'save_text_value', // 回调函数见：http://help.xunruicms.com/463.html
                'center' => '0', // 1是居中，0是默认
            ],
            'dirname' => [
                'use' => '1',
                'name' => '目录',
                'width' => '100',
                'func' => '',
                'center' => '0',
            ],
            'domain' => [
                'use' => '1',
                'name' => '域名',
                'width' => '',
                'func' => 'dr_client_domain_list_name',
                'center' => '0',
            ],
            'siteid' => [
                'use' => '1',
                'name' => '模式',
                'width' => '80',
                'func' => 'dr_client_model',
                'center' => '0',
            ],
            'flag' => [
                'use' => '1',
                'name' => '国旗',
                'width' => '60',
                'func' => 'img',
                'center' => '0',
            ],
            'lang' => [
                'use' => '1',
                'name' => '语种',
                'width' => '220',
                'func' => 'dr_select_lang_value',
                'center' => '0',
            ],
        ];

        $field = [
            'displayorder' => [
                'name' => '排序',
                'fieldtype' => 'Text',
                'fieldname' => 'displayorder',
            ],
            'name' => [
                'name' => '名称',
                'fieldtype' => 'Text',
                'fieldname' => 'name',
            ],
            'dirname' => [
                'name' => '目录',
                'fieldtype' => 'Text',
                'fieldname' => 'dirname',
            ],
            'domain' => [
                'name' => '域名',
                'fieldtype' => 'Text',
                'fieldname' => 'domain',
            ],
            'flag' => [
                'name' => '国旗',
                'fieldtype' => 'Text',
                'fieldname' => 'flag',
            ],
            'lang' => [
                'name' => '语种',
                'fieldtype' => 'Text',
                'fieldname' => 'lang',
            ],
        ];
        $this->my_clink = true;

        // 初始化数据表
        $this->_init([
            'table' => 'app_synlang_client',  // （不带前缀的）表名字
            'field' => $field, // 可查询的字段
            'list_field' => $list_field,
            'where_list' => 'siteid='.SITE_ID,
            'order_by' => 'displayorder desc,id desc', // 列表排序，默认的排序方式
            'date_field' => '', // 按时间段搜索字段，没有时间字段留空
            'search_first_field' => 'name',
        ]);


        $menu['API设置'] = [APP_DIR.'/home/app', 'fa fa-cog'];
        $menu['子站列表'] = [APP_DIR.'/client/index', 'fa fa-cogs'];
        //$menu['创建子站'] = ['add:'.APP_DIR.'/client/add', 'fa fa-plus'];
        $menu['使用说明'] = [APP_DIR.'/home/faq', 'fa fa-code'];



        \Phpcmf\Service::V()->assign([
            'showlang' => $showlang, //语种数据循环
            'form' => dr_form_hidden(),
            'menu' => \Phpcmf\Service::M('auth')->_admin_menu($menu),
            'field' => $field,
            'is_time_where' => 0,
            'is_iframe_post' => 1,
            'is_show_search_bar' => 1,
        ]);


        $this->mytable = [
            'foot_tpl' => '', // 底部按钮字符串
            'link_tpl' => '', // 右侧链接字符串
            'link_var' => 'html = html.replace(/\{id\}/g, row.id);', // 右侧链接的js变量替换，例如{id}表示id
        ];

        // 底部按钮
        // 加入多选框按钮
        $this->mytable['foot_tpl'].= '<label class="table_select_all"><input onclick="dr_table_select_all(this)" type="checkbox"><span></span></label>';
        // 加入删除按钮
        $this->mytable['foot_tpl'].= '<label><button type="button" onclick="dr_table_option(\''.dr_url(APP_DIR.'/client/del').'\', \''.dr_lang('你确定要删除它们吗？').'\')" class="btn red btn-sm"> <i class="fa fa-trash"></i> '.dr_lang('删除').'</button></label>';
        // 加入新的按钮
        $this->mytable['foot_tpl'].= '<label><a href="javascript:;" onclick="dr_client_cache()" class="btn green btn-sm"> <i class="fa fa-check-square-o"></i> '.dr_lang('生成站点目录').'</a></label>';
        $this->mytable['foot_tpl'].= '<label><a href="javascript:;" onclick="dr_client_cache()" class="btn blue btn-sm"> <i class="fa fa-check-square-o"></i> '.dr_lang('更新缓存').'</a></label>';


        $this->mytable['foot_tpl'].= '<label><a href="javascript:dr_iframe(\'创建子站\', \''.dr_url(APP_DIR.'/client/add').'\', \'\',\'\');" class="btn dark btn-sm tooltips" data-container="body" data-placement="bottom" data-original-title="创建子站" title=""><i class="fa fa-plus"></i> 创建子站</a></label>';



        $this->mytable['foot_tpl'].= '<label id="dr_client_cache"></label>';
    }

    protected function _Clink_tpl($uriprefix, $data) {

        $domain = $this->default_site[1]['SITE_DOMAIN'];
        $html = '';
        //$html.= '<label><a href="'.dr_url($uriprefix.'/edit').'&id='.$data['id'].'" class="btn btn-xs blue"> 修改 </a></label>';
        $html.= '<label><a href="javascript:dr_iframe(\'站点配置\', \''.dr_url($uriprefix.'/edit').'&id='.$data['id'].'\', \'55%\',\'80%\');" class="btn btn-xs blue"> 配置 </a></label>';
        //$html.= '<label><a href="'.dr_http_prefix($data['domain'] ? $data['domain'] : $domain.'/'.$data['dirname']).'" class="btn btn-xs red" target="_blank"> 访问 </a></label>';

        $html.= '<label>';
        $html.= '    <a href="'.dr_url('synlang/trans/index',['code'=>$data['lang']]).'" class="btn btn-xs green">'.dr_lang('译文').'</a>';
        $html.= '</label>';

        $html.= '<label>';
        $html.= '    <a href="javascript:dr_iframe_show(\'伪静态规则\', \''.dr_url('synlang/client/rewrite_code', ['id'=>$data['dirname']]).'\', \'700px\', \'600px\');" class="btn btn-xs dark">'.dr_lang('伪静态规则').'</a>';
        $html.= '</label>';
        $html.= '<label>';
        $html.= '    <a href="javascript:;" class="btn btn-xs red" onClick="dr_rewrite_test(this, \''.$data['domain'].'\', \''.dr_http_prefix($data['domain']).'\')">'.dr_lang('检测').'</a>';
        $html.= '</label>';
        return $html;
    }


    public function save_value_edit(){

        $id = intval(\Phpcmf\Service::L('input')->get('id'));
        $name = \Phpcmf\Service::L('input')->get('name');
        $value = \Phpcmf\Service::L('input')->get('value');
        $row = \Phpcmf\Service::M()->table($this->init['table'])->where('id', $id)->getRow();
        $save = [
            $name => $value,
        ];

        if($name=='lang'){
            if ((!isset($row['flag']) || !$row['flag']) && is_file(WEBPATH.'/static/assets/18html/synlang/'.$value.'.png') && $value) {
                $save['flag'] = SITE_URL.'static/assets/18html/synlang/'.$value.'.png';
            }
        }
        $rt = \Phpcmf\Service::M()->table($this->init['table'])->update($row['id'],$save);

        if($rt){
            $this->_json(1, dr_lang('操作成功'));
        }else{
            $this->_json(0, dr_lang('数据%s不存在', $row['id']));
        }
    }


    public function index() {

        \Phpcmf\Service::V()->assign([
            'mytable' => $this->mytable,
        ]);
        $this->_List();

        \Phpcmf\Service::V()->display('client_list.html');
    }
    // 后台添加内容
    public function add() {

        if (IS_AJAX_POST) {

            $post = \Phpcmf\Service::L('input')->post('data');
            if (!$post['dirname']) {
                $this->_json(0, dr_lang('终端目录必须填写'));
            } elseif (!preg_match('/^[a-z]+/i', $post['dirname'])) {
                $this->_json(0, dr_lang('终端目录必须是英文字母'));
            } elseif (in_array($post['dirname'], [SITE_MOBILE_DIR, 'pc', 'api'])) {
                $this->_json(0, dr_lang('不能使用系统内置目录：%s', $post['dirname']));
            } elseif (!$post['name']) {
                $this->_json(0, dr_lang('终端名称必须填写'));
            }
            if (\Phpcmf\Service::L('input')->post('rr')) {
                if (!$post['domain']) {
                    $this->_json(0, dr_lang('终端域名必须填写'));
                } elseif (strpos($post['domain'], '//') !== false) {
                    $this->_json(0, dr_lang('域名只能填写纯域名，不能加http://'));
                } elseif (!\Phpcmf\Service::L('Form')->check_domain_dir((string)$post['domain'])) {
                    $this->_json(0, dr_lang('域名（%s）格式不正确', $post['domain']));
                } elseif ($this->site_info[SITE_ID]['SITE_DOMAIN'] == $post['domain']) {
                    $this->_json(0, dr_lang('域名（%s）已经其他地方绑定过', $post['domain']));
                }
            } else {
                $siteinfo = \Phpcmf\Service::R(WRITEPATH.'config/site.php')?\Phpcmf\Service::R(WRITEPATH.'config/site.php'):[];
                $post['domain'] = $siteinfo[1]['SITE_DOMAIN'].'/'.$post['dirname'];
            }

            $rt = \Phpcmf\Service::M('client', 'synlang')->add_client($post);
            if (!$rt['code']) {
                $this->_json(0, $rt['msg']);
            }

            $this->_json(1, dr_lang('操作成功'));
        }

        \Phpcmf\Service::V()->assign([
            'form' =>  dr_form_hidden(),
        ]);
        \Phpcmf\Service::V()->display('client_add.html');
    }

    public function edit() {

        $id = (int)\Phpcmf\Service::L('input')->get('id');
        $data = \Phpcmf\Service::M()->table('app_synlang_client')->get($id);
        if (!$data) {
            $this->_json(0, dr_lang('数据#%s不存在', $id));
        }

        $data['content'] = dr_string2array($data['content']);

        if (IS_AJAX_POST) {

            $post = \Phpcmf\Service::L('input')->post('data');
            if (!$post['dirname']) {
                $this->_json(0, dr_lang('终端目录必须填写'));
            } elseif (!preg_match('/^[a-z]+/i', $post['dirname'])) {
                $this->_json(0, dr_lang('终端目录必须是英文字母'));
            } elseif (in_array($post['dirname'], [SITE_MOBILE_DIR, 'pc', 'api'])) {
                $this->_json(0, dr_lang('不能使用系统内置目录：%s', $post['dirname']));
            } elseif (!$post['name']) {
                $this->_json(0, dr_lang('终端名称必须填写'));
            }

            if (\Phpcmf\Service::L('input')->post('rr')) {
                if (!$post['domain']) {
                    $this->_json(0, dr_lang('终端域名必须填写'));
                } elseif (strpos($post['domain'], '//') !== false) {
                    $this->_json(0, dr_lang('域名只能填写纯域名，不能加http://'));
                } elseif (!\Phpcmf\Service::L('Form')->check_domain_dir((string)$post['domain'])) {
                    $this->_json(0, dr_lang('域名（%s）格式不正确', $post['domain']));
                } elseif ($this->site_info[SITE_ID]['SITE_DOMAIN'] == $post['domain']) {
                    $this->_json(0, dr_lang('域名（%s）已经其他地方绑定过', $post['domain']));
                }
            } else {
                $siteinfo = \Phpcmf\Service::R(WRITEPATH.'config/site.php')?\Phpcmf\Service::R(WRITEPATH.'config/site.php'):[];
                $post['domain'] = $siteinfo[1]['SITE_DOMAIN'].'/'.$post['dirname'];
            }


            if ((!isset($post['flag']) || !$post['flag']) && is_file(WEBPATH.'/static/assets/18html/synlang/'.$post['lang'].'.png') && $post['lang']) {
                $post['flag'] = SITE_URL.'static/assets/18html/synlang/'.$post['lang'].'.png';
            }


            $rt = \Phpcmf\Service::M('client', 'synlang')->edit_client($id, $post);
            if (!$rt['code']) {
                $this->_json(0, $rt['msg']);
            }

            $this->_json(1, dr_lang('操作成功'));
        }

        \Phpcmf\Service::V()->assign([
            'form' =>  dr_form_hidden(['page' => \Phpcmf\Service::L('input')->get('page')]),
            'data' => $data,
            'menu' => \Phpcmf\Service::M('auth')->_admin_menu(
                [
                    '网站终端' => [APP_DIR.'/client/index', 'fa fa-cogs'],
                    '创建终端' => ['add:'.APP_DIR.'/client/add', 'fa fa-plus'],
                    '修改' => ['hide:'.APP_DIR.'/client/edit', 'fa fa-edit'],
                ]
            ),
        ]);
        \Phpcmf\Service::V()->display('client_edit.html');
    }

    // 删除内容
    public function del() {
        // 初始化数据表

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

    public function update_file_index() {

        $page = intval($_GET['page']);
        if (!$page) {



            \Phpcmf\Service::M()->trans_start();
            try {
                $db = \Phpcmf\Service::M()->db;
                $prefix = \Phpcmf\Service::M()->prefix;
                $table = $prefix.'app_synlang_client';

                $list = $db->table($table)
                           ->select('id,flag,domain')
                           ->get()
                           ->getResultArray();
                $batch = [];   // 收集改好的记录
                foreach ($list as $row) {
                    $id     = $row['id'];
                    $flag   = trim($row['flag']);
                    $domain = trim($row['domain']);
                    // flag
                    if ($flag !== '' && strpos($flag, '://') !== false) {
                        $path = substr($flag, strpos($flag, '://') + 3);
                        $slashPos = strpos($path, '/');
                        $path = $slashPos !== false ? substr($path, $slashPos) : '/';
                        $row['flag'] = rtrim(SITE_URL, '/') . $path;
                    }
                    // domain
                    if (strpos($domain, '/') !== false) {
                        $path = substr($domain, strpos($domain, '/'));
                        $row['domain'] = rtrim(DOMAIN_NAME, '/') . $path;
                    }

                    $batch[] = $row;   // 收集
                }
                // 一次性写回
                if ($batch) {
                    \Phpcmf\Service::M()->table('app_synlang_client')->update_batch($batch, 'id');
                }

                \Phpcmf\Service::M()->trans_comment();
            } catch (\Exception $e) {
                \Phpcmf\Service::M()->trans_rollback(); 
            }




            $this->_json(1, dr_lang('正在准备更新'), 1);
        }

        $list = \Phpcmf\Service::M()->table('app_synlang_client')->where('siteid', SITE_ID)->limit(1, ($page-1))->getAll();
        if (!$list) {
            $this->_json(1, dr_lang('更新完成'), 0);
        }

        foreach ($list as $t) {
            $config = [
                'CLIENT' => $t['dirname'],
                'SITE_ID' => SITE_ID,
                'FIX_WEB_DIR' => (strpos($t['domain'], '/')!== false) ? $t['dirname'] : '',
            ];
            $path = \Phpcmf\Service::L('html')->get_webpath(SITE_ID, '', $t['dirname']);
            
            dr_mkdirs($path);
            if (!is_dir($path)) {
                return '目录['.$path.']不存在';
            }

            foreach (['index','api',] as $file) {
                $cfile = APPPATH . 'Code/' . $file.'.code';
                if (is_file($cfile)) {
                    $dst = $path.'/'.$file.'.php';
                    $size = file_put_contents($dst, str_replace([
                        '{CLIENT}',
                        '{SITE_ID}',
                        '{FIX_WEB_DIR}'
                    ], $config, file_get_contents($cfile)));
                    if (!$size) {
                        $this->_json(0, dr_lang('文件[%s]无法写入', $dst), 0);
                    }
                }
            }
        }










        \Phpcmf\Service::C()->_json(1, dr_lang('正在更新中（%s）', $page), $page + 1);
    }

















    // 调用代码
    public function rewrite_code() {

        $id = \Phpcmf\Service::L('Input')->get('id');
        $site = \Phpcmf\Service::M('Site')->config(SITE_ID);

        if ($site['client']) {
            foreach ($site['client'] as $t) {

                if ($t['name'] == $id) {
                    $rewrite_domain = $t['domain'];
                }
            }
        }


        if (strpos($rewrite_domain, '/') !== false) {
            list($a, $b) = explode('/', $rewrite_domain);
            $root = '/'.$b;
            $dir = '/'.$id;
        } else {
            $root = '';
            $dir = '/'.$id;
        }

        $server = strtolower($_SERVER['SERVER_SOFTWARE']);
        if (strpos($server, 'apache') !== FALSE) {
            $name = 'Apache';
            $note = '<font color=red><b>将以下内容保存为.htaccess文件，放到每个域名所绑定的根目录</b></font>';
            $code = '';

            // 主目录
            $code.= 'RewriteEngine On'.PHP_EOL.PHP_EOL;
            $code.= 'RewriteBase '.$root.'/'.PHP_EOL
                .'RewriteCond %{REQUEST_FILENAME} !-f'.PHP_EOL
                .'RewriteCond %{REQUEST_FILENAME} !-d'.PHP_EOL
                .'RewriteRule !.(js|ico|gif|jpe?g|bmp|png|css)$ '.$root.'/index.php [NC,L]'.PHP_EOL.PHP_EOL;
            $code.= '####以上目录需要单独保存到 '.$dir.'/.htaccess文件中';

        } elseif (strpos($server, 'nginx') !== FALSE) {
            $name = $server;

            // 主目录
            $code.= '###将以下代码放到Nginx配置文件中去'.PHP_EOL
                .'###放置在主站规则的前面'.PHP_EOL.PHP_EOL
                .'location '.$root.'/ { '.PHP_EOL
                .'    if (-f $request_filename) {'.PHP_EOL
                .'           break;'.PHP_EOL
                .'    }'.PHP_EOL
                .'    if ($request_filename ~* "\.(js|ico|gif|jpe?g|bmp|png|css)$") {'.PHP_EOL
                .'        break;'.PHP_EOL
                .'    }'.PHP_EOL
                .'    if (!-e $request_filename) {'.PHP_EOL
                .'        rewrite . '.$root.'/index.php last;'.PHP_EOL
                .'    }'.PHP_EOL
                .'}'.PHP_EOL;
        } else {
            $name = $server;
            $note = '<font color=red><b>无法为此服务器提供伪静态规则，建议让运营商帮你把下面的Apache规则做转换</b></font>';
            $code = 'RewriteEngine On'.PHP_EOL
                .'RewriteBase /'.PHP_EOL
                .'RewriteCond %{REQUEST_FILENAME} !-f'.PHP_EOL
                .'RewriteCond %{REQUEST_FILENAME} !-d'.PHP_EOL
                .'RewriteRule !.(js|ico|gif|jpe?g|bmp|png|css)$ /index.php [NC,L]';
        }


        \Phpcmf\Service::V()->assign([
            'name' => $name,
            'code' => $code,
            'note' => $note,
            'domain' => $domain,
        ]);
        \Phpcmf\Service::V()->display('rewrite_code.html');
        exit;
    }


    public function cache_index()
    {
        \Phpcmf\Service::M('client', 'synlang')->cache(SITE_ID);
        $this->_json(1, dr_lang('操作成功'));
    }




}
