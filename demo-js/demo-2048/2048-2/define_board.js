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
		if(empty){
			var _ranCell = Math.random() > 0.5 ? {number : 2,color : 'c2', x : 0, y : 0} : {number : 4, color : 'c4', x : 0, y : 0},
				_ranDes = 0;

			// 随机生成一个位置，按照一个规则顺序查找是否有一个空位置
			_ranDes = Math.floor( Math.random() * this.dimension * this.dimension );//0-15
			_ranCell.x = parseInt( _ranDes / this.dimension );
			_ranCell.y = _ranDes % this.dimension;

			for(var i = 0; i < this.dimension * this.dimension; ++i) {
				if( !this.cells[_ranCell.x][_ranCell.y] ) {
					// 实例化一个随机棋子
					var cellNew = new Cell(_ranCell.x, _ranCell.y, _ranCell.color, _ranCell.number);
					this.cells[_ranCell.x][_ranCell.y] = cellNew;
					break;
				}else{
					if( _ranCell.y === (this.dimension - 1) ) {//本列最后一个
						if( _ranCell.x === (this.dimension - 1) ) {//本行最后一个
							_ranCell.x = 0;
							_ranCell.y = 0;
							continue;
						} else {
							_ranCell.x += 1;
							_ranCell.y = 0;
							continue;						
						}
					} else {					
						_ranCell.y += 1;
						continue;	
					}
				}				
			}

			this.updateEmpty(cellNew);
			cellNew.show(this.container, cellNew, 1);
		}else{
			alert('无空位置');
		}
	};
	/*
	*键盘上方向的操作
	*/
	this.moveUp = function(){
		// 从上向下竖向遍历从左到右
		var tempArray = [],//临时数组用于合并棋子
			move = false,//是否移动棋子
			merge = 0;//合并棋子对数

		for(var i = 0; i < this.dimension; ++i){
			for(var j = 0; j < this.dimension; ++j){
				if(this.cells[i][j]){
					tempArray.push(this.cells[i][j]);
					this.cells[i][j]= undefined;
				}
			}
			if(tempArray.length>=1){
				for(var m = 0; m < tempArray.length -1; ++m){
					if(tempArray[m].number === tempArray[m+1].number){
						tempArray[m].number = tempArray[m].number*2;
						tempArray[m].color = 'c' + tempArray[m].number;
						$('#grid-cell-'+tempArray[m+1].x+'-'+tempArray[m+1].y).detach();
						tempArray.splice(m+1,1);
						++merge;
					}
				}
				for(var n = 0; n < this.dimension; ++n){
					this.cells[i][n] = tempArray[n];
				}
			}
			//展示
			for(var k = 0; k < this.dimension; ++k){
				if(this.cells[i][k]){
					$('#grid-cell-'+this.cells[i][k].x+'-'+this.cells[i][k].y).detach();
					if(!merge && this.cells[i][k].y != k) {
						move = true;
					}
					this.cells[i][k].x=i;
					this.cells[i][k].y=k;
					ui.showCell(this.container, this.cells[i][k]);
				}
			}
			tempArray=[];
		}
		this.updateEmpty(merge);
		if(move || merge){
			this.ranCell();
		}
	};
	/*
	*键盘右方向的操作
	*/
	this.moveRight = function(){
		// 从右向左横向遍历
		var tempArray = [],//临时数组用于合并棋子
			move = false,//是否移动棋子
			merge = 0;//合并棋子对数

		for(var i = 0; i < this.dimension; ++i){
			for(var j = this.dimension - 1; j >= 0; --j){
				if(this.cells[j][i]){
					tempArray.push(this.cells[j][i]);
					this.cells[j][i]= undefined;
				}
			}
			if(tempArray.length>=1){
				for(var m = 0; m < tempArray.length -1; ++m){
					if(tempArray[m].number === tempArray[m+1].number){
						tempArray[m].number = tempArray[m].number*2;
						tempArray[m].color = 'c' + tempArray[m].number;
						$('#grid-cell-'+tempArray[m+1].x+'-'+tempArray[m+1].y).detach();
						tempArray.splice(m+1,1);
						++merge;
					}else{
						continue;
					}
				}
				for(var n = this.dimension - 1; n >= 0; --n){
					this.cells[n][i] = tempArray[this.dimension - 1 - n];
				}
			}
			//展示
			for(var k = this.dimension - 1; k >= 0; --k){
				if(this.cells[k][i]){
					$('#grid-cell-'+this.cells[k][i].x+'-'+this.cells[k][i].y).detach();
					if(!merge && this.cells[k][i].x != k) {
						move = true;
					}
					this.cells[k][i].x=k;
					this.cells[k][i].y=i;
					ui.showCell(this.container, this.cells[k][i]);
				}
			}
			tempArray=[];
		}
		this.updateEmpty(merge);
		if(move || merge){
			this.ranCell();
		}
	};
	/*
	*键盘下方向的操作
	*/
	this.moveDown = function(){
		// 从上向下竖向遍历从左到右
		var tempArray = [],//临时数组用于合并棋子
			move = false,//是否移动棋子
			merge = 0;//合并棋子对数

		for(var i = 0; i < this.dimension; ++i){
			for(var j = this.dimension - 1; j >= 0; --j){
				if(this.cells[i][j]){
					tempArray.push(this.cells[i][j]);
					this.cells[i][j]= undefined;
				}
			}
			if(tempArray.length >= 1){
				for(var m = 0; m < tempArray.length -1; ++m){
					if(tempArray[m].number === tempArray[m+1].number){
						tempArray[m].number = tempArray[m].number*2;
						tempArray[m].color = 'c' + tempArray[m].number;
						$('#grid-cell-'+tempArray[m+1].x+'-'+tempArray[m+1].y).detach();
						tempArray.splice(m+1,1);
						++merge;
					}
				}
				for(var n = this.dimension - 1; n >= 0; --n){
					this.cells[i][n] = tempArray[this.dimension - 1 - n];
				}
			}
			//展示
			for(var k = this.dimension - 1; k >= 0; --k){
				if(this.cells[i][k]){
					$('#grid-cell-'+this.cells[i][k].x+'-'+this.cells[i][k].y).detach();
					if(!merge && this.cells[i][k].y != k) {
						move = true;
					}
					this.cells[i][k].x=i;
					this.cells[i][k].y=k;
					ui.showCell(this.container, this.cells[i][k]);
				}
			}
			tempArray=[];
		}
		this.updateEmpty(merge);
		if(move || merge){
			this.ranCell();
		}
	};
	/*
	*键盘左方向的操作
	*/
	this.moveLeft = function(){
		// 从左向右横向遍历
		var tempArray = [],//临时数组用于合并棋子
			move = false,//是否移动棋子
			merge = 0;//合并棋子对数

		for(var i = 0; i < this.dimension; ++i){
			for(var j = 0; j < this.dimension; ++j){
				if(this.cells[j][i]){
					tempArray.push(this.cells[j][i]);
				}
			}
			if(tempArray.length>=1){
				for(var m = 0; m < tempArray.length -1; ++m){
					if(tempArray[m].number === tempArray[m+1].number){
						tempArray[m].number = tempArray[m].number*2;
						tempArray[m].color = 'c' + tempArray[m].number;
						tempArray[m+1].x1 = tempArray[m].x;
						tempArray[m+1].y1 = tempArray[m].y;
						++m;
						// $('#grid-cell-'+tempArray[m+1].x+'-'+tempArray[m+1].y).detach();
						// tempArray.splice(m+1,1);
						++merge;
					}else{
						continue;
					}
				}
				for(var n = 0; n < this.dimension; ++n){
					this.cells[n][i] = tempArray[n];
				}
			}
			//展示
			for(var k = 0; k < this.dimension; ++k){
				if(this.cells[k][i]){
					$('#grid-cell-'+this.cells[k][i].x+'-'+this.cells[k][i].y).detach();
					if(!merge && this.cells[k][i].x != k) {
						move = true;
					}
					this.cells[k][i].x=k;
					this.cells[k][i].y=i;
					ui.showCell(this.container, this.cells[k][i]);
				}
			}
			tempArray=[];
		}
		this.updateEmpty(merge);
		if(move || merge){
			this.ranCell();
		}
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