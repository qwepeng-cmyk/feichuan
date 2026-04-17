<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">
    <?php if ($fn_include = $this->_include("meta.html")) include($fn_include); ?>
</head>

<body>
    <?php if ($fn_include = $this->_include("header.html")) include($fn_include); ?>

    <div class="inside_banner pic_m">
        <div class="img">
            <?php if (isset($banner) && is_array($banner) && $banner) { $key_v=-1;$count_v=dr_count($banner);foreach ($banner as $v) { $key_v++; $is_first=$key_v==0 ? 1 : 0;$is_last=$count_v==$key_v+1 ? 1 : 0;?>
            <img class="hidden-sm" src="<?php echo dr_get_file($v[1]); ?>" alt="">
            <img class="visible-sm" src="<?php echo dr_get_file($v[2]); ?>" alt="">
            <?php } } ?>
        </div>
        <div class="info commonweb">
            <div class="stitle wow fadeInDown"><?php echo $cat['name']; ?></div>
            <div class="btitle wow fadeInUp"><?php echo $title; ?></div>
        </div>
    </div>
    <div class="inside_subnav commonweb">
        <div class="box flex">
            <?php $list_return = $this->list_tag("action=module module=cases catid=$catid order=displayorder_desc num=4"); if ($list_return && is_array($list_return)) extract($list_return, EXTR_OVERWRITE); $count=dr_count($return); if (is_array($return) && $return) { $key=-1; foreach ($return as $t) { $key++; $is_first=$key==0 ? 1 : 0;$is_last=$count==$key+1 ? 1 : 0; ?>
            <a href="<?php echo $t['url']; ?>" <?php if ($t['id'] == $id) { ?>class="cur"<?php } ?>><?php echo $t['title']; ?></a>
            <?php } } ?>
        </div>
    </div>
    <?php if ($content_1) { ?>
    <div class="solution_A flex commonweb">
        <?php if (isset($content_1) && is_array($content_1) && $content_1) { $key_v=-1;$count_v=dr_count($content_1);foreach ($content_1 as $v) { $key_v++; $is_first=$key_v==0 ? 1 : 0;$is_last=$count_v==$key_v+1 ? 1 : 0;?>
        <div class="left">
            <div class="index_title">
                <div class="btitle comtitle"><?php echo $v[1]; ?></div>
            </div>
            <div class="desc f18 wow fadeInUp">
                <?php echo $v[2]; ?>
            </div>
        </div>
        <div class="right">
            <div class="img"><img src="<?php echo dr_get_file($v[3]); ?>" alt="" loading="lazy" decoding="async"></div>
        </div>
        <?php } } ?>
    </div>
    <?php }  if ($content_2 && $content_3) { ?>
    <div class="solution_B commonweb">
        <div class="hd flex">
            <div class="index_title">
                <div class="btitle comtitle"><?php echo $content_2; ?></div>
            </div>
            <div class="swiper-btn2">
                <div class="swiper-button-prev btn">PREV</div>
                <div class="swiper-button-next btn">NEXT</div>
            </div>
        </div>
        <div class="bd wow fadeInUp">
            <div class="mySwiper">
                <div class="swiper-wrapper">
                    <?php if (isset($content_3) && is_array($content_3) && $content_3) { $key_v=-1;$count_v=dr_count($content_3);foreach ($content_3 as $v) { $key_v++; $is_first=$key_v==0 ? 1 : 0;$is_last=$count_v==$key_v+1 ? 1 : 0;?>
                    <div class="swiper-slide">
                        <div class="box">
                            <div class="name"><?php echo $v[1]; ?></div>
                            <div class="text">
                                <?php echo $v[2]; ?>
                            </div>
                        </div>
                    </div>
                    <?php } } ?>
                </div>
            </div>
        </div>
    </div><?php }  if ($content_4) { ?>
    <div class="solution_C commonweb">
        <div class="index_title">
            <div class="btitle comtitle">应用场景</div>
        </div>
        <div class="list ">
            <?php if (isset($content_4) && is_array($content_4) && $content_4) { $key_v=-1;$count_v=dr_count($content_4);foreach ($content_4 as $key=>$v) { $key_v++; $is_first=$key_v==0 ? 1 : 0;$is_last=$count_v==$key_v+1 ? 1 : 0; ?>
            <dl class="flex wow fadeInUp">
                <dt>
                    <div class="num">0<?php echo $key; ?>.</div>
                </dt>
                <dd>
                    <div class="name"><?php echo $v[1]; ?></div>
                    <div class="img"><img src="<?php echo dr_get_file($v[2]); ?>" alt="" loading="lazy" decoding="async"></div>
                </dd>
            </dl>
            <?php } } ?>
        </div>
    </div><?php }  if ($content_7) { ?>

    <div class="solution_D commonweb">
        <div class="index_title">
            <div class="btitle comtitle">产品推荐</div>
        </div>
        <div class="bd wow fadeInUp">
            <div class="mySwiper">
                <div class="swiper-wrapper">
                    <?php $list_return = $this->list_tag("action=module module=product IN_id=$content_7 order=id_instr num=99"); if ($list_return && is_array($list_return)) extract($list_return, EXTR_OVERWRITE); $count=dr_count($return); if (is_array($return) && $return) { $key=-1; foreach ($return as $t) { $key++; $is_first=$key==0 ? 1 : 0;$is_last=$count==$key+1 ? 1 : 0; ?>
                    <div class="swiper-slide">
                        <a href="<?php echo $t['url']; ?>">
                            <div class="img"><img src="<?php echo dr_thumb($t['thumb']); ?>" alt="" loading="lazy" decoding="async"></div>
                            <div class="title"><?php echo $t['title']; ?></div>
                            <div class="more">详情<span class="iconfont icon-right15"></span></div>
                        </a>
                    </div>
                    <?php } } ?>
                    
                </div>
            </div>
            <div class="swiper-page2"></div>
        </div>
    </div>
    <?php }  if ($fn_include = $this->_include("footer.html")) include($fn_include); ?>