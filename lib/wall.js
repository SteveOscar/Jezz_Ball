function Wall(data) {
  this.x = data.x;
  this.y = data.y;
  this.width = 4;
  this.height = 4;
  this.context = data.context || 'test';
  this.orientation = data.orientation;
}

Wall.prototype.draw = function (context) {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};


Wall.prototype.move = function (canvasWidth, canvasHeight) {
  var that = this;
  if (this.orientation === 1) { drawVerticalLine(that, canvasHeight);}
  if (this.orientation === 0) {drawHorizontalLine(that, canvasWidth);}
  return this;
};

var drawHorizontalLine = function(that, canvasWidth) {
  if((that.width + that.x < canvasWidth) || (that.width < canvasWidth*2 + that.x)){
    that.x -= 2, that.y, that.width += 4, that.height;
    console.log("drawing HORIZ: ", that.width);
  }
};

var drawVerticalLine = function(that, canvasHeight){
  if((that.height + that.y < canvasHeight) || (that.height < canvasHeight*2 + that.y)){
    that.y -= 2, that.x, that.height += 4, that.width;
    console.log("drawing VERTICAL: ", that.height);
  }
};

module.exports = Wall;
