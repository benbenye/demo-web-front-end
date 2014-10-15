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
// document.getElementById('grid-container')
// .addEventListener('touchstart',function(){
// 	e.preventDefault();
// 	var e = e.changedTouches[0];
// 	start(e);

// });

// document.getElementById('grid-container')
// .addEventListener('touchmove', function (e){
// 	e.preventDefault();
// 	var e = e.changedTouches[0];
// 	move(e);
// });

// document.getElementById('grid-container')
// .addEventListener('touchend', function (e){
// 	e.preventDefault();
// 	var e = e.changedTouches[0];
// 	end(e);
// });
function moveleft(){
	// 从左向右横向遍历
	var tempArray = [];

	for(var i = 0; i < dimension; ++i){
		for(var j = 0; j < dimension; ++j){
			if(board[j][i]){
				tempArray.push(board[j][i]);
				board[j][i]= undefined;
			}
		}
		if(tempArray.length>=1){
			for(var m = 0; m < tempArray.length -1; ++m){
				if(tempArray[m].number === tempArray[m+1].number){
					tempArray[m].number = tempArray[m].number*2;
					tempArray[m].color = 'c' + tempArray[m].number;
					tempArray.splice(m+1,1);
				}else{
					continue;
				}
			}
			for(var n = 0; n < dimension; ++n){
				board[n][i] = tempArray[n];
			}
		}
		//展示
		for(var k = 0; k < dimension; ++k){
			if(board[k][i]){
				$('#cell-'+board[k][i].x+'-'+board[k][i].y).detach();
				board[k][i].x=k;
				board[k][i].y=i;
				showCell(board[k][i]);
			}
		}
		tempArray=[];
	}
}

function moveUp(){
	// 从上向下竖向遍历从左到右
	var tempArray = [];

	for(var i = 0; i < dimension; ++i){
		for(var j = 0; j < dimension; ++j){
			if(board[j][i]){
				tempArray.push(board[j][i]);
				board[j][i]= undefined;
			}
		}
		if(tempArray.length>=1){
			for(var m = 0; m < tempArray.length -1; ++m){
				if(tempArray[m].number === tempArray[m+1].number){
					tempArray[m].number = tempArray[m].number*2;
					tempArray[m].color = 'c' + tempArray[m].number;
					tempArray.splice(m+1,1);
				}else{
					continue;
				}
			}
			for(var n = 0; n < dimension; ++n){
				board[n][i] = tempArray[n];
			}
		}
		//展示
		for(var k = 0; k < dimension; ++k){
			if(board[k][i]){
				$('#cell-'+board[k][i].x+'-'+board[k][i].y).detach();
				board[k][i].x=k;
				board[k][i].y=i;
				showCell(board[k][i]);
			}
		}
		tempArray=[];
	}
}

function moveRight(){

}

function moveDown(){

}
