levels[2] = 
{
	"player" : { "x" : 4, "y" : 4},
	"guards" :
	[
		{
			"x" : 16, 
			"y" : 3, 
			"dir" : "e",
			"routine" : [
				["walk", 16, 3],
				["walk", 16, 1],
				["walk", 19, 1],
				["walk", 19, 3]
			]
		},		
		{
			"x" : 12, 
			"y" : 2, 
			"dir" : "e",
			"routine" : [
				["walk", 12, 8],
				["dir", "w"],
				["wait", 3000],
				["walk", 12, 2]
			]
		},	
		{
			"x" : 0, 
			"y" : 10, 
			"dir" : "e",
			"routine" : [
				["walk", 4, 10],
				["dir", "n"],
				["wait", 3000],
				["walk", 0, 10]
			]
		},
	],
	"map" :
	[
		[ "w", "w" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "D", "w" , "w", "w", "w", "w"],
		[ "o", "o" , "o", "o", "o", "o", "o", "o", "o", "o", "w", "w", "w", "w", "o", "w" , "o", "o", "o", "o"],
		[ "w", "w" , "w", "w", "w", "s", "w", "w", "w", "o", "o", "o", "o", "w", "o", "w" , "o", "w", "w", "o"],
		[ "o", "w" , "o", "w", "w", "o", "o", "o", "w", "o", "w", "w", "o", "w", "o", "o" , "o", "o", "o", "o"],
		[ "o", "s" , "o", "w", "o", "o", "w", "o", "w", "o", "w", "o", "o", "w", "o", "w" , "w", "w", "w", "o"],
		[ "o", "w" , "o", "w", "w", "w", "w", "w", "w", "o", "w", "w", "o", "w", "o", "w" , "o", "o", "o", "s"],
		[ "o", "w" , "o", "o", "o", "o", "o", "o", "o", "o", "o", "w", "o", "w", "o", "w" , "o", "w", "w", "o"],
		[ "o", "w" , "o", "w", "o", "w", "w", "w", "w", "w", "w", "w", "o", "w", "w", "o" , "s", "w", "o", "o"],
		[ "o", "w" , "o", "w", "s", "o", "o", "w", "w", "o", "o", "o", "o", "w", "o", "s" , "w", "w", "w", "o"],
		[ "o", "w" , "w", "w", "o", "w", "o", "o", "o", "o", "w", "o", "w", "w", "o", "w" , "w", "s", "o", "o"],
		[ "o", "o" , "o", "o", "o", "w", "w", "w", "w", "o", "w", "o", "o", "o", "s", "o" , "w", "a", "w", "w"]
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
				"visited" : "altar-3.png"
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
				"open" : "door-1.png",
				"close" : "door-0.png"
			}
		}
	}
};