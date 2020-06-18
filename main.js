//p.410

var canvas;
var context;
var FPS = 60;

var mouseInput = true;
var showMenuScreen = true;
var gameIsPaused = false;

const WINNING_SCORE = 10;
var player1Score, player2Score;



function score(who) {
	missSound.play();
	if (who == "p1") player1Score++;
	else player2Score++;
	ballReset();
}

function moveEverything() {
	movePaddle();
	moveBall();
}

function drawEverything() {
	drawField()
	drawPaddles();
	drawBallAndTrail();
	showScore("white");
}

function showMenu() {
	showScore("white");
	context.fillStyle = "white";
	context.font = '60px Arial';
	context.fillText("SUPER PONGSTER", canvas.width/2 -250, canvas.height/2 - 60);
	context.font = '15px Arial';
	context.fillText("Press 1 for single-player (steering: mouse)", canvas.width/2 - 150, canvas.height/2 + 50);
	context.fillText("Press 2 for multi-player (steering: W/S and UP/DOWN)", canvas.width/2 - 150, canvas.height/2 + 70)
}

function restartGame(){
	player1Score = player2Score = 0;
	showMenuScreen =  false;
}

function startGame(){
	setInterval(function(){
		if (showMenuScreen) {
			drawField();
			showMenu();
		}
		else if (!gameIsPaused){
			moveEverything();
			drawEverything()
		}
	}, 1000/FPS);
}

window.onload = function(){

	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');

	document.addEventListener('keydown',keyPressed);
	document.addEventListener("keyup", keyReleased);
	canvas.addEventListener("mousemove", mouseMove);
	//canvas.addEventListener("mousedown", mouseDown) 

	placePaddles();
	ballReset();
	scoreReset();
	initPics(); // -> startGame()
}
