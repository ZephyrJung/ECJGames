enchant();

var updateCD=10;
var dir={x:0,y:0}
var lastDir={x:0,y:0}
var map=new Array();
var food={x:0,y:0}
var keycode={};
var R=10;//圆半径或者外接正方形尺寸的一半
var scale=20; //方阵规模
var game;
var snake=new Array();
var surface;

window.onload = function(){
    setupMap();
    setupSnake();
    drawSnake(1);
    newFood();
    game = new Game(500, 500);
    game.onload = function(){
        surface=new Surface(scale*2*R,scale*2*R);
        drawMap();
        game.rootScene.addChild(surface);
    };
    game.start();
    game.addEventListener('enterframe',function(e){
        updateMap();
        // nextMove(snake[1].x,snake[1].y);
        var count=0;
		var snakeList=new Array();
		var finish=false;
        nextTraverse(snake[1].x,snake[1].y);//执行不动，，，
        if(this.frame%updateCD==0){
            updateSnake();
        }
    });
};

function setupMap(){
    for(var x=1;x<=scale;x++){
        map[x]=new Array();
        for(var y=1;y<=scale;y++){
           if(x==1 || x==scale || y==1 || y==scale)
                map[x][y]=1 
            else
                map[x][y]=0
        }
    }
}

function drawMap(){
    for(var x=1;x<=scale;x++){
        for(var y=1;y<=scale;y++){
            if(map[x][y]==0){//map[x][y]
                // surface.context.strokeStyle  = "orange";
                // surface.context.strokeRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*x) + ',' + Math.floor(255-42.5*y) + ')';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.stroke();
                surface.context.closePath();
            }else if(map[x][y]==1){
                // surface.context.fillStyle  = "orange";
                // surface.context.fillRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.fillStyle = 'rgb(0,' + Math.floor(255-42.5*x) + ',' + Math.floor(255-42.5*y) + ')';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.fill();
                surface.context.closePath();
            }else{
                // surface.context.fillStyle  = "orange";
                // surface.context.fillRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.fillStyle = 'red';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.fill();
                surface.context.closePath();
            }
        }
    }
}

function updateMap(){
    surface.context.save();
    surface.context.clearRect(0,0,scale*2*R,scale*2*R);
    for(var x=1;x<=scale;x++){
        for(var y=1;y<=scale;y++){
            if(map[x][y]==0){//map[x][y]
                // surface.context.strokeStyle  = "orange";
                // surface.context.strokeRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*x) + ',' + Math.floor(255-42.5*y) + ')';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.stroke();
                surface.context.closePath();
            }else if(map[x][y]==1){
                // surface.context.fillStyle  = "orange";
                // surface.context.fillRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.fillStyle = 'rgb(0,' + Math.floor(255-42.5*x) + ',' + Math.floor(255-42.5*y) + ')';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.fill();
                surface.context.closePath();
            }else{
                // surface.context.fillStyle  = "orange";
                // surface.context.fillRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.fillStyle = 'red';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.fill();
                surface.context.closePath();
            }
        }
    }
}

function check(x,y){
    return map[x][y]
}

function setupSnake(){
    for(var i=1;i<=5;i++){
        snake[i]={x:i+5,y:7};
    }
}

function drawSnake(toggle){
    for(var i=1;i<snake.length;i++){
        map[snake[i].x][snake[i].y]=toggle;
    }
}

function newFood(){
    do{ 
        food.x= Math.floor(Math.random()*scale+1);
        food.y= Math.floor(Math.random()*scale+1);
    }while(check(food.x,food.y)!=0)
    //已经不明白while条件的逻辑了，照我现在的理解应该是如下才对，但如果换成下面会变成死循环
    //check(food.x,food.y)==0||check(food.x,food.y)==1
    map[food.x][food.y]=2;
}

function gameover(){
    var pressedbutton = confirm("Game Over!\nYour Score is "+(snake.length-5)+"(确定重来，取消退出)");
    if(pressedbutton){
        window.location.reload();
    }else{
         game.stop();
    }
}

function eat(){
    snake[snake.length]={x:snake[1].x,y:snake[1].y};
    if(updateCD!=1)
        updateCD=updateCD-1;
    newFood();
}

function updateSnake(){
    lastDir.x=dir.x
    lastDir.y=dir.y
    var targetX=snake[1].x+dir.x,
        targetY=snake[1].y+dir.y;
    if(check(targetX,targetY)){
        if(targetX==food.x && targetY==food.y){ //eat
            eat();
        }else{ //hit
            gameover();
            return;
        }
    }
    drawSnake(0)
    for(var i=snake.length-1;i>=2;i--){
        snake[i].x=snake[i-1].x
        snake[i].y=snake[i-1].y
    }
    snake[1].x=targetX
    snake[1].y=targetY
    
    drawSnake(1)
}

//简单自动寻径算法
//可走+距离苹果最短
function nextMove(sx,sy){//起点
    var up=map[sx][sy-1],
        down=map[sx][sy+1],
        left=map[sx-1][sy],
        right=map[sx+1][sy];

    if(food.x==sx&&food.y==sy-1)
        up=false;
    if(food.x==sx&&food.y==sy+1)
        down=false;
    if(food.x==sx-1&&food.y==sy)
        left=false;
    if(food.x==sx+1&&food.y==sy)
        right=false;

    var ul=9999999999,
        dl=9999999999,
        ll=9999999999,
        rl=9999999999;
    if(!up){
        ul=(food.x-sx)*(food.x-sx)+(food.y-sy+1)*(food.y-sy+1);
    }
    if(!down){
        dl=(food.x-sx)*(food.x-sx)+(food.y-sy-1)*(food.y-sy-1);
    }
    if(!left){
        ll=(food.x-sx+1)*(food.x-sx+1)+(food.y-sy)*(food.y-sy);
    }
    if(!right){
        rl=(food.x-sx-1)*(food.x-sx-1)+(food.y-sy)*(food.y-sy);
    }
    var temp=Math.min(Math.min(Math.min(ul,dl),ll),rl);
    if(ul==temp){
        if(lastDir.y==0){
            dir.x=0;
            dir.y=-1;
        }
    }
    else if(dl==temp){
        if(lastDir.y==0){
            dir.x=0;
            dir.y=1;
        }
    }
    else if(ll==temp){
        if(lastDir.x==0){
            dir.x=-1;
            dir.y=0;
        }
    }
    else if(rl==temp){
        if(lastDir.x==0){
            dir.x=1;
            dir.y=0;
        }
    }
}

//使用A*算法实现贪吃蛇自动移动
function starMove(){//需要参数未知
    //算法未知
}

//深度搜索优先求必解
//curPos即当前位置，lastPos可以是上次选择位置，也可以理解为当前相邻的蛇身

function nextTraverse(sx,sy){
	if(finish){
		dir.x=snake[0].x;
   	 	dir.y=snake[0].y;
    	return;
	}
    var up=map[sx][sy-1],
        down=map[sx][sy+1],
        left=map[sx-1][sy],
        right=map[sx+1][sy];
    console.log("up:"+up+" down:"+down+" left:"+left+" right:"+right);

    if(up==0){//如果
        snakeList[count++]={x:0,y:-1};
        sy=sy-1;
        nextTraverse(sx,sy);
    }else if(up==2){//如果等于2，说明到达终点，结束循环
        snakeList[count]={x:0,y:-1};
        finish=true;
    }
    if(down==0){//如果
        snakeList[count++]={x:0,y:1};
        sy=sy+1;
        nextTraverse(sx,sy);
    }else if(down==2){//如果等于2，说明到达终点，结束循环
        snakeList[count]={x:0,y:-1};
        finish=true;
    }
    if(left==0){//如果
        snakeList[count++]={x:-1,y:0};
        sx=sx-1;
        nextTraverse(sx,sy);
    }else if(left==2){//如果等于2，说明到达终点，结束循环
        snakeList[count]={x:-1,y:0};
        finish=true;
    }
    if(right==0){//如果
        snakeList[count++]={x:1,y:0};
        sx=sx+1;
        nextTraverse(sx,sy);
    }else if(right==2){//如果等于2，说明到达终点，结束循环
        snakeList[count]={x:1,y:0};
        finish=true;
    }
}