
$(document).ready(function(){
	newgame();

});
function newgame(){

	var board = new Board(4, 0, '#grid-container');

	board.init('#grid-container');


	// 键盘上下左右
	$(window).keyup(function(e){
		/*left 37
		*up 38
		*right 39
		*down 40*/
		switch(e.keyCode)
		{
			case 37:				
				board.moveLeft();
				break;
			case 38:				
				board.moveUp();
				break;
			case 39:				
				board.moveRight();
				break;
			case 40:				
				board.moveDown();
				break;
			default :
				alert('只能上下左右哦~~');
				break;
		}
	});

}