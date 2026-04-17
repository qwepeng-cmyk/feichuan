<?php namespace Phpcmf\Model\Synlang;

class SplitTable extends \Phpcmf\Model
{
    private $config;
    public function __construct()
    {
        parent::__construct();
        $this->config = \Phpcmf\Service::M('app')->get_config('Synlang');
    }

    // 创建表结构，不复制数据
    public function create_table($code='') {
        if (!$code) {
            return dr_return_data(0, '参数错误');
        }

        $db = \Phpcmf\Service::M()->db;
        $prefix = \Phpcmf\Service::M()->prefix;
        $table_name = $prefix.'app_synlang_trans_'.$code;

        if ($db->tableExists($table_name)) {
            return dr_return_data(1, '数据表 ['.$table_name.'] 已存在');
        }

        try {
            // 建表逻辑
            $sql = "CREATE TABLE IF NOT EXISTS `{$table_name}` (
                `id` int(10) NOT NULL AUTO_INCREMENT,
                `word` mediumtext COLLATE utf8mb4_unicode_ci COMMENT '原文',
                `trans` mediumtext COLLATE utf8mb4_unicode_ci COMMENT '翻译',
                `md5` varchar(255) COLLATE utf8mb4_unicode_ci COMMENT 'md5',
                `field` varchar(255) COLLATE utf8mb4_unicode_ci COMMENT '字段名',
                `mid` varchar(255) COLLATE utf8mb4_unicode_ci COMMENT '模块名称',
                `cid` varchar(255) COLLATE utf8mb4_unicode_ci COMMENT '文章id',
                `inputtime` bigint(10) DEFAULT '0' COMMENT '录入时间',
                PRIMARY KEY (`id`),
                KEY `idx_inputtime_md5` (`inputtime`, `md5`(32)),
                KEY `idx_mid_field_cid` (`mid`(50), `field`(50), `cid`(50)),
                KEY `md5` (`md5`(32))
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='翻译-{$code}'";

            // 执行建表
            if (!$db->query($sql)) {
                return dr_return_data(0, '创建表'.$table_name.'失败');
            }

            return dr_return_data(1, '创建表['.$table_name.']成功');
        } catch (\Exception $e) {
            return dr_return_data(0, '表['.$table_name.']创建失败:'.$e->getMessage());
        }
    }

    // 执行分表操作（复制数据）
    public function get_split($code='') {
        if (!$code) {
            return dr_return_data(0, '参数错误');
        }

        $db = \Phpcmf\Service::M()->db;
        $prefix = \Phpcmf\Service::M()->prefix;
        $table_name = $prefix.'app_synlang_trans_'.$code;

        // 检查表是否存在，不存在则创建
        if (!$db->tableExists($table_name)) {
            $rt = $this->create_table($code);
            if ($rt['code'] == 0) {
                return $rt;
            }
        }

        // 检查源表是否存在
        $source_table = $prefix.'app_synlang_trans';
        if (!$db->tableExists($source_table)) {
            return dr_return_data(0, '源数据表不存在');
        }

        try {
            // 获取总记录数
            $total = $db->table($source_table)
                       ->where('code', $code)
                       ->where('word IS NOT NULL')
                       ->countAllResults();

            if (!$total) {
                // 如果没有数据需要迁移，返回特殊状态
                $progress = [
                    'total' => 0,
                    'processed' => 0,
                    'percent' => 100
                ];
                \Phpcmf\Service::L('cache')->set_data('split_progress_'.$code, $progress, 3600);
                return dr_return_data(1, $code.'没有需要迁移的数据', ['progress' => $progress]);
            }

            // 获取已处理的记录数
            $processed = $db->table($table_name)->countAllResults();
            
            // 初始化或更新进度信息
            $progress = [
                'total' => $total,
                'processed' => $processed,
                'percent' => round(($processed / $total) * 100, 2)
            ];
            \Phpcmf\Service::L('cache')->set_data('split_progress_'.$code, $progress, 3600);

            // 如果已经处理完所有数据
            if ($processed >= $total) {
                return dr_return_data(1, '已完成表['.$table_name.']的拆分', ['progress' => $progress]);
            }

            // 分批处理，每次处理1条
            $batch_size = 1000;
            
            // 查询一批数据
            $records = $db->query(
                "SELECT word, trans, md5, inputtime 
                 FROM `{$source_table}` 
                 WHERE `code` = ? AND `word` IS NOT NULL 
                 LIMIT {$processed}, {$batch_size}",
                [$code]
            )->getResultArray();

            if (empty($records)) {
                // 如果没有新数据，说明已完成
                $progress['processed'] = $total;
                $progress['percent'] = 100;
                \Phpcmf\Service::L('cache')->set_data('split_progress_'.$code, $progress, 3600);
                return dr_return_data(1, '已完成表['.$table_name.']的拆分', ['progress' => $progress]);
            }

            // 构建批量插入SQL
            $values = [];
            $insert_data = [];
            foreach ($records as $row) {
                $values[] = '(?, ?, ?, ?)';
                $insert_data[] = $row['word'];
                $insert_data[] = $row['trans'];
                $insert_data[] = $row['md5'];
                $insert_data[] = $row['inputtime'];
            }

            $insert_sql = "INSERT IGNORE INTO `{$table_name}` (word, trans, md5, inputtime) VALUES " . implode(',', $values);
            
            if (!$db->query($insert_sql, $insert_data)) {
                return dr_return_data(0, '复制数据到'.$table_name.'失败');
            }

            // 更新进度信息
            $processed += count($records);
            $progress = [
                'total' => $total,
                'processed' => $processed,
                'percent' => round(($processed / $total) * 100, 2)
            ];
            \Phpcmf\Service::L('cache')->set_data('split_progress_'.$code, $progress, 3600);

            // 返回当前进度
            return dr_return_data(1, '正在处理表['.$table_name.']...', ['progress' => $progress]);
            
        } catch (\Exception $e) {
            // 清除进度缓存
            \Phpcmf\Service::L('cache')->clear('split_progress_'.$code);
            return dr_return_data(0, '表['.$table_name.']拆分失败:'.$e->getMessage());
        }
    }
}