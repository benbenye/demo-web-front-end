function showCell(obj){
	var _css ='style="left:'+ getPosLeft(obj.x,obj.y)+'px; top:'+getPosTop(obj.x,obj.y)+'px;"';
	var _dom = '<div class="cell '+obj.color+'" id="cell-'+obj.x+ '-' + obj.y + '" '+_css+'>'+obj.number+'</div>'
	$('#grid-container').append(_dom);
}