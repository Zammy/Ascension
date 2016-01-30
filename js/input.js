function addMouseHandler() {
	$("canvas").on("mousedown", function(event) {
	    console.log(event.offsetX + " " + event.offsetY);
	});
}