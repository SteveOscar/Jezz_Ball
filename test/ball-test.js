const chai = require('chai'); const assert = chai.assert;

const Ball = require('../lib/ball');
const Wall = require('../lib/wall');

describe('Ball', function() {
  context('with default attributes', function() {
    var ball = new Ball({x: 30, y: 40});
    var radius = 20;
    var color = 'yellow';
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

  context('checks for hitting a moving horizontal wall', function(){
    var ball = new Ball({x: 30, y: 40});
    var wall = new Wall({x: 55, y: 70});

    function hitsBuildingHorizontalWall(ball) {
      return (ball.x > wall.x && ball.x < (wall.x + wall.width)	&& wall.building_wall === true);
    }

    it('returns true if ball hits wall', function(){
      
      assert.equal(hitsBuildingHorizontalWall(ball), true);
    });
  });

});
