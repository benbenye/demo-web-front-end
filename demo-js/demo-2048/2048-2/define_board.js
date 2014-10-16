function Board(dimension,score,container){
	/*棋盘对象
	*@param dimension 棋盘维度
	*@param container 棋盘渲染dom容器
	*@param score 分数
	*@empty 记录空位置
	*/
	this.dimension = dimension;
	this.empty = dimension * dimension;
	this.score = score;
	this.container = container;
	/*
	*棋盘初始化
	*/
	this.init = function(){
		// 重置数组
		this.cells = new Array(dimension);
		for(var i = 0; i < dimension; ++i){
			this.cells[i] = new Array(dimension);
		}

		empty = dimension * dimension;

		ui.showBoard(this.container,dimension);

		this.start();
	};
	/*
	*游戏开始
	*/
	this.start = function(){
		this.ranCell();
		this.ranCell();
	};
	/*
	*生成带有随机数的棋子
	*/
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

		this.updateEmpty(cellNew);

		cellNew.show(this.container, cellNew);
	};
	/*
	*键盘上方向的操作
	*/
	this.moveUp = function(){
		console.log('d1');
	};
	/*
	*键盘右方向的操作
	*/
	this.moveRight = function(){
		console.log('d2');
	};
	/*
	*键盘下方向的操作
	*/
	this.moveDown = function(){
		console.log('d3');
	};
	/*
	*键盘左方向的操作
	*/
	this.moveLeft = function(){
		console.log('d4');
	};
	/*
	*计算游戏分数
	*/
	this.computing = function(){return score;};
	/*
	*每次棋子有变化都需要重新计算empty
	*/
	this.updateEmpty = function(obj){
		/*每次棋子有变化都需要重新计算empty
		*@param obj 随机棋子 || 合并棋子对数
		*/

		if(typeof obj == 'number' && obj > 0){

			this.empty -= obj;

		}else if(typeof obj == 'object' && typeof obj.x == 'number' && typeof obj.y == 'number'){

			this.cells[obj.x][obj.y] = obj;
			--this.empty;
		}
	};
	/*
	*合并了的无用棋子的销毁
	*/
	// this.destroy = function(){};
	// this.show = function(){};
}