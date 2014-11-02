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
				var gridCell = $('<div class="grid-cell" id="cell-' + i + '-' + j+'"></div>');

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
	*@obj           要合并对象
	*/
	mergeAnimate : function(objFirst, objNext) {
		var firstX = objFirst.x,
			firstY = objFirst.y,
			nextX = objNext.x,
			nextY = objNext.y,
			firstNum = objFirst.number,
			firstCol = objFirst.color;
		$('#grid-cell-'+nextX+'-'+nextY).animate({
			left : ui.getPosLeft(firstX)
		},200,function(){
			// $(this).remove();
			$('#grid-cell-'+nextX + '-' + nextY).remove();
			$('#grid-cell-'+firstX+'-'+firstY)
			.text(firstNum)
			.addClass(firstCol).addClass('animate-new-cell');
		});
	},
	/*
	*合并棋子动画
	*@obj           要合并对象
	*/
	mergeAnimateY : function(objFirst, objNext) {
		var firstX = objFirst.x,
			firstY = objFirst.y,
			nextX = objNext.x,
			nextY = objNext.y,
			firstNum = objFirst.number,
			firstCol = objFirst.color;
		$('#grid-cell-'+nextX+'-'+nextY).animate({
			top : ui.getPosTop(0, firstY)
		},200,function(){
			// $(this).remove();
			$('#grid-cell-'+nextX + '-' + nextY).remove();
			$('#grid-cell-'+firstX + '-' +firstY)
			.text(firstNum)
			.addClass(firstCol).addClass('animate-new-cell');
		});
	},
	/*
	*棋子移动动画
	*@obj           要移动的对象
	*@de            移动方向 1表示横向 0表示纵向
	*@callback      动画执行完毕后 在数组中删除数据
	*/
	moveAnimate : function (first, objNext, flag) {

		var _left = ui.getPosLeft(first+flag),
			nextX = objNext.x,
			nextY = objNext.y;
		$('#grid-cell-' + nextX + '-' + nextY).animate({
			left : _left
		},200,function(){
			$('#grid-cell-' + nextX + '-' + nextY)
			.attr('id','grid-cell-' + (first+flag) +'-'+nextY);
		});
	},
	/*
	*棋子移动动画
	*@obj           要移动的对象
	*@de            移动方向 1表示横向 0表示纵向
	*@callback      动画执行完毕后 在数组中删除数据
	*/
	moveAnimateY : function (first, objNext) {
		var _top = ui.getPosTop(0, first),
			nextX = objNext.x,
			nextY = objNext.y;
		$('#grid-cell-' + nextX + '-' + nextY).animate({
			top : _top
		},200,function(){
			$('#grid-cell-' + nextX + '-' + nextY)
			.attr('id','grid-cell-' + nextX + '-' + first);
		})

	},
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