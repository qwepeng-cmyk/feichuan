$(document).ready(function() {
if($(window).scrollTop()>0){$('.nav').addClass('affix')}$(window).on('scroll',function(){if($(window).scrollTop()>0){$('.nav').addClass('affix')}else{$('.nav').removeClass('affix')}});
$('#pull').click(function(){if($('.nav_ul_box').width()>0){$('.nav_ul_box').animate({width:0})}else{$('.nav_ul_box').animate({width:'100%'});$('.drop_btn>a').click(function(){event.preventDefault();$(this).parent("li").removeClass('active');$(this).siblings(".dropdown_box").slideDown();$('.menu_ul_b h4').click(function(){$(this).addClass("menu_ul_b_activer").siblings("ul,ol").slideDown().parent("div").siblings().children("h4").removeClass("menu_ul_b_activer").siblings("ul,ol").slideUp()})})}});
$('.header_top_left span').click(function(){var display=$('.header_top_left ol').css('display');if(display=='none'){$(".header_top_left ol").slideDown()}else{$(".header_top_left ol").slideUp()}$(".header_top_left>li").mouseleave(function(){$(this).children("ol").slideUp("fast")})});
$('.nav_language').click(function(){event.preventDefault();var display=$('.nav_language .ul_box').css('display');if(display=='none'){$(".nav_language .ul_box").slideDown()}else{$(".nav_language .ul_box").slideUp()}$(".nav_language").mouseleave(function(){$(this).children(".ul_box").slideUp("fast")})});
$('.tab_nav_hide_pull,.tab-menu_parts').click(function(){var display=$('.tab_nav ,.tab-menu_parts,.tab_nav_product').css('display');if(display=='none'){$(".tab_nav ,.tab_nav_product,.tab-menu_parts").addClass("tab_nav_box");$('.tab_nav_box ').click(function(){$(this).removeClass("tab_nav_box")})}});
$(function(){$('.nav_search img').click(function(){$(this).parent().toggleClass("active");$('.nav_search_bg').toggleClass('show')});$(".nav_search_bg").click(function(){var _con=$('.nav_search_box');if(!_con.is(event.target)&&_con.has(event.target).length===0){$(".nav_search_bg").removeClass('show')}})});$(".drop_btn").mouseenter(function(){var display=$(this).children('.dropdown_box').css('display');if(display=='none'){$(this).children('.dropdown_box').slideDown().parent('li').siblings().children('.dropdown_box').slideUp("fast")}else{$(".dropdown_box").slideUp("fast")}});$(".drop_btn").mouseleave(function(){$(this).children('.dropdown_box').slideUp("fast")});$(".dropdown,.drop_btn").mouseleave(function(){$(this).parent(".dropdown_box").slideUp("fast")});$('.solution_top_ul li,.tunnel_Applications li').hover(function(){$(this).addClass('active').siblings().removeClass('active')});$(" .product_key  .more,.icon-solid-point li a,.product_series  a,.material_ore_middle .online-chat").click(function(){event.preventDefault();$('html,body').animate({scrollTop:$(this.hash).offset().top-80},800)});
	$(".tab_menu_box li a").click(function(){
	event.preventDefault();
	var offsetFromParent = $('.nav').position().top;
	if(offsetFromParent == 0  ){
		$('html,body').animate({scrollTop:$(this.hash).offset().top-80},800);
	}else{
		 $('html,body').animate({scrollTop:$(this.hash).offset().top-130},800);
	}})
var elementExists = $('#form_box').length > 0;
    $(".online_cta_left ").click(function(){
    if (elementExists) {
         event.preventDefault();$('html,body').animate({scrollTop:$(this.hash).offset().top},800)
    } else {
        // 元素不存在，链接到另一个地方
        window.location.href = 'https://www.sbmchina.com/brand/contact.html';
    }
	})
$('.smp_list ul li').hover(function () {
	var index = $('.smp_list ul li').index(this) + 1;
	var imgUrl = $(this).find('img').attr('src');
	var new_imgUrl = null;
	if (imgUrl.indexOf('active') != -1) { new_imgUrl = '/asset/images/inner/icon' + index + '.png'; } else { new_imgUrl = '/asset/images/inner/icon' + index + '-active.png';}$(this).find('img').attr('src', new_imgUrl); });
$('.smp_middle,.mk_middle,.mk_bottom').find('li').hover(function(){$(this).addClass("active").siblings('li').removeClass("active")});
$('.life_cycle_bottom,.case_advantages,.case_top_middle .ul_img').find('li').click(function(){$(this).addClass("active").siblings('li').removeClass("active")}); 
$(".f-top").click(function(){$("html,body").animate({scrollTop: 0}, 400);});	
var hoverTimer;$(".fixBar li").hover(function(){var that=$(this);hoverTimer=setTimeout(function(){that.children(".over-mask").show().css({opacity:0,}).stop().animate({right:parseInt(that.css("width")),opacity:1,})},200)},function(){var that=$(this);clearTimeout(hoverTimer);setTimeout(function(){that.children(".over-mask").stop().animate({right:parseInt(that.css("width"))+20,opacity:0,},"normal","linear",function(){that.children(".over-mask").hide()})},200)});
$(".f-close").click(function(){$(".fixBar").animate({right: -100,});$(".fixbar-expand ").animate({right: -20,});
   $(".fixbar-expand").click(function(){$(".fixbar-expand").animate({right: -100,});$(".fixBar ").animate({right: 0,});});})
function myFunction() {
var swiper=new Swiper(' .aggregate2_swiper',{autoplay:true,slidesPerView:2,spaceBetween:20,loop:true,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{750:{slidesPerView:1,slidesPerColumn:3,slidesPerColumnFill:'row',loop:false,virtualTranslate:true,},}});}
function myFunction3() {var swiper3=new Swiper('.aggregate_swiper3',{autoplay:true,slidesPerView:3,spaceBetween:20,loop:true,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},pagination:{el:".swiper-pagination",type:"progressbar",},breakpoints:{750:{slidesPerView:2,slidesPerColumn:2,slidesPerColumnFill:'row',loop:false,virtualTranslate:true,},}});}
$('.about_top img ').click(function(){var largeSrc=$(this).attr('data-large');$('#overlay .large-image').attr('src',largeSrc);$('#overlay').fadeIn()});$('#overlay').click(function(){$(this).fadeOut()});

function myFunction2() {
		var swiper3 = new Swiper('.aggregate_swiper4', {
			autoplay: true,
			slidesPerView: 3,
			spaceBetween: 20,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
			breakpoints: {
				750 : {
					slidesPerView: 1.2,

					slidesPerColumnFill: 'row',
					loop: false,
				},
			}
		});
	}
	var $wrapperIndex = $('.tab-wrapper'),
	$allTabsIndex = $wrapperIndex.find('.tab-pane'),
	$tabMenuIndex = $wrapperIndex.find('.tab-menu>li');
	$tabMenuIndex.each(function(i) {$(this).attr('data-tab', 'tab' + i);});
	$allTabsIndex.each(function(i) {$(this).attr('data-tab', 'tab' + i);});
	$a = $tabMenuIndex.on('click',
	function() {
		var dataTab3 = $(this).data('tab'),
		$getWrapper3 = $(this).closest($wrapperIndex);
		$getWrapper3.find($tabMenuIndex).removeClass('active');
		$(this).addClass('active');
		$getWrapper3.find($allTabsIndex).hide().filter('[data-tab=' + dataTab3 + ']').show();
	});
	$(".list_aggregate_top .tab-menu li").click(function() {myFunction();});
	$(".list_mining_bottom .tab-menu li").click(function() {myFunction3();});
	$(".list_aggregate_bottom  .tab-menu li").click(function() {myFunction2();});
	$('.tab_nav_beneficiation2').each(function() {
		$(this).find("li a").each(function(i, a) {
			var rowNum = Math.round($(a).height() / parseFloat($(a).css('line-height')));
			if (rowNum == 2) {
				$(a).css({ 'line-height': '1.5em', 'padding': '1rem 0' }) }
		})
	});
	$('.lot_swiper .swiper-wrapper').each(function() {
		$(this).find(".swiper-slide").each(function(i, a) {
			var rowNum = Math.round($(a).height() / parseFloat($(a).css('line-height')));
			if (rowNum == 3) {
				$(a).css({
 					'padding': '1.7rem 0 1.6rem 8rem'
				})}})});
 $('.lot_middle_2 h4 ').click(function() {
 					$(this).parent().addClass("active").siblings().removeClass("active") 
				});
	function setOmit(selector, line) {
		var el = $(selector);
		const width = (parseInt(el.css('letter-spacing')) ? parseInt(el.css('letter-spacing')) : 0 + parseInt(el.css('font-size')));
		const maxLength = line * parseInt(el.width() / width);
		const resourceText = el.text();
		if (resourceText.length < maxLength) return;
		const text = resourceText.substring(0, maxLength - 10);
		el.find('.showLess').remove();
		var showMore = '<a class="showMore" setOmit >Learn more >></a>'
		var showLess = '<a class="showLess" setOmit >Up>></a>'
		if (text.length < resourceText.length) {
			el.html(text + '...' + showMore)
		}
		$('.showMore').click(function() {
			el.html(resourceText + showLess)
 			$('.showLess').click(function() {
				el.html(text + showMore); 
				el.html(resourceText) ;
				setOmit(selector, line);
			})
		})
	}
	$(function() {
		var width = $(window).width();
		if (width < 751) {setOmit('.banner_b_text2 p', 10);}
		setOmit('.list_beneficiation_top_2 p', 16);
		setOmit('.list_beneficiation_top_3 p', 17);
	})
$('.col_top_right').find('.swiper-slide').hover(function(){$(this).addClass("active").siblings('.swiper-slide').removeClass("active")});$(window).scroll(function(){var targetOffset2=$('.products').offset().top-180;var currentPosition2=$(this).scrollTop();if(currentPosition2>=targetOffset2){animate__animated(pro_index)}});var pro_index=0;var productsSwiper=new Swiper('.products_index_swiper',{autoplay: true,observer:true,observeParents:true,observeSlideChildren:true,on:{slideChange:function(){var index=this.activeIndex;pro_index=index;$('.pro-pagination .paging').find('.item').removeClass('active');$('.pro-pagination .paging').find('.item').eq(index).addClass('active')},slideChangeTransitionEnd:function(){var index=this.activeIndex;animate__animated(index)}},pagination:{el:".swiper-pagination",type:"progressbar",},});function animate__animated(n){$('.pro-item .left-x').removeClass('animate__slideInLeft animate__animated active');$('.pro-item').eq(n).find('.left-x').addClass('animate__slideInLeft animate__animated active');$('.pro-item .right-x').removeClass('animate__slideInRight animate__animated active');$('.pro-item').eq(n).find('.right-x').addClass('animate__slideInRight animate__animated active')}$('.pro-pagination .paging').find('.item').click(function(){var index=$('.pro-pagination .paging').find('.item').index(this);productsSwiper.slideTo(index,500,function(){animate__animated(index)})});

 $(function () {
    var showMoreNChildren = function ($children, n) {
    var $hiddenChildren = $children.filter(":hidden");
    var cnt = $hiddenChildren.length;
    for ( var i = 0; i < n && i < cnt ; i++) {
     $hiddenChildren.eq(i).show();
     }
     return cnt-n;
   }
$(".showMoreNChildren").each(function () {
    var pagesize = $(this).attr("pagesize") || 10;
    var $children = $(this).children();
    if ($children.length > pagesize) {
         for (var i = pagesize; i < $children.length; i++) {
              $children.eq(i).hide();
         }
         $("<div class='showMorehandle' >View More News</div>").insertAfter($(this)).click(function () {
             if (showMoreNChildren($children, pagesize) <= 0) {
                   $(this).hide();
             };
         });
        }
    });
})();
	
});
/*************************************/
/*************************************/
var swiper = new Swiper(' .solution_swiper', {
	autoplay: true,
	slidesPerView: 1.36,
	spaceBetween: 0,
	loop: true,
	loopAdditionalSlides: 3,
	centeredSlides: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});
var swiper = new Swiper(' .solution_ming_swiper', {
	autoplay: true,
	slidesPerView: 4,
	spaceBetween: 20,
	breakpoints: {
		750 : {
			slidesPerView: 3.3,
		},
		480 : {
			slidesPerView: 3.3,
			spaceBetween: 10,
		},
	}
});
var swiper = new Swiper(' .solution_powder_swiper', {
	//autoplay:true,
	slidesPerView: 5,
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
	breakpoints: {
		750 : {
			slidesPerView: 3,
		},
		480 : {
			spaceBetween: 10,
			slidesPerView: 3,
		},
	}
});
var swiper = new Swiper('.banner_swiper', {
	autoplay:true,
	loop: true,
	loopAdditionalSlides: 3,
});
var swiper = new Swiper('.banner_swiper2', {
	autoplay:true,
	loop: true,
	loopAdditionalSlides: 3,
	breakpoints: {
		750 : {
	autoplay:false,
virtualTranslate: true,
},
	}
});

var swiper = new Swiper('.aggregate_swiper', {
 	autoplay:true,
	slidesPerView: 3,
	slidesPerColumn: 1,
	slidesPerColumnFill: 'row',
	spaceBetween: 20,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},

	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
		},
	}
});
var swiper = new Swiper('.powder_swiper', {
	autoplay: true,
	slidesPerView: 3,
	slidesPerColumn: 1,
	slidesPerColumnFill: 'row',
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	/*centeredSlides: true,*/
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn: 3,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate: true,
		},
	}
});
var swiper = new Swiper('.powder_bottom_swiper', {
	autoplay: true,
	slidesPerView: 6,
	slidesPerColumn: 1,
	slidesPerColumnFill: 'row',
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn: 3,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate: true,
		},
	}
});
var topswiper = new Swiper('.topswiper', {
 	spaceBetween: 15,
	slidesPerView: 1,
	loop: true,
 	initialSlide: 1,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: '.tab_menu_top',
		clickable: true,
		type: 'custom',
		renderCustom: function(swiper, current, total) {
			$('.tab_menu_top').children().eq(current - 1).addClass('active').siblings().removeClass('active');
			$('.tab_menu_top').on('click', 'li',
			function() {
				topswiper.slideToLoop($(this).index(), 1000, false)
			})
		}
	},
});
var topswiper_2 = new Swiper('.topswiper2', {
 	spaceBetween: 15,
	slidesPerView: 1,
	loop: true,
 	initialSlide: 4,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: '.tab_menu_top',
		clickable: true,
		type: 'custom',
		renderCustom: function(swiper, current, total) {
			$('.tab_menu_top').children().eq(current - 1).addClass('active').siblings().removeClass('active');
			$('.tab_menu_top').on('click', 'li',
			function() {
				topswiper_2.slideToLoop($(this).index(), 1000, false)
			})
		}
	},
	breakpoints: {
		750 : {
			slidesPerView: 1,
			slidesPerColumn: 5,
			slidesPerColumnFill: 'row',
	 	initialSlide: 4,
		loop: false,
			pagination: {
		clickable: true,
		type: 'custom',
		renderCustom: function(swiper, current, total) {
 			 $('.topswiper2 h4 ').click(function() {
 				event.preventDefault();
					$(this).parent().addClass("active").siblings().removeClass("swiper-slide-active").removeClass("active") 
				})
		}
	},
 		},
	}
});
var swiper = new Swiper(' .product_middle_swiper', {
	autoplay: true,
	slidesPerView: 1.5,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	centeredSlides: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerView: 1,
			slidesPerColumn: 4,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate: true,
		},
	}
});
var swiper = new Swiper(' .beneficiation_swiper', {
	autoplay: true,
	slidesPerView: 3.32,
	spaceBetween: 20,
	breakpoints: {
		750 : {
			slidesPerView: 1,
			slidesPerColumn: 11,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate: true,
		},
	}
});
var swiper = new Swiper('.beneficiation_swiper2',{
	slidesPerView: 3,
	spaceBetween: 20,
	breakpoints: {
		750 : {
			slidesPerView: 1,
			slidesPerColumn: 3,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate: true,
		},
	}
});

var swiper3 = new Swiper('.aggregate_csae_swiper4', {
    autoplay: true,
	slidesPerView: 3,
	spaceBetween: 20,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
	breakpoints: {
		750 : {
			slidesPerView: 1.2,
			slidesPerColumnFill: 'row',
			loop: false,
		},
	}
});
var swiper = new Swiper(' .product_swiper', {
	//autoplay:true,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
 });
var swiper = new Swiper(".product_swiper2", {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
/*****************************************************************/
var galleryThumbs = new Swiper('.gallery-thumbs', {
  direction: 'vertical',
  slidesPerView: 2.6,
  spaceBetween: 20,
	navigation: {
		nextEl: ".swiper-button-next2",
		prevEl: ".swiper-button-prev2",
	},
  on: {
    slideChange: function () {
      
    }
  }
});
document.querySelectorAll('.gallery-thumbs .swiper-slide').forEach((slide, index) => {
  slide.addEventListener('click', function() {
    // 跳转到指定slide并居中
    galleryThumbs.slideTo(index, 300, false);
  });
});
var galleryTop = new Swiper('.gallery-top', {
   	spaceBetween: 1,
 	navigation: {
		nextEl: ".swiper-button-next2",
		prevEl: ".swiper-button-prev2",
	},
	thumbs: {
	swiper: galleryThumbs
	}
});
  var swiper = new Swiper(".Advantages_swiper", {
      slidesPerView: 1,
      spaceBetween:20,
	  loop: false,
	  grid: {
    fill: 'column',
    rows: 4,
},
      navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
      breakpoints: {
        750: {
          slidesPerView: 3,
          spaceBetween: 20,
			 loop: true,
	  grid: {
    fill: 'column',
    rows: 1,
},
        },
       
      },
    });
 
var swiper = new Swiper('.mill_swiper', {
	autoplay: true,
	slidesPerView: 1.45,
	slidesPerColumnFill: 'row',
	spaceBetween: 10,
	loop: true,
	loopAdditionalSlides: 3,
	centeredSlides: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		750 : {
			slidesPerView: 4.5,
			spaceBetween: 20,
			 navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
		},
		550 : {
			slidesPerView: 1.45,
			spaceBetween: 20,
		},
	}
	
});
 var swiper = new Swiper(".tunnel_swiper", {
      slidesPerView: 2,
      spaceBetween:20,
	  loop: false,
	  grid: {
    fill: 'column',
    rows: 3,
},
      navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
      breakpoints: {
        750: {
          slidesPerView: 4,
          spaceBetween: 20,
			 loop: true,
	  grid: {
    fill: 'column',
    rows: 1,
},
        },
       
      },
    });
var swiper = new Swiper('.tunnel_swiper2', {
	slidesPerView: 1,
      spaceBetween: 20,
	   loop: false,
	  grid: {
    fill: 'column',
    rows: 5,
},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
	breakpoints: {
		750 : {
			slidesPerView: 3.5,
			spaceBetween: 20,
			loop: true,
		centeredSlides : true,
	  
			 grid: {
    fill: 'column',
    rows: 1,
},
		},
		1260 : {
			slidesPerView: 4.5,
			spaceBetween: 20,
			loop: true,
		centeredSlides : true,
	  
			 grid: {
    fill: 'column',
    rows: 1,
},
		},
	 
	}
	
	
});

/************/
/*************/
/*****************************************************************/


var swiper = new Swiper('.product_materials_swiper  ', {
	autoplay: true,
	slidesPerView: 4,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
			loop: false,
		},
	}
});
var swiper = new Swiper('.product_materials_swiper2  ', {
	autoplay: true,
	slidesPerView: 4,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn:4,
			slidesPerColumnFill: 'row',
			loop: false,
		},
	}
});

var swiper = new Swiper(' .service_swiper', {
	slidesPerView: 3,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		751 : {
			slidesPerView: 1.3,
			spaceBetween: 0,
			centeredSlides: true,
		},
	}
});
var swiper = new Swiper('.case_swiper', {
	autoplay: true,
	slidesPerView: 4,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	centeredSlides: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		750 : {
			slidesPerView: 1.3,
		},
	}
});
var swiper = new Swiper('.product_ben_swiper', {
	autoplay: true,
	slidesPerView: 4.5,
	slidesPerColumn: 1,
	slidesPerColumnFill: 'row',
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	centeredSlides: true,
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn: 3,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate: true,
		},
	}
});
var swiper = new Swiper(' .epco_swiper', {
	slidesPerView: 2,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	pagination: {
		el: '.swiper-pagination',
		type: "progressbar",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});
var swiper = new Swiper('.lot_swiper', {
	autoplay:true,
	slidesPerView: 5,
	slidesPerGroup: 5,
	spaceBetween: 20,
	slidesPerColumn: 2,
	slidesPerColumnFill: 'row',
 	pagination: {
		el: '.swiper-pagination2',
		clickable: true,
		type: "progressbar",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerColumn: 4,
	slidesPerColumnFill: 'row',
			slidesPerView: 2,
			spaceBetween: 20,
 			slidesPerGroup: 1,
			centeredSlides: false,
 },
	}
});
var swiper = new Swiper(' .about_swiper', {
	autoplay: true,
	slidesPerView: 8,
	spaceBetween: 20,
	pagination: {
		el: '.swiper-pagination',
		type: "progressbar",
		clickable: true,
	},
	breakpoints: {
		750 : {
			slidesPerView: 2.5,
		},
	}
});
var swiper = new Swiper(' .about_swiper2', {
	slidesPerView: 3,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	pagination: {
		el: '.swiper-pagination',
		type: "progressbar",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		751 : {
			slidesPerView: 1.5,
		},
	}
});
var swiper = new Swiper('.about_swiper3', {
	autoplay: true,
	slidesPerView: 4.5,
	slidesPerColumn: 1,
	slidesPerColumnFill: 'row',
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	centeredSlides: true,
	pagination: {
		el: '.swiper-pagination',
		type: "progressbar",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
			loop: false,
			centeredSlides: false,
 		},
	}
});
var swiper = new Swiper('.blog_swiper  ', {
	autoplay: true,
	slidesPerView: 4,
	slidesPerGroup: 4,
	spaceBetween: 20,
	loop: true,
 	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerGroup: 2,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
			loop: false,
			pagination: {
				el: '.swiper-pagination',
				type: "progressbar",
				clickable: true,
			},
			centeredSlides: false,
		},
	}
});
var swiper = new Swiper('.localized_swiper  ', {
	//autoplay: true,
	slidesPerView: 4,
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
			pagination: {
				el: '.swiper-pagination',
				type: "progressbar",
				clickable: true,
			},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerView: 1,
			slidesPerColumn: 15,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate : true,
			pagination: {
			 clickable: true,
		type: 'custom',
		renderCustom: function(swiper, current, total) {
			$('.localized_swiper .swiper-slide:gt(2)').hide();
 			 $('.localized_top .more ').click(function() {
				 $(this).hide();
 				$('.swiper-slide:gt(2)').show();
				})
		}
			},
		},
	}
});
var swiper_wl = new Swiper('.materials_top_swiper', {
	autoplay: true,
	direction: 'vertical',
	slidesPerView: 1.75,
 	spaceBetween: 20,
loop: true,
 	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		750 : {
			slidesPerView:1.56,
 		},
	}
});
var swiper = new Swiper(' .mill_product', {
	slidesPerView: 3,
	spaceBetween: 20,
slidesPerGroup: 3,
	loop: true,
	loopAdditionalSlides: 3,
	pagination: {
		el: '.swiper-pagination',
 		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		751 : {
	slidesPerView: 2,
	slidesPerGroup: 2,
		},
	}
});
var swiper = new Swiper('.smp_swiper', {
	autoplay: true,
	slidesPerView: 6,
	spaceBetween: 20,
	loop: true,
	breakpoints: {
		750 : {
			slidesPerView: 2,
			slidesPerColumn: 4,
			slidesPerColumnFill: 'row',
			loop: false,
			virtualTranslate: true,
		},
	}
});
var swiper = new Swiper('.smp_case_swiper', {
	autoplay: true,
	slidesPerView: 2,
	slidesPerColumn: 1,
	slidesPerColumnFill: 'row',
	spaceBetween: 20,
	loop: true,
	loopAdditionalSlides: 3,
	/*centeredSlides: true,*/
	breakpoints: {
		750 : {
			slidesPerView: 1,
			 
		},
	}
});
var swiper = new Swiper('.cooSwiper', {autoplay:true,slidesPerView: 6,spaceBetween: 20,navigation: {nextEl: ".swiper-button-next",prevEl: ".swiper-button-prev",},breakpoints: {750: {slidesPerView: 4,virtualTranslate : false,slidesPerColumn: 5,slidesPerColumnFill: 'row',}, }});
var swiper_1=new Swiper('.materials-list_top,.col_top_right',{slidesPerView:3,spaceBetween:20,virtualTranslate:true,pagination:{el:".swiper-pagination",type:"progressbar",},breakpoints:{750:{slidesPerView:2,virtualTranslate:false,},}});var swiper_2=new Swiper('.materials-list_bottom',{slidesPerView:3,spaceBetween:20,slidesPerColumn:2,virtualTranslate:true,pagination:{el:".swiper-pagination",type:"progressbar",},breakpoints:{750:{slidesPerView:2,virtualTranslate:false,},}});var swiper=new Swiper('.news-list_left',{slidesPerView:2,spaceBetween:20,virtualTranslate:true,breakpoints:{750:{slidesPerView:1.3,virtualTranslate:false,},}});var swiper=new Swiper('.news-list_right',{slidesPerView:4,/*spaceBetween:20,*/direction:"vertical",pagination:{el:".swiper-pagination",type:"progressbar",},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},freeMode: true,scrollbar: {el: ".swiper-scrollbar",},mousewheel: true,breakpoints:{750:{slidesPerView:3,virtualTranslate:false,},}});
var swiper=new Swiper('.mk_swiper',{autoplay:true,slidesPerView:3,slidesPerColumn:1,slidesPerColumnFill:'row',spaceBetween:20,loop:true,centeredSlides:true,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},breakpoints:{750:{slidesPerView:1,slidesPerColumn:6,slidesPerColumnFill:'row',loop:false,virtualTranslate:true,},}});var zucheng_swiper2=new Swiper(".swiper-zucheng-list",{loop:true,autoplay:{delay:3000,stopOnLastSlide:false,disableOnInteraction:false,},slidesPerView:3,freeMode:true,centeredSlides:true,watchSlidesProgress:true,});var zucheng_swiper=new Swiper(".swiper-zucheng",{loop:true,autoplay:{delay:3000,stopOnLastSlide:false,disableOnInteraction:false,},centeredSlides:true,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},thumbs:{swiper:zucheng_swiper2,},});var gongyiSwiper=new Swiper('.swiper-gongyi',{loop:true,autoplay:{delay:3000,stopOnLastSlide:false,disableOnInteraction:false,},noSwiping:true,slidesPerView:1,effect:'fade',watchOverflow:true,pagination:{el:".swiper-pagination",clickable:true,},});for(i=0;i<gongyiSwiper.pagination.bullets.length;i++){gongyiSwiper.pagination.bullets[i].onmouseover=function(){this.click()}};