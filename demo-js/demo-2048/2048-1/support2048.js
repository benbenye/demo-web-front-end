// 返回棋子top值
function getPosTop(i, j){
	return 20 + j*120;
}

// 返回棋子left值
function getPosLeft(i, j){
	return 20 + i*120;
}

// 更新数组，1表示添加棋子，大于2表示合并棋子
function updateBorad(flag, obj){
	if(flag == 1){//添加一个棋子
		board[obj.x][obj.y] = obj;//放入数组
	}

	var num = 0;
	for(var i = 0; i< dimension; ++i){
		for(var j = 0; j < dimension; ++j){
			if(board[i][j]){++num}
		}
	}
	empty = dimension * dimension - num;
	if(empty <=0){
		alert('falre');
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
	var tempArray = [],flag = false,merge = 1;

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
					$('#cell-'+tempArray[m+1].x+'-'+tempArray[m+1].y).detach();
					tempArray.splice(m+1,1);
					flag = true; ++merge;
					updateBorad(merge);
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
				if(board[k][i].x == k && board[k][i].y == i){flag = true;}
				board[k][i].x=k;
				board[k][i].y=i;
				showCell(board[k][i]);
			}
		}
		tempArray=[];
	}
	return flag;
}

function moveUp(){
	// 从上向下竖向遍历从左到右
	var tempArray = [],flag = false,merge = 1;

	for(var i = 0; i < dimension; ++i){
		for(var j = 0; j < dimension; ++j){
			if(board[i][j]){
				tempArray.push(board[i][j]);
				board[i][j]= undefined;
			}
		}
		if(tempArray.length>=1){
			for(var m = 0; m < tempArray.length -1; ++m){
				if(tempArray[m].number === tempArray[m+1].number){
					tempArray[m].number = tempArray[m].number*2;
					tempArray[m].color = 'c' + tempArray[m].number;
					$('#cell-'+tempArray[m+1].x+'-'+tempArray[m+1].y).detach();
					tempArray.splice(m+1,1);
					flag = true; ++merge;
					updateBorad(merge);
				}else{
					continue;
				}
			}
			for(var n = 0; n < dimension; ++n){
				board[i][n] = tempArray[n];
			}
		}
		//展示
		for(var k = 0; k < dimension; ++k){
			if(board[i][k]){
				$('#cell-'+board[i][k].x+'-'+board[i][k].y).detach();
				if(board[i][k].x == i && board[i][k].y == k){flag = true;}
				board[i][k].x=i;
				board[i][k].y=k;
				showCell(board[i][k]);
			}
		}
		tempArray=[];
	}
	return flag;
}

function moveRight(){

}

function moveDown(){

}
