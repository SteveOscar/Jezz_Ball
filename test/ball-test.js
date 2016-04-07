const chai = require('chai'); const assert = chai.assert;
var pry = require('pryjs')

const Ball = require('../lib/ball');
const Wall = require('../lib/wall');

describe('Ball', function() {
  context('with default attributes', function() {
    var ball = new Ball({x: 30, y: 40, level: 2});
    var radius = 14;
    var color = 'white';
    var vx = 1.5;
    var vy = -1.5;

    it('should assign an x coordinate', function() {
      assert.equal(ball.x, 30);
    });

    it('should assign a y coordinate', function() {
      assert.equal(ball.y, 40);
    });

    it('should assign a radius', function(){
      assert.equal(ball.radius, radius);
    });

    it('should assign a color', function(){
      assert.equal(ball.color, color);
    });

    it('should assign a vx', function(){
      assert.equal(ball.vx, vx);
    });

    it('should assign a vy', function(){
      assert.equal(ball.vy, vy);
    });
  });

  context('verify location of ball edges', function(){
    var ball = new Ball({x: 30, y: 40});
    var wall = new Wall({x: 55, y: 70});
    var radius = 20;
    var leftSideOfBall = ball.x - radius;
    var rightSideOfBall = ball.x + radius;
    var topOfBall = ball.y - radius;
    var bottomOfBall = ball.y + radius;

    it('defines a left side of ball', function(){
      assert.equal(leftSideOfBall, 10);
    });

    it('defines a right side of ball', function(){
      assert.equal(rightSideOfBall, 50);
    });

    it('defines a top of ball', function(){
      assert.equal(topOfBall, 20);
    });

    it('defines a bottom of ball', function(){
      assert.equal(bottomOfBall, 60);
    });
  });

  context('test ball move function', function(){
    var ball = new Ball({x: 30, y: 40, level: 2});
    var radius = 20;
    var color = 'yellow';


    it('should change coordinates', function() {
      ball.move(600, 500, []);
      assert.equal(ball.x, 31.5);
      assert.equal(ball.y, 38.5);
    });


  });

});
