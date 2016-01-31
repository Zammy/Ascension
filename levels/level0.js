levels[0] = 
{
	"player" : { "x" : 0, "y" : 1},
	"guards" :
	[
		{
			"x" : 6, 
			"y" : 10, 
			"dir" : "w",
			"routine" : [
				["walk", 5, 10],
				["dir", "n"],
				["wait", 1000],
				["walk", 5, 7],
				["wait", 500],
				["dir", "e"],
				["wait", 250],
				["walk", 7, 7],
				["dir", "e"],
				["wait", 500]
				["walk", 4, 7],
				["dir", "n"],
				["wait", 500],
				["walk", 4, 8],
				["dir", "e"],
				["wait", 500],
				["walk", 4, 8],
				["dir", "e"],
				["wait", 500]
			]}
	],
	"map" :
	[
		[ "w", "w" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "w", "w"],
		[ "o", "o" , "o", "w", "o", "o", "o", "o", "o", "o", "w", "o", "o", "o", "o", "o" , "o", "w", "w", "a"],
		[ "w", "o" , "w", "w", "o", "w", "o", "w", "w", "o", "w", "w", "o", "w", "w", "w" , "o", "o", "o", "o"],
		[ "w", "o" , "o", "o", "o", "w", "o", "w", "w", "o", "o", "o", "o", "o", "o", "w" , "o", "w", "o", "w"],
		[ "o", "o" , "w", "w", "o", "w", "o", "o", "w", "w", "w", "o", "w", "w", "o", "o" , "o", "w", "o", "w"],
		[ "o", "w" , "o", "o", "o", "w", "w", "o", "o", "o", "w", "o", "w", "o", "o", "w" , "o", "w", "o", "w"],
		[ "o", "o" , "o", "w", "w", "w", "w", "o", "w", "o", "o", "o", "w", "o", "w", "w" , "w", "w", "w", "w"],
		[ "o", "w" , "w", "w", "o", "o", "o", "o", "w", "o", "w", "o", "w", "o", "w", "o" , "o", "o", "o", "w"],
		[ "o", "w" , "o", "o", "o", "w", "w", "w", "w", "o", "w", "o", "w", "o", "o", "o" , "w", "w", "o", "w"],
		[ "o", "s" , "o", "w", "o", "w", "o", "o", "o", "w", "w", "o", "w", "w", "w", "o" , "w", "w", "o", "D"],
		[ "w", "o" , "w", "w", "o", "o", "o", "w", "o", "o", "o", "o", "o", "o", "w", "o" , "o", "o", "o", "w"]
	],
	"defenition" : 
	{
		"w" : { "type" : "wall", "sprite" : "wall1.png" , "passable" : false },
		"o" : { "type" : "floor", "sprite" : "ground1.png" , "passable" : true },
		"a" : 
		{
			"type" : "altar", 
			"passable" : false,
			"sprites" : {
				"notVisited" : "altar.png",
				"visited" : "altar_visited.png"
			}
		},
		"s" :
		{
			"type" : "spikes",
			"passable" : true,
			"sprites" : {
				"floor" : "ground2.png",
				"hidden" : "bloodyTrap-00.png",
				"shown" : "bloodyTrap-01.png"
				}
   
		},
		"D" :
		{
			"type" : "door",
			"passable" : false,
			"sprites" : {
				"open" : "door_open.png",
				"close" : "door_close.png"
			}
		}
	}
};