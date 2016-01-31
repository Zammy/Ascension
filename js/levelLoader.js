function loadLevel(num) {
	var levelData = levels[num];

	if (!state) {
		state = {};
	}
	state.currentLevel = [];
	state.currentLevelIndex = num;

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

	guards = [];
	var guardsData = levelData.guards;
	for(var i=0; i<guardsData.length; i++){
		var guard = {};

		guard.startingPos = {x: guardsData[i].x, y: guardsData[i].y};
		guard.dir = guardsData[i].dir;
		guard.currentActionIndex = -1;
		guard.waitTimeElapsed = 0;
		guard.waitFor = 0;
		guard.waiting = true;
		guard.routine = guardsData[i].routine;

		guards[i] = guard;
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
			spikesFX.currentTime = 0;
			spikesFX.play();
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
			playerDied(now);
		}
	},

	"door" : function(door, x, y) {
		if (!player.container) {
			return;
		}
		var playerMapPos = realToMapPos( player.container.position );
		var doorMapPos = realToMapPos( door.spriteOpenned.position );
		if (sqrDist(playerMapPos, doorMapPos) < 1) {
			if (door.final) {
				showFinal();
			} else {
				goToNextLevel();
			}
			
		}
	},

	"scroll" : function(scroll, x , y) {
		if (!player.container || !scroll.sprites.scroll.visible) {
			return;
		}

		var playerMapPos = realToMapPos( player.container.position );
		var doorMapPos = realToMapPos( scroll.sprites.scroll );
		if (sqrDist(playerMapPos, doorMapPos) < 1) {
			scroll.open();
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