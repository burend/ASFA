/**********************************************************************************
Your Phones Games
***********************************************************************************/
var currentGame;
var canvas;
var ctx;

function addGame(id)
{
	if (id == "tetris") {
		currentGame = TETRIS;
		return '<div id="game" style="position:absolute;top:9%;left:6%;width:88%;height:71%;background-color:white;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
			'<audio id="clearsound" src="Sound/pop.mp3" preload="auto"></audio>' +
			'<canvas width="100" height="300"></canvas>' + 
			'</div>';
			
	} else if (id == "snake") {
		currentGame = SNAKE;
		return '<div id="game" style="position:absolute;top:9%;left:6%;width:88%;height:71%;background-color:black;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
			'<canvas id="canvas" width="200" height="300" style="background-color:black"></canvas>' + 
			'</div>';
			
	} else if (id == "pong") {
		currentGame = PONG;			
		return '<style>#start-message, #game-over { color:yellow;position:absolute;top:50%;left:23%;text-align:center;font-weight: bold;}</style>' +
			'<div id="game" style="position:absolute;top:9%;left:6%;width:88%;height:71%;background-color:black;overflow-y:auto;overflow-x:hidden;margin-top:0.25em">' +
			'<div class="score" style="font-size:1.5em;margin-bottom:1%;color:yellow">Score: <span id="score">0</span></div>' +    
			'<div id="playground" style="background:black;width:95%;height:90%;position:relative;overflow:hidden;border:2px solid yellow">' +
			'<div id="start-message">press any key to start<br/>move &#8592; &#8594;</div>' +
			'<div id="game-over" style="display:none;">game over<br/>press any key to play again</div>' +
			'<div id="ball" style="background:yellow;position:absolute;width:30px;height:30px;left:135px;top:100px;border-radius:15px"></div>' +
			'<div id="racket" style="background:yellow;left:110px;top:360px;position:absolute;width:80px;height:20px"></div>' +
			'</div></div>';

	} else {
		currentGame = PACMAN;
		return '<div id="game" style="position:absolute;top:9%;left:6%;width:88%;height:71%;background-color:black;overflow-y:auto;overflow-x:hidden;margin-top:0.25em"></div>';
	}
}

function playGame()
{
	Save("Auto", "Autosave before game");
	currentGame.playGame();
}

function finishPhoneGame()
{
	currentGame.finishGame();
	WaitHereOnly(6);
	usePhone("games");
	dispPlace();
}
