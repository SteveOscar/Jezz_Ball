const chai = require('chai'); const assert = chai.assert;
var pry = require('pryjs')

const Wall = require('../lib/wall');
const WallHelper = require('../lib/wall-helper')

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

    it('should assign a height', function(){
      assert.equal(wall.height, height);
    });

    it('should assign a width', function(){
      assert.equal(wall.width, width);
    });
  });

  context('walls can be filtered', function(){
   var allWalls = [{x: 10, y: 10, orientation: 0}, {x: 20, y: 20, orientation: 0}, {x: 10, y: 10, orientation: 1}, {x: 20, y: 20, orientation: 1} ];

   it('should filter horizontal walls', function(){
    //  function filteredHorizontal(allWalls) {
    //    return allWalls.filter(function(wall){return wall.orientation === 0;});
    //  }

     var result = WallHelper.filteredHorizontal(allWalls);
     assert.equal(result.length, 2);
   });
 });

});
