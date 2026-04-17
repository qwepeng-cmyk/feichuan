<?php namespace Phpcmf\Controllers\Admin;

class Split extends \Phpcmf\App
{

    
    public function __construct()
    {
        parent::__construct();


        $menu['分表'] = [APP_DIR.'/split/index', 'fa fa-database'];
        \Phpcmf\Service::V()->assign([
            'menu' => \Phpcmf\Service::M('auth')->_admin_menu(
                $menu
            ),
        ]);



    }

    public function index() {

        \Phpcmf\Service::V()->display('split.html');
    }

    // 控制器方法
    public function split_table() {
        $step = (int)\Phpcmf\Service::L('input')->get('step');
        $code = \Phpcmf\Service::L('input')->get('code');
        
        // 获取所有语言代码
        $seofile = WRITEPATH.'config/app_client_seo.php';
        $array = \Phpcmf\Service::R($seofile)?\Phpcmf\Service::R($seofile):[];
        $languages = array_values(array_unique(array_column($array, 'SITE_LANG')));

        if ($code) {
            // 处理指定语言
            $rt = \Phpcmf\Service::M('SplitTable','Synlang')->get_split($code);
            
            // 找到当前语言的索引
            $current_index = array_search($code, $languages);
            $next_step = ($current_index !== false && $current_index < count($languages) - 1) ? $current_index + 1 : null;
            
            $response_data = [
                'code' => $code,
                'progress' => isset($rt['data']['progress']) ? $rt['data']['progress'] : null
            ];
            
            // 如果处理完成或没有数据，添加next参数
            if ($next_step !== null && ($rt['msg'] == $code.'没有需要迁移的数据' || strpos($rt['msg'], '已完成') !== false)) {
                $response_data['next'] = $next_step;
            }
            
            return $this->_json($rt['code'], $rt['msg'], $response_data);
        } else {
            // 按步骤处理语言
            if ($step >= count($languages)) {
                return $this->_json(2, '全部拆分完成');
            }
            
            $current_code = $languages[$step];
            return $this->_json(1, '正在处理语言：'.$current_code, [
                'code' => $current_code,
                'next' => $step + 1
            ]);
        }
    }

    // 检查进度的方法
    public function check_progress() {
        $code = \Phpcmf\Service::L('input')->get('code');
        if (!$code) {
            $this->_json(0, '参数错误');
        }

        $progress = \Phpcmf\Service::L('cache')->get_data('split_progress_'.$code);
        if (!$progress) {
            // 如果没有进度信息，尝试获取总记录数
            $db = \Phpcmf\Service::M()->db;
            $prefix = \Phpcmf\Service::M()->prefix;
            $source_table = $prefix.'app_synlang_trans';
            
            $total = $db->table($source_table)
                       ->where('code', $code)
                       ->where('word IS NOT NULL')
                       ->countAllResults();
            
            $progress = [
                'total' => $total,
                'processed' => 0,
                'percent' => 0
            ];
            
            if ($total == 0) {
                $progress['percent'] = 100;
            }
            
            \Phpcmf\Service::L('cache')->set_data('split_progress_'.$code, $progress, 3600);
        }

        $this->_json(1, '获取成功', $progress);
    }
}