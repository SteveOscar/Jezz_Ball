var wallHelper = require ('./wall-helper')

function Wall(data) {
  this.x = parseInt(data.x);
  this.y = data.y;
  this.startX = parseInt(data.x);
  this.startY = data.y;
  this.color = 'teal';
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
    var that = this;
    if (this.orientation === 1) {drawVerticalLine(that, canvasHeight, wallHelper.sortedYValues(allWalls));}
    if (this.orientation === 0) {drawHorizontalLine(that, canvasWidth, wallHelper.sortedXValues(allWalls));}
  }
  return this;
};

function drawHorizontalLine(that, canvasWidth, sortedXValues) {
  sortedXValues.push(that.startX);
  var wallToLeft = findNearestWall(that.startX, canvasWidth, sortedXValues, 'left');
  var wallToRight = findNearestWall(that.startX, canvasWidth, sortedXValues, 'right');
  var drawLeft = (that.startX - wallToLeft);
  var drawRight = (wallToRight - that.startX);
  horizontalLineDrawer(drawLeft, drawRight, that);
}

function horizontalLineDrawer(drawLeft, drawRight, that) {
  if(drawLeft > that.startX-that.x) {
    that.x -= 2, that.y, that.width += 2, that.height;
  }
  if(drawRight >= that.width - drawLeft) {
    that.x, that.y, that.width += 2, that.height;
  }
  if(weAreDoneDrawingHorizontal(drawLeft, drawRight, that)) {
    that.building_wall = false;
  }
}

function weAreDoneDrawingHorizontal(drawLeft, drawRight, that) {
  return ((drawLeft <= that.startX-that.x) && drawRight <= (that.width - drawLeft));
}

function findNearestWall(currentWall, canvasSize, wallValues, direction) {
  var sortedValues = wallValues.sort(function(a,b){return a - b; });
  var currentWallIndex = sortedValues.indexOf(currentWall);
  if(direction === 'left'){
    if (currentWallIndex > 0){
      return sortedValues[currentWallIndex - 1];
    } else {
      return 0;
    }
  }
  if(direction === 'right'){
    if (currentWallIndex < (sortedValues.length - 1)){
      return sortedValues[currentWallIndex + 1];
    } else {
      return canvasSize;
    }
  }
  if(direction === 'up'){
    if (currentWallIndex > 0){
      return sortedValues[currentWallIndex - 1];
    } else {
      return 0;
    }
  }
  if(direction === 'down'){
    if (currentWallIndex < (sortedValues.length - 1)){
      return sortedValues[currentWallIndex + 1];
    } else {
      return canvasSize;
    }
  }
}

var drawVerticalLine = function(that, canvasHeight, sortedYValues){
  sortedYValues.push(that.startY);
  var wallAbove = findNearestWall(that.startY, canvasHeight, sortedYValues, 'up');
  var wallBelow = findNearestWall(that.startY, canvasHeight, sortedYValues, 'down');
  var drawAbove = (that.startY - wallAbove);
  var drawBelow = (wallBelow - that.startY);
  verticalLineDrawer(drawAbove, drawBelow, that);
};

function verticalLineDrawer(drawAbove, drawBelow, that) {
  if(that.startY - that.y < drawAbove) {
    that.x, that.y -= 2, that.width, that.height += 2;
  }
  if(drawBelow > (that.height - (that.startY - that.y))){
    that.x, that.y, that.width, that.height +=2;
  }
  if(weAreDoneDrawingVertical(drawAbove, drawBelow, that) ) {
    that.building_wall = false;
  }
}

function weAreDoneDrawingVertical(drawAbove, drawBelow, that) {
  return (that.startY - that.y >= drawAbove && (drawBelow <= (that.height - (that.startY - that.y))));
}

module.exports = Wall;
