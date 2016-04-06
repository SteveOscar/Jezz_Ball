const chai = require('chai'); const assert = chai.assert;
var pry = require('pryjs')

const Ball = require('../lib/ball');
const BallEdges = require('../lib/ball-edges')


describe('Ball Edges', function() {
  context('it finds the edges of the ball', function() {
    var ball = new Ball({x: 30, y: 40, level: 2});

    it('should find the top of the ball', function() {
      var result = BallEdges.topOfBall(ball);
      assert.deepEqual(result, [ 26, 27, 25, 28, 24 ]);
    });

    it('should find the bottom of the ball', function() {
      var result = BallEdges.bottomOfBall(ball);
      assert.deepEqual(result, [ 54, 55, 53, 52, 56 ]);
    });

    it('should find the left side of the ball', function() {
      var result = BallEdges.leftSideOfBall(ball);
      assert.deepEqual(result, [ 16, 17, 15, 18, 14 ]);
    });

    it('should find the right side of the ball', function() {
      var result = BallEdges.rightSideOfBall(ball);
      assert.deepEqual(result, [ 44, 45, 43, 46, 42 ]);
    });
  });
});
