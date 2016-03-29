var Wall = require('./wall');
var Zeus = require ('./zeus');
var zeus = new Zeus();

function gameLoop() {
  zeus.context.clearRect(0, 0, zeus.canvasWidth, zeus.canvasHeight);
	zeus.initializeBall();
	zeus.initializeWall();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

zeus.canvas.addEventListener('click', function(event) {
  console.log('click on: ', event.x, event.y);
  var newWall = new Wall({x: event.x, y: event.y, context: zeus.context});
  zeus.walls.push(newWall);
});
