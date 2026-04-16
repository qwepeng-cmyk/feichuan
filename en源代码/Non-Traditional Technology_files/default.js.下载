


$(function () {
	// 主初始化函数
	function init() {
		initailCtrl();
		initializemNavBtn();
		initializeBackTop();
		initializehScroll();
		initializeSlideNav();
		initializeSearchIcon();
		initializeSubnavbtn();
		initializeIndexBanner();
		initailFormPopup();
		initializeToggleTab();
		if (window.innerWidth > 1023) {
			initializeonScroll();
			$(".header_nav ul ,.language ").bind({
				mouseover() {
					$(".header_box").addClass("ac");
					$(".search_form").stop().slideUp(300);
				},
				mouseleave() {
					var i = $(window).scrollTop();
					if (i < 50) {
						$('.header_box').removeClass('ac');
					}
				}
			});
		} else {
		}
	}
	init();

	function initailCtrl() {

		document.addEventListener('wheel', function (event) {
			if (event.ctrlKey) {
				event.preventDefault();
			}
		}, { passive: false });

		document.addEventListener('keydown', function (event) {
			if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0' || event.key === '=')) {
				event.preventDefault();
			}
		});

	}
	//数字滚动效果
	(function initializehCnums() {
		$('.cnums').countUp({
			time: 2000, // 动画持续时间（毫秒）
			delay: 10,  // 每步延迟（毫秒）
			decimals: 2 // 保留小数位数

		});
	})();

	//wow调用
	(function initializeWow() {
		if (typeof WOW != 'undefined') {
			var wow = new WOW({
				reset: true,
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,//距离可视区域多少开始执行动画
				mobile: true,//是否在移动设备上执行动画
				live: true, //异步加载的内容是否有效

			});
			wow.init();
		}
	})();


	function addwowdelay(className) {
		var arr = $(className)
		var delay = 0.1
		arr.each((index, item) => {
			$(item).attr('data-wow-delay', delay + 's');
			delay += 0.1
		})
	}
	addwowdelay('.footer_nav ul li ');
	addwowdelay('.index_product .item');
	addwowdelay('.comcnums .item');



	//返回顶部
	function initializeBackTop() {
		$('.backTop').on('click', function () {
			$('html, body').stop(true, true).animate({
				scrollTop: 0
			}, 500);
		});
	}

	//滚动条监听
	function initializehScroll() {
		var i = $(window).scrollTop();
		gradual();
		$(window).on('scroll', function () {
			i = $(this).scrollTop();
			if (i > 50 && $(window).width() > 1023) {
				$(".slide-nav").addClass("hshow");
			} else {
				$(".slide-nav").removeClass("hshow");
			}
			gradual();
		});

		function gradual() {
			var Width = $(window).width();
			if (i > 50) {
				$(".header_box").addClass("ac");
			}
			else if (Width < 768 && i < 50 && $(".header_nav ").is(":hidden") && $(".search_form").is(":hidden")) {
				$(".header_box").removeClass("ac");
			} else if (Width > 768 && i < 50) {
				$(".header_box").removeClass("ac");
			}

		};
	}

	// 侧边栏
	function initializeSlideNav() {
		$(".slide-nav ul li").hover(function () {
			$(this).addClass("cur").siblings().removeClass("cur");
			$(this).find(".popup").stop().show(200);
			$(this).find(".text").stop().slideDown(200);
			$(this).siblings().find(".text").stop().slideUp(200);
		}, function () {
			$(this).find(".popup").stop().hide(200);
		});
	}

	//搜索框点击下拉
	function initializeSearchIcon() {
		$(".search_icon").on("click", function () {
			if ($(".search_form").is(":hidden")) {
				$(".header_box").addClass("ac");
				$(".search_form").stop().slideDown(200);
			} else {
				$(".search_form").stop().slideUp(200);
				var i = $(window).scrollTop();
				if (i < 50) {
					$('.header_box').removeClass('ac');
				}
			}
		});

		$(".search_form .pclose").bind({
			click() {
				$(".search_form").stop().slideUp(200);
				var i = $(window).scrollTop();
				if (i < 50) {
					$('.header_box').removeClass('ac');
				}
			}
		});
	}

	//滚动页面导航收起
	function initializeonScroll() {
		var scrollTop = $(window).scrollTop();
		$(window).on('scroll', function () {
			var thisScroll = $(this).scrollTop();
			if (thisScroll > scrollTop && thisScroll >= 80) {
				scrollTop = $(this).scrollTop()
				$('.header_box').addClass(' window_scroll');
			} else {
				scrollTop = $(this).scrollTop()
				$('.header_box').removeClass(' window_scroll');
			}
		});
	}

	//移动端二级导航点击展开
	function initializeSubnavbtn() {
		$(".header_nav ul li").each(function () {
			if ($(this).find(".header_subnav a").text() !== '') {
				$(this).find('.subnavbtn').show().on('click', function () {
					if ($(this).parent().next().is(':hidden')) {
						$(this).parents("li").siblings().find('.header_subnav').stop().slideUp(300);
						$(this).parents("li").siblings().find('.subnavbtn').removeClass("up");
						$(this).parent().next().stop().slideDown(300);
						$(this).addClass("up");
					} else {
						$(this).parent().next().stop().slideUp(300);
						$(this).removeClass("up")
					}
				});
			} else {
				$(this).find('.header_subnav').hide();
				$(this).find('.subnavbtn').addClass("hide");
			}

			$(this).find(".item").each(function () {
				if ($(this).find(".subnav_third a").text() !== '') {
					$(this).find('.thirdbtn').show().on('click', function () {
						if ($(this).parent().next().is(':hidden')) {
							$(this).parents(".item").siblings().find('.subnav_third').stop().slideUp(300);
							$(this).parents(".item").siblings().find('.thirdbtn ').removeClass("up");
							$(this).parent().next().stop().slideDown(300);
							$(this).addClass("up");
						} else {
							$(this).parent().next().stop().slideUp(300);
							$(this).removeClass("up")
						}
					});
				} else {
					$(this).find(".subnav_third").hide();
					$(this).find('.thirdbtn').hide();
				}
			})
		});

	}

	function initializeIndexBanner() {
		var bannerOneVideo = false;
		var slideLength = $(".indexbanner .swiper-slide").length;
		var bannerSwiper = new Swiper(".indexbanner ", {
			slidesPerView: 1,
			speed: 500,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			effect: 'fade',
			on: {
				init: function (swiper) {
					var $firstSlide = $(swiper.slides[swiper.activeIndex] || swiper.slides[0]);
					$firstSlide.addClass('active');
				},
				transitionStart: function (swiper) {
					$(swiper.slides).removeClass("active");
				},
				transitionEnd: function (swiper) {
					$(swiper.slides).eq(this.activeIndex).addClass('active');
				},
				slideChangeTransitionEnd: function () {
					this.autoplay.start();
					var _this = $('.indexbanner .swiper-slide').eq(this.activeIndex);
					if (!bannerOneVideo) {
						bannerOneVideo = true;
					} else {
						bannerVideo(_this);
					}
				},
			},
			pagination: {
				el: ".indexbanner .banner-pages",
				clickable: true,
			},
			navigation: {
				prevEl: ".indexbanner .swiper-button-prev",
				nextEl: ".indexbanner .swiper-button-next"
			}
		});
		bannerVideo($(".indexbanner .swiper-slide"));
		function bannerVideo(_this) {
			if (_this.hasClass('hasVideo')) {
				bannerSwiper.autoplay.stop();
				$(".hasVideo").each(function (i) {
					$(this).find("video")[0].pause();
					$(this).find("video")[0].currentTime = 0;
				});
				_this.find("video")[0].play();
				_this.find("video").attr("autoplay", "autoplay");
				if (slideLength > 1) {
					_this.find('video').bind('ended', function () {
						bannerSwiper.slideNext();
						bannerSwiper.autoplay.start();
					})
				}
				else {
					_this.find("video").attr("loop", "loop");
				}
			} else {
				$(".hasVideo").each(function (i) { $(this).find("video")[0].pause(); $(this).find("video")[0].currentTime = 0; })
			}
		};

	}

	// 移动端下拉菜单
	function initializemNavBtn() {
		$(".mNavBtn").off("click").bind('click', function () {
			if ($(".header_nav").is(":hidden")) {
				$(this).addClass("close");
				$(".header_box").addClass("ac");
				$(".header_nav").stop().slideDown(300);
			} else {
				$(this).removeClass("close");
				$(".header_nav").stop().slideUp(300);
				var i = $(window).scrollTop();
				if (i < 50) {
					$('.header_box').removeClass('ac');
				}
			}
		});
	}

	(function footerNav() {
		$(".footer_nav ul li").each(function () {
			if ($(this).find(".footer_subnav a").length > 0) {
				$(this).find('.subnavbtn').show().on('click', function () {
					if ($(this).parent().next().is(':hidden')) {
						$(this).parents("li").siblings().find('.footer_subnav').slideUp(300);
						$(this).parents("li").siblings().find('.subnavbtn').removeClass("up");
						$(this).parent().next().slideDown(300);
						$(this).addClass("up");
					} else {
						$(this).parent().next().slideUp(300);
						$(this).removeClass("up")
					}
				});
			} else {
				$(this).find('.subnavbtn').hide();
			}
		});
	})();


	headerResize();
	$(window).on("resize", headerResize)
	function headerResize() {
		if (window.innerWidth > 1023) {
		} else {
			$("video").remove();
			$(".indexbanner .swiper-slide").removeClass("hasVideo");
			// $(".join_B .mySwiper .swiper-slide,.manufact_A .mySwiper .swiper-slide,.solution_detailC .mySwiper .swiper-slide").each(function () {
			// 	var $mimg = $(this).find(".img").data("mimg");
			// 	$(this).find(".img").css({
			// 		"background-image": "url(" + $mimg + ")",
			// 	});
			// });
		}
	}

	(function index() {
		$('.index_product .item').each(function () {
			var swiper = $(this).find(".mySwiper");
			var $prev = $(this).find(".swiper-button-prev");
			var $next = $(this).find(".swiper-button-next");
			var $page = $(this).find(".swiper-page");
			new Swiper(swiper[0], {
				slidesPerView: 1,
				spaceBetween: 10,
				speed: 1000,
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				observer: true,
				observeParents: true,
				pagination: {
					el: $page[0],
					clickable: true
				},
				navigation: {
					prevEl: $prev[0],
					nextEl: $next[0]
				},

			});

		});

    	if ($('.index_solution').length > 0 && $(window).width() > 1023) {
        	gsap.utils.toArray(".index_solution .itembox").forEach(block => {
        		const imgbox = $(block).find('.imgbox');
        		const moreBtn = $(block).find('.more'); // 获取.more元素
        		const $block = $(block);
        		const finalWidth = $(".index_solution .itembox").width() * 0.62; // 最终宽度
        		const halfWidth = finalWidth / 1.5; // 一半宽度
        
        		// 创建动画时优化参数
        		const animation = gsap.to(imgbox, {
        			width: finalWidth + 'px',
        			ease: "power1.inOut",
        			scrollTrigger: {
        				trigger: block,
        				start: "top center+=25%",
        				end: "bottom center-=5%",
        				scrub: true,
        				markers: false,
        				// 滚动过程中实时更新
        				onUpdate: function() {
        					const currentWidth = imgbox.width(); // 获取当前宽度
        					if (currentWidth >= halfWidth) {
        						moreBtn.addClass('cur');
        					} else {
        						moreBtn.removeClass('cur');
        					}
        				},
        				// 往下滚动进入时
        				onEnter: () => {
        					$block.addClass('cur');
        					// 检查进入时的宽度状态
        					if (imgbox.width() >= halfWidth) {
        						moreBtn.addClass('cur');
        					}
        				},
        				// 往上滚动离开时
        				onLeaveBack: () => {
        					$block.removeClass('cur');
        					moreBtn.removeClass('cur'); // 离开时移除
        				},
        				// 从下方往上滚动进入时
        				onEnterBack: () => {
        					$block.addClass('cur');
        					// 检查进入时的宽度状态
        					if (imgbox.width() >= halfWidth) {
        						moreBtn.addClass('cur');
        					}
        				},
        				// 往下滚动离开时不移除 block 的 cur 类
        				// onLeave 不设置
        			}
        		});
        
        		// 监听元素尺寸变化后刷新 ScrollTrigger
        		const ro = new ResizeObserver(() => {
        			animation.scrollTrigger.refresh();
        		});
        		ro.observe(block);
        
        		// 窗口尺寸变化时优化处理
        		let resizeTimer;
        		$(window).on('resize', () => {
        			clearTimeout(resizeTimer);
        			resizeTimer = setTimeout(() => {
        				const newFinalWidth = $(".index_solution .itembox").width() * 0.62;
        				const newHalfWidth = newFinalWidth / 2;
        				
        				gsap.set(imgbox, {
        					width: newFinalWidth + 'px'
        				});
        				
        				// 更新宽度阈值检查
        				if (imgbox.width() >= newHalfWidth) {
        					moreBtn.addClass('cur');
        				}
        				
        				ScrollTrigger.refresh();
        			}, 100);
        		});
        	});
        };
		new Swiper(".index_news .mySwiper", {
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 1000,
			loop: true,
			breakpoints: {
				1024: {
					slidesPerView: 2.5,
					spaceBetween: 50
				}
			},
			navigation: {
				prevEl: ".index_news .swiper-button-prev",
				nextEl: ".index_news .swiper-button-next"
			},

		});
		
	
	})();


	(function initializesplitColor() {
		gsap.registerPlugin(SplitText, ScrollTrigger);

		const titles = document.querySelectorAll('.comtitle');

		titles.forEach(title => {
			// 创建SplitText实例，但排除 <br> 标签
			const mySplitText = new SplitText(title, {
				type: "chars",       // 仅拆分字符
				chars: title.textContent.split('').map((char, index) => {
					// 如果是换行符，则返回一个特殊标记（比如空格）来保留位置
					return char === '\n' ? ' ' : char;
				})
			});
			const chars = mySplitText.chars;

			// 初始状态设为灰色
			gsap.set(chars, { color: "#b3b3b3" });   // 可换成 #999、#888 等你喜欢的灰

			// 创建滚动触发的变色动画
			gsap.to(chars, {
				color: "#000",                    // 目标黑色
				duration: 0.8,
				ease: "power2.out",
				stagger: {
					from: "start",
					amount: 1                    // 控制总时长，值越大越慢（推荐 0.4~0.8）
				},
				scrollTrigger: {
					trigger: title,
					start: "top 95%",               // 滚动到这里开始变色
					toggleActions: "play none none reset", // 配置触发动画时的行为
					once: false,                   // 如果只想执行一次，就取消注释这行
				}
			});
		});
	})();
	(function initializesplitColor2() {
		gsap.registerPlugin(SplitText, ScrollTrigger);

		const titles = document.querySelectorAll('.comtitle2');

		titles.forEach(title => {
			// 创建SplitText实例，但排除 <br> 标签
			const mySplitText = new SplitText(title, {
				type: "chars",       // 仅拆分字符
				chars: title.textContent.split('').map((char, index) => {
					// 如果是换行符，则返回一个特殊标记（比如空格）来保留位置
					return char === '\n' ? ' ' : char;
				})
			});
			const chars = mySplitText.chars;

			// 初始状态设为灰色
			gsap.set(chars, { color: "rgba(255,255,255,0.5)" });   // 可换成 #999、#888 等你喜欢的灰

			// 创建滚动触发的变色动画
			gsap.to(chars, {
				color: "#fff",                    // 目标黑色
				duration: 0.8,
				ease: "power2.out",
				stagger: {
					from: "start",
					amount: 1                    // 控制总时长，值越大越慢（推荐 0.4~0.8）
				},
				scrollTrigger: {
					trigger: title,
					start: "top 95%",               // 滚动到这里开始变色
					toggleActions: "play none none reset", // 配置触发动画时的行为
					once: false,                   // 如果只想执行一次，就取消注释这行
				}
			});
		});
	})();

	//通用鼠标点击切换
	function initializeToggleTab() {
		$(".toggletab").each(function () {
			var tab = $(this).find(".tab");
			tab.eq(0).addClass("cur");
			tab.bind({
				click() {
					var i = $(this).index();
					tab.eq(i).addClass("cur").siblings().removeClass("cur");
					$(this).parents(".togglecont").find(".toggleitem .item").eq(i).addClass("he_fadeup3").show().siblings().removeClass("he_fadeup3").hide();
				}
			});
		});
	};



	(function join() {

		new Swiper('.join_B .mySwiper', {
			slidesPerView: 1,
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".join_B .swiper-page2"
			}
		});

	})();

	(function commdlclick() {
		$(".commdlclick dl dt").bind({
			click() {
				var $dl = $(this).parent();
				var $dd = $(this).next();
				if ($dd.is(":hidden")) {
					$dd.stop().slideDown();
					$dl.siblings().find("dd").stop().slideUp();
					$dl.addClass("cur").siblings().removeClass("cur");
				} else {
					$dd.stop().slideUp();
					$dl.removeClass("cur");
				}
			}
		});

	})();

	// 表单弹窗
	function initailFormPopup() {
		$(".ljzxdz").on('click', function () {
			var text = $(this).data("name");
			$(".formbox").addClass("cur").find(".name").text(text);
		});
		$(".onlinebox .pclose").on('click', function () {
			$(".onlinebox").removeClass("cur");
		});
	};

	(function louceng() {
		if ($(window).width() > 1023 && $('.louceng-slidenav ').length) {
			var oNav = $('.louceng-slidenav ');//导航壳
			var aNav = oNav.find('li');//导航
			aNav.eq(0).addClass("cur");
			var aDiv = $('.louceng');//楼层
			//回到顶部

			$(window).scroll(function () {
				var winH = $(window).height();//可视窗口高度
				var iTop = $(window).scrollTop();//鼠标滚动的距离
				if (iTop >= $('.louceng').height()) {
					//鼠标滑动式改变	
					aDiv.each(function () {
						if (winH + iTop - $(this).offset().top > winH / 2) {
							aNav.removeClass('cur');
							aNav.eq($(this).index()).addClass('cur');
						}
					})
				}
			});
			//点击回到当前楼层
			aNav.click(function () {
				var t = aDiv.eq($(this).index()).offset().top - 100;
				$('body,html').animate({ "scrollTop": t }, 500);

			});
		};
	})();

	(function solution() {
		new Swiper('.solution_B .mySwiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1024: {
					slidesPerView: 3,
					spaceBetween: 60
				}
			},
			navigation: {
				prevEl: ".solution_B .swiper-button-prev",
				nextEl: ".solution_B .swiper-button-next"
			}
		});

		$(".solution_C dl ").eq(0).addClass("cur");
		$(".solution_C dl ").bind({
			click() {
				var $dl = $(this);
				var $img = $(this).find(".img");
				$dl.addClass("cur").siblings().removeClass("cur");
			}
		});

		new Swiper('.solution_D .mySwiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1024: {
					slidesPerView: 3,
					spaceBetween: 72
				}
			},
			pagination: {
				el: ".solution_D .swiper-page2"
			}
		});


	})();

	(function about() {
		$(document).ready(function () {
			var intervalTime = 3000; // 切换间隔时间，单位是毫秒
			var $listItems = $(".about_D ul li");
			var $images = $(".about_D .img");
			var currentIndex = 0;
			var autoSwitchInterval;

			function switchToIndex(index) {
				$listItems.eq(index).addClass("cur").siblings().removeClass("cur");
				$images.eq(index).show().siblings().hide();
			}

			function nextIndex() {
				currentIndex = (currentIndex + 1) % $listItems.length; // 循环切换
				switchToIndex(currentIndex);
			}

			function startAutoSwitch() {
				autoSwitchInterval = setInterval(nextIndex, intervalTime);
			}

			function stopAutoSwitch() {
				clearInterval(autoSwitchInterval);
			}

			// 初始化
			switchToIndex(currentIndex);
			// startAutoSwitch();

			// 点击事件处理
			$listItems.on('click', function () {
				stopAutoSwitch(); // 停止自动切换
				currentIndex = $(this).index(); // 更新当前索引
				switchToIndex(currentIndex);
				//startAutoSwitch(); // 恢复自动切换
			});
		});
	})();
	//-------------------------------------------------------------------
	(function initializecommaskNav(options = {}) {
		const {
			navSelector = '.commask_nav',
			maskSelector = '.mask',
			activeClass = 'cur'
		} = options;

		// 更新遮罩位置
		function updateMaskPosition($nav, $mask, $targetLi) {
			if (!$nav.length || !$mask.length || !$targetLi.length) return;
			const liOffset = $targetLi.offset().left - $nav.offset().left;
			$mask.css({ left: liOffset, width: $targetLi.outerWidth(), opacity: 1 });
		}

		// 重置遮罩
		function resetMask($nav, $mask, $lis) {
			if (!$nav.length || !$mask.length || !$lis.length) return;
			const $defaultLi = $nav.find(`li.${activeClass}`).length ? $nav.find(`li.${activeClass}`) : $lis.eq(0);
			updateMaskPosition($nav, $mask, $defaultLi);
		}

		// 初始化每个导航
		$(navSelector).each(function () {
			const $nav = $(this);
			const $mask = $nav.find(maskSelector);
			const $lis = $nav.find('li');
			if (!$nav.length || !$mask.length || !$lis.length) return;

			// 初始化遮罩
			resetMask($nav, $mask, $lis);

			// 绑定事件
			$lis.on('mouseenter.commaskNav', function () {
				updateMaskPosition($nav, $mask, $(this));
			});

			$nav.on('mouseleave.commaskNav', () => resetMask($nav, $mask, $lis));
		});

		// 防抖的 resize 处理
		let resizeTimeout;
		function handleResize() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				$(navSelector).each(function () {
					const $nav = $(this);
					const $mask = $nav.find(maskSelector);
					const $lis = $nav.find('li');
					resetMask($nav, $mask, $lis);
				});
			}, 100);
		}

		// 确保 resize 只绑定一次
		$(window).off('resize.commaskNav').on('resize.commaskNav', handleResize);

		// 提供清理方法
		return {
			destroy() {
				$(navSelector).each(function () {
					const $nav = $(this);
					$nav.find('li').off('mouseenter.commaskNav');
					$nav.off('mouseleave.commaskNav');
				});
				$(window).off('resize.commaskNav');
			}
		};
	})();



	(function gxdetail() {
		new Swiper(".gxcase_detailC .mySwiper", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			speed: 1000,
			breakpoints: {
				1024: {
					slidesPerView: 3,
					spaceBetween: 50,
				}
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
				prevEl: ".gxcase_detailC .swiper-button-prev",
				nextEl: ".gxcase_detailC .swiper-button-next"
			},
		});
	})();




	(function splitText() {

		// 注册插件
		gsap.registerPlugin(SplitText, ScrollTrigger);

		// 获取所有的 .splitText 元素
		const titles = document.querySelectorAll('.splitText');

		titles.forEach(title => {
			// 创建SplitText实例，但排除 <br> 标签
			const mySplitText = new SplitText(title, {
				type: "chars",       // 仅拆分字符
				chars: title.textContent.split('').map((char, index) => {
					// 如果是换行符，则返回一个特殊标记（比如空格）来保留位置
					return char === '\n' ? ' ' : char;
				})
			});

			const chars = mySplitText.chars; // 获取所有字符的div数组

			// 创建时间轴并绑定ScrollTrigger
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: title,       // 触发动画的元素
					start: "top 95%",     // 动画开始的时机
					end: "bottom top",    // 动画结束的时机
					scrub: false,         // 不与滚动同步
					markers: false,       // 隐藏调试标记
					toggleActions: "play none none reset", // 配置触发动画时的行为
					once: false,          // 确保动画在每次进入时执行
					onEnter: () => {
						tl.restart(); // 重新启动时间轴
					},
					onLeaveBack: () => {
						tl.pause(); // 暂停时间轴
					}
				}
			});

			// 添加动画
			tl.from(chars, {
				duration: 0.8,
				opacity: 0,
				scale: 1,
				x: 80,
				rotationX: 0,
				transformOrigin: "50% 50% 0",
				ease: "back",
				stagger: 0.05
			});
		});
	})();

	(function initailCkplayer() {
		if (typeof ckplayer != 'undefined') {
			var videoObject = {
				container: '#video',
				variable: 'player',
				autoplay: true,
				controls: false,
				webFull: true,
				mobileCkControls: false
			};

			function videoplayerX($showbtn, $hidebtn) {
				var player;
				$(document).on('click', $showbtn, function () {
					if ($(this).data('video')) {
						videoObject.video = $(this).data('video');
						player = null; // 重置 player
						$('.video-player-popup').fadeIn(300);
						player = new ckplayer(videoObject);

					}
				});

				$(document).on('click', $hidebtn, function () {
					if (player && typeof player.videoPause === 'function') {
						player.videoPause();
					}
					$('.video-player-popup').fadeOut(300);
				});
			}
			videoplayerX('.conplayer-btn', '.video-player-popup .close');
		};
	})();

	(function aboutcSwiper() {
		const yearSwiper = new Swiper(".about_C .mySwiper2", {
			slidesPerView: 1,
			spaceBetween: 20,
			breakpoints: {
				1024: {
					slidesPerView: 4,
					spaceBetween: 0,
					direction: 'vertical',
				}
			},
			navigation: {
				prevEl: ".about_C .swiper-button-prev",
				nextEl: ".about_C .swiper-button-next"
			},
		});

		const swiper = new Swiper(".about_C .mySwiper", {
			slidesPerView: 1,
			mousewheel: false,
			initialSlide: 1,
			breakpoints: {
				1024: {
					slidesPerView: 3,
					spaceBetween: 20,
				}
			},
			direction: 'vertical',
			navigation: {
				prevEl: ".about_C .swiper-button-prev",
				nextEl: ".about_C .swiper-button-next"
			},
			thumbs: {
				swiper: yearSwiper
			}
		});
		gsap.to(".about_C", {
			scrollTrigger: {
				trigger: ".about_C",
				start: "top top",   // 当 .about_C 区域的顶部与视口顶部对齐时触发
				end: "bottom top",  // 当 .about_C 区域的底部到达视口顶部时结束
				pin: true,          // 固定 .about_C 区域
				pinSpacing: true, // 禁用固定元素的额外空间，确保下方内容能够继续滚动覆盖
				scrub: true,        // 平滑滚动
				onLeave: () => {
					// 离开时恢复滚动
					swiper.mousewheel.disable();
					//document.body.style.overflow = "auto"; // 恢复页面滚动

					$(".about_C .mySwiper").removeClass("cur");
					$(".about_C ").addClass("fixed");
				},
				onEnterBack: () => {
					$(".about_C .mySwiper").addClass("cur");
					$(".about_C ").removeClass("fixed");
					// 向上滚动回到 .about_C 区域时，检查是否在第一个滑块
					if (swiper.realIndex === 0) {
						swiper.mousewheel.disable();  // 禁用鼠标滚轮
					} else {
						swiper.mousewheel.enable();   // 启用鼠标滚轮
					}
					//document.body.style.overflow = "hidden"; // 禁止页面滚动
				},
				onEnter: () => {
					$(".about_C .mySwiper").addClass("cur");
				}
			}
		});

		$(document).on('wheel', function (event) {
			// 获取当前活动滑块
			var slides = $(".about_C .mySwiper li");
			var activeIndex = swiper.realIndex;
			var currentSlide = slides[activeIndex];
			var nextSlide = slides[activeIndex + 2];

			// 检查是否往上滚动 (deltaY < 0)
			if (event.originalEvent.deltaY < 0) {
				$(currentSlide).addClass('he_liInidown');
				$(nextSlide).removeClass('he_liIniup');
				// 检查是否已经到达第一张
				if (swiper.isBeginning) {
					// 禁用鼠标滚动
					swiper.mousewheel.disable();
				} else {
					// 启用鼠标滚动
					swiper.mousewheel.enable();
				}
			}
			if (event.originalEvent.deltaY > 0) {
				$(currentSlide).removeClass('he_liInidown');
				$(nextSlide).addClass('he_liIniup');
				// 检查是否已经到达最后一张
				if (swiper.isEnd) {
					// 禁用鼠标滚动
					swiper.mousewheel.disable();
				} else {
					// 启用鼠标滚动
					swiper.mousewheel.enable();
				}
			}
		});
	});

	$(document).ready(function () {
		var intervalTime = 3000; // 切换间隔时间，单位是毫秒
		var $listItems = $(".about_E ul li");
		var $images = $(".about_E .left .img");
		var currentIndex = 0;
		var autoSwitchInterval;

		function switchToIndex(index) {
			$listItems.eq(index).addClass("cur").siblings().removeClass("cur");
			$images.eq(index).show().siblings().hide();
		}

		function nextIndex() {
			currentIndex = (currentIndex + 1) % $listItems.length; // 循环切换
			switchToIndex(currentIndex);
		}

		function startAutoSwitch() {
			autoSwitchInterval = setInterval(nextIndex, intervalTime);
		}

		function stopAutoSwitch() {
			clearInterval(autoSwitchInterval);
		}

		// 初始化
		switchToIndex(currentIndex);
		// startAutoSwitch();

		// 点击事件处理
		$listItems.on('click', function () {
			stopAutoSwitch(); // 停止自动切换
			currentIndex = $(this).index(); // 更新当前索引
			switchToIndex(currentIndex);
			//startAutoSwitch(); // 恢复自动切换
		});
	});



	(function otherAbout() {
		var $qylistli = $(".qiyezhanl .list ul li");
		var $manufactcli = $(".manufact_C .list ul li");
		var $prodstrate3li = $(".prodstrate3  ul li");
		$qylistli.eq(0).addClass("cur");
		$manufactcli.eq(0).addClass("cur");
		$prodstrate3li.eq(1).addClass("cur");
		$(".qiyezhanl .list ul li,.manufact_C .list ul li,.prodstrate3 ul li").bind({
			mouseover() {
				$(this).addClass("cur").siblings().removeClass("cur");
			}
		})
	})();

	(function manufact() {
		var ijbSwiper = new Swiper('.manufact_A .mySwiper2', {
			slidesPerView: 2,
			spaceBetween: 20,
			speed: 1000,
			loop: true,
			breakpoints: {
				1024: {
					slidesPerView: 4,
				}
			}
		});

		new Swiper('.manufact_A .mySwiper', {
			slidesPerView: 1,
			speed: 1000,
			loop: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			thumbs: {
				swiper: ijbSwiper
			}
		});

		if ($('.manufact_B').length > 0) {

			var manufactB = gsap.timeline({
				scrollTrigger: {
					trigger: $(".manufact_B .bd .img"),
					start: "top 95%",
					end: "top 50%",
					scrub: 1,
					onUpdate: function (self) {
						if (self.progress.toFixed(3) > 0.5) {
							$(".manufact_B .bd .btn").addClass("active")
						} else {
							$(".manufact_B .bd .btn").removeClass("active")
						}
					}
				},
			});
			manufactB
				.to($(".manufact_B .bd .img"), 2, { borderRadius: '0.15rem', scale: '1' });
		}


	})();

	(function rdinnovat() {
		new Swiper('.rdinnovat_A .mySwiper', {
			slidesPerView: "auto",
			spaceBetween: 10,
			speed: 1000,
			loop: true,
			breakpoints: {
				1024: {
					spaceBetween: 75
				}
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".rdinnovat_A .swiper-pagination",
				type: "progressbar",
			},
			navigation: {
				prevEl: ".rdinnovat_A .swiper-button-prev",
				nextEl: ".rdinnovat_A .swiper-button-next",
			}
		});

		new Swiper('.rdinnovat_B .mySwiper', {
			slidesPerView: 2,
			spaceBetween: 10,
			speed: 1000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1024: {
					slidesPerView: 6,
					spaceBetween: 11
				}
			},
		});

		new Swiper('.rdinnovat_C .mySwiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 1000,
			rewind: true,
			breakpoints: {
				1024: {
					slidesPerView: 4,
					spaceBetween: 70
				}
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
				prevEl: ".rdinnovat_C .swiper-button-prev",
				nextEl: ".rdinnovat_C .swiper-button-next",
			}
		});

		new Swiper('.rdinnovat_D .mySwiper', {
			slidesPerView: 2,
			spaceBetween: 10,
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1024: {
					slidesPerView: "auto",
					spaceBetween: 57
				}
			},
			pagination: {
				el: ".rdinnovat_D .swiper-page"
			},
			navigation: {
				prevEl: ".rdinnovat_D .swiper-button-prev",
				nextEl: ".rdinnovat_D .swiper-button-next",
			}
		});
	})();


	(function solutionDetail() {

		new Swiper('.solution_detailA .mySwiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 1000,
			loop: true,
			navigation: {
				prevEl: ".solution_detailA .swiper-button-prev",
				nextEl: ".solution_detailA .swiper-button-next"
			},
			pagination: {
				el: ".solution_detailA .swiper-page"
			},
			breakpoints: {
				1024: {
					spaceBetween: 160,
				}
			},
		});

		new Swiper('.solution_detailB .mySwiper', {
			slidesPerView: 1,
			spaceBetween: 10,
			speed: 1000,
			loop: true,
			breakpoints: {
				1024: {
					slidesPerView: 3,
					spaceBetween: 28
				}
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".solution_detailB .swiper-pagination",
				type: "progressbar",
			},
			navigation: {
				prevEl: ".solution_detailB .swiper-button-prev",
				nextEl: ".solution_detailB .swiper-button-next",
			}
		});

		new Swiper('.solution_detailC .mySwiper', {
			slidesPerView: 1,
			speed: 1000,
			loop: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			pagination: {
				el: ".solution_detailC .swiper-page"
			}
		});

		new Swiper('.solution_detailD .mySwiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 1000,
			breakpoints: {
				1024: {
					slidesPerView: 4,
					spaceBetween: 86
				}
			},
			navigation: {
				prevEl: ".solution_detailD .swiper-button-prev",
				nextEl: ".solution_detailD .swiper-button-next",
			}
		});
	})();

	(function prodstrate() {
		var $tab = $(".prodstrate1 .tab");
		var $img = $(".prodstrate1 .lineimg img")
		$tab.eq(2).addClass("cur");
		$img.eq(2).addClass("cur");
		$tab.bind({
			click() {
				var i = $(this).index();
				$(this).addClass("cur").siblings().removeClass("cur");
				$img.eq(i).addClass("cur").siblings().removeClass("cur");
			}
		})
	})();

	if ($(".pinpaigs1").length > 0) {
		(function pinpaigs1() {
			gsap.registerPlugin(ScrollTrigger);

			gsap.matchMedia().add("(min-width: 1024px)", () => {
				const $container = $(".pinpaigs1");
				const $items = $container.find(".item");
				const $line = $container.find(".line");
				const total = $items.length;

				if (total <= 1) return;

				// 进度条总高度（你设定的 5rem）
				const totalLineHeight = 5; // 单位：rem

				// 初始化：只有第一个 active
				$items.removeClass("active");
				$items.eq(0).addClass("active");

				// 初始化进度条高度为 1/total
				if ($line.length > 0) {
					gsap.set($line, { height: totalLineHeight / total + "rem" });
				}

				// 主 ScrollTrigger
				const st = ScrollTrigger.create({
					trigger: $container,
					start: "top top",
					end: "+=" + (total * 100 - 120) + "%",
					pin: true,
					anticipatePin: 1,
					pinSpacing: true,
					// markers: true,
					onUpdate: self => {
						const progress = self.progress;  // 0 ~ 1

						// 1. item 切换逻辑（保持边界正确）
						let currentSection;
						if (progress === 1) {
							currentSection = total - 1;
						} else {
							currentSection = Math.floor(progress * total);
						}
						$items.removeClass("active");
						$items.eq(currentSection).addClass("active");

						// 2. 进度条高度：从 1/total 平滑增长到 full（总高度 5rem）
						if ($line.length > 0) {
							// 当前应达到的高度 = 初始段 + (剩余段数 * 进度)
							// 更简单直接的方式：整体进度 * (total - 1)/total + 初始 1/total
							const baseHeight = totalLineHeight / total;                    // 初始高度（第一个阶段）
							const additionalHeight = (totalLineHeight - baseHeight) * progress;  // 额外增长部分

							const targetHeight = baseHeight + additionalHeight;  // 最终高度

							gsap.to($line, {
								height: targetHeight + "rem",
								duration: 0,
								ease: "none",
								overwrite: true
							});
						}
					}
				});

				// 强制刷新
				ScrollTrigger.refresh();

				$(window).on("resize", () => {
					ScrollTrigger.refresh();
				});

				$(window).on("load", () => {
					ScrollTrigger.refresh();
				});
			});
		})();
	}
});
