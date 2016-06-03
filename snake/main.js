enchant();

var updateCD=10;
var dir={x:0,y:1}
var lastDir={x:0,y:0}
var map=new Array();
var food={x:0,y:0}
var keycode={};
var R=10;//圆半径或者外接正方形尺寸的一半
var game;
var snake=new Array();

window.onload = function(){
    setupMap();
    setupSnake();
    drawSnake(true);
    newFood();
    game = new Game(500, 500);
    game.preload('chara1.png', 'icon0.png')
    var context=drawMap();
    game.onload = function(){
        game.rootScene.addChild(context);
    };
    game.start();
    game.addEventListener('enterframe',function(e){
        game.rootScene.removeChild(context);
        game.rootScene.addChild(context=drawMap());
        // console.log('X: '+dir.x+' '+'Y: '+dir.y);
        input()
        if(this.frame%updateCD==0){
            updateSnake();
        }
    });
};

function setupMap(){
    for(var x=1;x<=15;x++){
        map[x]=new Array();
        for(var y=1;y<=15;y++){
           if(x==1 || x==15 || y==1 || y==15)
                map[x][y]=true 
            else
                map[x][y]=false
        }
    }
}

function drawMap(){
    var surface=new Surface(15*2*R,15*2*R);
    for(var x=1;x<=15;x++){
        for(var y=1;y<=15;y++){
            if(!map[x][y]){//map[x][y]
                // surface.context.strokeStyle  = "orange";
                // surface.context.strokeRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*x) + ',' + Math.floor(255-42.5*y) + ')';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.stroke();
                surface.context.closePath();
            }else{
                // surface.context.fillStyle  = "orange";
                // surface.context.fillRect((x-1)*2*R,(y-1)*2*R,2*R,2*R);
                surface.context.fillStyle = 'rgb(0,' + Math.floor(255-42.5*x) + ',' + Math.floor(255-42.5*y) + ')';
                surface.context.beginPath();
                surface.context.arc((x-1)*2*R+R,(y-1)*2*R+R,R,0,Math.PI*2,true);
                surface.context.fill();
                surface.context.closePath();
            }
        }
    }
    return surface;
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
        food.x= Math.floor(Math.random()*14+1);
        food.y= Math.floor(Math.random()*14+1);
    }while(check(food.x,food.y)==true)
    map[food.x][food.y]=true;
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
    drawSnake(false)
    for(var i=snake.length-1;i>=2;i--){
        snake[i].x=snake[i-1].x
        snake[i].y=snake[i-1].y
    }
    snake[1].x=targetX
    snake[1].y=targetY
    
    drawSnake(true)
}

function input(){
    if(game.input.up){
        if(lastDir.y==0){
            dir.x=0;
            dir.y=-1;
        }
    }
    else if(game.input.down){
        if(lastDir.y==0){
            dir.x=0;
            dir.y=1;
        }
    }
    else if(game.input.left){
        if(lastDir.x==0){
            dir.x=-1;
            dir.y=0;
        }
    }
    else if(game.input.right){
        if(lastDir.x==0){
            dir.x=1;
            dir.y=0;
        }
    }
}