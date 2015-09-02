(function () {
  if (typeof BounceGame === "undefined") {
    window.BounceGame = {};
  }


  var Sphere = BounceGame.Sphere = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.vel = [3,options.vel[1]];
    this.accel = [0,1];
    this.color = "#00CC99";
    this.radius = 20;
    this.cor = 0.9;
  };


  Sphere.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);
    ctx.fill();
  };

  Sphere.prototype.collide = function(ctx) {
    // debugger;
    if (this.pos[0]+this.radius <= 0 || this.pos[0]+this.radius >= BounceGame.Game.DIM_X ){
      this.vel = [- this.vel[0]*this.cor, this.vel[1]]
      if (this.vel[0] < 1 && this.vel[0] > -1){
        this.vel[0] = 0;
        this.pos[0] = BounceGame.Game.DIM_X - this.radius;
        } 
      } else if (
        (this.pos[1]+this.radius <= 0  && this.vel[1] < 0)
        || 
        (this.pos[1]+this.radius >= BounceGame.Game.DIM_Y && this.vel[1] > 0)
          ){
      this.vel = [this.vel[0], -this.vel[1]*this.cor]
      if (this.vel[1] < 1 && this.vel[1] > -1){
        this.vel = [0,0];
        this.accel = [0,0];
        this.pos[1] = BounceGame.Game.DIM_Y - this.radius;
      }
    } else {
      return false;
    }
    return true;
  }

  Sphere.prototype.move = function () {
    if (this.collide());
    delete this.game.positions["" + this.pos[0] + "," + this.pos[1]];
    this.vel = [this.vel[0] + this.accel[0], this.vel[1] + this.accel[1]];
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.game.positions["" + this.pos[0] + "," + this.pos[1]] = this;

  };

})();