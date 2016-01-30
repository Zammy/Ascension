function loadLevel (num) {
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
	if (!player) {
		player = {
			startingPos : playerPos,
			dir : "n"
		};
	}
}

var interactableUpdates = {
	"spikes" : function(spikes, now) {
		if (spikes.nextShow == undefined) {
			spikes.nextShow = now + 2000 + (Math.random() * 1200);
		}

		if (now > spikes.nextShow && spikes.spriteHidden.visible) {
			spikes.nextHide = now + 5000;
			spikes.spriteShown.visible = true;
			spikes.spriteHidden.visible = false;
		} else if (now > spikes.nextHide && spikes.spriteShown.visible) {
			spikes.nextShow = now + 2000;
			spikes.spriteShown.visible = false;
			spikes.spriteHidden.visible = true;
		}

		if (spikes.spriteHidden.visible) {
			return;
		}

		var playerMapPos = realToMapPos( player.container.position );
		var spikesMapPos = realToMapPos( spikes.spriteShown.position );
		if (sqrDist(playerMapPos, spikesMapPos) < 1) {
			alert ("YOU ARE DEAD!");
			player.container.position = mapToRealPos( player.startingPos );
			player.goal = null;
		}
	}
}

function updateLevel(now) {
	var currentLevel = state.currentLevel;
	for (var y = 0; y < currentLevel.length; y++) {
		for (var x = 0; x < currentLevel[y].length; x++) {
			var tile = currentLevel[y][x];

			if (interactableUpdates[tile.type]) {
				interactableUpdates[tile.type](tile, now);
			}
		};
	};
}