<?php

return [

    [
        'name' => '翻译', // 站点权限是插件的链接名称
        'icon' => 'fa fa-edit', // 图标
        'color' => 'blue', // 颜色class red green blue
        'uri' => 'synlang/home/edit', // 对应的uri权限判断，后面章节会介绍权限写法
        'field' => '', // 统计数量的字段，填写模块内容的主表字段，只能填写int数字类型的字段
        'check' => 'is_synlang',
        'url' => 'javascript:dr_iframe(\'同步翻译设置\',\''.dr_url('synlang/home/edit', ['mid' => '{mid}','id'=>'{id}']).'\',\'760px\',\'\');',
    ],
 ];