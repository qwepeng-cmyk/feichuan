<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">
    <?php if ($fn_include = $this->_include("meta.html")) include($fn_include); ?>
</head>


<body>
	<?php if ($fn_include = $this->_include("header.html")) include($fn_include); ?>

	<div class="indexbanner">
		<ul class="swiper-wrapper">
			<!--有视频链接 li就加上类名 hasVideo-->
			<?php $hdtp = dr_site_value('hdtp');  if (isset($hdtp) && is_array($hdtp) && $hdtp) { $key_v=-1;$count_v=dr_count($hdtp);foreach ($hdtp as $v) { $key_v++; $is_first=$key_v==0 ? 1 : 0;$is_last=$count_v==$key_v+1 ? 1 : 0;?>
			<li class="swiper-slide <?php if ($v[3]) { ?>hasVideo<?php } ?>">
                <?php if ($v[3]) { ?><video src="<?php echo dr_get_file($v[3]); ?>" muted></video><?php } ?>
				<p class="img">
					<img class="hidden-lg" src="<?php echo dr_get_file($v[1]); ?>" alt="">
					<img class="visible-sm" src="<?php echo dr_get_file($v[2]); ?>" alt="">
				</p>
				<div class="info commonweb">
					<div class="btitle">
						<?php echo $v[4]; ?>
					</div>
				</div>
			</li>
			<?php } } ?>
		</ul>
		<div class="bot commonweb ">
			<div class="banner-pages"></div>
			<div class="banner-btn">
				<div class="swiper-button-prev btn"><span class="iconfont"></span></div>
				<div class="swiper-button-next btn"><span class="iconfont"></span></div>
			</div>
		</div>
		<div class="scroll">
			<div class="text">Scroll</div>
			<div class="icon"></div>
		</div>
	</div>

	<div class="index_product togglecont commonweb">
		<div class="hd flex">
			<div class="index_title">
				<div class="btitle comtitle"><?php echo dr_code2html(dr_site_value('index_3_subtitle')); ?></div>
			</div>
			<div class="right">
				<div class="tabs toggletab">
					<?php $list_return_c = $this->list_tag("action=category module=share pid=1  return=c"); if ($list_return_c && is_array($list_return_c)) extract($list_return_c, EXTR_OVERWRITE); $count_c=dr_count($return_c); if (is_array($return_c) && $return_c) { $key_c=-1;  foreach ($return_c as $c) { $key_c++; $is_first=$key_c==0 ? 1 : 0;$is_last=$count_c==$key_c+1 ? 1 : 0; ?>
					<div class="tab"><?php echo $c['name']; ?></div>
					<?php } } ?>
				</div>
				<a href="javascript:;" class="more">全部<span class="iconfont icon-right15"></span></a>
			</div>
		</div>
		<div class="bd toggleitem wow fadeInUp">
			<?php $list_return_c = $this->list_tag("action=category module=share pid=1  return=c"); if ($list_return_c && is_array($list_return_c)) extract($list_return_c, EXTR_OVERWRITE); $count_c=dr_count($return_c); if (is_array($return_c) && $return_c) { $key_c=-1;  foreach ($return_c as $c) { $key_c++; $is_first=$key_c==0 ? 1 : 0;$is_last=$count_c==$key_c+1 ? 1 : 0; ?>
			<div class="item">
				<div class="mySwiper">
					<div class="swiper-wrapper">
						<?php $list_return = $this->list_tag("action=module module=product flag=1 catid=$c[id] order=displayorder_desc,id_desc"); if ($list_return && is_array($list_return)) extract($list_return, EXTR_OVERWRITE); $count=dr_count($return); if (is_array($return) && $return) { $key=-1; foreach ($return as $t) { $key++; $is_first=$key==0 ? 1 : 0;$is_last=$count==$key+1 ? 1 : 0; ?>
						<div class="swiper-slide">
							<a href="<?php echo $t['url']; ?>" class="box flex">
								<div class="left">
									<div class="img"><img src="<?php echo dr_thumb($t['thumb']); ?>" alt="" loading="lazy"
											decoding="async">
									</div>
									<div class="en"><?php echo $t['xinghao']; ?></div>
								</div>
								<div class="right">
									<div class="en"><?php echo $t['xinghao']; ?></div>
									<div class="cn"><?php echo $t['title']; ?></div>
									<div class="more abtn">
										<div class="text">产品详情</div><span class="iconfont icon-xiejiantou"></span>
									</div>
								</div>
							</a>
						</div>
						<?php } } ?>
					</div>
				</div>
				<div class="swiper-bot flex">
					<div class="swiper-btn2">
						<div class="swiper-button-prev btn">PREV</div>
						<div class="swiper-button-next btn">NEXT</div>
					</div>
					<div class="swiper-page"></div>
				</div>
			</div>
			<?php } } ?>
			
			
		</div>
	</div>

	<div class="index_solution commonweb">
		<div class="index_title">
			<div class="btitle comtitle2"><?php echo dr_code2html(dr_site_value('index_3_desc')); ?></div>
		</div>
		<div class="list">
			<?php $index_4 = dr_site_value('index_4');  if (isset($index_4) && is_array($index_4) && $index_4) { $key_v=-1;$count_v=dr_count($index_4);foreach ($index_4 as $key=>$v) { $key_v++; $is_first=$key_v==0 ? 1 : 0;$is_last=$count_v==$key_v+1 ? 1 : 0; ?>
			<div class="itembox ">
				<div class="info">
					<div class="num">0<?php echo $key; ?>.</div>
					<div class="name"><?php echo $v[1]; ?></div>
					<div class="text">
						<?php echo $v[2]; ?>
					</div>
				</div>
				<div class="imgbox">
					<a href="<?php echo $v[4]; ?>">
						<img src="<?php echo dr_get_file($v[3]); ?>" alt="" loading="lazy" decoding="async">
						<div class="more"><span class="iconfont icon-xiejiantou"></span></div>
					</a>
				</div>
			</div>
			<?php } } ?>
			
		</div>
	</div>

	<div class="index_about ">
		<?php $index_3_bt = dr_site_value('index_3_bt');  if (isset($index_3_bt) && is_array($index_3_bt) && $index_3_bt) { $key_v=-1;$count_v=dr_count($index_3_bt);foreach ($index_3_bt as $v) { $key_v++; $is_first=$key_v==0 ? 1 : 0;$is_last=$count_v==$key_v+1 ? 1 : 0;?>
		<div class="hd commonweb flex">
			<div class="left">
				<div class="index_title">
					<div class="btitle comtitle2"><?php echo $v[1]; ?></div>
				</div>
				<a href="<?php echo dr_share_cat_value(4,'url'); ?>" class="abtn">
					了解我们<span class="iconfont icon-xiejiantou"></span>
				</a>
			</div>
			<div class="right">
				<div class="desc f17 wow fadeInUp">
					<?php echo $v[2]; ?>
				</div>
			</div>
		</div>
		<div class="img"><img class="wow fadeInUp" data-wow-delay="0.5s" src="<?php echo dr_get_file($v[3]); ?>" alt="" loading="lazy"
				decoding="async"></div>
		 <div class="bd">
            <div class="en wow fadeInUp" >
                <img src="/images/iaanimg2.png" alt="">
            </div>
            <div class="limg"><img src="/images/iaanimg1.png" alt=""></div>
        </div>		
		<?php } } ?>
	</div>

	<div class="index_news ">
		<div class="hd  commonweb flex">
			<div class="index_title">
				<div class="btitle comtitle"><?php echo dr_code2html(dr_site_value('index_2')); ?></div>
			</div>
			<div class="right">
				<a href="<?php echo dr_share_cat_value(3,'url'); ?>" class="abtn">
					更多资讯<span class="iconfont icon-xiejiantou"></span>
				</a>
			</div>
		</div>
		<div class="bd commonweb">
			<div class="mySwiper">
				<div class="swiper-wrapper">
					<?php $list_return = $this->list_tag("action=module module=news flag=1 catid=3 order=displayorder_desc,id_desc"); if ($list_return && is_array($list_return)) extract($list_return, EXTR_OVERWRITE); $count=dr_count($return); if (is_array($return) && $return) { $key=-1; foreach ($return as $t) { $key++; $is_first=$key==0 ? 1 : 0;$is_last=$count==$key+1 ? 1 : 0; ?>
					<div class="swiper-slide">
						<a href="<?php echo $t['url']; ?>" class="box ">
							<figure>
								<img src="<?php echo dr_get_file($t['thumb']); ?>" alt="" loading="lazy" decoding="async">
							</figure>
							<figcaption>
								<div class="date"><?php echo dr_date($t['_updatetime'],'Y-m-d'); ?></div>
								<div class="title">
									<?php echo $t['title']; ?>
								</div>
								<div class="more"><span class="iconfont icon-youjiantou8"></span></div>
							</figcaption>
						</a>
					</div>
					<?php } } ?>
				</div>
			</div>
			<div class="swiper-btn">
				<div class="swiper-button-prev btn"></div>
				<div class="swiper-button-next btn"></div>
			</div>
		</div>
	</div>
	<?php if ($fn_include = $this->_include("footer.html")) include($fn_include); ?>