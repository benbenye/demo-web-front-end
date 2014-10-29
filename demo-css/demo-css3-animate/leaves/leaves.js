$(function () {
	// containerleaves
	// 先准备好 随机生成多少叶子-30
	// 叶子有1-4随机填充
	// 随机生成对应叶子的left定位
	// 运动时间在9-10s之间
	var fallLeaves = {
		randomLeavesAry : [],
		randomLeftAry : [],
		randomTimeAry : [],
		randomDelayTimeAry : [],
		randomFn : function(){
			for(var i = 0; i < 30; ++i){
				this.randomLeavesAry.push(Math.ceil(Math.random()*4));
				this.randomLeftAry.push(Math.ceil(Math.random()*500));
				this.randomTimeAry.push(Math.random()*5+6);
				this.randomDelayTimeAry.push(Math.random()*5);
			}
		},
		toDom : function(){
			this.randomFn();
			var str = '';
			for(var i = 0, l = this.randomLeavesAry.length; i < l; ++i){
				str += '<div style="top:-150px;left:'+this.randomLeftAry[i]+'px;-webkit-animation:fade '+this.randomTimeAry[i]+'s '+this.randomDelayTimeAry[i]+'s infinite,dropDown '+this.randomTimeAry[i]+'s '+this.randomDelayTimeAry[i]+'s infinite;"><img src="images/realLeaf'+this.randomLeavesAry[i]+'.png" style="-webkit-animation:rotat '+this.randomTimeAry[i]+'s infinite"></div>';
			}
			$('#containerleaves').append(str);
		}
	};
	fallLeaves.toDom();
});