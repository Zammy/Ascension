
function renderInit() {
	renderer = PIXI.autoDetectRenderer(1280, 720);
	$('#mainMenu').after(renderer.view);

	stage = new PIXI.Container();
}

function startGame(){
	$('#mainMenu').hide();

	loadLevel(0);

	renderInit();
	renderLevel(function() {
		startUpdate();

		addMouseHandler();

		gameStartTime = Date.now();
		currentTime = gameStartTime;

		lastUpdate = currentTime;
		setInterval(function updateLoop() {
			var now = lastUpdate + STEP_TIME
			updateActor(player, now, PLAYER_SPEED);
			for (var i=0; i<guards.length; ++i){
				updateActor(guards[i], now, GUARD_SPEED);
			}
			updateLevel(now);
			lastUpdate = now;
		}, STEP_TIME);
		$('canvas').show();
	});
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

function renderLevel(onLoaded) {
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
					var sprite = PIXI.Sprite.fromImage("assets/raw/" + tile.sprite);
					sprite.position.x = TILE_WIDTH * x;
					sprite.position.y = TILE_HEIGHT * y;
					stage.addChild(sprite);
					tile.sprite = sprite;
				}
			}
		};
	};

	var complete =  function() {
		loadAnimations();

		resetPlayerPos();
		
		renderGuards();

		if (onLoaded) {
			onLoaded();
		}
	};

	if (!player.animations) {
		var loader = new PIXI.loaders.Loader();

		loader.add('player_right', 'assets/raw/animation-player/MOVE/render-right/player_right.json');
		loader.add('player_left', 'assets/raw/animation-player/MOVE/render-left/player_left.json');
		loader.add('player_up', 'assets/raw/animation-player/MOVE/render-back/player_up.json');
		loader.add('player_down', 'assets/raw/animation-player/MOVE/render-front/player_down.json');

		loader.add('player_idle_right', 'assets/raw/animation-player/IDLE/render-right/player_idle_right.json');
		loader.add('player_idle_left', 'assets/raw/animation-player/IDLE/render-left/player_idle_left.json');
		loader.add('player_idle_up', 'assets/raw/animation-player/IDLE/render-back/player_idle_up.json');
		loader.add('player_idle_down', 'assets/raw/animation-player/IDLE/render-front/player_idle_down.json');

		loader.add('guard_1_right', 'assets/raw/animation-guard-1/WALK/right/guard_1_right.json');
		loader.add('guard_1_left', 'assets/raw/animation-guard-1/WALK/left/guard_1_left.json');
		loader.add('guard_1_up', 'assets/raw/animation-guard-1/WALK/up/guard_1_up.json');
		loader.add('guard_1_down', 'assets/raw/animation-guard-1/WALK/down/guard_1_down.json');

		loader.add('guard_1_idle_right', 'assets/raw/animation-guard-1/IDLE/right/guard_1_idle_right.json');
		loader.add('guard_1_idle_left', 'assets/raw/animation-guard-1/IDLE/left/guard_1_idle_left.json');
		loader.add('guard_1_idle_up', 'assets/raw/animation-guard-1/IDLE/up/guard_1_idle_up.json');
		loader.add('guard_1_idle_down', 'assets/raw/animation-guard-1/IDLE/down/guard_1_idle_down.json');

		loader.on('complete', complete);
		loader.load();
	} else {
		complete();
	}
}

function loadAnimations() {
	var rightAnimFrames = [];
	var leftAnimFrames = [];
	var upAnimFrames = [];
	var downAnimFrames = [];
	for (var i = 0; i < 32; i++) {
		var iStr = i < 10 ? "0" + i : i.toString();
		var texture = PIXI.Texture.fromFrame('player_right_' + iStr + '.png');
		rightAnimFrames[i] = texture;
		var texture = PIXI.Texture.fromFrame('player_left_' + iStr + '.png');
		leftAnimFrames[i] = texture;
		var texture = PIXI.Texture.fromFrame('player_up_' + iStr + '.png');
		upAnimFrames[i] = texture;
		var texture = PIXI.Texture.fromFrame('player_down_' + iStr + '.png');
		downAnimFrames[i] = texture;
	};

	var rightIdleAnimFrames = [];
	var leftIdleAnimFrames = [];
	var upIdleAnimFrames = [];
	var donwIdleAnimFrames = [];
	for (var i = 0; i < 16; i++) {
		var iStr = i < 10 ? "0" + i : i.toString();
		var texture = PIXI.Texture.fromFrame('player_idle_right_' + iStr + '.png');
		rightIdleAnimFrames[i] = texture;
		var texture = PIXI.Texture.fromFrame('player_idle_left_' + iStr + '.png');
		leftIdleAnimFrames[i] = texture;
		var texture = PIXI.Texture.fromFrame('player_idle_up_' + iStr + '.png');
		upIdleAnimFrames[i] = texture;
		var texture = PIXI.Texture.fromFrame('player_idle_down_' + iStr + '.png');
		donwIdleAnimFrames[i] = texture;
	}

	var keyToAnim = {
		"walkRight" : rightAnimFrames,
		"walkLeft" : leftAnimFrames,
		"walkUp" : upAnimFrames,
		"walkDown" : downAnimFrames,
		"idleRight" : rightIdleAnimFrames,
		"idleLeft" : leftIdleAnimFrames,
		"idleUp" : upIdleAnimFrames,
		"idleDown" : donwIdleAnimFrames
	}
	var container = new PIXI.Container();
	container.anchor = new PIXI.Point(0.5, 0.5);
	player.container = container;
	player.animations = {};
	for (var key in keyToAnim) {
		var clip = new PIXI.extras.MovieClip( keyToAnim[key] );
		clip.visible = false;
		clip.position = new PIXI.Point(-TILE_WIDTH/2, -TILE_HEIGHT/2 - 46);
		clip.animationSpeed = PLAYER_ANIM_SCALE;
		player.animations[key] = clip;
		container.addChild(clip);
	}
	player.animations.idleUp.visible = true;
	player.animations.idleUp.play();
}

function resetPlayerPos() {
	var startPos = player.startingPos;
	var realPos = mapToRealPos(startPos);
	player.container.position = new PIXI.Point(realPos.x, realPos.y);
	player.prev = startPos;
	stage.addChild(player.container);
}

function renderGuards(){
	for (var i=0; i<guards.length; ++i){
		var guard = guards[i];
		if (!guard.animations) {

			var rightAnimFrames = [];
			var leftAnimFrames = [];
			var upAnimFrames = [];
			var downAnimFrames = [];
			for (var i = 0; i < 8; i++) {
				var iStr = i < 10 ? "0" + i : i.toString();
				var texture = PIXI.Texture.fromFrame('guard_1_right_' + iStr + '.png');
				rightAnimFrames[i] = texture;
				var texture = PIXI.Texture.fromFrame('guard_1_left_' + iStr + '.png');
				leftAnimFrames[i] = texture;
				var texture = PIXI.Texture.fromFrame('guard_1_up_' + iStr + '.png');
				upAnimFrames[i] = texture;
				var texture = PIXI.Texture.fromFrame('guard_1_down_' + iStr + '.png');
				downAnimFrames[i] = texture;
			};

			var rightIdleAnimFrames = [];
			var leftIdleAnimFrames = [];
			var upIdleAnimFrames = [];
			var donwIdleAnimFrames = [];
			for (var i = 0; i < 14; i++) {
				var iStr = i < 10 ? "0" + i : i.toString();
				var texture = PIXI.Texture.fromFrame('guard_1_idle_right_' + iStr + '.png');
				rightIdleAnimFrames[i] = texture;
				var texture = PIXI.Texture.fromFrame('guard_1_idle_left_' + iStr + '.png');
				leftIdleAnimFrames[i] = texture;
				var texture = PIXI.Texture.fromFrame('guard_1_idle_up_' + iStr + '.png');
				upIdleAnimFrames[i] = texture;
				var texture = PIXI.Texture.fromFrame('guard_1_idle_down_' + iStr + '.png');
				donwIdleAnimFrames[i] = texture;
			}

			var keyToAnim = {
				"walkRight" : rightAnimFrames,
				"walkLeft" : leftAnimFrames,
				"walkUp" : upAnimFrames,
				"walkDown" : downAnimFrames,
				"idleRight" : rightIdleAnimFrames,
				"idleLeft" : leftIdleAnimFrames,
				"idleUp" : upIdleAnimFrames,
				"idleDown" : donwIdleAnimFrames
			}
			
			var container = new PIXI.Container();
			container.anchor = new PIXI.Point(0.5, 0.5);
			guard.container = container;

			guard.animations = {};
			for (var key in keyToAnim) {
				var clip = new PIXI.extras.MovieClip( keyToAnim[key] );
				clip.visible = false;
				clip.position = new PIXI.Point(-TILE_WIDTH/2-32, -TILE_HEIGHT/2 -64);
				clip.animationSpeed = GUARD_ANIM_SCALE;
				guard.animations[key] = clip;
				container.addChild(clip);
			}
			guard.animations.idleUp.visible = true;
			guard.animations.idleUp.play();

			var torchTexture = new PIXI.Texture.fromImage('assets/torch.png');
			var torch = new PIXI.Sprite(torchTexture);
			torch.position = new PIXI.Point(-160, -160);
			torch.blendMode = PIXI.BLEND_MODES.SCREEN;
			container.addChild(torch);
		}
	 
		var startPos = guard.startingPos;
		var realPos = mapToRealPos(startPos);
		guard.container.position = new PIXI.Point(realPos.x, realPos.y);
		guard.prev = startPos;
		stage.addChild(guard.container);
	}
}
