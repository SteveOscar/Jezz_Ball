function Ball(data) {
	this.x = data.x;
	this.y = data.y;
	this.color = "yellow";
	this.radius = 20;
	this.vx = 3;
	this.vy = -3;
  this.context = data.context || 'test';
}

Ball.prototype.draw = function(ball, context) {
  context.fillStyle = ball.color;
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, true);
  context.closePath();
  context.save();
  context.shadowBlur = 25;
  context.shadowOffsetX = 4;
  context.shadowOffsetY = 4;
  context.shadowColor = "white";
  context.fill();
  context.restore();
  return this;
};

// function currentPositionOfBall(currentBall){
// }

Ball.prototype.move = function(canvasWidth, canvasHeight, walls) {
	console.log('WALLS: ' + walls)
	// currentPositionOfBall(this)
	// change direction if you hit the canvas boundaries horizontally
  if(this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
    this.vx = -this.vx;
  }
	// change direction if you hit the new vertical or horizontal wall
	if( walls.length > 0) {
	 if (this.x + this.radius === walls[0].x || this.x - this.radius === walls[0].x) {
		this.vx = -this.vx;
		}
		if (this.y + this.radius === walls[0].y || this.y - this.radius === walls[0].y) {
		 this.vy = -this.vy;
		 }
	}
	// change direction if you hit the canvas boundaires vertically
  if(this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
    this.vy = -this.vy;
  }
  this.x += this.vx, this.y += this.vy;
  return this;
};

module.exports = Ball;
