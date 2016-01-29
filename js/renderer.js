
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

function renderLevel() {
	var height = 64;
	var width = 64;

	stage.removeChildren();

 	var currentLevel = state.currentLevel;
	for (var y = 0; y < currentLevel.length; y++) {
		 for (var x = 0; x < currentLevel[y].length; x++) {
		  	var tile = currentLevel[y][x];
		  	var sprite = PIXI.Sprite.fromImage("../assets/" + tile.sprite);
		  	sprite.position.x = width * x;
		  	sprite.position.y = height * y;
		  	stage.addChild(sprite);
		  	tile.sprite = sprite;
		 };
	};
}

