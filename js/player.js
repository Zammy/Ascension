function playerGoTo(pos) {
	if (valid_coords(pos.x, pos.y)) {
		player.goal = pos;
		player.next = null;
	}
}

function getPlayerMapPos() {
	return realToMapPos( player.container.position );
}

function playerUpdate(now) {
	if (!player.goal) {
		return;
	}
	var playerMapPos = getPlayerMapPos();
	if (!player.next) {
		player.next = find_path(playerMapPos.x, playerMapPos.y, player.goal.x, player.goal.y);
	}
	movePlayer(now);
}

function movePlayer(now) {
	var playerMapPos = getPlayerMapPos();
	var realNext = mapToRealPos( player.next );
	var delta = pointSubtract(realNext, player.container.position);
	normalize(delta)
	scaleVector(delta, STEP_TIME * 100/ PLAYER_COMPLETE_MOVEMENT_MS);
	pointAdd(player.container.position, delta);
	delta = pointSubtract(realNext, player.container.position);
	var length = sqrVecLength(delta);
	if (length > 3 ) {
		return;
	}
	//we have arrived
	player.container.position = realNext;
	if (sqrDist(player.next, player.goal) < ZERO_EPS) {
		player.goal = null;
		player.next = null;
	} else {
		player.next = find_path(playerMapPos.x, playerMapPos.y, player.goal.x, player.goal.y);
	}
}
