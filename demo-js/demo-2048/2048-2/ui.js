var ui = {
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
	getPosLeft : function(i, j){
		return 20 + i * 120;
	},
	getPosTop : function(i, j){
		return 20 + j * 120;
	}
}