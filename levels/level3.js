levels[3] = 
{
	"player" : { "x" : 0, "y" : 9},
	"guards" :
	[
		{
			"x" : 1, 
			"y" : 3, 
			"dir" : "e",
			"routine" : [
				["walk", 3, 3],
				["walk", 3, 5],
				["walk", 1, 5],
				["walk", 1, 3]
			]
		},
		{
			"x" : 6, 
			"y" : 4, 
			"dir" : "e",
			"routine" : [
				["walk", 9, 4],
				["walk", 9, 7],
				["walk", 6, 7],
				["walk", 6, 4]
			]
		},
		{
			"x" : 2, 
			"y" : 1, 
			"dir" : "e",
			"routine" : [
				["walk", 8, 1],
				["dir", "e"],
				["wait", 5000],
				["walk", 2, 1],
				["dir", "s"],
				["wait", 5000],
			]
		}
	],
	"map" :
	[												   //10
		[ "w", "w" , "w", "w", "w", "w", "w", "w", "w", "w", "a", "w", "w", "w", "w", "w" , "w", "w", "w", "w"],
		[ "w", "w" , "o", "o", "o", "o", "o", "o", "o", "s", "o", "s", "o", "s", "s", "s" , "s", "w", "w", "D"],
		[ "w", "w" , "o", "w", "o", "w", "o", "w", "w", "w", "o", "w", "o", "w", "w", "w" , "o", "o", "o", "o"],
		[ "w", "o" , "o", "o", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "w", "o", "o", "o", "o", "o", "o", "o", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "o", "o", "w", "w", "o", "w", "w", "o", "w", "w", "w", "o", "o", "o" , "s", "s", "s", "w"],
		[ "w", "w" , "o", "w", "w", "w", "o", "w", "w", "o", "w", "w", "w", "o", "w", "o" , "w", "w", "o", "w"],
		[ "w", "w" , "o", "w", "w", "w", "o", "o", "o", "o", "w", "w", "w", "o", "w", "o" , "o", "o", "o", "w"],
		[ "w", "w" , "o", "o", "o", "w", "w", "w", "w", "s", "w", "w", "w", "o", "w", "w" , "w", "w", "o", "w"],
		[ "o", "o" , "o", "w", "o", "w", "o", "o", "o", "o", "o", "o", "o", "o", "o", "w" , "w", "w", "w", "w"],
		[ "w", "o" , "w", "w", "o", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "w", "w"]
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
				"notVisited" : "altar-0.png",
				"visited" : "altar-4.png"
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
			"final" : true,
			"passable" : false,
			"sprites" : {
				"open" : "door-1.png",
				"close" : "door-0.png"
			}
		}
	}
};