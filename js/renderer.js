
function renderInit() {
	renderer = PIXI.autoDetectRenderer(1280, 720);
	$('#mainMenu').after(renderer.view);

	stage = new PIXI.Container();
}

function startGame(){
	loadLevel(0);

	renderInit();
	renderLevel();
	startUpdate();

	addMouseHandler();

	gameStartTime = Date.now();
	currentTime = gameStartTime;

	lastUpdate = currentTime;
	setInterval(function updateLoop() {
		var now = lastUpdate + STEP_TIME
		updateActor(player, now);
		for (var i=0; i<guards.length; ++i){
			updateActor(guards[i], now);
		}
		updateLevel(now);
		lastUpdate = now;
	}, STEP_TIME);
	$('#mainMenu').hide();
	$('canvas').show();
}

function pauseGame(){
}

function update() {
	renderer.render(stage);
	requestAnimationFrame(update);
};

function startUpdate() {
	requestAnimationFrame( update );
}

var typeLoader = {
	"altar" : function altarLoader(altar, x, y) {
		var notVisited = PIXI.Sprite.fromImage("assets/" + altar.sprites.notVisited);
		notVisited.position.x = TILE_WIDTH * x;
		notVisited.position.y = TILE_HEIGHT * y;
		stage.addChild(notVisited);
		altar.spriteNotVisited = notVisited;

		var visited = PIXI.Sprite.fromImage("assets/" + altar.sprites.visited);
		visited.position.x = TILE_WIDTH * x;
		visited.position.y = TILE_HEIGHT * y;
		altar.spriteVisited = visited;
	},
	"spikes" : function spikesLoader(spikes, x, y) {
		var hidden = PIXI.Sprite.fromImage("assets/" + spikes.sprites.hidden);
		hidden.position.x = TILE_WIDTH * x;
		hidden.position.y = TILE_HEIGHT * y;
		stage.addChild(hidden);
		spikes.spriteHidden = hidden;

		var shown = PIXI.Sprite.fromImage("assets/" + spikes.sprites.shown);
		shown.position.x = TILE_WIDTH * x;
		shown.position.y = TILE_HEIGHT * y;
		shown.visible = false;
		stage.addChild(shown);
		spikes.spriteShown = shown;
	},
	"door" : function doorLoad(door, x, y) {
		var openned = PIXI.Sprite.fromImage("assets/" + door.sprites.open);
		openned.position.x = TILE_WIDTH * x;
		openned.position.y = TILE_HEIGHT * y;
		openned.visible = false;
		stage.addChild(openned);
		door.spriteOpenned = openned;

		var closed = PIXI.Sprite.fromImage("assets/" + door.sprites.close);
		closed.position.x = TILE_WIDTH * x;
		closed.position.y = TILE_HEIGHT * y;
		stage.addChild(closed);
		door.spriteClosed = closed;

		door.open = function() {
			openned.visible = true;
			closed.visible = false;
			door.passable = true;
		}
	} 
}

function renderLevel() {
	stage.removeChildren();

	var currentLevel = state.currentLevel;
	for (var y = 0; y < currentLevel.length; y++) {
		for (var x = 0; x < currentLevel[y].length; x++) {
			var tiles = currentLevel[y][x];
			if (!(tiles.constructor === Array)){
				tiles = [tiles];
			}
			for (var i=0;i<tiles.length;++i){
				var tile = tiles[i];
				if (typeLoader[tile.type]) {
					typeLoader[tile.type](tile, x, y);
				} else {
					var sprite = PIXI.Sprite.fromImage("assets/" + tile.sprite);
					sprite.position.x = TILE_WIDTH * x;
					sprite.position.y = TILE_HEIGHT * y;
					stage.addChild(sprite);
					tile.sprite = sprite;
				}
			}
		};
	};

	renderPlayer();
	renderGuards();
}

function renderPlayer() {
	if (!player.baseTexture) {
		player.baseTexture = PIXI.Texture.fromImage('assets/P.png');//PIXI.Texture.fromImage('assets/bkspr01.png');

		var standingTexture = new PIXI.Texture(player.baseTexture, new PIXI.Rectangle(0, 0, 64, 64) );
		// var walking = 
		// [
		// 	new PIXI.Texture(player.baseTexture, new PIXI.Rectangle(25, 157, 87, 97) ),
		// 	new PIXI.Texture(player.baseTexture, new PIXI.Rectangle(25, 296, 87, 97) ),
		// ];

		// var walkingAnim = new PIXI.extras.MovieClip(walking);
		// walkingAnim.visible = false;
		// walkingAnim.animationSpeed = 0.08;

		var standing = new PIXI.Sprite(standingTexture);
		standing.position = new PIXI.Point(-TILE_WIDTH/2, -TILE_HEIGHT/2);
		player.animations =
		{
			standing : standing
			// walking : walkingAnim
		}

		var container = new PIXI.Container();
		container.anchor = new PIXI.Point(0.5, 0.5);
		container.addChild(player.animations.standing);
		// container.addChild(player.animations.walking);
		player.container = container;
	}

	var startPos = player.startingPos;
	var realPos = mapToRealPos(startPos);
	player.container.position = new PIXI.Point(realPos.x, realPos.y);
	player.prev = startPos;
	stage.addChild(player.container);
}

function renderGuards(){
	for (var i=0; i<guards.length; ++i){
		var guard = guards[i];
		if (!guard.baseTexture) {
			guard.baseTexture = PIXI.Texture.fromImage('assets/G.png');//PIXI.Texture.fromImage('assets/bkspr01.png');

			var standingTexture = new PIXI.Texture(guard.baseTexture, new PIXI.Rectangle(0, 0, 64, 64) );
			// var walking = 
			// [
			// 	new PIXI.Texture(guard.baseTexture, new PIXI.Rectangle(25, 157, 87, 97) ),
			// 	new PIXI.Texture(guard.baseTexture, new PIXI.Rectangle(25, 296, 87, 97) ),
			// ];

			// var walkingAnim = new PIXI.extras.MovieClip(walking);
			// walkingAnim.visible = false;
			// walkingAnim.animationSpeed = 0.08;

			var standing = new PIXI.Sprite(standingTexture);
			standing.position = new PIXI.Point(-TILE_WIDTH/2, -TILE_HEIGHT/2);
			guard.animations =
			{
				standing : standing
				// walking : walkingAnim
			}

			var container = new PIXI.Container();
			container.anchor = new PIXI.Point(0.5, 0.5);
			container.addChild(guard.animations.standing);
			// container.addChild(guard.animations.walking);
			guard.container = container;
		}
	 
		var startPos = guard.startingPos;
		var realPos = mapToRealPos(startPos);
		guard.container.position = new PIXI.Point(realPos.x, realPos.y);
		guard.prev = startPos;
		stage.addChild(guard.container);
	}
}
