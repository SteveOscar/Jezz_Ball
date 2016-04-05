module.exports = {
 leftSideOfBall: function(ball) {
   return [ball.x - ball.radius, ball.x - ball.radius + 1, ball.x - ball.radius - 1];
 },
 rightSideOfBall: function(ball) {
   return [ball.x + ball.radius, ball.x + ball.radius + 1, ball.x + ball.radius - 1];
 },
 topOfBall: function(ball) {
   return [ball.y - ball.radius, ball.y - ball.radius + 1, ball.y - ball.radius - 1];
 },
 bottomOfBall: function(ball) {
   return [ball.y + ball.radius, ball.y + ball.radius + 1, ball.y + ball.radius - 1];
 }
};
