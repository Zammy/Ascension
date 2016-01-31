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
				var tiles = row[x];
				if (!(tiles.constructor === Array)){
					tiles = [tiles];
				}
				for (var i=0;i<tiles.length;++i){
					var tile = tiles[i];
					if (tile.type == "door") {
						tile.open();
					}
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
		setVisualRotation(player, player.dir);
	} else {
		var tile = state.currentLevel[pos.y][pos.x];
		var playerMapPos = realToMapPos( player.container.position );
		if (sqrDist(playerMapPos, pos) < 2 && interactableTiles[tile.type]) {
			interactableTiles[tile.type](tile);
		}
	}
}

function setVisualRotation(actor, dir){
	if (actor.animations) {
		for (var key in actor.animations) {
			var clip = actor.animations[key];
			if (clip.playing) {
				clip.stop();
			}
			clip.visible = false;
		}
	}

	switch(dir) {
		case 'w':
			if (actor.goal && actor.animations.walkLeft) {
				actor.animations.walkLeft.play();
				actor.animations.walkLeft.visible = true;
			} else if (actor.animations.idleLeft) {
				actor.animations.idleLeft.play();
				actor.animations.idleLeft.visible = true;
			} else {
				actor.container.rotation =  Math.PI*1.5;
			}
			break;
		case 'e':
			if (actor.goal && actor.animations.walkRight) {
				actor.animations.walkRight.play();
				actor.animations.walkRight.visible = true;
			} else if (actor.animations.idleRight) {
				actor.animations.idleRight.play();
				actor.animations.idleRight.visible = true;
			} else {
				actor.container.rotation =  Math.PI/2;
			}
			break;
		case 's':
			if (actor.goal && actor.animations.walkDown) {
				actor.animations.walkDown.play();
				actor.animations.walkDown.visible = true;
			} else if (actor.animations.idleDown) {
				actor.animations.idleDown.play();
				actor.animations.idleDown.visible = true;
			} else {
				actor.container.rotation =  Math.PI;
			}
			break;
		case 'n':
			if (actor.goal && actor.animations.walkUp) {
				actor.animations.walkUp.play();
				actor.animations.walkUp.visible = true;
			} else if (actor.animations.idleUp) {
				actor.animations.idleUp.play();
				actor.animations.idleUp.visible = true;
			} else {
				actor.container.rotation =  0;
			}
			break;
		default:
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

function updateActor(actor, now, speed) {
	if (!actor.container) {
		return;
	}

	// AI routines
	if (actor.waiting){
		actor.waitTimeElapsed += STEP_TIME;
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
					actor.dir = action[1];
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
	if ((actor != player) && player.container ){
		var delta_player = pointSubtract(player.container.position, actor.container.position);
		if ((sqrVecLength(delta_player)<=Math.pow(TILE_WIDTH*3,2)) && ((delta_player.x==0)||(delta_player.y==0))){
			if (((actor.dir=='n')&&(delta_player.y<0))||((actor.dir=='s')&&(delta_player.y>0))||((actor.dir=='w')&&(delta_player.x<0))||((actor.dir=='e')&&(delta_player.x>0))){
				// Check for obstructions
				no_obstructions = true;
				var currentLevel = state.currentLevel;
				for (var y = 0; y < currentLevel.length; y++) {
					var row = currentLevel[y];
					for (var x = 0; x < row.length; x++) {
						tilePos = mapToRealPos({x: x, y: y});
						if (((delta_player.x==0)&&(tilePos.x==player.container.position.x)&&(((player.container.position.y<=tilePos.y)&&(tilePos.y<=actor.container.y))||((actor.container.position.y<=tilePos.y)&&(tilePos.y<=player.container.y))))||
							((delta_player.y==0)&&(tilePos.y==player.container.position.y)&&(((player.container.position.x<=tilePos.x)&&(tilePos.x<=actor.container.x))||((actor.container.position.x<=tilePos.x)&&(tilePos.x<=player.container.x))))){
							var tiles = row[x];
							if (!(tiles.constructor === Array)){
								tiles = [tiles];
							}
							for (var i=0;i<tiles.length;++i){
								var tile = tiles[i];
								if (!tile.passable) {
									no_obstructions = false;
									break;
								}
							}
						}
					}
				};
				if (no_obstructions){
					// You are captured.
					playerDied(now);
				}
			}
		}
	}
	// Interpolate movement
	var realNext = mapToRealPos( actor.next );
	var delta = pointSubtract(realNext, actor.container.position);
	normalize(delta)
	scaleVector(delta, STEP_TIME * speed / PLAYER_COMPLETE_MOVEMENT_MS);
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
		setVisualRotation(actor, actor.dir);
	} 
	actor.next = null;
}

function playerDied(now) {
	//alert('dead');
	//loadLevel(state.currentLevelIndex);
	//renderLevel();
	// Code above moved to renderer
	restartingSince = now;
	restartingUntil = now + restartingLengthMS;
	restarting = true;
}

function goToNextLevel() {
	loadLevel(state.currentLevelIndex+1);
	renderLevel();
}
