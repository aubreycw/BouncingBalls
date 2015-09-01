(function () {
  if (typeof BounceGame === "undefined") {
    window.BounceGame = {};
  }

  var Game = BounceGame.Game = function () {
    this.positions = {};
    this.mouse_x = 300;
    this.mouse_y = 300;
  };

  Game.BG_COLOR = "#341934";
  // Game.DIM_X = 1000;
  // Game.DIM_Y = 600;
  Game.FPS = 120;

})();
