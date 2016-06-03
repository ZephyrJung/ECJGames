enchant();
var game;

//---------全景图------------
var img = new Image();
img.src = 'Capitan_Meadows,_Yosemite_National_Park.jpg';
var CanvasXSize = 800;
var CanvasYSize = 200;
var speed = 30; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset
var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
//--------------------------
//---------碰撞球----------
var running = false;
var surface;
var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: 'blue',
  draw: function() {
    surface.context.beginPath();
    surface.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    surface.context.closePath();
    surface.context.fillStyle = this.color;
    surface.context.fill();
  }
};
window.onload = function(){
    game = new Game(800, 800);
    surface=new Surface(800,800);
    game.onload = function(){
      // WidePhoto();
      game.rootScene.addChild(surface);
    };
    game.addEventListener('enterframe',function(e){
      // DrawPhoto(surface);
      draw();draw();draw();draw();draw();draw();draw();draw();draw();draw();//多次调用可以提高速度（调用几次就提高几倍）
    });
    game.start();
};

function DrawSunSystem(surface) {
  var sun = new Image();
  var moon = new Image();
  var earth = new Image();

  var seconds;
  var milliseconds;
  var time = new Date();

  sun.src = 'Canvas_sun.png';
  moon.src = 'Canvas_moon.png';
  earth.src = 'Canvas_earth.png';
  
  surface.context.globalCompositeOperation = 'destination-over';
  surface.context.clearRect(0,0,300,300); // clear canvas

  surface.context.fillStyle = 'rgba(0,0,0,0.4)';
  surface.context.strokeStyle = 'rgba(0,153,255,0.4)';
  surface.context.save();
  surface.context.translate(150,150);

  // Earth
  surface.context.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  surface.context.translate(105,0);
  surface.context.fillRect(0,-12,50,24); // Shadow
  surface.context.drawImage(earth,-12,-12);

  // Moon
  surface.context.save();
  surface.context.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  surface.context.translate(0,28.5);
  surface.context.drawImage(moon,-3.5,-3.5);
  surface.context.restore();

  surface.context.restore();
  
  surface.context.beginPath();
  surface.context.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
  surface.context.stroke();
 
  surface.context.drawImage(sun,0,0,300,300);
}
//--------------------------------------------------
function DrawClock(surface){
  var now = new Date();
  surface.context.save();
  surface.context.clearRect(0,0,150,150);
  surface.context.translate(75,75);
  surface.context.scale(0.4,0.4);
  surface.context.rotate(-Math.PI/2);
  surface.context.strokeStyle = "black";
  surface.context.fillStyle = "white";
  surface.context.lineWidth = 8;
  surface.context.lineCap = "round";

  // Hour marks
  surface.context.save();
  for (var i=0;i<12;i++){
    surface.context.beginPath();
    surface.context.rotate(Math.PI/6);
    surface.context.moveTo(100,0);
    surface.context.lineTo(120,0);
    surface.context.stroke();
  }
  surface.context.restore();

  // Minute marks
  surface.context.save();
  surface.context.lineWidth = 5;
  for (i=0;i<60;i++){
    if (i%5!=0) {
      surface.context.beginPath();
      surface.context.moveTo(117,0);
      surface.context.lineTo(120,0);
      surface.context.stroke();
    }
    surface.context.rotate(Math.PI/30);
  }
  surface.context.restore();
 
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr  = now.getHours();
  hr = hr>=12 ? hr-12 : hr;

  surface.context.fillStyle = "black";

  // write Hours
  surface.context.save();
  surface.context.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
  surface.context.lineWidth = 14;
  surface.context.beginPath();
  surface.context.moveTo(-20,0);
  surface.context.lineTo(80,0);
  surface.context.stroke();
  surface.context.restore();

  // write Minutes
  surface.context.save();
  surface.context.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
  surface.context.lineWidth = 10;
  surface.context.beginPath();
  surface.context.moveTo(-28,0);
  surface.context.lineTo(112,0);
  surface.context.stroke();
  surface.context.restore();
 
  // Write seconds
  surface.context.save();
  surface.context.rotate(sec * Math.PI/30);
  surface.context.strokeStyle = "#D40000";
  surface.context.fillStyle = "#D40000";
  surface.context.lineWidth = 6;
  surface.context.beginPath();
  surface.context.moveTo(-30,0);
  surface.context.lineTo(83,0);
  surface.context.stroke();
  surface.context.beginPath();
  surface.context.arc(0,0,10,0,Math.PI*2,true);
  surface.context.fill();
  surface.context.beginPath();
  surface.context.arc(95,0,10,0,Math.PI*2,true);
  surface.context.stroke();
  surface.context.fillStyle = "rgba(0,0,0,0)";
  surface.context.arc(0,0,3,0,Math.PI*2,true);
  surface.context.fill();
  surface.context.restore();

  surface.context.beginPath();
  surface.context.lineWidth = 14;
  surface.context.strokeStyle = '#325FA2';
  surface.context.arc(0,0,142,0,Math.PI*2,true);
  surface.context.stroke();

  surface.context.restore();
}
//------------------------------------------------------
function WidePhoto(){
  
  imgW = img.width*scale;
  imgH = img.height*scale;
  if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
  if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
  else { clearX = CanvasXSize; }
  if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
  else { clearY = CanvasYSize; }
}

function DrawPhoto(surface) {
    //Clear Canvas
    surface.context.clearRect(0,0,clearX,clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { surface.context.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { surface.context.drawImage(img,x-imgW+1,y,imgW,imgH); }
    }
    //draw image
    surface.context.drawImage(img,x,y,imgW,imgH);
    //amount to move
    x += dx;
}
//---------------------------------------------------------


function clear() {
  surface.context.fillStyle = 'rgba(255,255,255,0.3)';
  surface.context.fillRect(0,0,game.width,game.height);
}

function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > game.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > game.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
}