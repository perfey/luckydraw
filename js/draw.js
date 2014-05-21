$(function () {
	//抽奖
	var index=1,		//当前亮区位置
	prevIndex=8,		//前一位置
	Speed=300,			//初始速度
	timer,				//定义对象
	arrLength = 8;		//产品数
	endIndex=1,			//决定在哪一格变慢
	cycle=0,			//转动圈数   
	endCycle=6,			//计算圈数
	flag=false,			//结束转动标志
	randomNum=1,		//中奖数
	quick=0;			//加速

	function startTurn(){
		$("#luckyTable li").removeClass("lucky-current").removeClass('lucky-curpic'); //取消选中
		randomNum = Math.floor(Math.random()*7+1); //产出随机中奖数1--8之间
		index=1; //再来一次,从1开始
		cycle=0;
		flag=false;
		
		if(randomNum>5) {
			endIndex = randomNum - 5; //前5格开始变慢
		} else {
			endIndex = randomNum + arrLength - 5; //前5格开始变慢
		}
		
		timer = setInterval(luckyStar,Speed);
	}
	function luckyStar(num){
		//跑马灯变速
		if(flag==false){
			//走五格开始加速
			if(quick==5){
				clearInterval(timer);
				Speed=50;
				timer=setInterval(luckyStar,Speed);
			}
			//跑N圈减速
			if(cycle>endCycle && index-1==endIndex){
				clearInterval(timer);
				Speed=300;
				flag=true;         //触发结束
				timer=setInterval(luckyStar,Speed);
			}
		}

		if(index>arrLength){
			index=1;
			cycle++;
		}

		//结束转动并选中号码
		if(flag==true && index==parseInt(randomNum)){ 
			quick=0;
			clearInterval(timer);
		}
		//设置当前选中样式
		if (index === 3 || index === 5 || index ===8) {
			$("#lucky_"+index).addClass('lucky-current'); 
		} else {
			$("#lucky_"+index).addClass('lucky-curpic'); 
		}
		
		if(index>1)
			prevIndex=index-1;
		else{
			prevIndex=arrLength;
		}
		$("#lucky_"+prevIndex).removeClass('lucky-current').removeClass('lucky-curpic'); //取消上次选择样式

		index++;
		quick++;
	}
	$("#luckyTable").on("click", ".turn-btn", function() {
		startTurn();
	});
});