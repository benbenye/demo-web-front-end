
$(document).ready(function(){
	newgame();
});
function newgame(){

	var board = new Board(4, 0, '#grid-container');

	board.init('#grid-container');

}