enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 30;
    game.preload("bird.png");
    game.preload("images/bg.png");

    game.onload = function(){
        var bird = new Sprite(43, 30);
        bird.image = game.assets["bird.png"];
        bird.x = 0;
        bird.y = 100;
        bird.frame = 5;
        game.rootScene.addChild(bird);

        bird.addEventListener("enterframe", function(){
          if(this.age%4==0)
            this.frame = this.age % 3 + 1 ;
            if(this.y<100){
              this.y=this.y+30;
            }
            if(this.rotation!=0){
              this.rotation=0;
            }
            if(game.input.up){
              if(this.age%4==0){
                bird.rotate(-30);
                bird.y=bird.y-50;
              }
            }
        });

        game.rootScene.on('touchend', function(evt) {
          bird.rotation=-30;
          bird.y=bird.y-50;
        });
    };
    game.start();
};
