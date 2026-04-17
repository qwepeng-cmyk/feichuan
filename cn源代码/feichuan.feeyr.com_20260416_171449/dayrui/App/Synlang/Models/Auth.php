<?php namespace Phpcmf\Model\Synlang;

// 权限验证
class Auth extends \Phpcmf\Model
{
    
    // 判断底部链接的显示权限
    public function is_auth($c, $m) {
        //return 1;
        $uri = $c.'/'.$m;
        $role = $this->table('admin_role_index')->where('uid', $this->member['id'])->getRow();

        if($role['roleid']==1){
            return 1;
        }

        $r = $this->table('admin_role')->where('id', $role['roleid'])->getRow();
        
        if($r){
            $auth = dr_string2array($r['system'])['mark'];
            
            if(in_array('app-synlang',$auth)){
                return 1;
            }
        }
        return 0;
 
    }
    public function is_synlang($mid, $data) {

        $config = \Phpcmf\Service::M('app')->get_config('synlang');
        if (dr_is_app('sites') && dr_in_array($mid, $config['module'])) {
            return 0;
        }
        return 0;
    }

    public function is_link_auth($mid) {
        return 1;
    }

}