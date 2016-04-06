
var CollisionHelper = require('./collision-helper');

var collisionDetection = function(canvasWidth, canvasHeight, walls, ball){
  CollisionHelper.reverseHorizontalVelocityAgainstCanvas(canvasWidth, ball);
  CollisionHelper.reverseVerticalVelocityAgainstCanvas(canvasHeight, ball);

  if( walls.length > 0) {
    CollisionHelper.checkIfLoseGame(walls, ball);
  }
};

module.exports = collisionDetection;
