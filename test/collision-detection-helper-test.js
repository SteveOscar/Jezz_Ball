const chai = require('chai'); const assert = chai.assert;

const Ball = require('../lib/ball');
const Wall = require('../lib/wall');
// const WallHelper = require('../lib/wall-helper');
const CDHelper = require('../lib/collision-helper');

describe('Collision Detection', function() {
  context('it finds the wall above', function() {
    var walls = [new Wall({x: 30, y: 47, orientation: 0}),
                 new Wall({x: 15, y: 46, orientation: 0}),
                 new Wall({x: 45, y: 48, orientation: 0})];

    var ball = new Ball({x: 30, y: 60, level: 2});

    it('should find nearest wall above', function() {
      var result = CDHelper.findWallAbove(walls, ball);
      assert.equal(result, walls[0]);
    });
  });

  context('it finds the wall below', function() {
    var walls = [new Wall({x: 30, y: 74, orientation: 0}),
                 new Wall({x: 15, y: 75, orientation: 0}),
                 new Wall({x: 45, y: 76, orientation: 0})];

    var ball = new Ball({x: 30, y: 60, level: 2});

    it('should find nearest wall above', function() {
      var result = CDHelper.findWallBelow(walls, ball);
      assert.equal(result, walls[0]);
    });
  });

  context('it finds the wall to the right', function() {
    var walls = [new Wall({x: 43, y: 74, orientation: 0}),
                 new Wall({x: 44, y: 75, orientation: 0}),
                 new Wall({x: 45, y: 76, orientation: 0})];

    var ball = new Ball({x: 30, y: 60, level: 2});

    it('should find nearest wall to right', function() {
      var result = CDHelper.findWallToRight(walls, ball);
      assert.equal(result, walls[0]);
    });
  });

  context('it finds the wall to the left', function() {
    var walls = [new Wall({x: 16, y: 74, orientation: 0}),
                 new Wall({x: 44, y: 75, orientation: 0}),
                 new Wall({x: 45, y: 76, orientation: 0})];

    var ball = new Ball({x: 30, y: 60, level: 2});

    it('should find nearest wall to left', function() {
      var result = CDHelper.findWallToLeft(walls, ball);
      assert.equal(result, walls[0]);
    });
  });

  context('detects a ball hit a wall', function() {
    var ballBottom = [20, 21, 22];
    var wallValues = [21, 30, 48];

    it('detect ball hitting wall', function() {
      var result = CDHelper.ballHitWall(ballBottom, wallValues);
      assert.equal(result, true);
    });
  });

  context('checks for collisions', function() {
    var walls = [new Wall({x: 16, y: 74, orientation: 1}),
                 new Wall({x: 17, y: 75, orientation: 1}),
                 new Wall({x: 15, y: 76, orientation: 1})];

    var ball = new Ball({x: 30, y: 60, level: 2});
    walls[0].building_wall = false;
    walls[1].building_wall = false;
    walls[2].building_wall = false;

    it('detect a collision to the left', function() {
      assert.equal(ball.vx, 1.5);
      CDHelper.checkForValidCollisions(walls, ball);
      assert.equal(ball.vx, -1.5);
    });

    var ball2 = new Ball({x: 30, y: 60, level: 2});

    it('detect a collision to the bottom', function() {
      assert.equal(ball2.vy, -1.5);
      CDHelper.checkForValidCollisions(walls, ball2);
      assert.equal(ball2.vy, 1.5);
    });
  });

  context('checks for game loss', function() {
    var walls = [new Wall({x: 16, y: 76, orientation: 0}),
                 new Wall({x: 17, y: 75, orientation: 0}),
                 new Wall({x: 15, y: 74, orientation: 0})];
   walls[0].width = 50;
   walls[1].width = 50;
   walls[2].width = 50;

    var ball = new Ball({x: 30, y: 60, level: 2});

    it('lose if ball hits building wall', function() {
      assert.equal(ball.lose, false);
      CDHelper.checkIfLoseGame(walls, ball);
      assert.equal(ball.lose, true);
    });
  });
});
