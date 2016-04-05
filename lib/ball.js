var BallEdges = require('./ball-edges');
var WallHelper = require('./wall-helper');
var $ = require('jquery');

function Ball(data) {
	this.x = data.x;
	this.y = data.y;
	this.color = "yellow";
	this.radius = 20;
	this.vx = 2;
	this.vy = -2;
  this.context = data.context || 'test';
	this.lose = false;
}

Ball.prototype.draw = function(ball, context) {
  context.fillStyle = ball.color;
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, true);
  context.closePath();
  context.save();
  context.shadowBlur = 35;
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 1;
  context.shadowColor = "white";
  context.fill();
  context.restore();
  return this;
};

function reverseHorizontalVelocityAgainstCanvas(canvasWidth, ball) {
	if(BallEdges.rightSideOfBall(ball).includes(canvasWidth) || BallEdges.leftSideOfBall(ball).includes(0)) {
		ball.vx = -ball.vx;
	}
}

function reverseVerticalVelocityAgainstCanvas(canvasHeight, ball) {
	if(BallEdges.bottomOfBall(ball).includes(canvasHeight) || BallEdges.topOfBall(ball).includes(0)) {
		ball.vy = -ball.vy;
	}
}

function hitsBuildingHorizontalWall(ball, walls) {
	var wall = WallHelper.lastWallCreated(walls);
	return (ball.x > wall.x && ball.x < (wall.x + wall.width)	&& wall.building_wall === true);
}

function hitsBuildingVerticalWall(ball, walls) {
	var wall = WallHelper.lastWallCreated(walls);
	return (ball.y > wall.y && ball.y < (wall.y + wall.height)	&& wall.building_wall === true);
}

function findWallAbove(walls, ball){
	return walls.filter(function(wall){
		return BallEdges.topOfBall(ball).includes(wall.y+1);
	})[0];
}
function findWallBelow(walls, ball){
	return walls.filter(function(wall) {
		return BallEdges.bottomOfBall(ball).includes(wall.y+1);
	})[0];
}

function findWallToRight(walls, ball){
	return walls.filter(function(wall) {
		return BallEdges.rightSideOfBall(ball).includes(wall.x+1);
	})[0];
}

function findWallToLeft(walls, ball) {
	return walls.filter(function(wall) {
		return BallEdges.leftSideOfBall(ball).includes(wall.x+1);
	})[0];
}

function ballHitWall(sideOfBall, wallValues) {
	return sideOfBall.filter(function(num) {
		return wallValues.includes(num);
	}).length > 0;
}

function toggleGameEndScreen(){
	$('#game_over').toggle();
	$( "#play_again_button" ).click(function() {
		$("#game_over").fadeOut( "slow", function() {
			$("#game_over").css('display', 'none');
		});
	});
}

function checkIfLoseGame(walls, ball) {
	if (hitsBuildingHorizontalWall(ball, walls) && ballHitWall(BallEdges.bottomOfBall(ball), WallHelper.yValuesOfWalls(walls)) && findWallBelow(walls, ball).building_wall === true) {
		ball.lose = true;
		toggleGameEndScreen();
	}
	if (hitsBuildingHorizontalWall(ball, walls) && ballHitWall(BallEdges.topOfBall(ball), WallHelper.yValuesOfWalls(walls)) && findWallAbove(walls, ball).building_wall === true) {
		ball.lose = true;
		toggleGameEndScreen();
	}
	if (hitsBuildingVerticalWall(ball, walls) && ballHitWall(BallEdges.rightSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && findWallToRight(walls, ball).building_wall === true) {
		ball.lose = true;
		toggleGameEndScreen();
	}
	if (hitsBuildingVerticalWall(ball, walls) && ballHitWall(BallEdges.leftSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && findWallToLeft(walls, ball).building_wall === true) {
		ball.lose = true;
		toggleGameEndScreen();
	}
}

function checkForValidCollisions(walls, ball) {
	if (ballHitWall(BallEdges.bottomOfBall(ball), WallHelper.yValuesOfWalls(walls)) && findWallBelow(walls, ball).building_wall === false) {
		ball.vy = -ball.vy;
	}
	if (ballHitWall(BallEdges.topOfBall(ball), WallHelper.yValuesOfWalls(walls)) && findWallAbove(walls, ball).building_wall === false) {
		ball.vy = -ball.vy;
	}
	if (ballHitWall(BallEdges.rightSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && findWallToRight(walls, ball).building_wall === false) {
	ball.vx = -ball.vx;
	}
	if (ballHitWall(BallEdges.leftSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && findWallToLeft(walls, ball).building_wall === false) {
	ball.vx = -ball.vx;
	}
}

Ball.prototype.move = function(canvasWidth, canvasHeight, walls) {
	reverseHorizontalVelocityAgainstCanvas(canvasWidth, this);
	reverseVerticalVelocityAgainstCanvas(canvasHeight, this);
	if( walls.length > 0) {
		checkIfLoseGame(walls, this);
		checkForValidCollisions(walls, this);
	}
  this.x += this.vx; this.y += this.vy;
  return this;
};


module.exports = Ball;
