const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/ball');

describe('Ball', function() {
  context('with default attributes', function() {
    var ball = new Ball(30, 30);
    var initialX = 30

    it('should assign an x coordinate', function() {
      assert.equal(ball.x, initialX);
    });

    xit('should assign a y coordinate', function() {
      assert.equal(dingus.y, 0);
    });

    xit('should assign a height', function(){
      assert.equal(dingus.height, 10);
    });

    xit('should assign a width', function(){
      assert.equal(dingus.width, 10);
    });
  });

});
