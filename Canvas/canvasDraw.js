enchant();
var surface;

window.onload = function(){
    game = new Game(500, 500);
    surface=new Surface(500,500);
    game.onload = function(){
      // bezierTest();//执行绘图方法
      DrawiCircleCube(10, 10, 50, 50, 10);
      game.rootScene.addChild(surface);
    };
    game.addEventListener('enterframe',function(e){
    });
    game.start();
};

function simleFace(){
    surface.context.beginPath();
    surface.context.arc(75,75,50,0,Math.PI*2,true); // 绘制
    // surface.context.moveTo(110,75);
    surface.context.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    // surface.context.moveTo(65,65);
    surface.context.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    // surface.context.moveTo(95,65);
    surface.context.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    surface.context.stroke();
}

function bezierTalk(){
    surface.context.beginPath();
    surface.context.moveTo(75,25);
    surface.context.quadraticCurveTo(25,25,25,62.5);
    surface.context.quadraticCurveTo(25,100,50,100);
    surface.context.quadraticCurveTo(50,120,30,125);
    surface.context.quadraticCurveTo(60,120,65,100);
    surface.context.quadraticCurveTo(125,100,125,62.5);
    surface.context.quadraticCurveTo(125,25,75,25);
    surface.context.stroke();
}

//贝塞尔矩形 by zephyr
function bezierTest(){//左上角坐标及半边长
    surface.context.beginPath();
    surface.context.moveTo(5,50);
    surface.context.quadraticCurveTo(5,5,50,5);
    surface.context.quadraticCurveTo(100,5,100,50);
    surface.context.quadraticCurveTo(100,100,50,100);
    surface.context.quadraticCurveTo(5,100,5,50);
    surface.context.stroke();
}

function bezierLove(){
    surface.context.beginPath();
    surface.context.moveTo(75,40);
    surface.context.bezierCurveTo(75,37,70,25,50,25);
    surface.context.bezierCurveTo(20,25,20,62.5,20,62.5);
    surface.context.bezierCurveTo(20,80,40,102,75,120);
    surface.context.bezierCurveTo(110,102,130,80,130,62.5);
    surface.context.bezierCurveTo(130,62.5,130,25,100,25);
    surface.context.bezierCurveTo(85,25,75,37,75,40);
    surface.context.fill();
}

function eatBeans(){
    var surface=new Surface(150,150);
    RoundedRect(surface,12,12,150,150,15);
    RoundedRect(surface,19,19,150,150,9);
    RoundedRect(surface,53,53,49,33,10);
    RoundedRect(surface,53,119,49,16,6);
    RoundedRect(surface,135,53,49,33,10);
    RoundedRect(surface,135,119,25,49,10);

    surface.context.beginPath();
    surface.context.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
    surface.context.lineTo(31,37);
    surface.context.fill();

    for(var i=0;i<8;i++){
      surface.context.fillRect(51+i*16,35,4,4);
    }

    for(i=0;i<6;i++){
      surface.context.fillRect(115,51+i*16,4,4);
    }

    for(i=0;i<8;i++){
      surface.context.fillRect(51+i*16,99,4,4);
    }

    surface.context.beginPath();
    surface.context.moveTo(83,116);
    surface.context.lineTo(83,102);
    surface.context.bezierCurveTo(83,94,89,88,97,88);
    surface.context.bezierCurveTo(105,88,111,94,111,102);
    surface.context.lineTo(111,116);
    surface.context.lineTo(106.333,111.333);
    surface.context.lineTo(101.666,116);
    surface.context.lineTo(97,111.333);
    surface.context.lineTo(92.333,116);
    surface.context.lineTo(87.666,111.333);
    surface.context.lineTo(83,116);
    surface.context.fill();

    surface.context.fillStyle = "white";
    surface.context.beginPath();
    surface.context.moveTo(91,96);
    surface.context.bezierCurveTo(88,96,87,99,87,101);
    surface.context.bezierCurveTo(87,103,88,106,91,106);
    surface.context.bezierCurveTo(94,106,95,103,95,101);
    surface.context.bezierCurveTo(95,99,94,96,91,96);
    surface.context.moveTo(103,96);
    surface.context.bezierCurveTo(100,96,99,99,99,101);
    surface.context.bezierCurveTo(99,103,100,106,103,106);
    surface.context.bezierCurveTo(106,106,107,103,107,101);
    surface.context.bezierCurveTo(107,99,106,96,103,96);
    surface.context.fill();

    surface.context.fillStyle = "black";
    surface.context.beginPath();
    surface.context.arc(101,102,2,0,Math.PI*2,true);
    surface.context.fill();

    surface.context.beginPath();
    surface.context.arc(89,102,2,0,Math.PI*2,true);
    surface.context.fill();
}

// 封装的一个用于绘制圆角矩形的函数.

function RoundedRect(surface,x,y,width,height,radius){
  surface.context.beginPath();
  surface.context.moveTo(x,y+radius);
  surface.context.lineTo(x,y+height-radius);
  surface.context.quadraticCurveTo(x,y+height,x+radius,y+height);
  surface.context.lineTo(x+width-radius,y+height);
  surface.context.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  surface.context.lineTo(x+width,y+radius);
  surface.context.quadraticCurveTo(x+width,y,x+width-radius,y);
  surface.context.lineTo(x+radius,y);
  surface.context.quadraticCurveTo(x,y,x,y+radius);
  surface.context.stroke();
}

function path2D(){
    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    surface.context.stroke(rectangle);
    surface.context.fill(circle);
}

function colorCube() {
  for (var i=0;i<6;i++){
    for (var j=0;j<6;j++){
      surface.context.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' + 
                       Math.floor(255-42.5*j) + ',0)';
      surface.context.fillRect(j*25,i*25,25,25);
    }
  }
}

function colorCircle() {
  for (var i=0;i<6;i++){
      for (var j=0;j<6;j++){
        surface.context.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' + 
                         Math.floor(255-42.5*j) + ')';
        surface.context.beginPath();
        surface.context.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
        surface.context.stroke();
      }
    }
}

function globalAlpha(){
    // 画背景
  surface.context.fillStyle = '#FD0';
  surface.context.fillRect(0,0,75,75);
  surface.context.fillStyle = '#6C0';
  surface.context.fillRect(75,0,75,75);
  surface.context.fillStyle = '#09F';
  surface.context.fillRect(0,75,75,75);
  surface.context.fillStyle = '#F30';
  surface.context.fillRect(75,75,75,75);
  surface.context.fillStyle = '#FFF';

  // 设置透明度值
  surface.context.globalAlpha = 0.2;

  // 画半透明圆
  for (var i=0;i<7;i++){
      surface.context.beginPath();
      surface.context.arc(75,75,10+10*i,0,Math.PI*2,true);
      surface.context.fill();
  }
}

function rgba(){
  surface.context.fillStyle = 'rgb(255,221,0)';
  surface.context.fillRect(0,0,150,37.5);
  surface.context.fillStyle = 'rgb(102,204,0)';
  surface.context.fillRect(0,37.5,150,37.5);
  surface.context.fillStyle = 'rgb(0,153,255)';
  surface.context.fillRect(0,75,150,37.5);
  surface.context.fillStyle = 'rgb(255,51,0)';
  surface.context.fillRect(0,112.5,150,37.5);
  // 画半透明矩形
  for (var i=0;i<10;i++){
    surface.context.fillStyle = 'rgba(255,255,255,'+(i+1)/10+')';
    for (var j=0;j<4;j++){
      surface.context.fillRect(5+i*14,5+j*37.5,14,27.5)
    }
  }
}

function lineWidth(){
  for (var i = 0; i < 10; i++){
    surface.context.lineWidth = 1+i;
    surface.context.beginPath();
    surface.context.moveTo(5+i*14,5);
    surface.context.lineTo(5+i*14,140);
    surface.context.stroke();
  }
}

function lineCap(){
  var lineCap = ['butt','round','square'];
  // 创建路径
  surface.context.strokeStyle = '#09f';
  surface.context.beginPath();
  surface.context.moveTo(10,10);
  surface.context.lineTo(140,10);
  surface.context.moveTo(10,140);
  surface.context.lineTo(140,140);
  surface.context.stroke();

  // 画线条
  surface.context.strokeStyle = 'black';
  for (var i=0;i<lineCap.length;i++){
    surface.context.lineWidth = 15;
    surface.context.lineCap = lineCap[i];
    surface.context.beginPath();
    surface.context.moveTo(25+i*50,10);
    surface.context.lineTo(25+i*50,140);
    surface.context.stroke();
  }
}

function lineJoin(){
  var lineJoin = ['round','bevel','miter'];
  surface.context.lineWidth = 10;
  for (var i=0;i<lineJoin.length;i++){
    surface.context.lineJoin = lineJoin[i];
    surface.context.beginPath();
    surface.context.moveTo(-5,5+i*40);
    surface.context.lineTo(35,45+i*40);
    surface.context.lineTo(75,5+i*40);
    surface.context.lineTo(115,45+i*40);
    surface.context.lineTo(155,5+i*40);
    surface.context.stroke();
  }
}

function gradients(){
    // Create gradients
  var lingrad = surface.context.createLinearGradient(0,0,0,150);
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');

  var lingrad2 = surface.context.createLinearGradient(0,50,0,95);
  lingrad2.addColorStop(0.5, '#000');
  lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

  // assign gradients to fill and stroke styles
  surface.context.fillStyle = lingrad;
  surface.context.strokeStyle = lingrad2;
  
  // draw shapes
  surface.context.fillRect(10,10,130,130);
  surface.context.strokeRect(50,50,50,50);
}

function gradientsBalls(){
  // 创建渐变
  var radgrad = surface.context.createRadialGradient(45,45,10,52,50,30);
  radgrad.addColorStop(0, '#A7D30C');
  radgrad.addColorStop(0.9, '#019F62');
  radgrad.addColorStop(1, 'rgba(1,159,98,0)');
  
  var radgrad2 = surface.context.createRadialGradient(105,105,20,112,120,50);
  radgrad2.addColorStop(0, '#FF5F98');
  radgrad2.addColorStop(0.75, '#FF0188');
  radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

  var radgrad3 = surface.context.createRadialGradient(95,15,15,102,20,40);
  radgrad3.addColorStop(0, '#00C9FF');
  radgrad3.addColorStop(0.8, '#00B5E2');
  radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

  var radgrad4 = surface.context.createRadialGradient(0,150,50,0,140,90);
  radgrad4.addColorStop(0, '#F4F201');
  radgrad4.addColorStop(0.8, '#E4C700');
  radgrad4.addColorStop(1, 'rgba(228,199,0,0)');
  
  // 画图形
  surface.context.fillStyle = radgrad4;
  surface.context.fillRect(0,0,150,150);
  surface.context.fillStyle = radgrad3;
  surface.context.fillRect(0,0,150,150);
  surface.context.fillStyle = radgrad2;
  surface.context.fillRect(0,0,150,150);
  surface.context.fillStyle = radgrad;
  surface.context.fillRect(0,0,150,150);
}

function wordsShadow(){
  surface.context.shadowOffsetX = 2;
  surface.context.shadowOffsetY = 2;
  surface.context.shadowBlur = 2;
  surface.context.shadowColor = "rgba(0, 0, 0, 0.5)";
  surface.context.font = "20px Times New Roman";
  surface.context.fillStyle = "Black";
  surface.context.fillText("Sample String", 5, 30);
}

function drawText() {
  surface.context.font = "48px serif";
  surface.context.fillText("Hello world", 10, 50); //绘制实心文字
  // surface.context.strokeText("Hello world", 10, 50);  //绘制空心文字
  var text = surface.context.measureText("Foo"); // TextMetrics object
  console.log(text.width);
}

function userImage() {
  var img = new Image();
  img.onload = function(){
    //在图片上绘制
    surface.context.drawImage(img,0,0);
    surface.context.beginPath();
    surface.context.moveTo(30,96);
    surface.context.lineTo(70,66);
    surface.context.lineTo(103,76);
    surface.context.lineTo(170,15);
    surface.context.stroke();
  }
  img.src = 'monkey.png';
}

function scalingImage() {
  var img = new Image();
  img.onload = function(){
    for (var i=0;i<4;i++){
      for (var j=0;j<3;j++){
        surface.context.drawImage(img,j*50,i*38,50,38);
      }
    }
  };
  img.src = 'monkey.png';
}

function slicingImage() {
  var img = new Image();
  img.onload = function(){
    surface.context.drawImage(img,33,71,104,124,21,20,87,104);
  };
  img.src = 'monkey.png';
}

function canvasState() {

  surface.context.fillRect(0,0,150,150);   // Draw a rectangle with default settings
  surface.context.save();                  // Save the default state

  surface.context.fillStyle = '#09F'       // Make changes to the settings
  surface.context.fillRect(15,15,120,120); // Draw a rectangle with new settings

  surface.context.save();                  // Save the current state
  surface.context.fillStyle = '#FFF'       // Make changes to the settings
  surface.context.globalAlpha = 0.5;    
  surface.context.fillRect(30,30,90,90);   // Draw a rectangle with new settings

  surface.context.restore();               // Restore previous state
  surface.context.fillRect(45,45,60,60);   // Draw a rectangle with restored settings

  surface.context.restore();               // Restore original state
  surface.context.fillRect(60,60,30,30);   // Draw a rectangle with restored settings

}

function translateCanvas() {
  surface.context.fillRect(0,0,300,300);
  for (var i=0;i<3;i++) {
    for (var j=0;j<3;j++) {
      surface.context.save();
      surface.context.strokeStyle = "#9CFF00";
      surface.context.translate(50+j*100,50+i*100);
      DrawSpirograph(surface.context,20*(j+2)/(j+1),-8*(i+3)/(i+1),10);
      surface.context.restore();
    }
  }
}

function DrawSpirograph(ctx,R,r,O){
  var x1 = R-O;
  var y1 = 0;
  var i  = 1;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  do {
    if (i>20000) break;
    var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72))
    var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72))
    ctx.lineTo(x2,y2);
    x1 = x2;
    y1 = y2;
    i++;
  } while (x2 != R-O && y2 != 0 );
  ctx.stroke();
}

function rotateCanvas() {
  surface.context.translate(75,75);
  for (var i=1;i<6;i++){ // Loop through rings (from inside to out)
    surface.context.save();
    surface.context.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';
    for (var j=0;j<i*6;j++){ // draw individual dots
      surface.context.rotate(Math.PI*2/(i*6));
      surface.context.beginPath();
      surface.context.arc(0,i*12.5,5,0,Math.PI*2,true);
      surface.context.fill();
    }
    surface.context.restore();
  }
}

function scalingCanvas() {
  surface.context.strokeStyle = "#fc0";
  surface.context.lineWidth = 1.5;
  surface.context.fillRect(0,0,300,300);

  // Uniform scaling
  surface.context.save()
  surface.context.translate(50,50);
  DrawSpirograph(surface.context,22,6,5);  // no scaling

  surface.context.translate(100,0);
  surface.context.scale(0.75,0.75);
  DrawSpirograph(surface.context,22,6,5);

  surface.context.translate(133.333,0);
  surface.context.scale(0.75,0.75);
  DrawSpirograph(surface.context,22,6,5);
  surface.context.restore();

  // Non-uniform scaling (y direction)
  surface.context.strokeStyle = "#0cf";
  surface.context.save()
  surface.context.translate(50,150);
  surface.context.scale(1,0.75);
  DrawSpirograph(surface.context,22,6,5);

  surface.context.translate(100,0);
  surface.context.scale(1,0.75);
  DrawSpirograph(surface.context,22,6,5);

  surface.context.translate(100,0);
  surface.context.scale(1,0.75);
  DrawSpirograph(surface.context,22,6,5);
  surface.context.restore();

  // Non-uniform scaling (x direction)
  surface.context.strokeStyle = "#cf0";
  surface.context.save()
  surface.context.translate(50,250);
  surface.context.scale(0.75,1);
  DrawSpirograph(surface.context,22,6,5);

  surface.context.translate(133.333,0);
  surface.context.scale(0.75,1);
  DrawSpirograph(surface.context,22,6,5);

  surface.context.translate(177.777,0);
  surface.context.scale(0.75,1);
  DrawSpirograph(surface.context,22,6,5);
  surface.context.restore();
}

function transformCanvas() {

  var sin = Math.sin(Math.PI/6);
  var cos = Math.cos(Math.PI/6);
  surface.context.translate(200, 200);
  var c = 0;
  for (var i=0; i <= 12; i++) {
    c = Math.floor(255 / 12 * i);
    surface.context.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
    surface.context.fillRect(0, 0, 100, 10);
    surface.context.transform(cos, sin, -sin, cos, 0, 0);
  }
  
  surface.context.setTransform(-1, 0, 0, 1, 200, 200);
  surface.context.fillStyle = "rgba(255, 128, 255, 0.5)";
  surface.context.fillRect(0, 50, 100, 100);

}

function clippingPath() {
  surface.context.fillRect(0,0,150,150);
  surface.context.translate(75,75);

  // Create a circular clipping path
  surface.context.beginPath();
  surface.context.arc(0,0,60,0,Math.PI*2,true);
  surface.context.clip();

  // draw background
  var lingrad = surface.context.createLinearGradient(0,-75,0,75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');
  
  surface.context.fillStyle = lingrad;
  surface.context.fillRect(-75,-75,150,150);

  // draw stars
  for (var j=1;j<50;j++){
    surface.context.save();
    surface.context.fillStyle = '#fff';
    surface.context.translate(75-Math.floor(Math.random()*150),
                  75-Math.floor(Math.random()*150));
    DrawStar(surface.context,Math.floor(Math.random()*4)+2);
    surface.context.restore();
  }
}

function DrawStar(ctx,r){
  ctx.save();
  ctx.beginPath()
  ctx.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx.rotate(Math.PI/5);
    if(i%2 == 0) {
      ctx.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx.lineTo(r,0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

//圆角矩形
//x坐标，y坐标，宽度，高度，圆角半径
function DrawiCircleCube(x, y, w, h, r){
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  surface.context.beginPath();
  surface.context.moveTo(x+r, y);
  surface.context.arcTo(x+w, y, x+w, y+h, r);
  surface.context.arcTo(x+w, y+h, x, y+h, r);
  surface.context.arcTo(x, y+h, x, y, r);
  surface.context.arcTo(x, y, x+w, y, r);
  // surface.context.arcTo(x+r, y);
  surface.context.closePath();
}
