var Ball = require('./ball');
var BallDetection = require('./ball-detection')

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
  this.ball.draw(this.ball, this.context).move(this.canvasWidth, this.canvasHeight, this.walls);
};



Zeus.prototype.initializeWall = function() {
  // var lastKeyPress = tracker.orientation
  var that = this;
  this.walls.forEach(function(wall) {
    wall.draw(wall.context).move(that.canvasWidth, that.canvasHeight);
  });
};

Zeus.prototype.eliminateCanvas = function() {
  var wall = this.walls[0];
  var ball = this.ball;
  if (this.walls.length > 0 && wall.building_wall === false) {
    ballDetection(wall, ball, this.canvasWidth, this.canvasHeight);
  }
};

function ballDetection(wall, ball, width, height) {
  if (wall.y < ball.y) {
    console.log('Below wall: ' + wall.y)
    colorCanvas(0, wall.y, width, -height);
  } else {
    console.log('Above wall: ' + wall.y)
    colorCanvas(0, wall.y, width, height);
  }
}

function colorCanvas(x, y, width, height) {
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');
  context.beginPath();
  context.rect(x, y, width, height);
  context.fillStyle = 'white';
  context.fill();
}

module.exports = Zeus;
