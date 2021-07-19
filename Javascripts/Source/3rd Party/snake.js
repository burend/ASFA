var SNAKE = (function () {
	
	var WIDTH;
	var HEIGHT;
	var dx = 20;
	var dy = 20;
	var dr = 10;

	// 0: left
	// 1: up
	// 2: right
	// 3: down
	var sdirection;

	var snake;
	var size;

	var food;
	var gameStarted = false;

	this.id;

	function initSnake() {
		var gdiv = document.getElementById("game");
		canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
		WIDTH = Math.floor(gdiv.clientWidth / 20) * 20;
		HEIGHT = Math.floor(gdiv.clientHeight / 20) * 20;		
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		ctx = canvas.getContext('2d');

		createsnake();
		newfood();

		sdirection = 0;
		size = 1;

		this.id = setInterval(step, 100);
	}

	function onKeyDown(evt) {
		if (evt.keyCode === undefined || evt.keyCode === 0) {
			return;
		}

		if (gameStarted == false && evt.keyCode == 32) { // 32 = Spacebar
			gameStarted = true;
			initSnake();
			return;
		}
		if (evt.keyCode == 32) return;
		
		newdir = evt.keyCode - 37;

		// only lateral turns are allowed
		// (that is, no u-turns)
		if (newdir != sdirection && newdir != sdirection+2 && newdir != sdirection-2) {
			sdirection = newdir;
		}
	}

	function createsnake() {
	  snake = Array();
	  var head = Array();
	  head.x = Math.floor(WIDTH/2 / 20) * 20;
	  head.y = Math.floor(HEIGHT/2 / 20) * 20;
	  snake.push(head);
	}

	function collision(n) {
	  // are we out of the playground?
	  if (n.x < 0 || n.x > WIDTH - 1 || n.y < 0 || n.y > HEIGHT - 1) {
		 return true;
	  }

	  // are we eating ourselves?
	  for (var i = 0; i < snake.length; i++) {
		 if (snake[i].x == n.x && snake[i].y == n.y) {
			return true;
		 }
	  }
	  return false;
	}

	function newfood() {
	  var wcells = WIDTH/dx;
	  var hcells = HEIGHT/dy;

	  var randomx = Math.floor(Math.random()*wcells);
	  var randomy = Math.floor(Math.random()*hcells);

	  food = Array();
	  food.x = randomx * dx;
	  food.y = randomy * dy;
	  food.r = dr;
	  size = size+1;
	}

	function meal(n) {
	  return (n.x == food.x && n.y == food.y);
	}

	function movesnake() {

	  h = snake[0]; // peek head

	  // create new head relative to current head
	  var n = Array();
	  switch (sdirection) {
		 case 0: // left
			n.x = h.x - dx;
			n.y = h.y;
			break;
		 case 1: // up
			n.x = h.x;
			n.y = h.y - dy;
			break;
		 case 2: // right
			n.x = h.x + dx;
			n.y = h.y;
			break;
		 case 3: // down
			n.x = h.x;
			n.y = h.y + dy;
			break;
	  }

	  // if out of box or collision with ourselves, we die
	  if (collision(n)) {
		 return false;
	  }

	  snake.unshift(n);

	  // if there's food there
	  //console.log(food.x + ' ' + food.y + ' ' + n.x + ' ' + n.y);
	  if (meal(n)) {
		 newfood(); // we eat it and another shows up
		 
	  } else {
		 snake.pop();
		 // we only remove the tail if there wasn't food
		 // if there was food, the snake grew
	  }

	  return true;

	}

	function die() {
	  if (this.id) {
		 clearInterval(this.id);
	  }
	  gameStarted = false;
	}

	function circle(x,y,r) {
	  ctx.beginPath();
	  ctx.arc(x, y, r, 0, Math.PI*2, true);
	  ctx.closePath();
	  ctx.fill();
	}

	function rect(x,y,w,h) {
	  ctx.beginPath();
	  ctx.rect(x,y,w,h);
	  ctx.closePath();
	  ctx.fill();
	}

	function screenclear() {
	  ctx.fillStyle = "#000000";
	  ctx.clearRect(0, 0, WIDTH, HEIGHT);
	  rect(0,0,WIDTH,HEIGHT);
	}

	function drawsnake() {
	  ctx.fillStyle = "#FFFFFF";
	  snake.forEach(function(p) {
		 rect(p.x, p.y, dx, dy);
	  })
	}

	function drawfood() {
	  ctx.fillStyle = "#FF0000";
	  circle(food.x+food.r, food.y+food.r, food.r);
	}


	function newGame()
	{
		 showIntro();
		// Start game on spacebar press.
		document.addEventListener("keydown", onKeyDown, true);
      document.addEventListener("keypress", onKeyDown, true); 
		 
	};

	function step(){
	  update();
	  draw();
	}

	function update() {
	  if (!movesnake()) {
		 die();
		 showConclusion(size)
	  }
	}

	function draw() {
	  if (gameStarted) {
			screenclear();
			drawsnake();
			drawfood();
	  }
	}

	function showIntro() {
		var canvas = document.getElementById("canvas");
		ctx=canvas.getContext("2d");
		var gdiv = document.getElementById("game");
		canvas.width = gdiv.clientWidth;
		canvas.height = gdiv.clientHeight;

		ctx.font="30px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("SNAKE", canvas.width/2, canvas.height/2);

		ctx.font="20px Arial";
		ctx.fillText("press space to start", canvas.width/2, canvas.height/2+40);
	}

	function showConclusion(score) {
		screenclear();
		var canvas = document.getElementById("canvas");
		ctx=canvas.getContext("2d");
		var gdiv = document.getElementById("game");
		canvas.width = gdiv.clientWidth;
		canvas.height = gdiv.clientHeight;
		ctx.font="30px Arial";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
		ctx.fillText("score: " + score, canvas.width/2, canvas.height/2-40);
		ctx.font="20px Arial";
		ctx.fillText("press space to start", canvas.width/2, canvas.height/2+80);
	}

	function finishGame() {
		clearInterval(this.id);
		document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("keypress", onKeyDown, true); 
	 };
  
    return {
		  "playGame" : newGame,
		  "finishGame" : finishGame
    };
    
}());
