<div class="header_wrap">
        <div class="header_box commonweb">

            <a class="logo" href="/">
                <img class="wh" src="<?php echo SITE_LOGO; ?>" alt="" />
                <img class="ac" src="<?php echo dr_get_file(dr_site_value('flogo')); ?>" alt="">
            </a>
            <div class="header_nav ">
                <ul class="flex ">
                    <!-- 给当前页面添加类名cur -->
                    <li <?php if ($indexc) { ?>class="cur"<?php } ?>>
                        <h4>
                            <a href="/">首页</a>
                        </h4>
                    </li>
                <?php $list_return = $this->list_tag("action=category module=share pid=0"); if ($list_return && is_array($list_return)) extract($list_return, EXTR_OVERWRITE); $count=dr_count($return); if (is_array($return) && $return) { $key=-1; foreach ($return as $t) { $key++; $is_first=$key==0 ? 1 : 0;$is_last=$count==$key+1 ? 1 : 0; ?>
                    <li <?php if ($catid && dr_in_array($catid, $t['catids'])) { ?>class="cur"<?php } ?>>
                        <h4>
                            <?php if ($t['id'] ==2) { ?>
                            <a href="<?php echo get_url($t['id']); ?>">
                                <?php echo $t['name']; ?>
                            </a>
                            <?php } else { ?>
                            <a href="<?php echo $t['url']; ?>">
                                <?php echo $t['name']; ?>
                            </a>
                            <?php } ?>
                            <span class="subnavbtn iconfont"></span>
                        </h4>
                        <?php if ($t['id'] ==2) { ?>
                        <div class="header_subnav">
                            <div class="aws">
                                <?php $list_return_t2 = $this->list_tag("action=module module=cases catid=$t[id] order=displayorder_desc  return=t2"); if ($list_return_t2 && is_array($list_return_t2)) extract($list_return_t2, EXTR_OVERWRITE); $count_t2=dr_count($return_t2); if (is_array($return_t2) && $return_t2) { $key_t2=-1;  foreach ($return_t2 as $t2) { $key_t2++; $is_first=$key_t2==0 ? 1 : 0;$is_last=$count_t2==$key_t2+1 ? 1 : 0; ?>
                                <a href="<?php echo $t2['url']; ?>"><?php echo $t2['title']; ?></a>
                                <?php } } ?>
                            </div>
                        </div>
                        <?php } else if ($t['id'] ==2) { ?>
                        <div class="header_subnav">
                            <div class="aws">
                                <a href="javascript:;">公司简介</a>
                                <a href="javascript:;">企业文化</a>
                                <a href="javascript:;">全球服务</a>
                                <a href="javascript:;">知识产权</a>
                            </div>
                        </div>
                        <?php } else { ?>
                        <div class="header_subnav">
                            <div class="aws">
                                <?php $list_return_t2 = $this->list_tag("action=category module=share pid=$t[id]  return=t2"); if ($list_return_t2 && is_array($list_return_t2)) extract($list_return_t2, EXTR_OVERWRITE); $count_t2=dr_count($return_t2); if (is_array($return_t2) && $return_t2) { $key_t2=-1;  foreach ($return_t2 as $t2) { $key_t2++; $is_first=$key_t2==0 ? 1 : 0;$is_last=$count_t2==$key_t2+1 ? 1 : 0; ?>
                                <a href="<?php echo $t2['url']; ?>"><?php echo $t2['name']; ?></a>
                                <?php } } ?>
                            </div>
                        </div>
                        <?php } ?>
                    </li>
                <?php } } ?>
                    
                </ul>


                <div class="header_right">
                    <div class="search_icon"><span class="iconfont icon-search6"></span></div>
                    <div class="language">
                        <div class="cur">CN<span class="iconfont icon-sanjiao"></span>
                        </div>
                        <div class="drop">
                            <a href="/en">EN</a>
                            <a href="/">CN</a>
                        </div>
                    </div>
                </div>

                <div class="search_form">
                    <form action="/index.php"  method="get">
                        <input type="hidden" name="s" value="api">
                                            <input type="hidden" name="c" value="api">
                                            <input type="hidden" name="m" value="search">
                                            <input type="hidden" name="dir" value="news" >
                        <div class="formboxh">
                            <input type="text" name="keyword" autocomplete="off" class="input_text" placeholder="搜索" />
                            <input type="submit" class="input_btn" value="" />
                        </div>
                        <p class="pclose"><span class="iconfont icon-close"></span></p>
                    </form>
                </div>
            </div>

            <div class="mNavBtn ">
                <div class="icon">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    </div>