function valid_coords(x, y){
	if ((x>=0)&&(y>=0)&&(y<state.currentLevel.length)&&(x<state.currentLevel[y].length)){
		var tiles = state.currentLevel[y][x];
		if (!(tiles.constructor === Array)){
			tiles = [tiles];
		}
		var pass = true;
		for (var i=0; i < tiles.length; ++i) {
			if (!tiles[i].passable){
				pass = false;
				break;
			}
		}
		return pass;
	} else {
		return false;
	}
}

var explore_movements = [[1,0],[0,1],[-1,0],[0,-1]];

function find_path(startX, startY, endX, endY) {
	// Survey the currentLevel
	console.log(startX+","+startY+" -> "+endX+","+endY);
	var passable = [];
	var dist = []
	var max_int = 999999;
	var currentLevel = state.currentLevel;
	for (var y = 0; y < currentLevel.length; y++) {
		passable[y] = [];
		dist[y] = [];
		for (var x = 0; x < currentLevel[y].length; x++) {
			var tiles = currentLevel[y][x];
			if (!(tiles.constructor === Array)){
				tiles = [tiles];
			}
			var pass = true;
			for (var i=0; i < tiles.length; ++i) {
				if (!tiles[i].passable){
					pass = false;
					break;
				}
			}
			passable[y].push(pass);
			dist[y].push(max_int);
		};
	};
	//console.log("passable:");
	//console.log(JSON.stringify(passable));
	// Find a path
	var moveX = startX;
	var moveY = startY;
	var queue = [[startX, startY]];
	dist[startY][startX] = 0;
	var path_found = false;
	for (var i=0; i<queue.length; ++i){
		coords = queue[i];
		if ((coords[0] == endX) && (coords[1] == endY)){
			path_found = true;
			break;
		} else {
			for (var j=0; j<explore_movements.length; ++j){
				var newX = coords[0] + explore_movements[j][0];
				var newY = coords[1] + explore_movements[j][1];
				if (valid_coords(newX, newY) && passable[newY][newX]){
					if (dist[newY][newX] > (dist[coords[1]][coords[0]] + 1)){
						dist[newY][newX] = (dist[coords[1]][coords[0]] + 1);
						queue.push([newX, newY]);
					}
				}
			}
		}
	}
	//console.log("dist:")
	// console.log(JSON.stringify(dist));
	// Construct the way back, if a path is found
	if (path_found) {
		//console.log("Distance: "+dist[endY][endX]);
		
		var reverse = [[endX, endY]];
		for (var i=0; i<reverse.length; ++i){
			var x = reverse[i][0];
			var y = reverse[i][1];
			if (dist[y][x]==0){
				break;
			} else {
				for (var j=0; j<explore_movements.length; ++j){
					var newX = x + explore_movements[j][0];
					var newY = y + explore_movements[j][1];
					if (valid_coords(newX, newY)){
						if (dist[newY][newX] ==(dist[y][x] - 1)){
							reverse.push([newX, newY]);
							break;
						}
					}
				}
			}
		}
		console.log("Reverse path: "+JSON.stringify(reverse));
		if (reverse.length > 1){
			moveX = reverse[reverse.length-2][0];
			moveY = reverse[reverse.length-2][1];
		}
	}
	//console.log("Move to: "+moveX+", "+moveY);
	return {x: moveX, y: moveY, dist: dist[endY][endX]};
}