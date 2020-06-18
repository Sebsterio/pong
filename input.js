const KEY_W = 87;
const KEY_S = 83;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_F5 = 116;
const KEY_SPACE = 32;
const KEY_1 = 49;
const KEY_2 = 50;

function calculateMousePos(e){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = e.clientX - rect.left - root.scrollLeft;
	var mouseY = e.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}

function mouseMove(e) {
	if (mouseInput){
		var mousePos = calculateMousePos(e);
		if (mousePos.y <= PADDLE_MARGIN+(PADDLE_HEIGHT/2)) paddle1Y = PADDLE_MARGIN;
		else if (mousePos.y >= canvas.height-PADDLE_MARGIN-(PADDLE_HEIGHT/2)){ 
			paddle1Y = canvas.height-PADDLE_MARGIN-PADDLE_HEIGHT;
		}
		else paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);		
	}
}

function changeState(keyCode, change) {
	switch (keyCode){
		case KEY_W: 	paddle1goingUp = change;
		break;
		case KEY_S: 	paddle1goingDown = change;
		break;
		case KEY_UP: 	paddle2goingUp = change;
		break;
		case KEY_DOWN: 	paddle2goingDown = change;
		break;
	}
}

function choseGameMode (keyCode) {
	if (keyCode == KEY_1) {
		mouseInput = true;
		restartGame()
	}
	if (keyCode == KEY_2) {
		mouseInput = false;
		restartGame();
	}
}

function keyPressed(e)	{
	if (e.which != KEY_F5) e.preventDefault();
	if (showMenuScreen) choseGameMode(e.keyCode);
	else if (e.which == KEY_SPACE) gameIsPaused = !gameIsPaused;
	else changeState(e.keyCode, true);
}
function keyReleased (e) {
	e.preventDefault();
	changeState(e.keyCode, false);
}