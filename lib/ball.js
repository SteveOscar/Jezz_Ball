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

Ball.prototype.move = function(canvasWidth, canvasHeight) {
  if(this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
    this.vx = -this.vx;
  }
  if(this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
    this.vy = -this.vy;
  }
  this.x += this.vx, this.y += this.vy;
  return this;
};

module.exports = Ball;
