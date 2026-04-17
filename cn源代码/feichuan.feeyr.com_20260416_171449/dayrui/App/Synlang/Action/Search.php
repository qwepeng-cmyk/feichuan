<?php
/**
 * 自定义模板解析标签
 * $param数组就是参数
 */
$config = \Phpcmf\Service::M('app')->get_config('synlang');
$is_pc = false;
if(isset($config['sitelang']) && isset($config['sitelang_tpl']) && $config['sitelang_tpl'] != $config['sitelang']){
    $is_pc = true;
}

$table = \Phpcmf\Service::M()->prefix.'app_synlang_trans_'.SYN_LANG;


if($is_pc || IS_CLIENT){
    if (\Phpcmf\Service::M()->db->tableExists($table) && $system['module']) {

        $db  = \Phpcmf\Service::M()->db;

        $module = $system['module'];
        $key = $_GET['keyword'];   // 处理 LIKE 中的特殊字符

        if (isset($key) && $key && strpos($key, 'CODE') === 0) {
            $kw = dr_authcode(substr($key, 4));
            if ($kw) {
                $key = $kw;
            }
        }

        $key = $db->escapeString($key); // 防止SQL注入

        $sql = "SELECT mid,cid FROM `{$table}` WHERE `trans` LIKE '%{$key}%' AND `field`= 'title' AND `mid`='{$module}' ORDER BY `inputtime` DESC LIMIT 0, 1000";
        $list  = $db->query($sql)->getResultArray();



        if($list &&  $list[0]['mid']) {
            $result = [
                'mid' => $list[0]['mid'],
                'cid' => implode(',', array_unique(array_column($list, 'cid')))
            ];

            // 确保站点ID有值
            $site_id = $system['site'] ? $system['site'] : SITE_ID;
            // 直接构建表名，格式为：dr_站点id_模块表名
            $table_name = \Phpcmf\Service::M()->dbprefix(dr_module_table_prefix($result['mid']));
            
            // 构建查询条件
            $where = "id in ({$result['cid']})";

            // 处理排序
            $order = '';
            if ($system['order']) {
                // 确保排序字段和方向之间有空格
                $order = str_replace(['_ASC', '_DESC'], [' ASC', ' DESC'], $system['order']);
                $order = "ORDER BY {$order}";
            }

            $total = 0;
            $pages = '';
            $pagesize = $system['pagesize'] ? $system['pagesize'] : 10;

            // 处理分页
            $limit = '';
            if ($system['page']) {
                // 使用直接SQL查询获取总数
                $count_sql = "SELECT COUNT(*) as total FROM `{$table_name}` WHERE {$where}";
                $count_result = $db->query($count_sql)->getRowArray();
                $total = $count_result['total'];
                
                if ($total) {
                    $page = $this->_get_page_id($system['page']);
                    $start = intval($pagesize * ($page - 1));
                    $limit = "LIMIT {$start}, {$pagesize}";
                    $pages = $this->_new_pagination($system, $pagesize, $total);
                }
            } elseif ($system['num']) {
                $limit = "LIMIT {$system['num']}";
            }

            // 查询数据
            $data_sql = "SELECT * FROM `{$table_name}` WHERE {$where} {$order} {$limit}";
            $data = $db->query($data_sql)->getResultArray();

            // 把每条记录的 url 换成你自己拼的格式
            array_walk($data, function (&$row) {
                $row['url'] = dr_url_prefix($row['url'], CLIENT_URL);
            });
        } else {
            $data = [];
            $total = 0;
            $pages = '';
            $pagesize = $system['pagesize'] ? $system['pagesize'] : 10;
        }
    }
    // 确保变量都有值
    $total = isset($total) ? $total : dr_count($data);
    $pagesize = isset($pagesize) ? $pagesize : 10;
    $pages = isset($pages) ? $pages : '';

 
    return $this->_return($system['return'], $data, $sql, $total, $pages, $pagesize);

}


if(!$is_pc && !IS_CLIENT){

    // 直接调用模块搜索功能，需要确保所有必要参数都被正确设置
    $system['app'] = 'module';
    $system['action'] = 'search';
    $dirname = $system['module']; // 设置模块名称

    unset($where['lang']);
    unset($where['keyword']);

    if (!dr_is_app($system['app'])) {
        return $this->_return($system['return'], '本插件('.$system['app'].')没有安装');
    }
    
    // 检查 Module/Search.php 所需的关键参数
    // 1. 设置 $dirname 变量（Module/Search.php 中直接使用）
    if (!$dirname) {
        return $this->_return($system['return'], 'module参数不能为空');
    }
    
    // 2. 设置 $param['id']（搜索配置ID）
    if (empty($param['id'])) {
        // 从搜索参数中获取或生成搜索配置ID
        $module = \Phpcmf\Service::L('cache')->get('module-'.$system['site'].'-'.$dirname);
        if ($module) {
            // 构建搜索索引表
            $table = \Phpcmf\Service::M()->dbprefix(dr_module_table_prefix($module['dirname'], $system['site']));
            $where_sql = ''; // 根据实际搜索条件构建
            $id = md5($table.$where_sql.($system['catid'] ?? 0));
            $param['id'] = $id;
        } else {
            $param['id'] = 'default'; // 默认值，或根据实际情况调整
        }
    }
    
    // 3. 设置 $system['total']（搜索结果总数）
    if (!isset($system['total']) || !$system['total']) {
        // 从搜索索引中获取总数
        $module = \Phpcmf\Service::L('cache')->get('module-'.$system['site'].'-'.$dirname);
        if ($module) {
            $table = \Phpcmf\Service::M()->dbprefix(dr_module_table_prefix($module['dirname'], $system['site']));
            $search_data = \Phpcmf\Service::M()->db->table($table.'_search')->where('id', $param['id'])->get()->getRowArray();
            if ($search_data) {
                $system['total'] = $search_data['contentid'];
            } else {
                // 直接查询总数
                $system['total'] = \Phpcmf\Service::M()->db->table($table)->countAllResults();
            }
        } else {
            $system['total'] = 100; // 默认值，或根据实际情况调整
        }
    }

    $myfile = dr_get_app_dir($system['app']).'Action/Search.php';
    if (is_file($myfile)) {
        $return_data = [];
        $rs = require $myfile;
        if (!$return_data && is_array($rs)) {
            return $rs;
        }
        return $return_data;
    } else {
        return $this->_return($system['return'], '本插件('.$system['app'].')没有('.$system['action'].')标签');
    }

}


