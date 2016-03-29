const chai = require('chai'); const assert = chai.assert;

const Wall = require('../lib/wall');

describe('Wall', function() {
  context('with default attributes', function() {
    var wall = new Wall({x: 30, y: 40});
    var width = 4;
    var height = 4;

    it('should assign an x coordinate', function() {
      assert.equal(wall.x, 30);
    });

    it('should assign a y coordinate', function() {
      assert.equal(wall.y, 40);
    });

    it('should assign a radius', function(){
      assert.equal(wall.radius, radius);
    });

    it('should assign a color', function(){
      assert.equal(wall.color, color);
    });
  });

});
