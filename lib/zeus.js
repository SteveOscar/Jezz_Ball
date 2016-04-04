var _ = require("lodash");
var Ball = require('./ball');

function Zeus() {
  this.canvas = document.getElementById('game');
  this.context = this.canvas.getContext('2d');
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ball = new Ball({x: 30, y: 30, context: this.context});
  this.walls = [];
  this.canvasArea = this.canvasWidth * this.canvasHeight;
  this.originalCanvasArea = this.canvasWidth * this.canvasHeight;
  this.eliminatedArea = 0;
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
  var ball = this.ball;
  var width = this.canvasWidth;
  var height = this.canvasHeight;
  var that = this;
  if (this.walls.length > 0) {
    this.walls.forEach(function(wall) {
      if (wall.building_wall === false) {
        if(wall.orientation === 0){detectionAroundHorizontalWalls(wall, ball, width, height);}
        if(wall.orientation === 1){detectionAroundVerticalWalls(wall, ball, width, height);}
      }
    });
  }
};


function detectionAroundVerticalWalls(wall, ball, width, height, zeus) {
  if (wall.x < ball.x) {
    // var filteredVertical = zeus.walls.filter(function(wall){
    //   return wall.orientation === 1;
    // });
    // var filteredXValues = _.sortBy(filteredVertical, 'startX').map(function(wall) {return wall.startX;});
    // filteredXValues.push(ball.x);
    // var sortedXValues = filteredXValues.sort(function(a,b){return a - b; });
    // var currentBallIndex =  sortedXValues.indexOf(ball.x);
    // var storedWidth = (sortedXValues[currentBallIndex - 1] - sortedXValues[currentBallIndex - 2]) || width;
    // var areaRemoved = wall.x * height;
    // newArea(areaRemoved, zeus, wall);
    colorCanvas(wall.x, 0, -(width - wall.x), height);
    debugger;
  } else {
    colorCanvas(wall.x, 0, (width - wall.x), height);
    // var areaRemoved = storedWidth * height;
    // newArea(areaRemoved, zeus, wall);
  }
}

function newArea(areaRemoved, zeus, wall) {
  // var remainingCanvas = zeus.canvasArea - areaRemoved;
  if(wall.areaSubtracted === false){
    zeus.eliminatedArea += areaRemoved;
    wall.areaSubtracted = true;
  }
  zeus.canvasArea = zeus.originalCanvasArea;
  zeus.canvasArea = zeus.canvasArea - areaRemoved;
  var newSizeElement = document.getElementById('new_canvas_size');
  newSizeElement.innerHTML = "Area Removed: " + - (zeus.eliminatedArea / zeus.originalCanvasArea) * -100 + '%';
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
