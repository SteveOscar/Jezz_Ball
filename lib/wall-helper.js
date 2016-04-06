var _ = require("lodash");


module.exports = {
 xValuesOfWalls: function(walls){
   return walls.map(function(wall){
     return wall.x, (wall.x + 1);
   });
 },
 yValuesOfWalls: function(walls){
   return walls.map(function(wall){
     return wall.y, (wall.y + 1);
   });
 },
 lastWallCreated: function(walls){
   return walls[walls.length-1];
 },

 filteredVertical: function(allWalls) {
    return allWalls.filter(function(wall){return wall.orientation === 1;});
  },

 filteredHorizontal: function(allWalls) {
    return allWalls.filter(function(wall){return wall.orientation === 0;});
  },

sortedYValues: function(allWalls) {
   return _.sortBy(this.filteredHorizontal(allWalls), 'startY').map(function(wall) {return wall.startY;});
 },

sortedXValues: function(allWalls) {
   return _.sortBy(this.filteredVertical(allWalls), 'startX').map(function(wall) {return wall.startX;});
 },
};
