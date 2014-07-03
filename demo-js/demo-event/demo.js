dom2级事件处理程序
定义了两个方法：
用于处理指定和删除事件处理程序的操作
addEventListener() removeEventListner()
接收三个参数：要处理的事件名、作为事件处理程序的函数和布尔值
布尔值 false 用于 冒泡阶段调用
ture用于捕获

IE事件处理程序
attachEvent()
detachEvent()
接收相同的两个参数，事件处理程序的名称和事件处理程序的函数

跨浏览器事件处理程序 
能力检测
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
	getEvent:function(event){
		return event?event:window.event;
	},
	getType:function(event){
		return event.type;
	},
	getElement:function(event){
		return event.target||event.srcElement;
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
}

eventUtil.addHandler(,,);

事件对象
dom的事件属性
type 事件类型
target 事件目标
stopPropagation()阻止冒泡
preventDefault()阻止默认行为
bubbles属性
canselable 属性
ie不支持 
ie中的事件对象
type 事件类型
srcElement事件目标
cancelBubble=true 阻滞事件冒泡 属性 设置为 true 为阻止
returnValue=false 阻止事件的默认行为

event=event || window.event;
event.target || event.srcElement;

drag.js

document.getElementsById
document.getElementsByClassName()
function getByClass(clsName,parent){
	var oParent = parent?document.getElementById(parent):document,
		eles = [],
		elements = oParent.getElementsByTagName('*');
	for(var i=0,l=elements.length;i<l;i++){
		if(elements[i].className == clsName){
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload=drag;

function drag(){
	var oTitle = getByClass('login-logo-webqq')[0];
	oTitle.onmusedown = fnDown;
};
function fnDown(e){
	document.onmusemove = function(event){
		event = event || window.event;
		document.title=event.clientX+','+event.clientY;
	}
}