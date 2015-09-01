(function () {
  if (typeof BounceGame === "undefined") {
    window.BounceGame = {};
  }


  var Sphere = BounceGame.Sphere = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.vel = options.vel;
    this.accel = [0,1];
    this.color = "#341934";
    this.radius = 20;
  };


  Sphere.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
  };

  Sphere.prototype.move = function () {
    delete this.game.positions["" + this.pos[0] + "," + this.pos[1]];
    this.vel = [this.vel[0] + this.accel[0], this.vel[1] + this.accel[1]];
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.game.positions["" + this.pos[0] + "," + this.pos[1]] = this;

  };

})();