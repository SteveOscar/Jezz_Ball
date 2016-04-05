var Wall = require('./wall');
var Zeus = require ('./zeus');
var zeus = new Zeus();

function gameLoop() {
  zeus.context.clearRect(0, 0, zeus.canvasWidth, zeus.canvasHeight);
	zeus.initializeBall();
	zeus.initializeWall();
  zeus.eliminateCanvas();
  zeus.existingCanvas();
  zeus.monitorGameStatus();
  setCanvasSize(zeus.canvasWidth, zeus.canvasHeight);
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
		if (current === 0){ tracker.orientation = 1; direction.innerHTML = "vertical", gameBoard.setAttribute('class', 'up_down')}
		if (current === 1){ tracker.orientation = 0; direction.innerHTML = "horizontal", gameBoard.setAttribute('class', 'left_right')}
	}
});

function getXY(canvas, event) {
    var rect = canvas.getBoundingClientRect();  // absolute position of canvas
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

// function onmousemove(e) {
//     var pos = getXY(canvas, e);
//     console.log(pos.x, pos.y);
// }

zeus.canvas.addEventListener('click', function(event) {
  var pos = getXY(this, event)
  console.log("pos x: " + pos.x + "pos x: " + pos.y);
  if (zeus.walls.length === 0 || zeus.walls[zeus.walls.length-1].building_wall === false) {
  	var newWall = new Wall({x: pos.x, y: pos.y, context: zeus.context, orientation: tracker.orientation});
    console.log('newWall x: ' + newWall.x + "newWall y: " + newWall.y)
    zeus.walls.push(newWall);
  }
});

function setCanvasSize(){
  var originalSizeElement = document.getElementById('original_canvas_size');
  var originalSize = zeus.canvasWidth * zeus.canvasHeight;
  originalSizeElement.innerHTML = "Original Size: " + originalSize;
}
