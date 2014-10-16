function Board(dimension,score,container){
	this.dimension = dimension;
	this.empty = dimension * dimension;
	this.score = score;
	this.init = function(container){
		// 重置数组
		this.cells = new Array(dimension);
		for(var i = 0; i < dimension; ++i){
			this.cells[i] = new Array(dimension);
		}

		empty = dimension * dimension;

		ui.showBoard(container,dimension);

		this.start();
	};
	this.start = function(){
		this.ranCell();
		this.ranCell();
	};
	this.ranCell = function(){
		var _ranCell = Math.random() > 0.5 ? {number : 2,color : 'c2', x : 0, y : 0} : {number : 4, color : 'c4', x : 0, y : 0},
			_ranDes = 0;

		if(empty){
			// 生成随机出现的位置
			_ranDes = Math.floor( Math.random() * empty + 1 );
		}

		// ？另一个方法，随机生成一个位置，按照一个规则顺序查找是否有一个空位置

		// 找到空位置坐标
		for(var i = 0; i < dimension; ++i){//i为x轴
			for( var j = 0; j < dimension; ++j){
				if(!this.cells[i][j]){//如果是空
					--_ranDes;
				}
				if(_ranDes == 0){//找到空位置
					_ranCell.x = i;
					_ranCell.y = j;
					break;
				}
			}

			if(_ranDes == 0){//找到空位置
				break;
			}
		}

		// 实例化一个随机棋子
		var cellNew = new Cell(_ranCell.x, _ranCell.y, _ranCell.color, _ranCell.number);

		this.cells[cellNew.x][cellNew.y] = cellNew;
		cellNew.show();
	};
	this.moveUp = function(){};
	this.moveRight = function(){};
	this.moveDown = function(){};
	this.moveLeft = function(){};
	this.computing = function(){return score;}
	// this.update = function(){};
	// this.destroy = function(){};
	this.show = function(){};
}