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
}

Wall.prototype.draw = function (context) {
  context.fillStyle = this.color;
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
  var midpoint = that.width/2;
  var left = (that.startX - midpoint);
  var right = (that.startX + midpoint);
  if(left > 0) {
    console.log('DRAWING LEFT');
    that.x -= 2, that.y, that.width += 2, that.height;
  }
  if(right < canvasWidth) {
    console.log('DRAWING RIGHT');
    that.x, that.y, that.width += 2, that.height
  }
  // if (canvasWidth - that.start < that.width / 2) {
  //   that.x, that.y, that.width +=4, that.height;
  // }

  // if((that.width + that.x < canvasWidth) || (that.width < canvasWidth*2 + that.x)){
  //   that.x -= 2, that.y, that.width += 4, that.height;
  //   console.log("drawing HORIZ: ", that.width);
  // }
};

var drawVerticalLine = function(that, canvasHeight){
  var midpoint = that.height/2;
  var top = (that.startY - midpoint);
  var bottom = (that.startY + midpoint);

  if(top > 0) {
    console.log("GOING UP");
    that.x, that.y -= 2, that.width, that.height += 2;
  }
  if(bottom < canvasHeight){
    console.log("GOING DOWN");
    that.x, that.y, that.width, that.height +=2;
  }
  // if((that.height + that.y < canvasHeight) || (that.height < canvasHeight*2 + that.y)){
  //   that.y -= 2, that.x, that.height += 4, that.width;
  //   console.log("drawing VERTICAL: ", that.height);
  // }
};

module.exports = Wall;
