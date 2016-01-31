levels[0] = 
{
	"player" : { "x" : 0, "y" : 1},
	"guards" :
	[
		{
			"x" : 12, 
			"y" : 1, 
			"dir" : "e",
			"routine" : [
				["walk", 16, 2],
				["dir", "e"],
				["wait", 3000],
				["walk", 16, 4],
				["walk", 12, 3],
				["walk", 12, 1]
			]}
	],
	"map" :
	[
		[ "w", "w" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "w", "w"],
		[ "o", "o" , "R", "w", "o", "o", "s", "o", "o", "o", "w", "o", "o", "o", "o", "o" , "o", "w", "w", "a"],
		[ "w", "o" , "w", "w", "o", "w", "o", "w", "w", "o", "w", "w", "o", "w", "w", "w" , "o", "s", "o", "o"],
		[ "w", "o" , "o", "o", "o", "w", "o", "w", "w", "o", "o", "o", "o", "o", "o", "w" , "o", "w", "o", "w"],
		[ "o", "o" , "w", "w", "o", "w", "o", "o", "w", "w", "w", "o", "w", "w", "o", "o" , "o", "w", "o", "w"],
		[ "o", "w" , "o", "o", "o", "w", "w", "o", "o", "o", "w", "o", "w", "o", "o", "w" , "o", "w", "o", "w"],
		[ "o", "o" , "o", "w", "w", "w", "w", "o", "w", "s", "o", "o", "w", "o", "w", "w" , "w", "w", "w", "w"],
		[ "o", "w" , "w", "w", "o", "o", "o", "o", "w", "o", "w", "o", "w", "o", "w", "o" , "o", "o", "o", "w"],
		[ "o", "w" , "o", "o", "o", "w", "w", "w", "w", "o", "w", "o", "w", "o", "o", "s" , "w", "w", "o", "w"],
		[ "o", "s" , "o", "w", "o", "w", "o", "o", "o", "w", "w", "o", "w", "w", "w", "o" , "w", "D", "o", "w"],
		[ "w", "o" , "w", "w", "o", "o", "o", "w", "o", "o", "o", "o", "o", "o", "w", "o" , "o", "o", "o", "o"]
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
				"visited" : "altar-1.png"
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
		},
		"R" :
		{
			"type" : "scroll",
			"passable" : true,
			"sprites" :  {
				"scroll" : "scroll-item.png",
				"floor" : "ground1.png"
			}
		}
	}
};