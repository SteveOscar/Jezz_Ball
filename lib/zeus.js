var _ = require("lodash");
var $ = require('jquery');
var Ball = require('./ball');

function Zeus() {
  this.canvas = document.getElementById('game');
  this.context = this.canvas.getContext('2d');
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.walls = [];
  this.canvasArea = this.canvasWidth * this.canvasHeight;
  this.originalCanvasArea = this.canvasWidth * this.canvasHeight;
  this.eliminatedArea = 0;
  this.playing = false;
  this.win = false;
  this.gameplayArea = 100;
  this.level = 1;
  this.ball = new Ball({x: 30, y: 30, context: this.context, level:
  this.level});
}


Zeus.prototype.inPlay = function() {
  return this.playing;
};

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
    var newSizeElement = document.getElementById('new_canvas_size');
    if (this.walls[this.walls.length - 1].building_wall === false) {
      this.gameplayArea = (newArea/this.originalCanvasArea) * 100;
    }
    newSizeElement.innerHTML = "Area Remaining: " + newArea + ". Percentage: " + this.gameplayArea;
  }
};

function highScore(zeus) {
  var cookieDisplay = '1';
  if(document.cookie.length > 12){
    cookieDisplay = document.cookie.split(';')[1].split('=')[1];
  }
  if(zeus.level > parseInt(cookieDisplay)){document.cookie = "high_score="+zeus.level;}
  $('#high_score').text(cookieDisplay);
}

function toggleGameEndScreen(zeus){
	$('#game_over').css('display', 'block');
	$( "#play_again_button" ).click(function() {
		$("#game_over").fadeOut( "slow", function() {
			$("#game_over").css('display', 'none');
      highScore(zeus);
      zeus.gameplayArea = 100;
      zeus.level = 1;
      $('#game_level').text(zeus.level);
      zeus.resetGame();
		});
	});
}

function toggleNextLevelScreen(zeus){
  $('#next_level').css('display', 'block');
  $( "#next_level_button" ).click(function() {
    $("#next_level").fadeOut( "slow", function() {
      $("#next_level").css('display', 'none');
      zeus.gameplayArea = 100;
      zeus.playing = true;
      zeus.resetGame();
      $('#game_level').text(zeus.level);
    });
  });
}

Zeus.prototype.resetGame = function() {
  this.walls = [];
  this.ball = new Ball({x: 30, y: 30, context: this.context, level: this.level});
};

Zeus.prototype.monitorGameStatus = function() {
  if(this.ball.lose === true) {
    toggleGameEndScreen(this);
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  if (this.gameplayArea < 40 && this.ball.lose === false) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.walls = [];
    this.level += 1;
    this.playing = false;
    toggleNextLevelScreen(this);
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
  context.fillStyle = 'teal';
  context.fill();
}

module.exports = Zeus;
