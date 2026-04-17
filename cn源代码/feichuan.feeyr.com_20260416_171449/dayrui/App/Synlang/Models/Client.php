<?php namespace Phpcmf\Model\Synlang;

// 模型类

class Client extends \Phpcmf\Model
{


    public function add_client($data) {

        if ($this->table('app_synlang_client')->where('siteid', SITE_ID)->where('dirname', $data['dirname'])->counts()) {
            return dr_return_data(0, dr_lang('目录已经存在'));
        }

        return $this->table('app_synlang_client')->insert([
            'siteid' => SITE_ID,
            'name' => $data['name'],
            'dirname' => $data['dirname'],
            'domain' => $data['domain'],
            'hide' => 0,
            'content' => ''
        ]);
    }
    public function edit_client($id, $data) {

        if ($this->table('app_synlang_client')->where('siteid', SITE_ID)
            ->where('id<>'. $id)
            ->where('dirname', $data['dirname'])->counts()) {
            return dr_return_data(0, dr_lang('目录已经存在'));
        }

        return $this->table('app_synlang_client')->update($id, [
            'name' => $data['name'],
            'dirname' => $data['dirname'],
            'domain' => $data['domain'],
            'content' => dr_array2string($data['content']),
            'displayorder' => $data['displayorder'],
            'lang' => $data['lang'],
            'flag' => $data['flag'],
        ]);
    }


    // 缓存
    public function cache($siteid = SITE_ID) {
        // 新字段
        $table = \Phpcmf\Service::M()->dbprefix('app_synlang_client');
        if (\Phpcmf\Service::M()->db->tableExists($table)) {
            // 创建字段
            if (!\Phpcmf\Service::M()->db->fieldExists('siteid', $table)) {
                \Phpcmf\Service::M()->query('ALTER TABLE `'.$table.'` ADD `siteid` int(10) DEFAULT 1');
            }
            if (!\Phpcmf\Service::M()->db->fieldExists('displayorder', $table)) {
                \Phpcmf\Service::M()->query('ALTER TABLE `'.$table.'` ADD `displayorder` int(10) DEFAULT \'0\' COMMENT \'排序值\'');
            }
            if (!\Phpcmf\Service::M()->db->fieldExists('lang', $table)) {
                \Phpcmf\Service::M()->query('ALTER TABLE `'.$table.'` ADD `lang` varchar(100) NOT NULL COMMENT \'语种\'');
            }
            if (!\Phpcmf\Service::M()->db->fieldExists('flag', $table)) {
                \Phpcmf\Service::M()->query('ALTER TABLE `'.$table.'` ADD `flag` varchar(100) NOT NULL COMMENT \'国旗\'');
            }

        } else {

\Phpcmf\Service::M()->query_all("CREATE TABLE IF NOT EXISTS `{dbprefix}app_synlang_client` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='终端表';");

            return;
        }

        // 导入已有的终端数据
        $names = \Phpcmf\Service::R(WRITEPATH.'config/app_client.php');
        if ($names) {
            $seos = \Phpcmf\Service::R(WRITEPATH.'config/app_client_seo.php');
            $data = $this->table('site')->get($siteid);
            if ($data) {
                $data['setting'] = dr_string2array($data['setting']);
                if (isset($data['setting']['client']) && $data['setting']['client']) {
                    foreach ($data['setting']['client'] as $r) {
                        $dir = $r['name'];
                        $domain = $r['domain'];
                        if (!$this->table('app_synlang_client')
                            ->where('siteid', $siteid)
                            ->where('dirname', $dir)
                            ->getRow()) {
                            // 入库
                            $this->table('app_synlang_client')->insert([
                                'siteid' => $siteid,
                                'name' => isset($names[$dir]) && $names[$dir] ? $names[$dir] : $dir,
                                'dirname' => $dir,
                                'domain' => $domain,
                                'hide' => 0,
                                'content' => dr_array2string([
                                    'seo' => isset($seos[$dir]) && $seos[$dir] ? $seos[$dir] : [],
                                ]),
                                'displayorder' => $seos[$dir]['SITE_PX'],
                                'lang' => $seos[$dir]['SITE_LANG'],
                                'flag' => $seos[$dir]['SITE_FLAG'],
                            ]);
                        }
                    }
                }
            }
        }

        $data = $this->table('app_synlang_client')->where('siteid', $siteid)->getAll();
        $save = $cname = $url = $seo = [];
        if ($data) {
            foreach ($data as $t) {
                $dir = dr_safe_replace($t['dirname']);
                if (!$t['domain']) {
                    $t['domain'] = $t['domain'].'/'.$dir;
                }
                $save[] = [
                    'name' => $dir,
                    'domain' => dr_safe_replace($t['domain']),
                ];
                $cname[$dir] = dr_safe_replace($t['name']);
                $content = dr_string2array($t['content']);
                $seo[$dir] = $content['seo'];

                $seo[$dir]['SITE_PX'] = $t['displayorder'];
                $seo[$dir]['SITE_LANG'] = $t['lang'];
                $seo[$dir]['SITE_FLAG'] = ($t['flag'] && is_numeric($t['flag'])) ? dr_get_file($t['flag']) : $t['flag'];


                $url[$dir] = dr_http_prefix($t['domain']).'/';
            }
        }
        \Phpcmf\Service::L('Config')->file(WRITEPATH.'config/app_client_seo_'.$siteid.'.php', '多终端的SEO信息', 32)->to_require($seo);
        \Phpcmf\Service::L('Config')->file(WRITEPATH.'config/app_client_url_'.$siteid.'.php', '多终端的url信息', 32)->to_require($url);
        \Phpcmf\Service::L('Config')->file(WRITEPATH.'config/app_client_name_'.$siteid.'.php', '多终端的配置文件', 32)->to_require($cname);
        \Phpcmf\Service::M('Site')->save_config(
            $siteid,
            'client',
            $save
        );
        unlink(WRITEPATH.'config/app_client.php');
        return;
    }

}