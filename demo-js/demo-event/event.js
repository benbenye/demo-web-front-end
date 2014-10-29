/*
	@封装事件对象，跨浏览器
	@time 2014/07/02-13:54
	@author by bby
	@for 学习javascript dom事件处理程序
*/
var eventUtil={
	//添加句柄
	addHandler:function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,flase);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
	},
	//删除句柄
	removeHandler:function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,flase);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=null;
		}
	},
	//获取event对象
	getEvent:function(event){
		return event?event:window.event;
	},
	//获取事件类型
	getType:function(event){
		return event.type;
	},
	//获取事件目标
	getElement:function(event){
		return event.target||event.srcElement;
	},
	//阻止默认事件
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//阻止冒泡
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
}