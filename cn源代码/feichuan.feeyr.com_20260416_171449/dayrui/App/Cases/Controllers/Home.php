<?php namespace Phpcmf\Controllers;

/**
 * 二次开发时可以修改本文件，不影响升级覆盖
 */

class Home extends \Phpcmf\Home\Module
{

	public function index() {
		$this->_Index();
	}

	public function auth() { 
		$code = \Phpcmf\Service::L('input')->post('code'); // 会进行xss安全过滤
		$case_code = dr_site_value('case_code');
		if($code == $case_code){
			\Phpcmf\Service::L('input')->set_cookie('case_auth', md5(SYS_KEY.$case_code), 60*60*24*365);
			$this->_json(1, '授权成功');
		}
		$this->_json(0, '授权失败');
	}

}
