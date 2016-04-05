var _ = require("lodash");
var Ball = require('./ball');
var BallDetection = require('./ball-detection')

function Zeus() {
  this.canvas = document.getElementById('game');
  this.context = this.canvas.getContext('2d');
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ball = new Ball({x: 30, y: 30, context: this.context});
  this.walls = [];
  this.canvasArea = this.canvasWidth * this.canvasHeight;
  this.originalCanvasArea = this.canvasWidth * this.canvasHeight;
  this.eliminatedArea = 0
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

Zeus.prototype.existingCanvas = function(){
  if (this.walls.length > 0) {
    var filteredHorizontal = this.walls.filter(function(wall){
      return wall.orientation === 0;
    });
    filteredHorizontal.push({startY: this.ball.y});

    var filteredVertical = this.walls.filter(function(wall){
      return wall.orientation === 1;
    });
    filteredVertical.push({startX: this.ball.x});

    var sortedYValues = _.sortBy(filteredHorizontal, 'startY').map(function(wall) {return wall.startY;});
    var sortedXValues = _.sortBy(filteredVertical, 'startX').map(function(wall) {return wall.startX;});

    var indexOfBallY = sortedYValues.indexOf(this.ball.y);
    var indexOfBallX = sortedXValues.indexOf(this.ball.x);

    var height = (sortedYValues[indexOfBallY+1] || this.canvasHeight) - (sortedYValues[indexOfBallY-1] || 0 );
    var width = (sortedXValues[indexOfBallX+1] || this.canvasWidth) - (sortedXValues[indexOfBallX-1] || 0);
    var newArea = width * height;
    console.log("Calulated New Area " + newArea);
    var newSizeElement = document.getElementById('new_canvas_size');
    newSizeElement.innerHTML = "Area Remaining: " + newArea + ". Percentage: " + (newArea/this.originalCanvasArea);
    if (newArea < 0.1) {alert("YOU WIN!")}
  }
};

Zeus.prototype.monitorGameStatus = function() {
  if(this.ball.lose === true) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ball.vx = 0;
    this.ball.vy = 0;
    return alert("Game Over")
    console.log('GAME OVER!!!!!!!!!!!')
  }
};

Zeus.prototype.eliminateCanvas = function() {
  var ball = this.ball;
  var height = this.canvasHeight;
  var that = this;
  var width = this.canvasWidth;
  if (this.walls.length > 0) {
    this.walls.forEach(function(wall) {

      if (wall.building_wall === false) {
        if(wall.orientation === 0){detectionAroundHorizontalWalls(wall, ball, width, height);}
        if(wall.orientation === 1){detectionAroundVerticalWalls(wall, ball, width, height, that);}
      }
    });
  }
};


function detectionAroundVerticalWalls(wall, ball, width, height, zeus) {
  if (wall.x < ball.x) {

    var filteredVertical = zeus.walls.filter(function(wall){
      return wall.orientation === 1;
    });
    var filteredXValues = _.sortBy(filteredVertical, 'startX').map(function(wall) {return wall.startX;});
    filteredXValues.push(ball.x);
    var sortedXValues = filteredXValues.sort(function(a,b){return a - b; });
    var currentBallIndex =  sortedXValues.indexOf(ball.x);
    var storedWidth = (sortedXValues[currentBallIndex - 1] - sortedXValues[currentBallIndex - 2]) || width;

    colorCanvas(wall.x, 0, -width, height);
    var areaRemoved = wall.x * height;
    newArea(areaRemoved, zeus, wall);
  } else {
    colorCanvas(wall.x, 0, (width - wall.x), height);
    var areaRemoved = storedWidth * height;
    newArea(areaRemoved, zeus, wall);
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
