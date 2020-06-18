/*
player1Score
player2Score
*/
const SCORE_FONT_SIZE = 10  // = % of canvas height
const SCORE_POS_X = 10;	  	// = % of canvas height
const SCORE_POS_Y = 5;	  	// = % of canvas height

var scoreField = {};


function scoreReset() {
	scoreField.h = canvas.height*SCORE_FONT_SIZE/100;
	scoreField.w = scoreField.h *0.7;
	scoreField.x = canvas.height*SCORE_POS_X/100
	scoreField.y = canvas.height*SCORE_POS_Y/100
}


function drawScore (playerScore, x, y, w, h, color) {
	context.save();
	context.strokeStyle = color;
	context.fillStyle = color;
	barHeight = (h/WINNING_SCORE)-2;
	barWidth = w-4;

	context.strokeRect(x,y,w,h+2);

	for (var i=1; i<=WINNING_SCORE; i++){
		if (playerScore>=i) {
			context.fillRect(x+2, y+(i*2)+(barHeight*(i-1)), barWidth, barHeight);
		}
	}

	context.restore();
}

function showScore(){
	drawScore(player1Score, scoreField.x, scoreField.y, scoreField.w, scoreField.h, "red");
	drawScore(player2Score, canvas.width-scoreField.x-scoreField.w, scoreField.y, scoreField.w, scoreField.h, "blue");
}