<?php

/**
 * 菜单配置
 */
$mylink = [];

$mylink[1] = [
    'name' => '语言分站',
    'icon' => 'fa fa-sitemap',
    'uri' => 'synlang/client/index',
];
$mylink[2] = [
    'name' => '翻译记录',
    'icon' => 'fa fa-language',
    'uri' => 'synlang/trans/index',
];
$mylink[3] = [
    'name' => '插件配置',
    'icon' => 'fa fa-cog',
    'uri' => 'synlang/home/app',
];
$mylink[4] = [
    'name' => '预翻译处理',
    'icon' => 'fa fa-language',
    'uri' => 'synlang/prepare/index',
];
$mylink[5] = [
    'name' => '使用说明',
    'icon' => 'fa fa-code',
    'uri' => 'synlang/home/faq',
];


return [

    'admin' => [



        'app-synlang' => [
            'name' => '翻译',
            'icon' => 'fa fa-language',
            'left' => [
                'app-synlang-my' => [
                    'name' => '翻译管理',
                    'icon' => 'fa fa-code',
                    'link' => $mylink
                ],
            ],
        ],

    ],
];










/*

return [

    'admin' => [

        'app' => [

            'left' => [

                // 分组菜单
                'app-synlang' => [
                    'name' => '多语言翻译',
                    'icon' => 'fa fa-code',
                    'link' => $link,
                ],




            ],



        ],





    ],



];
*/