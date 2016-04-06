const chai = require('chai'); const assert = chai.assert;
var pry = require('pryjs')

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
});
