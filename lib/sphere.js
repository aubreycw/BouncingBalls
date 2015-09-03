(function () {
  if (typeof BounceGame === "undefined") {
    window.BounceGame = {};
  }


  var Sphere = BounceGame.Sphere = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.vel = [Math.floor(Math.random()*8 - 4),options.vel[1]];
    this.accel = [0,1];
    this.color = "#00CC99";
    this.radius = options.radius;
    this.cor = 0.9;
  };


  Sphere.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);
    ctx.fill();
  };

  Sphere.prototype.collideBall = function(){
    var that = this;
    Object.keys(this.game.spheres).forEach(function (key) {
      var other = that.game.spheres[key];
      distance = Math.pow(Math.pow(Math.abs(other.pos[0] - that.pos[0]),2) + Math.pow(other.pos[1] - that.pos[1],2) ,1/2)
      if ( other && that !== other && distance < that.radius + other.radius) {
        debugger;
          that.combine(other);
          return true;
        }
    })
  return false;
  }

  Sphere.prototype.combine = function(other){
    delete this.game.spheres["" + this.pos[0] + "," + this.pos[1]];
    delete this.game.spheres["" + other.pos[0] + "," + other.pos[1]];
    this.game.add(new BounceGame.Sphere({
      game: this.game,
      pos: [Math.floor((this.pos[0]+other.pos[0])/2),Math.floor((this.pos[1]+other.pos[1])/2)],
      vel: [Math.floor((this.vel[0]+other.vel[0])/2),Math.floor((this.vel[1]+other.vel[1])/2)],
      radius: Math.floor(Math.pow((Math.pow(this.radius,3) + Math.pow(other.radius,3)),1/3))
    }));
    delete this;
    delete other;
  }

  Sphere.prototype.collide = function() {
    if (this.collideBall()){
      return true;
    }
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
    delete this.game.spheres["" + this.pos[0] + "," + this.pos[1]];
    this.vel = [this.vel[0] + this.accel[0], this.vel[1] + this.accel[1]];
    this.pos = [Math.floor(this.pos[0] + this.vel[0]), Math.floor(this.pos[1] + this.vel[1])];
    this.game.spheres["" + this.pos[0] + "," + this.pos[1]] = this;
    this.collide();
  };

})();