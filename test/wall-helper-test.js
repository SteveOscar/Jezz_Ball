const chai = require('chai'); const assert = chai.assert;
const Wall = require('../lib/wall');
const WallHelper = require('../lib/wall-helper');

describe('WallHelper', function() {
  context('walls can be filtered', function(){
   var allWalls = [{x: 10, y: 10, orientation: 0}, {x: 20, y: 20, orientation: 0}, {x: 10, y: 10, orientation: 1}, {x: 20, y: 20, orientation: 1}, {x: 30, y: 30, orientation: 1} ];

   it('should filter horizontal walls', function(){

     var result = WallHelper.filteredHorizontal(allWalls);
     assert.equal(result.length, 2);
   });

   it('should filter vertical walls', function(){

     var result = WallHelper.filteredVertical(allWalls);
     assert.equal(result.length, 3);
   });
  });

  context('Get X Values of Walls', function(){
    var allWalls = [{x: 10, y: 10, orientation: 0}, {x: 20, y: 15, orientation: 0}, {x: 10, y: 10, orientation: 1}, {x: 20, y: 20, orientation: 1}, {x: 30, y: 30, orientation: 1} ];

    it('should return an array of x values', function() {
      var results = WallHelper.xValuesOfWalls(allWalls);

      assert.deepEqual(results, [11, 21, 11, 21, 31]);
      assert.notInclude(results, 16);
    });
  });

  context('Get Y Values of Walls', function(){
    var allWalls = [{x: 10, y: 10, orientation: 0}, {x: 17, y: 15, orientation: 0}, {x: 10, y: 10, orientation: 1}, {x: 20, y: 20, orientation: 1}, {x: 30, y: 30, orientation: 1} ];

    it('should return an array of y values', function() {
      var results = WallHelper.yValuesOfWalls(allWalls);

      assert.deepEqual(results, [ 11, 16, 11, 21, 31 ]);
      assert.notInclude(results, 18);
    });
  });

  context('Get last wall created', function(){
    var allWalls = [{x: 10, y: 10, orientation: 0}, {x: 17, y: 15, orientation: 0}, {x: 10, y: 10, orientation: 1}, {x: 20, y: 20, orientation: 1}, {x: 30, y: 30, orientation: 1} ];

    it('should return one wall', function() {
      var result = WallHelper.lastWallCreated(allWalls);

      assert.deepEqual(result, {x: 30, y: 30, orientation: 1});
      assert.notDeepEqual(result, {x: 17, y: 15, orientation: 0});
    });
  });

  context('Get sorted y values of walls', function(){
    var walls = [new Wall({x: 30, y: 40, orientation: 0}),
                 new Wall({x: 45, y: 20, orientation: 0}),
                 new Wall({x: 45, y: 50, orientation: 0})];


    it('should return a sorted array of y values', function() {
      var results = WallHelper.sortedYValues(walls);
      assert.deepEqual(results, [ 20, 40, 50 ]);
    });
  });

  context('Get sorted x values of walls', function(){
    var walls = [new Wall({x: 30, y: 40, orientation: 1}),
                 new Wall({x: 15, y: 20, orientation: 1}),
                 new Wall({x: 45, y: 50, orientation: 1})];


    it('should return a sorted array of x values', function() {
      var results = WallHelper.sortedXValues(walls);
      assert.deepEqual(results, [ 15, 30, 45 ]);
    });
  });

});
