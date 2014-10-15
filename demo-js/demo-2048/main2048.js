var 
	dimension = 4,//维度
	board = new Array(dimension),//存储存在的棋子对象
	score = 0,//记录分数
	empty = dimension*dimension;//空位置计数器

for(var i = 0; i < dimension; i++){
	board[i] = new Array(dimension);
}//创建二维数组存储对象,数组遍历竖向龙摆尾

function CellObj(x, y, color, number){//棋子对象
	this.x = x;//X坐标
	this.y = y;//Y坐标
	this.color = color;//颜色值
	this.number = number;//显示数字
}

$(document).ready(function(){
	newgame();
});

function newgame(){
	/* 初始化棋盘格
	*@pram dimension:棋盘大小
	*/
	init(dimension);

	// 随机生成两个格子的数字
	ranNum(true);
	ranNum(true);
}

function init(dimension){
	// 重置数组
	for(var i = 0; i < dimension; ++i){
		for(var j = 0; j < dimension; ++j){
			board[i][j] = undefined;
		}
	}
	empty = dimension * dimension;

	var $container = $('#grid-container').empty();
	for (var i = 0; i < dimension; i++) {
		for(var j = 0; j < dimension; j++){
			var gridCell = $('<div class="grid-cell" id="#grid-cell-' + i + '-' + j+'"></div>');
			gridCell.css({ left : getPosTop( i, j)+'px', top : getPosLeft( i, j)+'px'});
			$container.append(gridCell);
		}
	}
}

function ranNum(flag){
	flag = flag || false;
	if(flag){
		var _ranNum = Math.random() > 0.5 ? {number : 2,color : 'c2'} : {number : 4, color : 'c4'};

		if(empty){
			// 生成随机出现的位置
			var _ranDes = Math.floor( Math.random() * empty + 1 );
		}

		// ？另一个方法，随机生成一个位置，按照一个规则顺序查找是否有一个空位置

		// 找到空位置坐标
		var destination = {x:0,y:0};
		for(var i = 0; i < dimension; ++i){//i为x轴
			for( var j = 0; j < dimension; ++j){
				if(!board[i][j]){//如果是空
					--_ranDes;
				}
				if(_ranDes == 0){//找到空位置
					destination.x = i;
					destination.y = j;
					break;
				}
			}

			if(_ranDes == 0){//找到空位置
				break;
			}
		}

		// 实例化一个随机棋子
		var CellObjNew = new CellObj(destination.x, destination.y, _ranNum.color, _ranNum.number);

		// 更新数组
		updateBorad(1, CellObjNew);

		// 显示数字
		showCell(CellObjNew);
	}
}
// 键盘上下左右
$(window).keyup(function(e){
	/*left 37
	*up 38
	*right 39
	*down 40*/
	switch(e.keyCode)
	{
		case 37:
			
			ranNum(moveleft());
			break;
		case 38:
			
			ranNum(moveUp());
			break;
		case 39:
			
			ranNum(moveRight());
			break;
		case 40:
			
			ranNum(moveDown());
			break;
		default :
			alert('只能上下左右');
			break;
	}
});