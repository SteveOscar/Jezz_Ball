var BallEdges = require('./ball-edges');
var WallHelper = require('./wall-helper');

var collisionDetection = function(canvasWidth, canvasHeight, walls, ball){
  reverseHorizontalVelocityAgainstCanvas(canvasWidth, ball);
  reverseVerticalVelocityAgainstCanvas(canvasHeight, ball);

  if( walls.length > 0) {
    checkIfLoseGame(walls, ball);
    checkForValidCollisions(walls, ball);
  }

}

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

function checkIfLoseGame(walls, ball) {
	if (hitsBuildingHorizontalWall(ball, walls) && ballHitWall(BallEdges.bottomOfBall(ball), WallHelper.yValuesOfWalls(walls)) && findWallBelow(walls, ball).building_wall === true) {
		ball.lose = true;
	}
	if (hitsBuildingHorizontalWall(ball, walls) && ballHitWall(BallEdges.topOfBall(ball), WallHelper.yValuesOfWalls(walls)) && findWallAbove(walls, ball).building_wall === true) {
		ball.lose = true;
	}
	if (hitsBuildingVerticalWall(ball, walls) && ballHitWall(BallEdges.rightSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && findWallToRight(walls, ball).building_wall === true) {
		ball.lose = true;
	}
	if (hitsBuildingVerticalWall(ball, walls) && ballHitWall(BallEdges.leftSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && findWallToLeft(walls, ball).building_wall === true) {
		ball.lose = true;
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

module.exports = collisionDetection;
