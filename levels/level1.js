levels[1] = 
{
	"player" : { "x" : 2, "y" : 10},
	"guards" :
	[
		{
			"x" : 17, 
			"y" : 3,
			"dir" : "e",
			"routine" : [
				["walk", 19, 3],
				["walk", 19, 5],
				["walk", 17, 5],
				["walk", 17, 7],
				["walk", 19, 7],
				["walk", 17, 5],
				["walk", 17, 3]
			]
		},
		{
			"x" : 0, 
			"y" : 6,
			"dir" : "e",
			"routine" : [
				["walk", 0, 3],
				["walk", 4, 4],
				["walk", 4, 6],
				["walk", 0, 6]
			]
		},
		{
			"x" : 4, 
			"y" : 10,
			"dir" : "e",
			"routine" : [
				["walk", 11, 10],
				["walk", 4, 10]
			]
		},
		{
			"x" : 9, 
			"y" : 6,
			"dir" : "e",
			"routine" : [
				["walk", 9, 6],
				["walk", 14, 7],
				["dir", "e"],
				["wait", 3000]
			]
		}
	],
	"map" :
	[													//10
		[ "w", "w" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "w", "w"],
		[ "w", "o" , "w", "o", "o", "o", "w", "w", "w", "s", "o", "s", "o", "w", "o", "o" , "o", "o", "w", "w"],
		[ "w", "o" , "w", "w", "w", "o", "o", "o", "s", "o", "w", "w", "o", "w", "o", "w" , "o", "w", "w", "o"],
		[ "o", "o" , "o", "o", "w", "o", "w", "o", "w", "w", "w", "w", "o", "o", "o", "w" , "o", "o", "o", "o"],
		[ "o", "w" , "w", "o", "o", "o", "w", "o", "w", "o", "a", "w", "o", "w", "o", "w" , "w", "o", "w", "o"],
		[ "o", "w" , "w", "w", "o", "w", "w", "o", "w", "o", "w", "w", "o", "w", "w", "w" , "o", "o", "o", "o"],
		[ "o", "o" , "o", "o", "o", "o", "w", "o", "w", "o", "o", "o", "o", "o", "o", "w" , "w", "o", "w", "o"],
		[ "o", "w" , "w", "w", "o", "w", "w", "o", "w", "w", "w", "w", "w", "w", "o", "o" , "o", "o", "o", "o"],
		[ "o", "o" , "o", "w", "o", "o", "o", "o", "w", "o", "o", "o", "o", "w", "o", "w" , "w", "o", "w", "o"],
		[ "w", "w" , "o", "w", "w", "s", "w", "w", "w", "o", "w", "w", "o", "o", "o", "w" , "w", "o", "o", "s"],
		[ "w", "w" , "o", "w", "o", "o", "o", "o", "o", "o", "o", "o", "w", "w", "w", "w" , "w", "w", "w", "D"]
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
				"visited" : "altar-2.png"
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
				"open" : "door-0.png",
				"close" : "door-1.png"
			}
		}
	}
};