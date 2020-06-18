const PADDLE_HEIGHT = 90;
const PADDLE_WIDTH = 10;
const PADDLE_SPEED = 5;
const PADDLE_MARGIN = 50;

var AI_accuracy = 30;
var AI_error = 30;
var AI_freq = 6;
var AI_frameNumber = 0;
var AI_destination;

var paddleDistanceFromEdge, paddle1X, paddle1Y, paddle2X, paddle2Y;

var paddle1goingUp = false;
var paddle1goingDown = false;
var paddle2goingUp = false;
var paddle2goingDown = false;

function placePaddles() {
	paddleDistanceFromEdge = canvas.width*15/100;
	paddle1X = paddleDistanceFromEdge;
	paddle2X = canvas.width-PADDLE_WIDTH-paddleDistanceFromEdge;
	paddle1Y = canvas.height/2 - PADDLE_HEIGHT/2;
	paddle2Y = canvas.height/2 - PADDLE_HEIGHT/2;
}

function setDestination (x,y, speedY, stack) {

	/* prevent infinite loop*/
	if (stack > 4) return;

	/* determine capture point */
	var bouncePointY = y + (  ( speedY*(paddle2X-x) ) /ballSpeedX  );

	/* return if no bounces */
	if (bouncePointY >= 0 && bouncePointY <= canvas.height) {
		var error = Math.floor(Math.random()*AI_error);
		AI_destination = bouncePointY+error;
		return;

	/* recursion in case of multiple bounces */
	} else if (bouncePointY<0)	{
		var bouncePointX = x - ( (ballSpeedX*(y))/speedY );
		setDestination(bouncePointX, 0, -speedY, stack+1);
	} else {
		var bouncePointX = x + ( (ballSpeedX*(canvas.height-y))/speedY );
		setDestination(bouncePointX, canvas.height, -speedY, stack+1);
	}
}

function AI_move () {
	
	/* set destination over AI refresh rate */
	AI_frameNumber++;
	if (AI_frameNumber >= FPS/AI_freq) {
		AI_frameNumber = 0;
		if (ballSpeedX>0) {
			setDestination(ballX, ballY, ballSpeedY, 0);
		}
		else AI_destination = canvas.height/2;
	}

	/* go towards destination */
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < AI_destination - AI_accuracy) 		paddle2Y += PADDLE_SPEED;
	else if (paddle2YCenter > AI_destination + AI_accuracy) paddle2Y -= PADDLE_SPEED;

	/* stop at field margins */
	var bottomMargin = canvas.height -PADDLE_MARGIN -PADDLE_HEIGHT;
	if (paddle2Y <= PADDLE_MARGIN) paddle2y = PADDLE_MARGIN;
	else if (paddle2Y >= bottomMargin) paddle2Y = bottomMargin;
}

function movePaddle() {
	if (mouseInput) AI_move();
	else {
		var paddleMarginTop = PADDLE_MARGIN;
		var paddleMarginBottom = canvas.height - PADDLE_MARGIN - PADDLE_HEIGHT;
		if (paddle1goingUp && paddle1Y > paddleMarginTop)  			paddle1Y -= PADDLE_SPEED;
	 	else if (paddle1goingDown && paddle1Y < paddleMarginBottom)	paddle1Y += PADDLE_SPEED;
	 	if (paddle2goingUp && paddle2Y > paddleMarginTop) 			paddle2Y -= PADDLE_SPEED;
	 	else if (paddle2goingDown && paddle2Y < paddleMarginBottom)	paddle2Y += PADDLE_SPEED;
	}
}

