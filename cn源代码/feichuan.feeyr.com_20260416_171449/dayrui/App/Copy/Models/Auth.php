<?php namespace Phpcmf\Model\Copy;

// 权限验证
class Auth extends \Phpcmf\Model
{

    // 判断底部链接的显示权限
    public function is_bottom_auth($mid) {


        return 1;
    }

    // 判断右侧链接的显示权限
    public function is_link_auth($mid) {

        // $mid 是当前模块的目录名称
        // 这里的程序体，显示返回1，不显示返回0

        // 不存在
        if (!\Phpcmf\Service::C()->_is_admin_auth($mid.'/home/edit')) {
            return 0;
        }

        return 1;
    }

    // 判断底部链接的显示权限
    public function is_auth($c, $m) {
        return 1;
    }

}