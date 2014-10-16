/*
*Cell 棋子对象
*@param x 棋子横坐标
*@param y 棋子纵坐标
*@param color 棋子颜色
*@param number 棋子数字
*@show() 棋子的展示
*/
function Cell(x, y, color,number){
	this.color = color;
	this.number = number;
	this.x = x;
	this.y = y;
	this.show = function(container, obj){
		ui.showCell(container, obj);
	};
}