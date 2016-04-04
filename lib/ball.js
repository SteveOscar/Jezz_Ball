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

	if( walls.length > 0) {
		if (yValuesOfWall.includes(bottomOfBall) || yValuesOfWall.includes(bottomOfBall + 1) || yValuesOfWall.includes(topOfBall) || yValuesOfWall.includes(topOfBall + 1)) {
		 this.vy = -this.vy;
		 }
	}
	if(walls.length > 0){
		if (xValuesOfWall.includes(rightSideOfBall) || xValuesOfWall.includes(rightSideOfBall + 1) || xValuesOfWall.includes(leftSideOfBall) || xValuesOfWall.includes(leftSideOfBall + 1)) {
		this.vx = -this.vx;
		}
	}

  this.x += this.vx, this.y += this.vy;
  return this;
};


module.exports = Ball;
