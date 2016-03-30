function Ball(data) {
	this.x = data.x;
	this.y = data.y;
	this.color = "yellow";
	this.radius = 20;
	this.vx = 1;
	this.vy = -1;
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
	console.log('WALLS: ' + walls);
	var leftSideOfBall = this.x - this.radius;
	var rightSideOfBall = this.x + this.radius;
	var topOfBall = this.y - this.radius;
	var bottomOfBall = this.y + this.radius;
	// currentPositionOfBall(this)
	// change direction if you hit the canvas boundaries horizontally
  if(rightSideOfBall > canvasWidth || leftSideOfBall < 0) {
    this.vx = -this.vx;
  }
	// change direction if you hit the new vertical or horizontal wall
	// var xValuesOfWall = walls.map(function(wall){
	// 	return wall.x;
	// });
	//
	// var yValuesOfWall = walls.map(function(wall){
	// 	return wall.y;
	// });

	if( walls.length > 0) {
	 if (rightSideOfBall === walls[0].x || leftSideOfBall === walls[0].x) {
		this.vx = -this.vx;
		}
		if (bottomOfBall === walls[0].y || topOfBall === walls[0].y) {
		 this.vy = -this.vy;
		 }
	}
	// change direction if you hit the canvas boundaires vertically
  if(bottomOfBall > canvasHeight || topOfBall < 0) {
    this.vy = -this.vy;
  }
  this.x += this.vx, this.y += this.vy;
  return this;
};

module.exports = Ball;
