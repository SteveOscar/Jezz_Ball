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
}

Wall.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Wall.prototype.move = function (canvasWidth, canvasHeight, allWalls) {

  if (allWalls.length > 0) {

    var filtered =  allWalls.filter(function (wall) {
        return wall.orientation === 1
      });


    var result = _.sortBy(filtered, 'startX')
    console.log('SORTED WALLS: ' + result)
  }
  var that = this;
  if (this.orientation === 1) { drawVerticalLine(that, canvasHeight, allWalls);}
  if (this.orientation === 0) {drawHorizontalLine(that, canvasWidth, result);}
  return this;
};



function areWeDoneBuildingAWall(firstWidth, secondWidth) {
  return firstWidth === secondWidth
}

var drawHorizontalLine = function(that, canvasWidth) {
  var midpoint = that.width/2;
  var left = (that.startX - midpoint);
  var right = (that.startX + midpoint);

  if(left > 0) {
    that.x -= 2, that.y, that.width += 2, that.height;
  }
  if(right < canvasWidth) {
    that.x, that.y, that.width += 2, that.height
  }
  if(areWeDoneBuildingAWall(canvasWidth, that.width)) {
    that.building_wall = false;
  }
}

var drawVerticalLine = function(that, canvasHeight){
  var midpoint = that.height/2;
  var top = (that.startY - midpoint);
  var bottom = (that.startY + midpoint);

  if(top > 0) {
    that.x, that.y -= 2, that.width, that.height += 2;
  }
  if(bottom < canvasHeight){
    that.x, that.y, that.width, that.height +=2;
  }
  if(areWeDoneBuildingAWall(canvasHeight, that.height)) {
    that.building_wall = false;
  }
};



module.exports = Wall;
