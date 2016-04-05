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

	if( walls.length > 0) {
		var wallHitAbove = walls.filter(function(wall) {return wall.y+1 === topOfBall && wall.orientation === 0;})[0];
		var wallHitBelow = walls.filter(function(wall) {return wall.y+1 === bottomOfBall && wall.orientation === 0;})[0];
		var wallHitToRight = walls.filter(function(wall) {return wall.x+1 === rightSideOfBall && wall.orientation === 1;})[0];
		var wallHitToLeft = walls.filter(function(wall) {return wall.x+1 === leftSideOfBall && wall.orientation === 1;})[0];

		if (wallHitBelow && wallHitBelow.building_wall === true) {
			this.lose = true;
		}
		if (wallHitAbove && wallHitAbove.building_wall === true) {
			this.lose = true;
		}
		if (yValuesOfWall.includes(bottomOfBall) && wallHitBelow && wallHitBelow.building_wall === false) {
			this.vy = -this.vy;
		}
		if (yValuesOfWall.includes(topOfBall) && wallHitAbove && wallHitAbove.building_wall === false) {
			this.vy = -this.vy;
		}
		if (wallHitToRight && wallHitToRight.building_wall === true) {
			this.lose = true;
		}
		if (wallHitToLeft && wallHitToLeft.building_wall === true) {
			this.lose = true;
		}
		if (xValuesOfWall.includes(rightSideOfBall) && wallHitToRight && wallHitToRight.building_wall === false) {
		this.vx = -this.vx;
		}
		if (xValuesOfWall.includes(leftSideOfBall) && wallHitToLeft && wallHitToLeft.building_wall === false) {
		this.vx = -this.vx;
		}
	}
  this.x += this.vx, this.y += this.vy;
  return this;
};

module.exports = Ball;
