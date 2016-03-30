var Ball = require('./ball');

function Zeus() {
  this.canvas = document.getElementById('game');
  this.context = this.canvas.getContext('2d');
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ball = new Ball({x: 30, y: 30, context: this.context});
  this.walls = [];
  // this.orientation = 'horizontal';
}

Zeus.prototype.initializeBall = function() {
  this.ball.draw(this.ball, this.context).move(this.canvasWidth, this.canvasHeight);
};

var tracker = new Tracker();
window.addEventListener('keypress', function(e) {
  tracker.orientation = e.charCode
});

function Tracker() {
  this.orientation = 1;
}

Zeus.prototype.initializeWall = function() {
  var lastKeyPress = tracker.orientation
  var that = this;
  this.walls.forEach(function(wall) {
    wall.draw(wall.context).move(that.canvasWidth, that.canvasHeight, lastKeyPress);
  });
};

module.exports = Zeus;
