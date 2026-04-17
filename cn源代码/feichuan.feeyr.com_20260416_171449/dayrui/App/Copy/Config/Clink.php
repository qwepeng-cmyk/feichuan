<?php

return [

    [
        'name' => '复制', // 站点权限是插件的链接名称
        'icon' => 'fa fa-copy', // 图标
        'color' => 'green', // 颜色class red green blue
        'url' => 'javascript:dr_ajax_confirm_url(\''.dr_url('copy/api/content_edit', ['dir'=>'{mid}', 'id'=>'{cid}']).'\', \''.dr_lang('复制将把此内容生成一条新内容').'\');', // 后台的链接：对于点击的地址mid是模块目录，cid是内容id
        'uri' => '', // 对应的uri权限判断，后面章节会介绍权限写法
        'field' => '', // 统计数量的字段，填写模块内容的主表字段，只能填写int数字类型的字段
    ],

];