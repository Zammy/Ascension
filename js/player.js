function playerGoTo(pos) {
	if (valid_coords(pos.x, pos.y)) {
		var tiles = state.currentLevel[pos.y][pos.x];
		if (!(tiles.constructor === Array)){
			tiles = [tiles];
		}
		var pass = true;
		for (var i=0; i < tiles.length; ++i) {
			if (!tiles[i].passable){
				pass = false;
				break;
			}
		}
		if (!pass){
			return;
		}
	} else {
		return;
	}
	if (player.goal && sqrDist( player.goal, pos) < 10 ) {
		return;
	}
	player.goal = pos;
	player.next = null;
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
	if (actor.waiting){
		actor.waitTimeElapsed += STEP_TIME;
		//debugger;
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
			console.log(actor.routine.length+" "+actor.currentActionIndex);
			var action = actor.routine[actor.currentActionIndex];
			console.log(JSON.stringify(action));
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
	var realNext = mapToRealPos( actor.next );
	var delta = pointSubtract(realNext, actor.container.position);
	normalize(delta)
	scaleVector(delta, STEP_TIME * 100/ PLAYER_COMPLETE_MOVEMENT_MS);
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
