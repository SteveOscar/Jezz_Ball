const chai = require('chai'); const assert = chai.assert;

const Ball = require('../lib/ball');

describe('Ball', function() {
  context('with default attributes', function() {
    var ball = new Ball({x: 30, y: 40});
    var radius = 20;
    var color = 'blue';
    var vx = 2;
    var vy = -2;

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

});
