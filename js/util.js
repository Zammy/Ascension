function realToMapPos(realPos) {
	return {x : Math.floor(realPos.x/ TILE_WIDTH), y : Math.floor(realPos.y / TILE_HEIGHT) };
}

function mapToRealPos(mapPos) {
	return {x : mapPos.x * TILE_WIDTH + TILE_WIDTH *2 , y : mapPos.y * TILE_HEIGHT + TILE_HEIGHT *2 };
}

function pointSubtract(a, b) {
	return { x : a.x - b.x, y : a.y - b.y} ;
}

function pointAdd(a, b) {
	a.x += b.x;
	a.y += b.y;
}

function sqrVecLenght(a) {
	return a.x*a.x + a.y*a.y;
}