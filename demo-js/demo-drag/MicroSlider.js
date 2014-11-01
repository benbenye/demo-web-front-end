/*
*	个人页js
*	封装了如下函数&插件。( @代码诗人小毛 2013年8月6日12:02:18 )
*		1、定制基于jQuery的不阻塞alert和confirm。
*		2、图片轮播。
*		3、拖拽排序。
*		4、常用基础方法。
*/
;(function($){
	$.fn.Microslider = function(opt){
		var def = {
			content:'#id-xm-content',			//内容ID
			control:'#id-xm-control',			//控制ID
			speed:350,							//轮转速度
			pace:4000							//频率
		};
		def = $.extend({},def,opt);
		var _w = $(def.content).find('li').eq(0).width();
		var num = $(def.content).find('li').length;
		var cur = 0;
		var timer = setInterval(function(){_animate();},def.pace);
		$(def.control).find('a').each(function(i){
			$(this).bind('click',function(){
				cur = i;
				var pos = $(this).position();
				_pause();
				$(def.content).stop().animate({left:-_w*i},def.speed);
				$(def.control).find('a.selected').removeClass('selected');
				$(this).addClass('selected');
			});
		});
		function _pause(){clearInterval(timer);}
		function _animate(){
			var next = (++cur)%num;
			var pos = $(def.control).find('li').eq(next).position();
			$(def.content).stop().animate({left:-_w*next},def.speed);
			$(def.control).find('a.selected').removeClass('selected');
			$(def.control).find('a').eq(next).addClass('selected');
		}
		function _continue(){timer = setInterval(function(){_animate();},def.pace);}
	}
	$('#id-xm-rorate').Microslider();
	$.fn.setRorate = function(opt){
		var def = {};
		def = $.extend({},def,opt);
		var pace = 400;
		var _move = false;
		var _x,_y;
		var _index;
		var _dom = $(this);
		_dom.find('li:not(.holder)').each(function(i){
			$(this).unbind('mousedown').bind('mousedown',function(e){
				if( $(e.target).closest('input').length != 0 ){
					$(this).find('input').focus();
					return true;
				}
				if( $(e.target).closest('.icon-set-close').length != 0 ){
					return;
				}
				if(e.preventDefault)
					e.preventDefault();
				if( e.which != 1 )
					return true;
				$(this).find('.icon-set-close').addClass('v-hide');
				_move = true;
				$('<li class="holder"></li>').insertAfter($(this));
				var _pos = $(this).position();
				$(this).addClass('moving').css({left:_pos.left+10,top:_pos.top+10});
				_index = _dom.find('li').index($(this));
				_x = e.pageX-parseInt($(this).css('left'));
				_y = e.pageY-parseInt($(this).css('top'));
			}).hover(function(){
				$(this).find('.icon-set-close').removeClass('v-hide');
			},function(){
				$(this).find('.icon-set-close').addClass('v-hide');
			});
			$(this).find('.icon-set-close').bind('click',function(){
				$(this).parent().parent().slideUp(pace,function(){
					$(this).remove();
					if( _dom.find('li:not(.holder,.moving)').length < 5 ){
						$('#id-upload').uploadify('disable',false);
					}
				});
			});
		});
		$(document).bind('mousemove',function(e){
			if(_move){
				if( e.preventDefault )
					e.preventDefault();
				else
					e.returnValue = false;
				var x = e.pageX-_x;
				var y = e.pageY-_y;
				var _moving = _dom.find('li.moving');
				_moving.css({left:x,top:y});
				_moving.find('.icon-set-close').addClass('v-hide');
				var _pos = _moving.position(),_width = _moving.outerWidth(),_height = _moving.outerHeight();
				var liArr = _dom.find('li:not(.holder,.moving)');
				var _mok = false;
				liArr.each(function(j){
					if( _mok == true )
						return;
					itemPos = $(this).position();
					if( Math.abs(itemPos.left - _pos.left) <= _width/2 && Math.abs(itemPos.top - _pos.top) <= _height/2 ){
						var h_index = _dom.find('li:not(.moving)').index($(this));
						var tmp = _dom.find('li.holder').clone();
						_dom.find('li.holder').remove();
						if( h_index == 0 )
							tmp.insertBefore($(this));
						else
							tmp.insertAfter(_dom.find('li:not(.moving)').eq(h_index-1));
						_mok = true;
					}
				});
			}
		}).bind('mouseup',function(e){
			if(_move){
				_move = false;
				var _pos = _dom.find('li.holder').position();
				_dom.find('li.moving').animate({left:_pos.left,top:_pos.top},180,function(){
					_dom.find('li.holder').replaceWith(_dom.find('li.moving'));
					_dom.find('li.moving').removeClass('moving');
				});
			}
		});

	}
	$('#id-set-drag').setRorate();
	$.extend({
		reglist:{
			email:"/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/",
			url:/[a-zA-z]+:\/\/[^\s]+/
		},
		alert:function(obj){
			var def = {fade:200,delay:1500,tip:"操作成功"};
			var o = $.extend({},def,obj);
			var imgUrl = (o.error==undefined)?"xm_tip_ok.png":"xm_tip_error.png";
			$('#xm-tip-dialog').remove();
			var dom = '<div class="xm-tip-dialog" id="xm-tip-dialog">'+
						'<img src="/public/images/' + imgUrl + '"/><span>'+ o.tip +'</span>'+
					  '</div>';
			$(dom).appendTo('body');
			$('#xm-tip-dialog').css({
				marginLeft:-$('#xm-tip-dialog').width()/2
			}).fadeIn(o.fade).delay(o.delay).fadeOut(o.fade,function(){
				$(this).remove();
				if( o.complete != undefined && typeof o.complete == "function" ) 
					o.complete();
			});
		},
		confirm:function(obj){
			var pace = 200;
			var def = {};
			var o = $.extend({},def,obj);
			var conDom = '';
			if( o.buttons != undefined ){
				conDom += (o.buttons.length==0)?'':'<div class="xm-con-btn">';
				for(var i=0;i<o.buttons.length;i++){
					var tmp = 	'<a href="javascript:void(0);" class="rl-btn">'+
									o.buttons[i].name +
								'</a>';
					conDom += tmp;
				}
				conDom += (o.buttons.length==0)?'':'</div>';
			}
			var dom = 	'<div class="xm-mask" id="xm-mask"></div>'+
						'<div class="xm-con-dialog" id="xm-con-dialog">'+
							'<div class="xm-con-title">'+
								'<a href="javascript:void(0);" class="dialog-close">×</a>'+
							'</div>'+
							'<div class="xm-con-main">'+o.content+'</div>'+conDom+
					  	'</div>';
			$(dom).appendTo('body');
			if( o.init != undefined && typeof o.init == 'function' )
				o.init();
			if( obj.buttons.length != 0 ){
				$('#xm-con-dialog .xm-con-btn>a').each(function(i){
					if( obj.buttons[i].callback != undefined ){
						$(this).bind('click',function(){
							if( obj.buttons[i].callback() == false )
								return;
							$('#xm-con-dialog,#xm-mask').remove();
						});
					}
				});
			}
			$('#xm-con-dialog a.dialog-close').bind('click',function(){
				$('#xm-con-dialog,#xm-mask').remove();
			});
			$('#xm-con-dialog').css({
				marginLeft:-$('#xm-con-dialog').width()/2,
				marginTop:-$('#xm-con-dialog').height()/2
			}).fadeIn(pace);
		},
		loadCss:function(url,obj){
			/*
				加载url指定的样式，可替换obj指定的样式表。
			*/
			var _dom;
			if(  !!obj && $(obj).size()>0 && $(obj).attr("tagName")=='LINK' ){  
	            _dom=$(obj);  
	            $(_dom).attr("type","text/css");  
	            $(_dom).attr("rel","stylesheet");  
	        }else{  
	            _dom=$('<link type="text/css" rel="stylesheet" />');
	        }  
	        _dom.attr('href',url); 
	        _dom.appendTo($('head')); 
	        return _dom;
		}
	});
})(jQuery);


