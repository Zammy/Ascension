function playerGoTo(pos) {
	if (valid_coords(pos.x, pos.y)) {
		player.goal = pos;
		player.next = null;
	}
}

function getActorMapPos(actor) {
	return realToMapPos( actor.container.position );
}

function updateActor(actor, now) {
	if (!actor.goal) {
		return;
	}
	var playerMapPos = getActorMapPos(actor);
	if (!actor.next) {
		actor.next = find_path(playerMapPos.x, playerMapPos.y, actor.goal.x, actor.goal.y);
	}
	var playerMapPos = getActorMapPos(actor);
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
		actor.next = find_path(playerMapPos.x, playerMapPos.y, actor.goal.x, actor.goal.y);
	}
}
