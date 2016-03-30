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
  console.log('orientation: '+ orientation)
    if (orientation === 109) { drawVerticalLine(that, canvasHeight);}
    if (orientation === 1) {drawHorizontalLine(that, canvasWidth);}
    // drawVerticalLine(that, canvasHeight);
  return this;
};

var drawHorizontalLine = function(that, canvasWidth) {
  if((that.width + that.x < canvasWidth) || (that.width < canvasWidth*2 + that.x)){
    console.log(that)
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
