var Ball = require('./ball')

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ball = new Ball({x: 30, y: 30, context: context});

function gameLoop() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  ball.draw(ball, context).move(canvasWidth, canvasHeight);
  walls.forEach(function(wall) {
    wall.draw().move();
  })
  requestAnimationFrame(gameLoop);
}

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
