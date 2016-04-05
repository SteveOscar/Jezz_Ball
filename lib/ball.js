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
	var leftSideOfBall = this.x - this.radius;
	var rightSideOfBall = this.x + this.radius;
	var topOfBall = this.y - this.radius;
	var bottomOfBall = this.y + this.radius;

	// change direction if you hit the canvas boundaries horizontally
  if(rightSideOfBall > canvasWidth || leftSideOfBall < 0) {
    this.vx = -this.vx;
  }
	// change direction if you hit the canvas boundaires vertically
	if(bottomOfBall > canvasHeight || topOfBall < 0) {
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

	var wallHitAbove = walls.filter(function(wall) {return wall.y+1 === topOfBall;})[0];
	var wallHitBelow = walls.filter(function(wall) {return wall.y+1 === bottomOfBall;})[0];
	var wallHitToRight = walls.filter(function(wall) {return wall.x+1 === rightSideOfBall;})[0];
	var wallHitToLeft = walls.filter(function(wall) {return wall.x+1 === leftSideOfBall;})[0];

	if( walls.length > 0) {
		if (hitsBuildingHorizontalWall(this) && yValuesOfWalls.includes(bottomOfBall) && wallHitBelow.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingHorizontalWall(this) && yValuesOfWalls.includes(topOfBall) && wallHitAbove.building_wall === true) {
			this.lose = true;
		}

		if (yValuesOfWalls.includes(bottomOfBall) && wallHitBelow.building_wall === false) {
			this.vy = -this.vy;
		}

		if (yValuesOfWalls.includes(topOfBall) && wallHitAbove.building_wall === false) {
			this.vy = -this.vy;
		}
		if (hitsBuildingVerticalWall(this) && xValuesOfWalls.includes(rightSideOfBall) && wallHitToRight.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingVerticalWall(this) && xValuesOfWalls.includes(leftSideOfBall) && wallHitToLeft.building_wall === true) {
			this.lose = true;
		}

		if (xValuesOfWalls.includes(rightSideOfBall) && wallHitToRight.building_wall === false) {
		this.vx = -this.vx;
		}
		if (xValuesOfWalls.includes(leftSideOfBall) && wallHitToLeft.building_wall === false) {
		this.vx = -this.vx;
		}
	}

  this.x += this.vx; this.y += this.vy;
  return this;
};


module.exports = Ball;
