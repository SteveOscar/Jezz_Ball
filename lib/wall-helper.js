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
 }
};
