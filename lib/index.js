var Wall = require('./wall');
var Zeus = require ('./zeus');
var zeus = new Zeus();

function gameLoop() {
  zeus.context.clearRect(0, 0, zeus.canvasWidth, zeus.canvasHeight);
	zeus.initializeBall();
	zeus.initializeWall();
  zeus.eliminateCanvas();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function OrientationTracker() {
  this.orientation = 0;
}

var tracker = new OrientationTracker();

window.addEventListener('keypress', function(e) {
  var direction = document.getElementById('direction')
  var gameBoard = document.getElementById('game')
  if(e.charCode === 32){
		var current = tracker.orientation;
		if (current === 0){ tracker.orientation = 1; direction.innerHTML = "vertical", gameBoard.setAttribute('class', 'up_down')}
		if (current === 1){ tracker.orientation = 0; direction.innerHTML = "horizontal", gameBoard.setAttribute('class', 'left_right')}
	}
});

zeus.canvas.addEventListener('click', function(event) {
	var newWall = new Wall({x: event.x, y: event.y, context: zeus.context, orientation: tracker.orientation});
  zeus.walls.push(newWall);
});
