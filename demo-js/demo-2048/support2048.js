// 返回棋子top值
function getPosTop(i, j){
	return 20 + j*120;
}

// 返回棋子left值
function getPosLeft(i, j){
	return 20 + i*120;
}

// 更新数组，1表示添加棋子，0表示合并棋子
function updateBorad(obj, flag){
	if(flag){//添加一个棋子
		board[obj.x][obj.y] = obj;//放入数组
		--empty;
	}else{//合并棋子

	}
}

// 手机端上1下2左3右4手势
document.getElementById('grid-container')
.addEventListener('touchstart',function(){
	e.preventDefault();
	var e = e.changedTouches[0];
	start(e);

});

document.getElementById('grid-container')
.addEventListener('touchmove', function (e){
	e.preventDefault();
	var e = e.changedTouches[0];
	move(e);
});

document.getElementById('grid-container')
.addEventListener('touchend', function (e){
	e.preventDefault();
	var e = e.changedTouches[0];
	end(e);
});