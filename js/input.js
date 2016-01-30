function addMouseHandler() {
	$("canvas").on("mousedown", function(event) {
	    playerGoTo( realToMapPos({x: event.offsetX, y: event.offsetY}) );
	});
}