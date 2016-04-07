function Ball(data) {
	this.x = data.x;
	this.y = data.y;
	this.color = "white";
	this.radius = 14;
	this.vx = (data.level+1)/2;
	this.vy = (-data.level-1)/2;
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
  context.shadowColor = "black";
  context.fill();
  context.restore();
  return this;
};

Ball.prototype.move = function() {
  this.x += this.vx; this.y += this.vy;
  return this;
};

module.exports = Ball;
