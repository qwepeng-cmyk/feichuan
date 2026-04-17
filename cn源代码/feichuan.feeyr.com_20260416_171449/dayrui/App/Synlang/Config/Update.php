<?php

/*
$zipfile = APPSPATH.'Synlang/Views/icon/synlang.zip';
*/
/*
\Phpcmf\Service::L('file')->copy_dir(
    APPPATH.'Code/', 
    APPPATH.'Code/', 
    WEBPATH.'static/assets/js/'
);
*/
//\Phpcmf\Service::L('File')->copy_file(APPSPATH.'Synlang/Code/', WEBPATH.'static/assets/js/');

\Phpcmf\Service::L('file')->unzip(APPSPATH.'Synlang/Views/icon/synlang.zip', WEBPATH.'static/assets/18html/');

/**
 * 更新数据结构
 **/
$prefix = \Phpcmf\Service::M()->prefix;
// 增加长度
$table = $prefix . 'app_synlang_trans';
if (\Phpcmf\Service::M()->db->tableExists($table)) {
    if (!\Phpcmf\Service::M()->db->fieldExists('md5', $table)) {
        \Phpcmf\Service::M()->query('ALTER TABLE `' . $table . '` ADD `md5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT \'原文md5\'');
    }
    // 更新表a中所有记录的md5字段
    $sql = "UPDATE $table SET md5 = MD5(word)";
    $rt = \Phpcmf\Service::M()->db->query($sql);

}


$tables = XR_M()->db->listTables();
foreach ($tables as $t) {
    if (preg_match('/^[^_]+_app_synlang_trans_.+$/i', $t)) {
        //$target[] = $t;
        $table = $t;
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
        }
    }
}








$table_client = \Phpcmf\Service::M()->dbprefix('app_synlang_client');
if (!\Phpcmf\Service::M()->db->tableExists($table_client)) {
    
    \Phpcmf\Service::M()->query_all("CREATE TABLE `{dbprefix}app_synlang_client` (
      `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
      `siteid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '站点id',
      `displayorder` int(10) DEFAULT '0' COMMENT '排序值',
      `name` varchar(100) NOT NULL COMMENT '名称',
      `lang` varchar(100) NOT NULL COMMENT '语种',
      `flag` varchar(100) NOT NULL COMMENT '国旗',
      `dirname` varchar(100) NOT NULL COMMENT '目录',
      `domain` varchar(100) NOT NULL COMMENT '域名',
      `hide` tinyint(1) unsigned NOT NULL COMMENT '隐藏',
      `content` text NOT NULL COMMENT '参数',
      PRIMARY KEY (`id`),
      KEY `dirname` (`dirname`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='终端表';"
    );

}



$config = \Phpcmf\Service::M('app')->get_config('synlang');

//备份
\Phpcmf\Service::M('app')->save_config('synlang_bak', $config);

if(!isset($config['open'])){
    $config['open'] = 1;
}

if(isset($config['appid']) && isset($config['appsecret'])){
    $config['baidu'] = [
        'appid'    =>  $config['appid'],
        'appsecret'=>  $config['appsecret'],
        'apiquery' =>  $config['apiquery'],
    ];
    unset($config['appid']);
    unset($config['appsecret']);
    unset($config['apiquery']);
}
if(isset($config['appcode'])){
    $config['googleai'] = [
        'appcode'    =>  $config['appcode']
    ];
    unset($config['appcode']);
}
\Phpcmf\Service::M('app')->save_config('synlang', $config);


