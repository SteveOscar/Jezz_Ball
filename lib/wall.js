function Wall(data) {
  this.x = data.x;
  this.y = data.y;
  this.width = 4;
  this.height = 4;
  this.context = data.context || 'test';
}

Wall.prototype.draw = function (context) {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Wall.prototype.move = function (canvasWidth, canvasHeight, orientation) {
  var that = this
    // if (orientation === 'vertical') {
    //   drawVerticalLine(that, canvasHeight);
    // } else {
    //   drawHorizontalLine(that, canvasWidth);
    // }
    drawVerticalLine(that, canvasHeight);
  return this;
};

var drawHorizontalLine = function(that, canvasWidth) {
  console.log(that)
  if((that.width + that.x < canvasWidth) || (that.width < canvasWidth*2 + that.x)){
    that.x -= 2, that.y, that.width += 4, that.height;
    console.log("drawing: ", that.width);
  }
};

var drawVerticalLine = function(that, canvasHeight){
  if((that.height + that.y < canvasHeight) || (that.height < canvasHeight*2 + that.y)){
    that.y -= 2, that.x, that.height += 4, that.width;
    console.log("drawing: ", that.height);
  }
};

module.exports = Wall;
