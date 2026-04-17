<?php namespace Phpcmf\Controllers\Admin;


class Home extends \Phpcmf\Common
{

    public function index() {
        $version = [];
        if (is_file(MYPATH.'Config/Version.php')) {
            $version = require MYPATH.'Config/Version.php';
        }
        \Phpcmf\Service::V()->assign('menu', \Phpcmf\Service::M('auth')->_admin_menu(
            [
                '插件介绍' => ['copy/home/index', 'fa fa-cog'],
            ]
        ));
        \Phpcmf\Service::V()->assign('is_old', isset($version['downtime']) ? 0 : 1);
        \Phpcmf\Service::V()->display('config.html');
    }


}
