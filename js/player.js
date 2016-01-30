var interactableTiles = {
	"altar" : function(altar) {
		if (altar.visited)
			return;

		altar.visited = true;
		stage.removeChild(altar.spriteNotVisited);
		stage.addChild(altar.spriteVisited);
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

function calcActorRot(actor) {
	var playerMapPos = realToMapPos( actor.container.position );
	var dirVec = pointSubtract(actor.next, playerMapPos);
	if (dirVec.x < 0) {
		actor.dir = 'w';
		actor.container.rotation =  Math.PI*1.5;
	} else if (dirVec.x > 0) {
		actor.dir = 'e';
		actor.container.rotation =  Math.PI/2;
	} else if (dirVec.y > 0) {
		actor.dir = 's';
		actor.container.rotation =  Math.PI;
	} else {
		actor.dir = 'n';
		actor.container.rotation =  0;
	}
}

function setNext(actor) {
	var playerMapPos = realToMapPos( actor.container.position );
	actor.next = find_path(playerMapPos.x, playerMapPos.y, actor.goal.x, actor.goal.y);
	calcActorRot(actor);
}

function updateActor(actor, now) {
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
