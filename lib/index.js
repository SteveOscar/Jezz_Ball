var Wall = require('./wall');
var Zeus = require ('./zeus');
var zeus = new Zeus();

function gameLoop() {
  zeus.context.clearRect(0, 0, zeus.canvasWidth, zeus.canvasHeight);
	zeus.initializeBall();
	zeus.initializeWall();
  zeus.eliminateCanvas();
  setCanvasSize(zeus.canvasWidth, zeus.canvasHeight);
  getNewCanvasSize();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function OrientationTracker() {
  this.orientation = 0;
}

var tracker = new OrientationTracker();

window.addEventListener('keypress', function(e) {
  var direction = document.getElementById('direction');
  var gameBoard = document.getElementById('game');
  if(e.charCode === 32){
		var current = tracker.orientation;
		if (current === 0){ tracker.orientation = 1; direction.innerHTML = "vertical", gameBoard.setAttribute('class', 'up_down')};
		if (current === 1){ tracker.orientation = 0; direction.innerHTML = "horizontal", gameBoard.setAttribute('class', 'left_right')};
	}
});

function setCanvasSize(){
  var originalSizeElement = document.getElementById('original_canvas_size');
  var originalSize = zeus.canvasWidth * zeus.canvasHeight;
  originalSizeElement.innerHTML = "Original Size: " + originalSize;
}

function getNewCanvasSize(){
  var ballPosition = zeus.ball.x;
  var wallOnLeft = findNearestWallToLeft(ballPosition, zeus.canvasWidth, zeus.walls);
  var wallOnRight = findNearestWallToRight(ballPosition, zeus.canvasWidth, zeus.walls);
  var wallOnTop = findNearestWallAbove(ballPosition, zeus.canvasHeight, zeus.walls);
  var wallBelow = findNearestWallBelow(ballPosition, zeus.canvasHeight, zeus.walls);
  var newArea = (wallOnRight - wallOnLeft) * (wallBelow - wallOnTop);
  var newSizeElement = document.getElementById('new_size_element');
  newSizeElement.innerHTML = "New Size: " + newArea;
}

zeus.canvas.addEventListener('click', function(event) {
	var newWall = new Wall({x: event.x, y: event.y, context: zeus.context, orientation: tracker.orientation});
  zeus.walls.push(newWall);
});
