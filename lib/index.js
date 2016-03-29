var Ball = require('./ball')
var Wall = require('./wall')

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ball = new Ball({x: 30, y: 30, context: context});
var walls = [];

function gameLoop() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  ball.draw(ball, context).move(canvasWidth, canvasHeight);
  walls.forEach(function(wall) {
    wall.draw(context).move(canvasWidth, canvasHeight);
  })
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('click', function(event) {
  console.log('click on: ', event.x, event.y)
  var newWall = new Wall({x: event.x, y: event.y});
  walls.push(newWall);
});
