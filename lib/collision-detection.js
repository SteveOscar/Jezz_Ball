
var CollisionHelper = require('./collision-helper');

var collisionDetection = function(canvasWidth, canvasHeight, walls, ball){
  if( walls.length > 0) {
    CollisionHelper.checkIfLoseGame(walls, ball);
    CollisionHelper.checkForValidCollisions(walls, ball);
  }
  CollisionHelper.reverseHorizontalVelocityAgainstCanvas(canvasWidth, ball);
  CollisionHelper.reverseVerticalVelocityAgainstCanvas(canvasHeight, ball);
};

module.exports = collisionDetection;
