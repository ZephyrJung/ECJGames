enchant();
var game ;
var Fish={};
// Math.randomseed(os.time())
	Fish.subs={}
	Fish.rect={}
	Fish.w;
	Fish.h;
var arrows;

function getSPF() {
	// body...

}

window.onload = function(){
	game = new Core(500, 500);
	Fish.w = game.width;
	Fish.h = game.height;
	arrows = create({x:-50,y:-50,w : game.width+100,h : game.height+100},90);
    game.onload = function(){
    	for(var i=1;i<arrows.length;i++){
			 var context=draw_subject(arrows[i])
			 game.rootScene.addChild(context);
    	}    
    };
    game.start();
    console.log('Fish.w:>'+Fish.w+' Fish.h:>'+Fish.h)
    var lastFrame;
    var curFrame;
    game.addEventListener('enterframe',function(e){
    	if(this.frame>1){
	    	curFrame=window.getTime();
	    	move((curFrame-lastFrame)/1000)
	    	lastFrame=curFrame;
			// turn(this.frame);
			for(var i=1;i<arrows.length;i++){
				 var context=draw_subject(arrows[i])
				 game.rootScene.addChild(context);
	    	}
    	}else{
    		lastFrame=window.getTime();
    	}
    });
};

function draw_subject(sub){
	var length=60;
	var pos={
		x:sub.x-length/2*Math.cos(sub.v.rad),
		y:sub.y-length/2*Math.sin(sub.v.rad)
	}
	var angle=sub.v.rad;
	
	var surface=new Surface(500,500);
	surface.context.beginPath();
    surface.context.moveTo(pos.x,pos.y);
    surface.context.lineTo(pos.x+length*Math.cos(angle),pos.y+length*Math.sin(angle));
    length=15;
    angle=Math.PI+sub.v.rad+0.4;
    // surface.context.moveTo(pos.x,pos.y);
    surface.context.lineTo(pos.x+length*Math.cos(angle),pos.y+length*Math.sin(angle));
    angle=Math.PI+sub.v.rad-0.4;
    // surface.context.moveTo(pos.x,pos.y);
    surface.context.lineTo(pos.x+length*Math.cos(angle),pos.y+length*Math.sin(angle));
    surface.context.stroke();
    return surface;
}

function create(rect,num){
	// rect
	// x -50
	// y -50
	// w 900
	// h 700
	// num
	// 90
	var vb=120,
		vr=0.6;
	var subs=new Array();
	for(var i=1;i<=num;i++){
		subs[i]={};
		// 位置
		x=Math.floor(rect.x+rect.w*Math.random());
		y=Math.floor(rect.y+rect.h*Math.random());
		// 速度向量
		v = {val:vb+vb*vr*(0.5-Math.random()*2),rad:2*Math.PI*Math.random()};
		// 反应时间
		rct = 0.4*Math.random()+0.1;
		// 手性
		chy = 0;
		subs[i]={x:x,y:y,v:v,rct:rct,chy:chy};
		Fish.subs=subs;
		Fish.rect=rect;
	}
	return subs;
}

function move(dt){
	for(var k=1;k<Fish.subs.length;k++){
		var _=Fish.subs[k];
		_.x = _.x + _.v.val*dt*Math.cos(_.v.rad);
		_.y = _.y + _.v.val*dt*Math.sin(_.v.rad);
		while(_.x>Fish.rect.x+Fish.rect.w) {
			_.x = _.x-Fish.rect.w;
		}
		while (_.x<Fish.rect.x) {
			_.x = _.x+Fish.rect.w;
		}
		while (_.y>Fish.rect.y+Fish.rect.h) {
			_.y = _.y-Fish.rect.h;
		}
		while (_.y<Fish.rect.y) {
			_.y = _.y+Fish.rect.h;
		}
	}
}

function angle_diff(a1,a2){
	if (a2<a1){
		a2 = a2 + 2*Math.PI;
	}
	var diff=a2-a1;
	if (diff>Math.PI){
		return diff-2*Math.PI;
	}
	else{
		return a2-a1;
	}
}

function turn( dt ){
	// ps. 仅处理视野范围内的主体
	dt = dt*0.2;
	for(var k=1;k<=Fish.subs.length;k++){
		while(true){
			var idx=k;
			var _=Fish.subs[idx];
			if (_.x<0 || _.x>Fish.w || _.y<0 || _.y>Fish.h)
				break;
			for(var i=idx;i<Fish.subs.length;i++){
				s = Fish.subs[i];
				s.v.val = s.v.val + 10*(Math.random()-0.5)*dt;
				s.chy = s.chy + (Math.random()-0.5)*0.1*dt;
				s.chy = s.chy * 0.999;
				while (s.v.rad<0){
					s.v.rad = s.v.rad+2*Math.PI;
				}
				while (s.v.rad>2*Math.PI){
					s.v.rad = s.v.rad-2*Math.PI;
				}
				if (i!=idx){
					var diff=Math.abs(s.v.val-_.v.val);
					var srad=s.v.rad,
						_rad=_.v.rad;
					var chy_diff=s.chy-_.chy;
					s.chy= s.chy-chy_diff*dt,
					_.chy= _.chy+chy_diff*dt;
					if (Math.abs(s.x-_.x)+Math.abs(s.y-_.y) <20){
						var rspeed=Math.random()-0.5;
						s.v.val = s.v.val + 10*rspeed*dt;
						_.v.val = _.v.val - 10*rspeed*dt;
						s.v.rad = s.v.rad + 4*rspeed*dt;
						_.v.rad = _.v.rad - 4*rspeed*dt;
					}
					else if (Math.abs(s.x-_.x)+Math.abs(s.y-_.y) <100){
						if (s.v.val>_.v.val){
							s.v.val = s.v.val - 0.05*diff*dt;
							_.v.val = _.v.val + 0.15*diff*dt;
							s.v.rad = s.v.rad + 0.15*angle_diff(srad , _rad)*dt;
							_.v.rad = _.v.rad + 0.35*angle_diff(_rad , srad)*dt;
						}
						else{
							_.v.val = _.v.val - 0.05*diff*dt;
							s.v.val = s.v.val + 0.15*diff*dt;
							_.v.rad = _.v.rad + 0.15*angle_diff(_rad , srad)*dt;
							s.v.rad = s.v.rad + 0.35*angle_diff(srad , _rad)*dt;
						}
					}
				}
				s.v.rad = s.v.rad + s.chy*dt;
			}
		}
	}
}


