function Ball(data) {
	this.x = data.x;
	this.y = data.y;
	this.color = "yellow";
	this.radius = 20;
	this.vx = 2;
	this.vy = -2;
  this.context = data.context || 'test';
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

	var xValuesOfWall = walls.map(function(wall){
		return wall.x, (wall.x + 1);
	});

	var yValuesOfWall = walls.map(function(wall){
		return wall.y, (wall.y + 1);
	});

	function hitsBuildingHorizontalWall(ball) {
		var wall = walls[walls.length - 1];
		return (ball.x > wall.x && ball.x < (wall.x + wall.width)	&& wall.building_wall === true);
	}

	function evadesBuildingHorizontalWall(ball) {
		var wall = walls[walls.length - 1];
		if (ball.x < wall.x || ball.x > (wall.x + wall.width)) {
			return false;
		} else {
			return true;
		}
	}

	function hitsBuildingVerticalWall(ball) {
		var wall = walls[walls.length - 1];
		return (ball.y > wall.y && ball.y < (wall.y + wall.height)	&& wall.building_wall === true);
	}

	function evadesBuildingVerticalWall(ball) {
		var wall = walls[walls.length - 1];
		if (ball.y < wall.y || ball.y > (wall.y + wall.height)) {
			return false;
		} else {
			return true;
		}
	}

	if( walls.length > 0) {
		// if(yValuesOfWall.includes(bottomOfBall + 1)){console.log('bottom hits!!')}
		if (hitsBuildingHorizontalWall(this) && yValuesOfWall.includes(bottomOfBall + 1)) {
			// END GAME
			console.log("You SHOULD LOsE NOW");
		}
		if (hitsBuildingHorizontalWall(this) && yValuesOfWall.includes(topOfBall + 1)) {
			// END GAME
			console.log("You SHOULD LOsE NOW");
		}

		if ((	yValuesOfWall.includes(bottomOfBall) ||
					yValuesOfWall.includes(bottomOfBall + 1) ||
					yValuesOfWall.includes(topOfBall) ||
					yValuesOfWall.includes(topOfBall + 1)) &&
					evadesBuildingHorizontalWall(this)) {
		 this.vy = -this.vy;
		 }
	}
	if(walls.length > 0){
		if (hitsBuildingVerticalWall(this) && xValuesOfWall.includes(rightSideOfBall + 1)) {
			// END GAME
			console.log("You SHOULD LOsE NOW!!!!!!!!!!!!!!!!!!!!!!!");
		}
		if (hitsBuildingVerticalWall(this) && xValuesOfWall.includes(leftSideOfBall + 1)) {
			// END GAME
			console.log("You SHOULD LOsE NOW!!!!!!!!!!!!!!!!!!!!!!!!!!");
		}

		if ((xValuesOfWall.includes(rightSideOfBall) ||
				xValuesOfWall.includes(rightSideOfBall + 1) ||
				xValuesOfWall.includes(leftSideOfBall) ||
				xValuesOfWall.includes(leftSideOfBall + 1)) &&
				evadesBuildingVerticalWall(this)) {
		this.vx = -this.vx;
		}
	}

  this.x += this.vx, this.y += this.vy;
  return this;
};


module.exports = Ball;
