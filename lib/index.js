
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// function Ball(options) {
//   options = options || {};
//   this.x = options.x || 10;
//   this.y = options.y || 10;
//   this.width = options.width || 10;
//   this.height = options.height || 10;
//   this.vx = 2;
//   this.vy = 3;
// }

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.color = "yellow";
	this.radius = 20;
	this.vx = 3;
	this.vy = -3;
}

var ball = new Ball(30, 30);

function gameLoop() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  ball.draw().move();
  walls.forEach(function(wall) {
    wall.draw().move();
  })
  requestAnimationFrame(gameLoop);
}

Ball.prototype.draw = function () {
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

Ball.prototype.move = function () {
  if(this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
    this.vx = -this.vx;
  }
  if(this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
    this.vy = -this.vy;
  }
  this.x += this.vx, this.y += this.vy;
  return this;
};

Wall.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};
Wall.prototype.move = function () {
    if((this.width + this.x < canvasWidth) || (this.width < canvasWidth*2 + this.x)){
      this.x -= 2, this.y, this.width += 4, this.height;
      console.log("drawing: ", this.width)
  }

  return this;
};

requestAnimationFrame(gameLoop);


function Wall(x, y) {
  this.x = x;
  this.y = y;
  this.width = 4;
  this.height = 4;
}

var walls = [];

canvas.addEventListener('click', function(event) {
  console.log('click on: ', event.x, event.y)
  var newWall = new Wall(event.x, event.y);
  walls.push(newWall);
});
