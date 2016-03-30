var Ball = require('./ball');

function Zeus() {
  this.canvas = document.getElementById('game');
  this.context = this.canvas.getContext('2d');
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ball = new Ball({x: 30, y: 30, context: this.context});
  this.walls = [];
  this.orientation = 'horizontal';
}

Zeus.prototype.initializeBall = function() {
  this.ball.draw(this.ball, this.context).move(this.canvasWidth, this.canvasHeight);
};

function Tracker() {
  this.orientation = 'horizontal'
}

var tracker = new Tracker();

window.addEventListener('keypress', function(e) {
   if(e.which === 109) {
     tracker.orientation = 'vertical'
   }
});

Zeus.prototype.initializeWall = function() {
  var that = this;
  this.walls.forEach(function(wall) {
    wall.draw(wall.context).move(that.canvasWidth, that.canvasHeight, tracker.orientation);
  });
};

module.exports = Zeus;
