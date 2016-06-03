enchant();
var game;

var updateCD=15;//控制下落的速度
var controlCD=3;//控制左右移动的灵敏度
var map=new Array();
var R=10;//圆半径或者外接正方形尺寸的一半
var height=25;
var width=15;
var pos={x:0,y:0};//控制绘点坐标
var bands={base:0,state:0};//控制绘图形状
var record=new Array();
var move='';
var flag;
var score=0;

window.onload = function(){
    var game = new Game(800, 800);
    initMap();
    pos.x=Math.floor(width/2);
    pos.y=1;
    randomShape();
    var surface=new Surface(width*2*R,height*2*R);

    game.onload = function(){
      game.rootScene.addChild(surface);
    };
    game.addEventListener('enterframe',function(e){
      input(game);
      if(this.frame%controlCD==0){
        applyInput();
      }
      resetMap();
      modifyMap(pos.x,pos.y,bands.base,bands.state,1);//绘制下落中的图形
      if(this.frame%updateCD==0){
        fallDown();
      }
      checkMap();//根据下落后地图的状况清图
      DrawShape(surface);
      // DrawScore(surface);
    });
    game.start();
    /*
    *可通过在enterframe方法中添加连续变色来实现闪烁效果
    */
};

function fallDown(){
  if(ifFallDown()){
    pos.y=pos.y+1;
  }
  else{
    updateCD=15;
    pos.x=Math.floor(width/2);
    pos.y=1;
    randomShape();
    //绘制新图形
    if(map[pos.x][pos.y]==2){
      alert('game over');//此处有bug，无法真正停止，还会不断地刷新图弹出提示
      game.removeEventListener('enterframe', arguments.callee);
      return;
    }
   
  }
}

function ifFallDown(){
  var shape=getShape(bands.base,bands.state);
  for(var i=0;i<shape.length;i++){
    var j=shape[i].length-1;
    while(shape[i][j]!=1)
      j=j-1;
    if(map[pos.x+i][pos.y+j+1]==2){
      modifyMap(pos.x,pos.y,bands.base,bands.state,2);//绘制下落到底的图形，暂时下落到底赋值为2（同墙壁）
      return false;
    }
  }
  return true;
}

function checkMap(){
  var count;
  var x,y;
  for(y=map[0].length-2;y>0;y--){
    count=0;
    for(x=0;x<map.length;x++){
      if(map[x][y]==2)
        count++;
    }
    if(count==width){
      remove(y);
      score=score+100;
    }
  }
}

function remove(line){//数组的列删除
  for(var x=1;x<map.length-1;x++){
    for(var y=line;y>1;y--){
      map[x][y]=map[x][y-1];
    }
  }
}

function DrawShape(surface){
  drawMap(surface);
}
function applyInput(){
  if(flag){
    switch(move){
    case 'up':
      bands.state=nextShape(bands);
      break;
    case 'down':
      updateCD=2;
      break;
    case 'left':
      Move(-1,bands.base,bands.state);
      break;
    case 'right':
      Move(1,bands.base,bands.state);
      break;
    }
  }
}
//保持地图为原始状态
function initMap(){
    for(var x=0;x<width;x++){
        map[x]=new Array();
        for(var y=0;y<height;y++){
           if(x==0 || x+1==width || y==0 || y+1==height)
                map[x][y]=2;
            else
                map[x][y]=0;
        }
    }
}

//绘制之前重置地图，并保留已落下的图形
function resetMap(state){
  for(var x=0;x<width;x++){
        for(var y=0;y<height;y++){
          if(map[x][y]!=2){
            // console.log('before change:>'+map[x][y]);
            map[x][y]=0;
            // console.log('after change:>'+map[x][y]);
          }
        }
    }
}

//定点绘图flag代表对图形状态的赋值，目前有0，1，2，0代表空白，2代表围墙，1代表图形
function modifyMap(x,y,base,state,mapCode){
  // var bands=randomShape();
  var shape=getShape(base,state);
  for(var i=0;i<shape.length;i++){
    for(var j=0;j<shape[i].length;j++){
      if(map[x+i][y+j]!=2)
        map[x+i][y+j]=shape[i][j]*mapCode;
    }
  }
  flag=false;
}

//用于逐帧绘图
function drawMap(surface){
  surface.context.clearRect(0,0,width*2*R,height*2*R);
  for(var x=0;x<width;x++){
      for(var y=0;y<height;y++){
          if(map[x][y]==0){//map[x][y]
            surface.context.strokeStyle  = "blue";
            surface.context.strokeRect((x+1-1)*2*R,(y+1-1)*2*R,2*R,2*R);
            // bezierTest(surface,(x+1-1)*2*R,(y+1-1)*2*R,R);
          }else if(map[x][y]==1){
            surface.context.fillStyle  = "black";
            surface.context.fillRect((x+1-1)*2*R,(y+1-1)*2*R,2*R,2*R);
          }else if(map[x][y]==2){
            surface.context.fillStyle  = "blue";
            surface.context.fillRect((x+1-1)*2*R,(y+1-1)*2*R,2*R,2*R);
          }
      }
  }
}

function DrawScore(surface){
  surface.context.clearRect(12*R,0,3*R,R);
  surface.context.font = "24px serif";
  surface.context.fillText("当前分数："+score,7*2*R,0); //绘制实心文字
}

function randomShape(){
  var b,s;
  b=Math.floor(Math.random()*7+1);
  switch(b){
    case 1:s=Math.floor(Math.random()*2+1);break;
    case 2:s=1;break;
    case 3:s=Math.floor(Math.random()*4+1);break;
    case 4:s=Math.floor(Math.random()*4+1);break;
    case 5:s=Math.floor(Math.random()*4+1);break;
    case 6:s=Math.floor(Math.random()*2+1);break;
    case 7:s=Math.floor(Math.random()*2+1);break;
  }
  bands.base=b;
  bands.state=s;
}

function nextShape(bands){
  var next;
  switch(bands.base){
    case 1:
      next=bands.state+1;
      if(next==3)next=1;
      break;
    case 2:
      next=1;
      break;
    case 3:
      next=bands.state+1;
      if(next==5)next=1;
      break;
    case 4:
      next=bands.state+1;
      if(next==5)next=1;
      break;
    case 5:
      next=bands.state+1;
      if(next==5)next=1;
      break;
    case 6:
      next=bands.state+1;
      if(next==3)next=1;
      break;
    case 7:
      next=bands.state+1;
      if(next==3)next=1;
      break;
  }
  if(ifLimit(next))
    return bands.state;
  return next;
}

function ifLimit(next){
  var w=getShape(bands.base,next).length;
  var h=getShape(bands.base,bands.state)[0].length;
  if((pos.x+w<=width-1)&&(pos.y+h<height-1))
    return false;
  else
    return true;
}

function input(game){
  var input=0;
  if(game.input.up){
    move='up';
    flag=true;
  }
  else if(game.input.down){
    move='down';
    flag=true;
  }
  else if(game.input.left){
    move='left';
    flag=true;
  }
  else if(game.input.right){
    move='right';
    flag=true;
  }
}

function Move(x,base,state){
  var w=getShape(base,state).length;
  if(!ifFallDown()){
    return;
  }else if(x==-1){
    if(map[pos.x-1][pos.y]!=2)//此处有bug，由于是通过左上角的点判断的，不能判断当左上角无冲突，而下方有冲突的情况！
      pos.x=pos.x-1;
  }else if(x==1){
    if(map[pos.x+w][pos.y]!=2)
      pos.x=pos.x+1;
  }
}

function getShape(base,state){
    switch(base*10+state){
      case 11:
        return [[1],[1],[1],[1]];break;
      case 12:
        return [[1,1,1,1]];break;
      case 21:
        return [[1,1],[1,1]];break;
      case 31:
        return [[0,1],[0,1],[1,1]];break;
      case 32:
        return [[1,1,1],[0,0,1]];break;
      case 33:
        return [[1,1],[1,0],[1,0]];break;
      case 34:
        return [[1,0,0],[1,1,1]];break;
      case 41:
        return [[0,1],[1,1],[0,1]];break;
      case 42:
        return [[1,1,1],[0,1,0]];break;
      case 43:
        return [[1,0],[1,1],[1,0]];break;
      case 44:
        return [[0,1,0],[1,1,1]];break;
      case 51:
        return [[1,1],[0,1],[0,1]];break;
      case 52:
        return [[1,1,1],[1,0,0]];break;
      case 53:
        return [[1,0],[1,0],[1,1]];break;
      case 54:
        return [[0,0,1],[1,1,1]];break;
      case 61:
        return [[1,0],[1,1],[0,1]];break;
      case 62:
        return [[0,1,1],[1,1,0]];break;
      case 71:
        return [[0,1],[1,1],[1,0]];break;
      case 72:
        return [[1,1,0],[0,1,1]];break;
    }
}

function bezierTest(surface,x,y,r){//左上角坐标及半边长
    surface.context.beginPath();
    surface.context.moveTo(x,y+5);
    surface.context.quadraticCurveTo(x,y,x+5,y);
    surface.context.lineTo(x+2*r-5,y);
    surface.context.quadraticCurveTo(x+2*r-5,y,x+2*r,y+5);
    surface.context.lineTo(x+2*r,y+2*r-5);
    surface.context.quadraticCurveTo(x+2*r,y+2*r,x+2*r-5,y+2*r);
    surface.context.lineTo(x+5,y+2*r);
    surface.context.quadraticCurveTo(x,y+2*r,x,y+2*r-5);
    surface.context.lineTo(x,y+5);
    surface.context.stroke();
}