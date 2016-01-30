function loadLevel(num) {
	var levelData = levels[num];

	if (!state) {
		state = {};
	}
	state.currentLevel = [];

	var map = levelData.map;
	var defenition = levelData.defenition;
	var currentLevel = state.currentLevel;
	for (var y = 0; y < map.length; y++) {
		currentLevel[y] = [];
		 for (var x = 0; x < map[y].length; x++) {
			var tileType = map[y][x];
			var tile = $.extend(true, {} , defenition[tileType]);
			currentLevel[y].push(tile);
		};
	};

	var playerPos = levelData.player;
	player = {
		startingPos : playerPos,
		dir : "s"
	};
	guards = levelData.guards;
	for(var i=0; i<guards.length; ++i){
		guard = guards[i];
		guard.startingPos = {x: guard.x, y: guard.y};
		guard.currentActionIndex = -1;
		guard.waitTimeElapsed = 0;
		guard.waitFor = 0;
		guard.waiting = true;
	}
}