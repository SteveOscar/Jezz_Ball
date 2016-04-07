var BallEdges = require('./ball-edges');
var WallHelper = require('./wall-helper');


module.exports = {

  reverseHorizontalVelocityAgainstCanvas: function(canvasWidth, ball) {
  	if(BallEdges.rightSideOfBall(ball).includes(canvasWidth) || BallEdges.leftSideOfBall(ball).includes(0)) {
  		ball.vx = -ball.vx;
  	}
  },

  reverseVerticalVelocityAgainstCanvas: function(canvasHeight, ball) {
  	if(BallEdges.topOfBall(ball)[0] < 0 || BallEdges.bottomOfBall(ball).includes(canvasHeight)) {
  		ball.vy = -ball.vy;
  	}
  },

  hitsBuildingHorizontalWall: function(ball, walls) {
  	var wall = WallHelper.lastWallCreated(walls);
  	return (ball.x > wall.x && ball.x < (wall.x + wall.width)	&& wall.building_wall === true);
  },

  hitsBuildingVerticalWall: function(ball, walls) {
  	var wall = WallHelper.lastWallCreated(walls);
  	return (ball.y > wall.y && ball.y < (wall.y + wall.height)	&& wall.building_wall === true);
  },

  findWallAbove: function(walls, ball){
  	return walls.filter(function(wall){
  		return BallEdges.topOfBall(ball).includes(wall.y+1);
  	})[0];
  },

  findWallBelow: function(walls, ball){
  	return walls.filter(function(wall) {
  		return BallEdges.bottomOfBall(ball).includes(wall.y+1);
  	})[0];
  },

  findWallToRight: function(walls, ball){
  	return walls.filter(function(wall) {
  		return BallEdges.rightSideOfBall(ball).includes(wall.x+1);
  	})[0];
  },

  findWallToLeft: function(walls, ball) {
  	return walls.filter(function(wall) {
  		return BallEdges.leftSideOfBall(ball).includes(wall.x+1);
  	})[0];
  },

  ballHitWall: function(sideOfBall, wallValues) {
  	return sideOfBall.filter(function(num) {
  		return wallValues.includes(num);
  	}).length > 0;
  },

  checkIfLoseGame: function(walls, ball) {
  	if (this.hitsBuildingHorizontalWall(ball, walls) && this.ballHitWall(BallEdges.bottomOfBall(ball), WallHelper.yValuesOfWalls(walls)) && this.findWallBelow(walls, ball).building_wall === true) {
  		ball.lose = true;
  	}
  	if (this.hitsBuildingHorizontalWall(ball, walls) && this.ballHitWall(BallEdges.topOfBall(ball), WallHelper.yValuesOfWalls(walls)) && this.findWallAbove(walls, ball).building_wall === true) {
  		ball.lose = true;
  	}
  	if (this.hitsBuildingVerticalWall(ball, walls) && this.ballHitWall(BallEdges.rightSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && this.findWallToRight(walls, ball).building_wall === true) {
  		ball.lose = true;
  	}
  	if (this.hitsBuildingVerticalWall(ball, walls) && this.ballHitWall(BallEdges.leftSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && this.findWallToLeft(walls, ball).building_wall === true) {
  		ball.lose = true;
  	}
  },

  checkForValidCollisions: function(walls, ball) {
  	if (this.ballHitWall(BallEdges.bottomOfBall(ball), WallHelper.yValuesOfWalls(walls)) && this.findWallBelow(walls, ball).building_wall === false) {
  		ball.vy = -ball.vy;
  	}
  	if (this.ballHitWall(BallEdges.topOfBall(ball), WallHelper.yValuesOfWalls(walls)) && this.findWallAbove(walls, ball).building_wall === false) {
  		ball.vy = -ball.vy;
  	}
  	if (this.ballHitWall(BallEdges.rightSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && this.findWallToRight(walls, ball).building_wall === false) {
  	ball.vx = -ball.vx;
  	}
  	if (this.ballHitWall(BallEdges.leftSideOfBall(ball), WallHelper.xValuesOfWalls(walls)) && this.findWallToLeft(walls, ball).building_wall === false) {
  	ball.vx = -ball.vx;
  	}
  }

};
