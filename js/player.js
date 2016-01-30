function playerGoTo(pos) {
	if (valid_coords(pos.x, pos.y)) {
		player.goal = pos;
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
		player.timeArrived = now;
		player.oldTilePos = mapToRealPos(realToMapPos(player.container.position));
	}
	if (player.next) {
		//debugger;
		var realNext = mapToRealPos( player.next );
		var delta = pointSubtract(realNext, player.container.position);
		var length = sqrVecLength(delta);
		if (length < 0.25) {
			//we have arrived
			player.next = find_path(playerMapPos.x, playerMapPos.y, player.goal.x, player.goal.y);
			player.timeArrived = now;
			if (sqrDist(player.next, player.goal) < ZERO_EPS){
				player.goal = null;
				player.next = null;
			}
		} else {
			//move towards next tile
			var scale = (now - player.timeArrived) / PLAYER_COMPLETE_MOVEMENT_MS;
			scaleVector(delta, scale);
			pointAdd(player.container.position, delta);
		}
	}
}
