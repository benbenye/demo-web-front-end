var board = new Array(),
	score = 0;

$(document).ready(function(){
	newgame();
});

function newgame(){
	// 初始化棋盘格
	init();
	// 随机生成两个格子的数字
}

function init(){
	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++){
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css({ left : getPosTop( i, j), top : getPosLeft( i, j)});
		}
	}

	for(var i = 0; i < 4; i++){
		board[i] = new Array();
		for( var j = 0; j< 4; j++){
			board[i][j] = 0;
		}
	}

	updateBoardView();
}

function updateBoardView(){
	$('.number-cell').remove();
	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-"'+i+'-'+j'></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j] === 0){
				theNumberCell.css({width:0,height:0,top:getPosTop(i,j) + 50,left:getPosLeft(i,j) + 50});
			}else{
				theNumberCell.css({width:'100px',height:'100px',top:getPosTop(i,j),left:getPosLeft(i,j),backgroundColor:getNumberBgc(board[i][j])}).text(board[i][j]);
			}
		}
	};
}