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
		var first ,next, move, merge = 0;//合并后的位置

		for (var m = 0; m < this.dimension; ++m) {

			first = 0;
			next = 1;	

			for ( ; first < this.dimension - 1; ) {
				next = this.findNextUp(next,m);

				if( this.cells[m][first] ) {

					if(next != -1){

						if( this.cells[m][first].number === this.cells[m][next].number ) {
							this.cells[m][first].number *= 2;
							this.cells[m][first].color = 'c' + this.cells[m][first].number;

							ui.mergeAnimateY(this.cells[m][first], this.cells[m][next]);
							this.cells[m][next] = undefined;
							++merge;
						} else {

							if(first + 1 !== next){
								console.log('first:'+first+';next:'+next);
								ui.moveAnimateY(first+1, this.cells[m][next]);
								this.cells[m][first + 1] = this.cells[m][next];
								this.cells[m][first + 1].y = first + 1;
								this.cells[m][next] = undefined;

								move = 1;
							}
						}
						++first;
					} else {
						break;
					}
					
				} else {

					if(next != -1) {
								console.log('first:'+first+';next:'+next);
						ui.moveAnimateY(first, this.cells[m][next]);
						this.cells[m][first] = this.cells[m][next];
						this.cells[m][first].y = first;
						this.cells[m][next] = undefined;
						move = 1;
					} else {

						break;

					}
				}
				++next;
			};	
		}
		if(move || merge){
			var _this = this;
			setTimeout(function() {
				_this.ranCell();
			}, 200);		}
		for(var q = 0; q < this.dimension; ++q){
			var line = '';
			for( var w = 0; w < this.dimension; ++w){
				line = line + ' ' + (this.cells[w][q] !== undefined? this.cells[w][q].number:0);
			}
			console.log(line);
		}
		console.log('------------');

	};
	/*
	*键盘右方向的操作
	*/
	this.moveRight = function(){
		// 从右向左横向遍历
		var first ,next, move, merge = 0;//合并后的位置

		for (var m = 0; m < this.dimension; ++m) {

			first = this.dimension - 1;
			next = first -1;	

			for ( ; first > 0; ) {
				next = this.findNextRight(next,m);

				if( this.cells[first][m] ) {

					if(next != -1){

						if( this.cells[first][m].number === this.cells[next][m].number ) {
							this.cells[first][m].number *= 2;
							this.cells[first][m].color = 'c' + this.cells[first][m].number;

							ui.mergeAnimate(this.cells[first][m], this.cells[next][m]);
							this.cells[next][m] = undefined;
							++merge;
						} else {

							if(first - 1 !== next){
								console.log('first:'+first+';next:'+next);
								ui.moveAnimate(this.cells[first][m].x, this.cells[next][m],-1);
								this.cells[first - 1][m] = this.cells[next][m];
								this.cells[first - 1][m].x = first - 1;
								this.cells[next][m] = undefined;

								move = 1;
							}
						}
						--first;
					} else {
						break;
					}
					
				} else {

					if(next != -1) {
						console.log('first:'+first+';next:'+next);
						ui.moveAnimate(first, this.cells[next][m], 0);
						this.cells[first][m] = this.cells[next][m];
						this.cells[first][m].x = first;
						this.cells[next][m] = undefined;
						move = 1;
					} else {

						break;

					}
				}
				--next;
			};	
		}
		if(move || merge){
			var _this = this;
			setTimeout(function() {
				_this.ranCell();
			}, 200);
		}
		for(var q = 0; q < this.dimension; ++q){
			var line = '';
			for( var w = 0; w < this.dimension; ++w){
				line = line + ' ' + (this.cells[w][q] !== undefined? this.cells[w][q].number:0);
			}
			console.log(line);
		}
		console.log('------------');

	};
	/*
	*键盘下方向的操作
	*/
	this.moveDown = function(){
		// 从上向下竖向遍历从左到右
		var first ,next, move, merge = 0;//合并后的位置

		for (var m = 0; m < this.dimension; ++m) {

			first = this.dimension;
			next = this.dimension - 1;	

			for ( ; first > 0; ) {
				next = this.findNextDown(next,m);

				if( this.cells[m][first] ) {

					if(next != -1){

						if( this.cells[m][first].number === this.cells[m][next].number ) {
							this.cells[m][first].number *= 2;
							this.cells[m][first].color = 'c' + this.cells[m][first].number;

							ui.mergeAnimateY(this.cells[m][first], this.cells[m][next]);
							this.cells[m][next] = undefined;
							++merge;
						} else {

							if(first + 1 !== next){
								console.log('first:'+first+';next:'+next);
								ui.moveAnimateY(first - 1, this.cells[m][next]);
								this.cells[m][first - 1] = this.cells[m][next];
								this.cells[m][first - 1].y = first - 1;
								this.cells[m][next] = undefined;

								move = 1;
							}
						}
						--first;
					} else {
						break;
					}
					
				} else {

					if(next != -1) {
						console.log('first:'+first+';next:'+next);
						ui.moveAnimateY(first, this.cells[m][next]);
						this.cells[m][first] = this.cells[m][next];
						this.cells[m][first].y = first;
						this.cells[m][next] = undefined;
						move = 1;
					} else {

						break;

					}
				}
				--next;
			};	
		}
		if(move || merge){
			var _this = this;
			setTimeout(function() {
				_this.ranCell();
			}, 200);		}
		for(var q = 0; q < this.dimension; ++q){
			var line = '';
			for( var w = 0; w < this.dimension; ++w){
				line = line + ' ' + (this.cells[w][q] !== undefined? this.cells[w][q].number:0);
			}
			console.log(line);
		}
		console.log('------------');
	};
	/*
	*键盘左方向的操作
	*/
	this.moveLeft = function(){
		// 从左向右横向遍历
		var first ,next, move, merge = 0;//合并后的位置

		for (var m = 0; m < this.dimension; ++m) {

			first = 0;
			next = 1;	

			for ( ; first < this.dimension - 1; ) {
				next = this.findNextLeft(next,m);

				if( this.cells[first][m] ) {

					if(next != -1){

						if( this.cells[first][m].number === this.cells[next][m].number ) {
							this.cells[first][m].number *= 2;
							this.cells[first][m].color = 'c' + this.cells[first][m].number;

							ui.mergeAnimate(this.cells[first][m], this.cells[next][m]);
							this.cells[next][m] = undefined;
							++merge;
						} else {

							if(first + 1 !== next){
								console.log('first:'+first+';next:'+next);
								ui.moveAnimate(this.cells[first][m].x, this.cells[next][m],1);
								this.cells[first + 1][m] = this.cells[next][m];
								this.cells[first + 1][m].x = first + 1;
								this.cells[next][m] = undefined;

								move = 1;
							}
						}
						++first;
					} else {
						break;
					}
					
				} else {

					if(next != -1) {
								console.log('first:'+first+';next:'+next);
						ui.moveAnimate(first, this.cells[next][m], 0);
						this.cells[first][m] = this.cells[next][m];
						this.cells[first][m].x = first;
						this.cells[next][m] = undefined;
						move = 1;
					} else {

						break;

					}
				}
				++next;
			};	
		}
		this.updateEmpty(merge);
		if(move || merge){
			var _this = this;
			setTimeout(function() {
				_this.ranCell();
			}, 200);
		}
		for(var q = 0; q < this.dimension; ++q){
			var line = '';
			for( var w = 0; w < this.dimension; ++w){
				line = line + ' ' + (this.cells[w][q] !== undefined? this.cells[w][q].number:0);
			}
			console.log(line);
		}
		console.log('------------');

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
	*找到下一个不为空的位置
	*@next    		要找下一个不为空的位置的起始坐标
	*@m  			所在行、列 的坐标  
	*/
	this.findNextLeft = function(next, m) {

		for( ; next < this.dimension; ++next ) {

			if(this.cells[next][m]) {
				return next;
			}

		};

		return -1;
	};
	/*
	*找到下一个不为空的位置
	*@next    		要找下一个不为空的位置的起始坐标
	*@m  			所在行、列 的坐标  
	*/
	this.findNextRight = function(next, m) {

		for( ; next >= 0; --next ) {

			if(this.cells[next][m]) {
				return next;
			}

		};

		return -1;
	};
	/*
	*找到下一个不为空的位置
	*@next    		要找下一个不为空的位置的起始坐标
	*@m  			所在行、列 的坐标  
	*/
	this.findNextUp = function(next, m) {

		for( ; next < this.dimension; ++next ) {

			if(this.cells[m][next]) {
				return next;
			}

		};

		return -1;
	};
	/*
	*找到下一个不为空的位置
	*@next    		要找下一个不为空的位置的起始坐标
	*@m  			所在行、列 的坐标  
	*/

	this.findNextDown = function(next, m){

		for( ; next > 0; --next ) {

			if(this.cells[m][next]) {
				return next;
			}

		};

		return -1;
	};

	/*
	*合并了的无用棋子的销毁
	*/
	// this.destroy = function(){};
	// this.show = function(){};
}