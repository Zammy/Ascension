function playerGoTo(pos) {
	if (!valid_coords(pos.x, pos.y)) {
		return;
	}

	player.goal = pos;
	// player.next = null
	if (player.next) {
		console.log("player.prev : " + JSON.stringify(player.prev) );
		console.log("player.next : " + JSON.stringify(player.next) );

		var dataPrev = find_path(player.prev.x, player.prev.y, player.goal.x, player.goal.y);
		var dataNext = find_path(player.next.x, player.next.y, player.goal.x, player.goal.y);
		
		console.log("dataPrev : " + JSON.stringify(dataPrev) );
		console.log("dataNext : " +  JSON.stringify(dataNext) );

		if (dataPrev.dist > dataNext.dist) {
			console.log("dataPrev!!!" );
			player.next = dataPrev;
			player.prev = dataNext;
		} else {
			console.log("dataNext!!!" );
			player.next = dataNext;
			player.prev = dataPrev;
		}

		calcActorRot(player);
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
