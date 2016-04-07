var Wall = require('./wall');
var Zeus = require ('./zeus');
var $ = require('jquery');
var zeus = new Zeus();
var collisionDetect = require('./collision-detection');


function gameLoop() {
  var ballPosition = getBallPosition(zeus.canvas);
  zeus.context.clearRect(0, 0, zeus.canvasWidth, zeus.canvasHeight);
	zeus.initializeWall();
  if (zeus.inPlay()) {
    zeus.initializeBall(ballPosition);
    zeus.eliminateCanvas();
    zeus.existingCanvas();
    zeus.monitorGameStatus();
    setCanvasSize(zeus.canvasWidth, zeus.canvasHeight);
    collisionDetect(zeus.canvasWidth, zeus.canvasHeight, zeus.walls, zeus.ball);

  }
  requestAnimationFrame(gameLoop);
}

function getBallPosition(canvas) {
    var rect = canvas.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;
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
		if (current === 0){ tracker.orientation = 1; direction.innerHTML = "vertical", gameBoard.setAttribute('class', 'up_down')};
		if (current === 1){ tracker.orientation = 0; direction.innerHTML = "horizontal", gameBoard.setAttribute('class', 'left_right')};
	}
  if(e.charCode === 112){
    if(zeus.playing) {
      zeus.playing = false;
    }else {
      zeus.playing = true;
    }
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
    return {x: x, y: y};
}

function setCanvasSize(){
  var originalSizeElement = document.getElementById('original_canvas_size');
  var originalSize = zeus.canvasWidth * zeus.canvasHeight;
  originalSizeElement.innerHTML = "Original Size: " + originalSize;
}

$( "#game_start_button" ).click(function() {
  $("#game_start").fadeOut( "slow", function() {
    $("#game_start").css('display', 'none');
    zeus.playing = true;
  });
});
