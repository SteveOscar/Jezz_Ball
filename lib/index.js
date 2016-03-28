
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Block(options) {
  options = options || {};
  this.x = options.x || 10;
  this.y = options.y || 10;
  this.width = options.width || 10;
  this.height = options.height || 10;
}

var firstBlock = new Block();
var secondBlock = new Block({x: 50, y: 50})
var blocks = [firstBlock, secondBlock];

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(function(block) {
    block.draw().move();
  })
  requestAnimationFrame(gameLoop)
}

Block.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Block.prototype.move = function () {
  this.x++, this.y, this.width++, this.height;
  return this;
};


requestAnimationFrame(gameLoop)


canvas.addEventListener('click', function(event) {
  var location = {x: event.x, y: event.y};
  var newBlock = new Block(location)
  blocks.push(newBlock);
});
