function handleClick(x, y){
	if (!showingScroll){
		playerClickedOn( realToMapPos({x: x, y: y}) );
	} else {
		scrollSprite.visible = false;
		showingScroll = false;
	}
}

function addMouseHandler(){
	$("canvas").on("mousedown", function(event) {
		handleClick(event.offsetX, event.offsetY);
	});
	$("canvas").on("touchstart", function(event) {
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		handleClick(touch.clientX, touch.clientY);
	});
}