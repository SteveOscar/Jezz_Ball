const chai = require('chai'); const assert = chai.assert;

const Wall = require('../lib/wall');
const WallHelper = require('../lib/wall-helper');

describe('Wall', function() {
  context('create wall with default attributes', function() {
    var wall = new Wall({x: 30, y: 40, orientation: 1});
    var width = 4;
    var height = 4;

    it('should assign an x coordinate', function() {
      assert.equal(wall.x, 30);
    });

    it('should assign a y coordinate', function() {
      assert.equal(wall.y, 40);
    });

    it('should assign a height', function(){
      assert.equal(wall.height, height);
    });

    it('should assign a width', function(){
      assert.equal(wall.width, width);
    });

    it('should assign an orientation', function(){
      assert.equal(wall.orientation, 1);
    });

    it('should assign a color', function(){
      assert.equal(wall.color, 'black');
    });

    it('should assign a startX', function(){
      assert.equal(wall.startX, 30);
    });
    it('should assign a startY', function(){
      assert.equal(wall.startY, 40);
    });
  });



});
