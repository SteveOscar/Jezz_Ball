
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

function Block(options) {
  options = options || {};
  this.x = options.x || 10;
  this.y = options.y || 10;
  this.width = options.width || 10;
  this.height = options.height || 10;
  this.vx = 2;
  this.vy = 3;
}

var ball = new Block();


function gameLoop() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  ball.draw().move();
  requestAnimationFrame(gameLoop);
}

Block.prototype.draw = function () {

  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

// if(ball.y + ball.radius > h || ball.y - ball.radius < 0) {
// 	ball.vy = -ball.vy;
// }
// if(ball.x + ball.radius > w || ball.x - ball.radius < 0) {
// 	ball.vx = -ball.vx;
// }



Block.prototype.move = function () {
  if(this.x + this.width > canvasWidth || this.x - this.width < 0) {
    this.vx = -this.vx;
  }
  if(this.y + this.height > canvasHeight || this.y - this.height < 0) {
    this.vy = -this.vy;
  }
  this.x += this.vx, this.y += this.vy, this.width, this.height;
  return this;
};
//
// function checkEdge() {
//   if (this.x < canvasWidth )
// }

requestAnimationFrame(gameLoop);

canvas.addEventListener('click', function(event) {
  var location = {x: event.x, y: event.y};
  var newBlock = new Block(location);
  blocks.push(newBlock);
});
