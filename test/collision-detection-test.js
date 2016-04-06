const chai = require('chai'); const assert = chai.assert;
var pry = require('pryjs')

const Ball = require('../lib/ball');
const BallEdges = require('../lib/ball-edges');
const Wall = require('../lib/wall');
const WallHelper = require('../lib/wall-helper');
const CollisionDetection = require('../lib/collision-detection');

describe('Collision Detection', function() {
  context('it finds the wall above', function() {
    var walls = [new Wall({x: 30, y: 40, orientation: 0}),
                 new Wall({x: 15, y: 20, orientation: 0}),
                 new Wall({x: 45, y: 50, orientation: 0})];

    var ball = new Ball({x: 30, y: 40, level: 2});

    var results = CollisionDetection.findWallAbove(walls, ball);
    eval(pry.it);
  });
});
