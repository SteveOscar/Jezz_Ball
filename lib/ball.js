var BallEdges = require('./ball-edges')
var WallHelper = require('./wall-helper')

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

Ball.prototype.move = function(canvasWidth, canvasHeight, walls) {
	reverseHorizontalVelocityAgainstCanvas(canvasWidth, this);
	reverseVerticalVelocityAgainstCanvas(canvasHeight, this);

	var that = this;
	var wallHitAbove = walls.filter(function(wall) {return BallEdges.topOfBall(that).includes(wall.y+1);})[0];
	var wallHitBelow = walls.filter(function(wall) {return BallEdges.bottomOfBall(that).includes(wall.y+1);})[0];
	var wallHitToRight = walls.filter(function(wall) {return BallEdges.rightSideOfBall(that).includes(wall.x+1);})[0];
	var wallHitToLeft = walls.filter(function(wall) {return BallEdges.leftSideOfBall(that).includes(wall.x+1);})[0];


	if( walls.length > 0) {
		if (hitsBuildingHorizontalWall(this, walls) && ballHitWall(BallEdges.bottomOfBall(this), WallHelper.yValuesOfWalls(walls)) && wallHitBelow.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingHorizontalWall(this, walls) && ballHitWall(BallEdges.topOfBall(this), WallHelper.yValuesOfWalls(walls)) && wallHitAbove.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingVerticalWall(this, walls) && ballHitWall(BallEdges.rightSideOfBall(this), WallHelper.xValuesOfWalls(walls)) && wallHitToRight.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingVerticalWall(this, walls) && ballHitWall(BallEdges.leftSideOfBall(this), WallHelper.xValuesOfWalls(walls)) && wallHitToLeft.building_wall === true) {
			this.lose = true;
		}

		if (ballHitWall(BallEdges.bottomOfBall(this), WallHelper.yValuesOfWalls(walls)) && wallHitBelow.building_wall === false) {
			this.vy = -this.vy;
		}
		if (ballHitWall(BallEdges.topOfBall(this), WallHelper.yValuesOfWalls(walls)) && wallHitAbove.building_wall === false) {
			this.vy = -this.vy;
		}
		if (ballHitWall(BallEdges.rightSideOfBall(this), WallHelper.xValuesOfWalls(walls)) && wallHitToRight.building_wall === false) {
		this.vx = -this.vx;
		}
		if (ballHitWall(BallEdges.leftSideOfBall(this), WallHelper.xValuesOfWalls(walls)) && wallHitToLeft.building_wall === false) {
		this.vx = -this.vx;
		}
	}

	function ballHitWall(sideOfBall, wallValues) {
		return sideOfBall.filter(function(num) {
			return wallValues.includes(num);
		}).length > 0;
	}

  this.x += this.vx; this.y += this.vy;
  return this;
};


module.exports = Ball;
