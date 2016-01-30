var interactableTiles = {
	"altar" : function(altar) {
		if (altar.visited)
			return;

		altar.visited = true;
		stage.removeChild(altar.spriteNotVisited);
		stage.addChild(altar.spriteVisited);

		var currentLevel = state.currentLevel;
		for (var y = 0; y < currentLevel.length; y++) {
			var row = currentLevel[y];
			for (var x = 0; x < row.length; x++) {
				var tile = row[x];
				if (tile.type == "door") {
					tile.open();
				}
			}
		};
	}
}

function playerClickedOn(pos) {
	if (valid_coords(pos.x, pos.y)) {
		//it is the same goal
		if (player.goal && sqrDist( player.goal, pos) < 1 ) {
			return;
		}
		player.goal = pos;
		player.next = null;
	} else {
		var tile = state.currentLevel[pos.y][pos.x];
		var playerMapPos = realToMapPos( player.container.position );
		if (sqrDist(playerMapPos, pos) < 2 && interactableTiles[tile.type]) {
			interactableTiles[tile.type](tile);
		}
	}
}

function setVisualRotation(actor, dir){
	switch(dir){
		case 'w':
			actor.container.rotation =  Math.PI*1.5;
			break;
		case 'e':
			actor.container.rotation =  Math.PI/2;
			break;
		case 's':
			actor.container.rotation =  Math.PI;
			break;
		case 'n':
			actor.container.rotation =  0;
			break;
	}
}

function calcActorRot(actor) {
	var playerMapPos = realToMapPos( actor.container.position );
	var dirVec = pointSubtract(actor.next, playerMapPos);
	if (dirVec.x < 0) {
		actor.dir = 'w';
	} else if (dirVec.x > 0) {
		actor.dir = 'e';
	} else if (dirVec.y > 0) {
		actor.dir = 's';
	} else {
		actor.dir = 'n';
	}
	setVisualRotation(actor, actor.dir);
}

function setNext(actor) {
	var playerMapPos = realToMapPos( actor.container.position );
	actor.next = find_path(playerMapPos.x, playerMapPos.y, actor.goal.x, actor.goal.y);
	calcActorRot(actor);
}

function updateActor(actor, now) {
	// AI routines
	if (actor.waiting){
		actor.waitTimeElapsed += STEP_TIME;
		console.log(actor.waitTimeElapsed+" "+actor.waitFor+" "+actor.waiting);
		if (actor.waitFor <= actor.waitTimeElapsed){
			actor.waiting = false;
		} else {
			return;
		}
	}
	if (!actor.goal){
		if (actor.routine && actor.routine.length>0){
			actor.currentActionIndex = (actor.currentActionIndex + 1) % actor.routine.length;
			var action = actor.routine[actor.currentActionIndex];
			switch (action[0]){
				case "walk": 
					actor.goal = {x: action[1], y: action[2]};
					player.next = null;
					break;
				case "wait":
					actor.waitTimeElapsed = 0;
					actor.waitFor = action[1];
					actor.waiting = true;
					break;
				case "dir":
					setVisualRotation(actor, action[1]);
					break;
			}
		}
	}
	if (!actor.goal) {
		return;
	}
	if (!actor.next) {
		setNext(actor);
	}
	// Check if the guards see the player
	if ((actor != player)){
		delta_player = pointSubtract(player.container.position, actor.container.position);
		if ((sqrVecLength(delta_player)<=Math.pow(TILE_WIDTH*3,2)) && ((delta_player.x==0)||(delta_player.y==0))){
			if (((actor.dir=='n')&&(delta_player.y<0))||((actor.dir=='s')&&(delta_player.y>0))||((actor.dir=='w')&&(delta_player.x<0))||((actor.dir=='e')&&(delta_player.x>0))){
				// You are captured.
				playerDied();
			}
		}
	}
	// Interpolate movement
	var realNext = mapToRealPos( actor.next );
	var delta = pointSubtract(realNext, actor.container.position);
	normalize(delta)
	scaleVector(delta, STEP_TIME * PLAYER_SPEED / PLAYER_COMPLETE_MOVEMENT_MS);
	pointAdd(actor.container.position, delta);
	delta = pointSubtract(realNext, actor.container.position);
	var length = sqrVecLength(delta);
	if (length > 3 ) {
		return;
	}
	//we have arrived
	actor.prev = actor.next;
	actor.container.position = realNext;
	if (sqrDist(actor.next, actor.goal) < ZERO_EPS) {
		actor.goal = null;
	} 
	actor.next = null;
}

function playerDied() {
	alert('dead');
	loadLevel(state.currentLevelIndex);
	renderLevel();
}

function goToNextLevel() {
	loadLevel(state.currentLevelIndex+1);
	renderLevel();
}
