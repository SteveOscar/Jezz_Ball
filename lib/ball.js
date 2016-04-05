function Ball(data) {
	this.x = data.x;
	this.y = data.y;
	this.color = "yellow";
	this.radius = 20;
	this.vx = 1;
	this.vy = -1;
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
	var leftSideOfBall = [this.x - this.radius, this.x - this.radius + 1, this.x - this.radius - 1];
	var rightSideOfBall = [this.x + this.radius, this.x + this.radius + 1, this.x + this.radius - 1];
	var topOfBall = [this.y - this.radius, this.y - this.radius + 1, this.y - this.radius - 1];
	var bottomOfBall = [this.y + this.radius, this.y + this.radius + 1, this.y + this.radius - 1];

	// change direction if you hit the canvas boundaries horizontally
  if(rightSideOfBall.includes(canvasWidth) || leftSideOfBall.includes(0)) {
    this.vx = -this.vx;
  }
	// change direction if you hit the canvas boundaires vertically
	if(bottomOfBall.includes(canvasHeight) || topOfBall.includes(0)) {
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

	var wallHitAbove = walls.filter(function(wall) {return topOfBall.includes(wall.y+1);})[0];
	var wallHitBelow = walls.filter(function(wall) {return bottomOfBall.includes(wall.y+1);})[0];
	var wallHitToRight = walls.filter(function(wall) {return rightSideOfBall.includes(wall.x+1);})[0];
	var wallHitToLeft = walls.filter(function(wall) {return leftSideOfBall.includes(wall.x+1);})[0];

	if( walls.length > 0) {
		if (hitsBuildingHorizontalWall(this) && ballHitWall(bottomOfBall, yValuesOfWalls) && wallHitBelow.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingHorizontalWall(this) && ballHitWall(topOfBall, yValuesOfWalls) && wallHitAbove.building_wall === true) {
			this.lose = true;
		}

		if (ballHitWall(bottomOfBall, yValuesOfWalls) && wallHitBelow.building_wall === false) {
			this.vy = -this.vy;
		}

		if (ballHitWall(topOfBall, yValuesOfWalls) && wallHitAbove.building_wall === false) {
			this.vy = -this.vy;
		}
		if (hitsBuildingVerticalWall(this) && ballHitWall(rightSideOfBall, xValuesOfWalls) && wallHitToRight.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingVerticalWall(this) && ballHitWall(leftSideOfBall, xValuesOfWalls) && wallHitToLeft.building_wall === true) {
			this.lose = true;
		}

		if (ballHitWall(rightSideOfBall, xValuesOfWalls) && wallHitToRight.building_wall === false) {
		this.vx = -this.vx;
		}
		if (ballHitWall(leftSideOfBall, xValuesOfWalls) && wallHitToLeft.building_wall === false) {
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
