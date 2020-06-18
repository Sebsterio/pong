/* -- LOAD PICS ---*/

var bgPic = document.createElement("img");
var paddleLPic = document.createElement("img");
var paddleRPic = document.createElement("img");
var ballPic = document.createElement("img");

var picsToLoad;
var picList = [
	{varName: bgPic, fileName: "bg.png"},
	{varName: paddleLPic, fileName: "paddleLeft.png"},
	{varName: paddleRPic, fileName: "paddleRight.png"},
	{varName: ballPic, fileName: "ball.png"},
];


function picLoaded() {
	picsToLoad--;
	if (picsToLoad === 0) startGame();
}
function loadPic(picVar, fileName) {
	picVar.onload = picLoaded();	// ()?
	picVar.src = "images/" + fileName;
}
function loadTrackPic (trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	loadPic(trackPics[trackCode], fileName)
}
function initPics() {
	picsToLoad = picList.length
	for (var i = 0; i< picList.length; i++){
		loadPic(picList[i].varName, picList[i].fileName);
	}
}


/*--- DRAW ---*/



function colorRect(x, y, w, h, color) {
	context.fillStyle = color;
	context.fillRect(x,y,w,h);
}

function colorCircle (ceterX, centerY, radius, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(ceterX, centerY, radius, 0, Math.PI*2,true);
	context.fill();
}

function drawField() {
	colorRect(0,0,canvas.width,canvas.height,"black");
	context.drawImage(bgPic,0,0);
}

function drawPaddles() {
	context.drawImage(paddleLPic,paddle1X,paddle1Y);
	context.drawImage(paddleRPic,paddle2X,paddle2Y);
}

function drawBall(x, y, alpha) {
	context.save();
	context.globalAlpha = alpha;
	context.drawImage(ballPic,x, y);
	context.restore();
}

function drawBallAndTrail() {
	var alphaDecreaseRate = 1 / (TRAIL_LENGTH+1);
	for (var i = TRAIL_LENGTH-1; i >= 0; i--) {
		var thisAlpha = 1 - alphaDecreaseRate*(i+1);
		drawBall(trail[i].x, trail[i].y, thisAlpha);
	}
	drawBall(ballX, ballY, 1);
}