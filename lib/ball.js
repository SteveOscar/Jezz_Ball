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
	
	// function evadesBuildingHorizontalWall(ball) {
	// 	var wall = walls[walls.length - 1];
	// 	if (ball.x < wall.x || ball.x > (wall.x + wall.width)) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// }

	function hitsBuildingVerticalWall(ball) {
		var wall = walls[walls.length - 1];
		return (ball.y > wall.y && ball.y < (wall.y + wall.height)	&& wall.building_wall === true);
	}

	// function evadesBuildingVerticalWall(ball) {
	// 	var wall = walls[walls.length - 1];
	// 	if (ball.y < wall.y || ball.y > (wall.y + wall.height)) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// }

	var wallHitAbove = walls.filter(function(wall) {return wall.y+1 === topOfBall;})[0];
	var wallHitBelow = walls.filter(function(wall) {return wall.y+1 === bottomOfBall;})[0];

	if( walls.length > 0) {
		if (hitsBuildingHorizontalWall(this) && yValuesOfWall.includes(bottomOfBall) && wallHitBelow.building_wall === true) {
			this.lose = true;
		}
		if (hitsBuildingHorizontalWall(this) && yValuesOfWall.includes(topOfBall) && wallHitAbove.building_wall === true) {
			this.lose = true;
		}

		if (yValuesOfWall.includes(bottomOfBall) && wallHitBelow.building_wall === false) {
			this.vy = -this.vy;
		}

		if (yValuesOfWall.includes(topOfBall) && wallHitAbove.building_wall === false) {
			this.vy = -this.vy;
		}
	}

	var wallHitToRight = walls.filter(function(wall) {return wall.x+1 === rightSideOfBall;})[0];
	var wallHitToLeft = walls.filter(function(wall) {return wall.x+1 === leftSideOfBall;})[0];

	if(walls.length > 0){
		if (hitsBuildingVerticalWall(this) && xValuesOfWall.includes(rightSideOfBall) && wallHitToRight.building_wall === true) {
			console.log("You SHOULD LOsE NOW!!!!!!!!!!!!!!!!!!!!!!!");
			this.lose = true;
		}
		if (hitsBuildingVerticalWall(this) && xValuesOfWall.includes(leftSideOfBall) && wallHitToLeft.building_wall === true) {
			this.lose = true;
			console.log("You SHOULD LOsE NOW!!!!!!!!!!!!!!!!!!!!!!!!!!");
		}

		if (xValuesOfWall.includes(rightSideOfBall) && wallHitToRight.building_wall === false) {
		this.vx = -this.vx;
		}
		if (xValuesOfWall.includes(leftSideOfBall) && wallHitToLeft.building_wall === false) {
		this.vx = -this.vx;
		}
	}

  this.x += this.vx, this.y += this.vy;
  return this;
};


module.exports = Ball;
