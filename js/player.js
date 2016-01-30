function playerGoTo(pos) {
	if (valid_coords(pos.x, pos.y)) {
		player.goal = pos;
		player.next = null;
	}
}


function calcActorRot(actor) {
	var playerMapPos = getActorMapPos(actor);
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

function getActorMapPos(actor) {
	// if (actor.next) {
		// return mapToRealPos( actor.next );
	// } else {
		return realToMapPos( actor.container.position );
	// }
}

function setNext(actor) {
	var playerMapPos = getActorMapPos(actor);
	actor.next = find_path(playerMapPos.x, playerMapPos.y, actor.goal.x, actor.goal.y);
	calcActorRot(actor);
}

function updateActor(actor, now) {
	if (!actor.goal) {
		return;
	}
	var playerMapPos = getActorMapPos(actor);
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
	actor.container.position = realNext;
	if (sqrDist(actor.next, actor.goal) < ZERO_EPS) {
		actor.goal = null;
		actor.next = null;
	} else {
		setNext(actor);
	}
}
