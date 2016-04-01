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
    wall.draw(wall.context).move(that.canvasWidth, that.canvasHeight, that.walls);
  });
};


Zeus.prototype.eliminateCanvas = function() {
  // var wall = this.walls[0];
  var ball = this.ball;
  var width = this.canvasWidth;
  var height = this.canvasHeight;
  if (this.walls.length > 0) {
    this.walls.forEach(function(wall) {
      if (wall.building_wall === false) {
        detectionAroundVerticalWalls(wall, ball, width, height);
        detectionAroundHorizontalWalls(wall, ball, width, height);
      }
    });
  }
};

function detectionAroundVerticalWalls(wall, ball, width, height) {
  if (wall.x < ball.x) {
    colorCanvas(wall.x, 0, -(width - wall.x), height);
  } else {
    colorCanvas(wall.x, 0, (width - wall.x), height);
  }
}

function detectionAroundHorizontalWalls(wall, ball, width, height) {
  if (wall.y < ball.y) {
    colorCanvas(0, wall.y, width, -height);
  } else {
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
