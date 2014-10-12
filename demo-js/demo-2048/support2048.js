function getPosTop(j,i){
	return 20 + i*120;
}

function getPosLeft(j,i){
	return 20 + j*120;
}

function updateBorad(obj, flag){
	if(flag){//添加一个棋子
		board[obj.x][obj.y] = obj;//放入数组
		--empty;
	}else{//合并棋子

	}

}