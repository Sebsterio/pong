var ballX, ballY, ballSpeedX, ballSpeedY;
var ballBaseSpeedX = 7;

const TRAIL_LENGTH = 5;
var trail = [];

function ballReset() {
	if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
		showMenuScreen = true;
	}
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	ballSpeedX = Math.random() > .5 ? ballBaseSpeedX : -ballBaseSpeedX;
	ballSpeedY = (Math.random()-.5)*10;

	for (var i = 0; i < TRAIL_LENGTH; i++){
		trail[i] = {};
		trail[i].x = ballX;
		trail[i].y = ballY;
		console.log(trail[i].x +" / " + trail[i].y)
	}
}

function ballPaddleBounce(whichPaddle) {
	hitSound.play();
	var paddleY = whichPaddle == "p1" ? paddle1Y : paddle2Y;
	var deltaY = ballY - (paddleY+PADDLE_HEIGHT/2);
	ballSpeedY = deltaY*0.4;
	
	// accelerate by 5%
	if ((whichPaddle == "p1" && ballSpeedX<0) || (whichPaddle == "p2" && ballSpeedX>0) ) {
		ballSpeedX = -Math.ceil((ballSpeedX*1.05)*100)/100;
	}
}

function moveBall() {


	for (var i = TRAIL_LENGTH-1; i >= 0; i--) {
		if (i != 0) {
			trail[i].x = trail[i-1].x;
			trail[i].y = trail[i-1].y;
		} else {
			trail[i].x = ballX;
			trail[i].y = ballY;
		}
	}

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// top and bottom edge hit
	if (ballY >= canvas.height || ballY <= 0) {
		wallSound.play();
		ballSpeedY = -ballSpeedY;
	}

	// left and right edge hit
	if (ballX <= 0) 			score("p2");
	if (ballX >= canvas.width) 	score("p1");

	// paddle hit
	if (ballX <= paddle1X+PADDLE_WIDTH && ballX >= paddle1X + ballSpeedX &&
		ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT)	{
			ballPaddleBounce("p1");
	}
	if (ballX >= paddle2X && ballX <= paddle2X+PADDLE_WIDTH + ballSpeedX &&
		ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
		ballPaddleBounce("p2");
	}


}