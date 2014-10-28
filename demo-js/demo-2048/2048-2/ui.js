var ui = {
	/*
	*showBoard() 棋盘初始化
	*/
	showBoard : function(container,dimension){
		/*游戏初始化时棋盘准备
		*@param container dom输出容器
		**/
		var $container = $(container).empty();

		for (var i = 0; i < dimension; i++) {
			for(var j = 0; j < dimension; j++){
				var gridCell = $('<div class="grid-cell" id="#grid-cell-' + i + '-' + j+'"></div>');

				gridCell.css({ left : this.getPosTop( i, j)+'px', top : this.getPosLeft( i, j)+'px'});

				$container.append(gridCell);
			}
		}
	},
	/*
	*showCell() 显示棋子
	*/
	showCell : function(container,obj){
		var _str = $('<div class="cell '+obj.color+'" id="grid-cell-'+obj.x+'-'+obj.y+'">'+obj.number+'</div>');

		_str.css({ left : this.getPosLeft( obj.x, obj.y)+'px', top : this.getPosTop( obj.x, obj.y)+'px'});

		$(container).append(_str);
	},
	/*
	*新棋子动画
	*/
	newCellAnimate : function() {
		$('.cell:last').addClass('animate-new-cell');
	},

	/*
	*合并棋子动画
	*/
	mergeAnimate : function(firstObj, nextObj) {
		$('#grid-cell'+firstObj.x+'-'+firstObj.y).animate({left: firstObj.x1});
		$('#grid-cell'+nextObj.x+'-'+nextObj.y).animate({left: nextObj.x2},function() {
			$('#grid-cell'+firstObj.x+'-'+firstObj.y).remove();
			$(this).text(nextObj.number * 2);
		});

	},

	moveAnimate = function (obj, de) {
		if(de){			
			$('#grid-cell' + obj.x + '-' + obj.y).animate({
				left : obj.x1
			},function () {
				$(this).remove();
				obj.number = obj.number * 2;
			});
		} else {			
			$('#grid-cell' + obj.x + '-' + obj.y).animate({
				top : obj.y1
			},function () {
				$(this).remove();
				obj.number = obj.number * 2;
			});
		}
	};
	/*
	*getPosLeft() 得到棋子的左定位
	*/
	getPosLeft : function(i, j){
		return 20 + i * 120;
	},
	/*
	*getPosTop() 得到棋子的上定位
	*/
	getPosTop : function(i, j){
		return 20 + j * 120;
	}
}