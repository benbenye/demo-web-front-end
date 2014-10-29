window.onload=drag;

var dragTarget = '', webqq = '',
	winW = document.documentElement.clientWidth || document.body.clientWidth,
	winH = document.documentElement.clientHeight || document.body.clientHeight,
	maxW = 0, maxH,//窗口可以拖拽的最大范围
	x = 0, y =0,//相对于容器的水平垂直坐标
	left = 0, tops = 0;//计算得到的实际窗口的相对坐标

function getByclass (clsName, parent) {
	// 封装一个通过classname获取元素的方法
	var _parent = parent?document.getElementById(parent):document,
		elementArray = [],
		_temp = _parent.getElementsByTagName('*');

	for(var i = 0, l = _temp.length; i < l; i++){
		if(_temp[i].className == clsName){
			elementArray.push(_temp[i]);
		}
	}

	return elementArray;
}


function drag(){
	dragTarget = getByclass('drag-area')[0],
	webqq = getByclass('webqq')[0];

	dragTarget.onmousedown = mouseDown;
}

function mouseDown(e){
	e = eventUtil.getEvent(e),
	//鼠标按下时，获得的光标的坐标与移动面板左上角的距离
	x = e.clientX - webqq.offsetLeft,
	y = e.clientY - webqq.offsetTop;

	maxW = winW - webqq.offsetWidth,
	maxH = winH - webqq.offsetHeight;

	document.onmousemove = function(e){
		e = eventUtil.getEvent(e);

		left = e.clientX - x,
		tops = e.clientY - y;

		if(left < 0){
			left = 0;
		}else if(left > maxW){
			left = maxW;
		}
		if(tops < 0){
			tops = 0;
		}else if(tops > maxH){
			tops = maxH;
		}

		webqq.style.left = left + 'px';
		webqq.style.top = tops + 'px';

	};

	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}