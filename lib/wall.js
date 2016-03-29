function Wall(data) {
  this.x = data.x;
  this.y = data.y;
  this.width = 4;
  this.height = 4;
  this.context = data.context
}

Wall.prototype.draw = function (context) {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Wall.prototype.move = function (canvasWidth) {
    if((this.width + this.x < canvasWidth) || (this.width < canvasWidth*2 + this.x)){
      this.x -= 2, this.y, this.width += 4, this.height;
      console.log("drawing: ", this.width)
  }

  return this;
};

module.exports = Wall;
