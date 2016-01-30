function addMouseHandler() {
	$("canvas").on("mousedown", function(event) {
		playerClickedOn( realToMapPos({x: event.offsetX, y: event.offsetY}) );
	});
	$("canvas").on("touchstart", function(event) {
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		playerClickedOn( realToMapPos({x: touch.clientX, y: touch.clientY}) );
	});
}