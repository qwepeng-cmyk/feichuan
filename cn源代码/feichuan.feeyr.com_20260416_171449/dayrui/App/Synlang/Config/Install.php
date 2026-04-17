<?php
if(!\Phpcmf\Service::M('app')->get_config('synlang')){

    $str = '{"showlang":{"德语":"de","俄语":"ru","法语":"fra","韩语":"kor","日语":"jp","英语":"en","中文(简体)":"zh"},"sitelang_tpl":"zh","sitename":"中文","sitelang":"zh","flag":"/static/assets/18html/synlang/zh.png","siteurl":"2","plat":"GoogleFreeApi","googleai":{"appcode":""},"googlefree":{"http":"","https":""},"tanshu":{"appkey":"","apitype":"google"},"baidu":{"appid":"","appsecret":"","apiquery":"1"},"site":null,"module":null,"field":null}';


	\Phpcmf\Service::M('app')->save_config('synlang', dr_string2array($str));
}

\Phpcmf\Service::L('file')->unzip(APPSPATH.'Synlang/Views/icon/synlang.zip', WEBPATH.'static/assets/18html/');

/*
\Phpcmf\Service::L('file')->copy_dir(
    APPSPATH.'Synlang/Views/icon/synlang/', 
    APPSPATH.'Synlang/Views/icon/synlang/', 
    WEBPATH.'static/assets/18html/synlang/'
);
*/