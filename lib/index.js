var Wall = require('./wall');
var Zeus = require ('./zeus');
var zeus = new Zeus();

function gameLoop() {
  var ballPosition = getBallPosition(zeus.canvas);
  zeus.context.clearRect(0, 0, zeus.canvasWidth, zeus.canvasHeight);
	zeus.initializeBall(ballPosition);
	zeus.initializeWall();
  zeus.eliminateCanvas();
  zeus.existingCanvas();
  zeus.monitorGameStatus();
  setCanvasSize(zeus.canvasWidth, zeus.canvasHeight);
  requestAnimationFrame(gameLoop);
}

function getBallPosition(canvas) {
    var rect = canvas.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;
    console.log("x: " + x + " y: " + y);
    return {x: x, y: y};
}

requestAnimationFrame(gameLoop);

function OrientationTracker() {
  this.orientation = 0;
}

var tracker = new OrientationTracker();

window.addEventListener('keypress', function(e) {
  e.preventDefault();
  var direction = document.getElementById('direction');
  var gameBoard = document.getElementById('game');
  if(e.charCode === 32){
		var current = tracker.orientation;
		if (current === 0){ tracker.orientation = 1; direction.innerHTML = "vertical", gameBoard.setAttribute('class', 'up_down')}
		if (current === 1){ tracker.orientation = 0; direction.innerHTML = "horizontal", gameBoard.setAttribute('class', 'left_right')}
	}
});

zeus.canvas.addEventListener('click', function(event) {
  var coords = getCursorPosition(zeus.canvas, event);
  if (zeus.walls.length === 0 || zeus.walls[zeus.walls.length-1].building_wall === false) {
  	var newWall = new Wall({x: coords.x, y: coords.y, context: zeus.context, orientation: tracker.orientation});
    zeus.walls.push(newWall);
  }
});

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    return {x: x, y: y};
}

function setCanvasSize(){
  var originalSizeElement = document.getElementById('original_canvas_size');
  var originalSize = zeus.canvasWidth * zeus.canvasHeight;
  originalSizeElement.innerHTML = "Original Size: " + originalSize;
}
