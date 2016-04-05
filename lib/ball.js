var BallEdges = require('./ball-edges')

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

Ball.prototype.move = function(canvasWidth, canvasHeight, walls) {
	// moved to ball-edges
	// var BallEdges.leftSideOfBall(this) = [this.x - this.radius, this.x - this.radius + 1, this.x - this.radius - 1];
	// var BallEdges.rightSideOfBall(this) = [this.x + this.radius, this.x + this.radius + 1, this.x + this.radius - 1];
	// var BallEdges.topOfBall(this) = [this.y - this.radius, this.y - this.radius + 1, this.y - this.radius - 1];
	// var BallEdges.bottomOfBall(this) = [this.y + this.radius, this.y + this.radius + 1, this.y + this.radius - 1];

	// change direction if you hit the canvas boundaries horizontally
  if(BallEdges.rightSideOfBall(this).includes(canvasWidth) || BallEdges.leftSideOfBall(this).includes(0)) {
    this.vx = -this.vx;
  }
	// change direction if you hit the canvas boundaires vertically

	if(BallEdges.bottomOfBall(this).includes(canvasHeight) || BallEdges.topOfBall(this).includes(0)) {
		this.vy = -this.vy;
	}

	var xValuesOfWalls = walls.map(function(wall){
		return wall.x, (wall.x + 1);
	});

	var yValuesOfWalls = walls.map(function(wall){
		return wall.y, (wall.y + 1);
	});

	function hitsBuildingHorizontalWall(ball) {
		var wall = walls[walls.length - 1];
		return (ball.x > wall.x && ball.x < (wall.x + wall.width)	&& wall.building_wall === true);
	}

	function hitsBuildingVerticalWall(ball) {
		var wall = walls[walls.length - 1];
		return (ball.y > wall.y && ball.y < (wall.y + wall.height)	&& wall.building_wall === true);
	}
	var that = this
	var wallHitAbove = walls.filter(function(wall) {return BallEdges.topOfBall(that).includes(wall.y+1);})[0];
	var wallHitBelow = walls.filter(function(wall) {return BallEdges.bottomOfBall(that).includes(wall.y+1);})[0];
	var wallHitToRight = walls.filter(function(wall) {return BallEdges.rightSideOfBall(that).includes(wall.x+1);})[0];
	var wallHitToLeft = walls.filter(function(wall) {return BallEdges.leftSideOfBall(that).includes(wall.x+1);})[0];


	if( walls.length > 0) {
		if (hitsBuildingHorizontalWall(this) && ballHitWall(BallEdges.bottomOfBall(this), yValuesOfWalls) && wallHitBelow.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingHorizontalWall(this) && ballHitWall(BallEdges.topOfBall(this), yValuesOfWalls) && wallHitAbove.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingVerticalWall(this) && ballHitWall(BallEdges.rightSideOfBall(this), xValuesOfWalls) && wallHitToRight.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingVerticalWall(this) && ballHitWall(BallEdges.leftSideOfBall(this), xValuesOfWalls) && wallHitToLeft.building_wall === true) {
			this.lose = true;
		}

		if (ballHitWall(BallEdges.bottomOfBall(this), yValuesOfWalls) && wallHitBelow.building_wall === false) {
			this.vy = -this.vy;
		}
		if (ballHitWall(BallEdges.topOfBall(this), yValuesOfWalls) && wallHitAbove.building_wall === false) {
			this.vy = -this.vy;
		}
		if (ballHitWall(BallEdges.rightSideOfBall(this), xValuesOfWalls) && wallHitToRight.building_wall === false) {
		this.vx = -this.vx;
		}
		if (ballHitWall(BallEdges.leftSideOfBall(this), xValuesOfWalls) && wallHitToLeft.building_wall === false) {
		this.vx = -this.vx;
		}
	}

	function ballHitWall(sideOfBall, wallValues) {
		return sideOfBall.filter(function(num) {return wallValues.includes(num)}).length > 0
	}

  this.x += this.vx; this.y += this.vy;
  return this;
};


module.exports = Ball;
