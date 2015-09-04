ReboundSphere.prototype.collideBall = function(){
    var that = this;
    Object.keys(this.game.spheres).forEach(function (key) {
      var other = that.game.spheres[key];
      var distance = 1;
      if (other && that){
        distance = Math.pow(Math.pow(Math.abs(other.pos[0] - that.pos[0]),2) + Math.pow(other.pos[1] - that.pos[1],2) ,1/2)
      };
      if ( other && that !== other && distance < that.radius + other.radius) {
          that.rebound(other);
          return true;
        }
    })
  return false;
  }