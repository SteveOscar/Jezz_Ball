var canvas, ctx, w, h;
var ball, paddle1, paddle2;
var score1, score2;

var BALL = function(x, y) {
	this.x = x;
	this.y = y;
	this.color = "yellow";
	this.radius = 12;
	this.vx = 3;
	this.vy = -3;
}

var PADDLE1 = function(x, y) {
	this.x = x;
	this.y = y;
	this.color = "red";
	this.width = 100;
	this.height = 5;
	//this.vx = 10;
}

var PADDLE2 = function(x, y) {
	this.x = x;
	this.y = y;
	this.color = "blue";
	this.width = 100;
	this.height = 5;
	//this.vx = 10;
}

document.addEventListener('keydown', function(event) {
	//left - 37
	//down - 40
	//left - 65
	//right - 68
	// right - 39

	if(event.keyCode === 37) {

		paddle1.x -= 30;

	}
	else if(event.keyCode === 39) {
		paddle1.x += 30;

	}
	else if(event.keyCode === 65) {
		paddle2.x -= 30;
	}
	else if(event.keyCode === 68) {
		paddle2.x += 30;
	}

if(paddle1.x<=0) {
	paddle1.x = 0;
} else if(paddle1.x>=w-100) {
	paddle1.x = w-100;
}

if(paddle2.x<=0) {
	paddle2.x = 0;
} else if(paddle2.x>=w-100) {
	paddle2.x = w-100;
}
});

window.onload = function() {
	canvas = document.getElementById('canvas');
	w = canvas.width;
	h = canvas.height;
	ctx = canvas.getContext('2d');
	ball = new BALL (w/2, h/2);
	paddle1 = new PADDLE1(w/2, h-20);
	paddle2 = new PADDLE2(w/2, 20);
	beginGame();
}

function beginGame() {
	requestAnimationFrame(beginGame);
	ctx.clearRect(0, 0, w, h);
	ball.x += ball.vx;
	ball.y += ball.vy;

	ctx.fillStyle = ball.color;
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, true);
	ctx.closePath();
	ctx.save();
	ctx.shadowBlur = 25;
	ctx.shadowOffsetX = 4;
	ctx.shadowOffsetY = 4;
	ctx.shadowColor = "white";
	ctx.fill();
	ctx.restore();

	ctx.fillStyle = paddle1.color;
	ctx.beginPath();
	ctx.save();
	ctx.shadowBlur = 20;
	ctx.shadowOffsetX = 4;
	ctx.shadowOffsetY = 4;
	ctx.shadowColor = "red";
	ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
	ctx.closePath();
	ctx.restore();

	ctx.fillStyle = paddle2.color;
	ctx.beginPath();
	ctx.save();
	ctx.shadowBlur = 20;
	ctx.shadowOffsetX = -4;
	ctx.shadowOffsetY = -4;
	ctx.shadowColor = "blue";
	ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
	ctx.closePath();
	ctx.restore();

	ctx.strokeStyle = "white";
	ctx.setLineDash([2]);
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.moveTo(0, h/2);
	ctx.lineTo(w, h/2);
	ctx.stroke();

//collision with walls
if(ball.y + ball.radius > h || ball.y - ball.radius < 0) {
	ball.vy = -ball.vy;
}
if(ball.x + ball.radius > w || ball.x - ball.radius < 0) {
	ball.vx = -ball.vx;
}

//collision with paddle1
else if(ball.y + ball.radius >= h - paddle1.height - 20){
	if(ball.x + ball.radius >= paddle1.x && ball.x + ball.radius <= paddle1.x + paddle1.width) {
		ball.vy = -ball.vy;
	}
}

//collision with paddle2
else if(ball.y - ball.radius <= 20){
	if(ball.x + ball.radius >=paddle2.x && ball.x + ball.radius <= paddle2.x + paddle2.width) {
		ball.vy = -ball.vy;
	}
}


}
