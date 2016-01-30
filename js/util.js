function realToMapPos(realPos) {
	return {x : Math.round(realPos.x/ TILE_WIDTH), y : Math.round(realPos.y / TILE_HEIGHT) };
}

function mapToRealPos(mapPos) {
	return {x : mapPos.x * TILE_WIDTH, y : mapPos.y * TILE_HEIGHT };
}

function pointSubtract(a, b) {
	return { x : a.x - b.x, y : a.y - b.y} ;
}
