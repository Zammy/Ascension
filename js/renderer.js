
function renderInit() {
	renderer = PIXI.autoDetectRenderer(1280, 720);
    document.body.appendChild(renderer.view);

    stage = new PIXI.Container();
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
	}
}

function renderLevel() {
	stage.removeChildren();

 	var currentLevel = state.currentLevel;
	for (var y = 0; y < currentLevel.length; y++) {
		for (var x = 0; x < currentLevel[y].length; x++) {
			var tile = currentLevel[y][x];
			if (typeLoader[tile.type]) {
				typeLoader[tile.type](tile, x, y);
			} else {
				var sprite = PIXI.Sprite.fromImage("assets/" + tile.sprite);
				sprite.position.x = TILE_WIDTH * x;
				sprite.position.y = TILE_HEIGHT * y;
				stage.addChild(sprite);
				tile.sprite = sprite;
			}

		};
	};

	renderPlayer();
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

