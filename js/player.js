function playerGoTo (pos) {
	if (valid_coords(pos.x, pos.y)) {
		player.goal = pos;
	}
}

function playerMapPos () {
	return realToMapPos( player.container.position );
}

function playerUpdate (dt) {
	if (player.next) {
		var playerMapPos = playerMapPos();
		var realNext = mapToRealPos( player.next );
		var delta = pointSubtract(realNext, player.container.position);
		var length = sqrVecLenght(delta);
		if (length < 0.25) {
			//we have arrived
			player.next = find_path(playerMapPos.x, playerMapPos.y, player.goal.x, player.goal.y);

			player.timeArrived = new Date();
		}


	}

	if (!player.goal) {
		var currentPos = playerMapPos();
		var next = find_path(currentPos.x, currentPos.y, player.goal.x, player.goal.y);

	}
}
