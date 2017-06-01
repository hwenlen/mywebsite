$(function(){
	
	if(window.navigator.userAgent.indexOf('MSIE 8.0') != -1) {
	    alert('本站部分效果不支持ie8及以下版本浏览器，页面可能无法正常显示，请升级浏览器或更换其他浏览器');
	}
	
	//整体运动效果
	$('.show-1 a').click(function(){
		$('#con_left>div').slideUp('slow');
		$('.home_page1').slideDown('slow');
		$('.logo').stop().animate({'marginLeft':'390px'}, 'slow',function(){
			$('.logo').stop().animate({'marginTop':'120px'},'slow');
		});
		return false;
	});
	$('.show-2 a').click(function(){
		$('#con_left>div').slideUp('slow');
		$('.home_page2').slideDown('slow');
		$('.logo').stop().animate({'marginTop':0},'slow',function(){
			$('.logo').stop().animate({'marginLeft':0},'slow');
		});
		return false;
	});
	$('.show-3 a').click(function(){
		$('#con_left>div').slideUp('slow');
		$('.home_page3').slideDown('slow');
		$('.logo').stop().animate({'marginTop':0},'slow',function(){
			$('.logo').stop().animate({'marginLeft':0},'slow');
		});
		return false;
	});
	$('.show-4 a').click(function(){
		$('#con_left>div').slideUp('slow');
		$('.home_page4').slideDown('slow');
		$('.logo').stop().animate({'marginTop':0},'slow',function(){
			$('.logo').stop().animate({'marginLeft':0},'slow');
		});
		return false;
	});
	
	//header时间
	;(function(){
		var oTime = $('#header .head-con .hc_right');
		function clock(){
			var oDate = new Date();
			var iH = oDate.getHours();
			var iMin = oDate.getMinutes();
			var iS = oDate.getSeconds();
			oTime.html('Time: '+toDou(iH)+':'+toDou(iMin)+':'+toDou(iS));
		}
		clock();
		setInterval(clock,1000)
	})();
	
	//header天气预报
	
	$.ajax({
		url:'https://api.asilu.com/weather/',
		dataType:'jsonp',
		data:{
			city:'上海'
		},
		cbName:'callback',
		success:function(json){
			var arr=json.weather;
			var oWeather = $('#weather');
			var oWbox = $('#weather div');
			var oDegree=$('<p></p><p></p><p></p><p></p>');
			oDegree.appendTo(oWbox);
			oDegree.eq(0).html(arr[0].date);
			oDegree.eq(1).html(json.city);
			oDegree.eq(2).html(arr[0].weather);
			oDegree.eq(3).html(arr[0].temp);
			function jTop(){
				oWbox.stop().animate({'top':-oWbox.outerHeight()},6000,function(){
					oWbox.css('top',oWeather.outerHeight());
					jTop();
				});
			}
			jTop();
			
		}
	});

	//logo放大
	$('.logo').mouseenter(function(){
		$(this).css({'transition':'0.6s','transform':'scale(1.4)'});
	});
	$('.logo').mouseleave(function(){
		$(this).css({'transition':'0.6s','transform':'scale(1)'});
		$('.logo').on('transitionend',function(){
			$(this).css({'transition':'0s'});
		})
	})
	
	
	//首页淡入淡出轮播图
	;(function(){
		var page1Ul = $('#content .home_page1 .ch1_text ul');
		var page1Li = $('#content .home_page1 .ch1_text ul li');
		
		var timer = null;
		var iNow = 0;
		page1Ul.mouseover(function(){
			clearInterval(timer);
		});
		page1Ul.mouseout(function(){
			clearInterval(timer);
			next();
		})
		function next(){
			timer = setInterval(function(){
				iNow++;
				tab();
			},3000);
		}
		next();
		function tab(){
			for(var i=0;i<page1Li.length;i++){
				move(page1Li[i],{'opacity':0});;
			}
			move(page1Li[iNow%3],{'opacity':1},{duration:2000});
		}
	})();

	//page2轮播图
	;(function(){
		var page2Ul = $('.home_page2 .learn .learn_left .learn_left_r ul');
		var page2Li = $('.home_page2 .learn .learn_left .learn_left_r ul li');
		var pageImg = $('.home_page2 .learn .learn_left .learn_left_r ul li img');
		
		var iNow = 0;
		var arr = ['HTML','CSS','JavaScript']
		function next(){
			setInterval(function(){
				iNow++;
				page2Li.stop().animate({'opacity':0});
				page2Li.eq(iNow%3).stop().animate({'opacity':1});
			},3000);
		}
		next();
	})();
	
	//page2自我介绍打字效果
	;(function(){
		var str = '本人性格沉稳，工作认真负责，待人真诚，沟通能力良好，善于与团队合作，乐于学习，对Web前端开发有浓厚兴趣，熟练掌握网站制作的相关技术。';
		
		var oStext = document.getElementById('self_text');
		var oP = oStext.getElementsByTagName('p')[0];
		var oConr = document.getElementById('con_right');
		var oRli = getByClass(oConr,'show-2')[0];
		var oBtn2 = oRli.getElementsByTagName('a')[0];
		oBtn2.onclick = function(){
			oP.innerHTML = '';
			for(i=0; i<str.length; i++){
				var os = document.createElement('span');
				os.innerHTML = str.charAt(i);
				oP.appendChild(os);
			}
			var aSpan = oP.children;
			var i=0;
			var timer = null;
			timer = setInterval(function(){
				move(aSpan[i],{opacity:1});
				i++;
				if(i==aSpan.length){
					clearInterval(timer);
				}
			},50);	
		}
		
	})();
	
	//page3 页码选项卡
	;(function(){
		var page3Ul = $('#con_left .home_page3 .work ul');
		var page3Oli = $('#con_left .home_page3 .work ol li');
		var page3Div = page3Ul.parent();
		
		page3Oli.click(function(){
			page3Oli.removeClass('on');
			page3Oli.eq($(this).index()).addClass('on');
			page3Ul.stop().animate({'left':-$(this).index()*page3Div.outerWidth()});
		})
	})();

	//page3 a链接
	;(function(){
		var aA = $('#con_left .home_page3 .work ul li a');
		var aImg = $('#con_left .home_page3 .work ul li a img');
		var aSpan = $('#con_left .home_page3 .work ul li span');

		var hrefArr = ['taobao_enlarge','Accordion','blast','Puzzle','AppleMenu','Progressbar','clock','3Dpicture','3Dcircle','appleWatch','bear','taobao'];
		var titArr = ['淘宝放大镜','手风琴图片','爆炸轮播图','拼图游戏','苹果电脑菜单','进度条轮播图','时钟','3D图片环','3D图形变换','苹果手表','熊','仿写移动端淘宝'];
		
		for(var i=0; i<aA.length; i++){
			aA.eq(i).attr({'href':'./demo/'+hrefArr[i]+'.html'});
			aImg.eq(i).attr({'src':'./img/'+hrefArr[i]+'.jpg','alt':titArr[i]});
			aSpan.eq(i).html(titArr[i]);
		}
		aA.mouseenter(function(){
			$(this).css({'transition':'0.6s','transform':'scale(1.2)'});
		});
		aA.mouseleave(function(){
			$(this).css({'transition':'0.6s','transform':'scale(1)'});
			aA.on('transitionend',function(){
				$(this).css({'transition':'0s'});
			})
		})
	})();


})

