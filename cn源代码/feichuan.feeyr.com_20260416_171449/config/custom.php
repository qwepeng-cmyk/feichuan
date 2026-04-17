<?php

/**
 * 开发者自定义函数文件
 */


//写一个获取栏目下第一个文章的函数
function get_url($catid) {
    $return = \Phpcmf\Service::V()->list_tag("action=module module=cases catid=$catid num=1 order=displayorder_desc,id_asc");
    //print_r($return['return'][0]);
    if ($return['return']) {
        $url = $return['return'][0]['url'];
        //print_r($return['return'][0]['url']);
        return $url;
    }else{
        return 'javascript:void(0);';
    }
}

