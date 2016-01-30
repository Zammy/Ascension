function addMouseHandler() {
	$("canvas").on("mousedown", function(event) {
		playerClickedOn( realToMapPos({x: event.offsetX, y: event.offsetY}) );
	});
}