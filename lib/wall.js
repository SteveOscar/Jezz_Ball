var _ = require("lodash");

function Wall(data) {
  this.x = data.x;
  this.y = data.y;
  this.startX = data.x;
  this.startY = data.y;
  this.color = 'white';
  this.width = 4;
  this.height = 4;
  this.context = data.context || 'test';
  this.orientation = data.orientation;
  this.building_wall = true;
  this.areaSubtracted = false;
}

Wall.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Wall.prototype.move = function (canvasWidth, canvasHeight, allWalls) {
  if (allWalls.length > 0) {
    var filteredHorizontal = allWalls.filter(function(wall){
      return wall.orientation === 0;
    });
    var filteredVertical = allWalls.filter(function(wall){
      return wall.orientation === 1;
    });
    var sortedXValues = _.sortBy(filteredVertical, 'startX').map(function(wall) {return wall.startX;});
    var sortedYValues = _.sortBy(filteredHorizontal, 'startY').map(function(wall) {return wall.startY;});
  }
  var that = this;
  if (this.orientation === 1) {drawVerticalLine(that, canvasHeight, sortedYValues);}
  if (this.orientation === 0) {drawHorizontalLine(that, canvasWidth, sortedXValues);}
  return this;
};

var drawHorizontalLine = function(that, canvasWidth, sortedXValues) {
  var wallToLeft = findNearestWallToLeft(that.startX, canvasWidth, sortedXValues)
  var wallToRight = findNearestWallToRight(that.startX, canvasWidth, sortedXValues)
  var drawLeft = (that.startX - wallToLeft);
  var drawRight = (wallToRight - that.startX);

  if(drawLeft > that.startX-that.x) {
    that.x -= 2, that.y, that.width += 2, that.height;
  }
  if(drawRight >= that.width - drawLeft) {
    that.x, that.y, that.width += 2, that.height
  }
  if(areWeDoneDrawingHorizontal(drawLeft, drawRight, that)) {
    that.building_wall = false;
  }
};

function areWeDoneDrawingHorizontal(drawLeft, drawRight, that) {
  return ((drawLeft <= that.startX-that.x) && drawRight <= (that.width - drawLeft));
}

function findNearestWallToLeft(currentWall, canvasWidth, allWalls) {
  allWalls.push(currentWall);
  var sortedXValues = allWalls.sort(function(a,b){return a - b });
  var currentWallIndex =  sortedXValues.indexOf(currentWall);
  if (currentWallIndex > 0){
    return sortedXValues[currentWallIndex - 1];
  } else {
    return 0
  }
}

function findNearestWallToRight(currentWall, canvasWidth, allWalls) {
  var sortedXValues = allWalls.sort(function(a,b){return a - b });
  var currentWallIndex = sortedXValues.indexOf(currentWall);
  if (currentWallIndex < (sortedXValues.length - 1)){
    return sortedXValues[currentWallIndex + 1];
  } else {

    return canvasWidth;
  }
}

var drawVerticalLine = function(that, canvasHeight, sortedYValues){
  var wallAbove = findNearestWallAbove(that.startY, canvasHeight, sortedYValues);
  var wallBelow = findNearestWallBelow(that.startY, canvasHeight, sortedYValues);
  var drawAbove = (that.startY - wallAbove);
  var drawBelow = (wallBelow - that.startY);

  if(that.startY - that.y < drawAbove) {
    console.log('Drawing UP');
    that.x, that.y -= 2, that.width, that.height += 2;
  }
  if(drawBelow > (that.height - (that.startY - that.y))){
    console.log('DRAWING DOWN!');
    that.x, that.y, that.width, that.height +=2;
  }
  if(areWeDoneDrawingVertical(drawAbove, drawBelow, that) ) {
    that.building_wall = false;
  }
};

function areWeDoneDrawingVertical(drawAbove, drawBelow, that) {
  return (that.startY - that.y >= drawAbove && (drawBelow <= (that.height - (that.startY - that.y))));
}

function findNearestWallAbove(currentWall, canvasHeight, allWalls) {
  allWalls.push(currentWall);
  var sortedYValues = allWalls.sort(function(a,b){return a - b; });
  var currentWallIndex =  sortedYValues.indexOf(currentWall);
  if (currentWallIndex > 0){
    return sortedYValues[currentWallIndex - 1];
  } else {
    return 0;
  }
}

function findNearestWallBelow(currentWall, canvasHeight, allWalls) {
  var sortedYValues = allWalls.sort(function(a,b){return a - b; });
  var currentWallIndex = sortedYValues.indexOf(currentWall);
  if (currentWallIndex < (sortedYValues.length - 1)){
    return sortedYValues[currentWallIndex + 1];
  } else {
    return canvasHeight;
  }
}

module.exports = Wall;
