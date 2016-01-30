function playerGoTo (pos) {
	player.goal = pos;
}

function playerTilePos () {
	return {x : player.container.position.x / TILE_WIDTH, y: player.container.position.y / TILE_HEIGHT};
}

function playerUpdate (dt) {
	
}
