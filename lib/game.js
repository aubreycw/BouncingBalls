(function () {
  if (typeof BounceGame === "undefined") {
    window.BounceGame = {};
  }

  var Game = BounceGame.Game = function () {
    this.positions = {};
    this.mouse_x = 300;
    this.mouse_y = 300;
  };

  Game.BG_COLOR = "#FFFFFF";
  // Game.DIM_X = 1000;
  // Game.DIM_Y = 600;
  Game.FPS = 120;

  Game.prototype.step = function(){
    var a = 2;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    var that = this;
    Object.keys(this.positions).forEach(function (key) {
      that.positions[key].draw(ctx)
      // particle.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    var that = this;
    Object.keys(this.positions).forEach(function (key) {
      if (that.positions[key]){
        that.positions[key].move();
      }
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
  };

  Game.prototype.add = function (object) {
    this.positions["" + object.pos[0] + "," + object.pos[1]] = object;
  };

  Game.prototype.mouseDown = function (x,y){
    this.add(new BounceGame.Sphere({
        game: this,
        pos: [x,y],
        vel: [0,0]
      }));
  };

})();
