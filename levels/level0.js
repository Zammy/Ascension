levels[0] = 
{
	"player" : { "x" : 1, "y" : 1},
	"guards" :
	[
		{
			"x" : 16, 
			"y" : 10, 
			"dir" : "w",
			"routine" : [
				["walk", 1, 10],
				["dir", "n"],
				["wait", 1000],
				["walk", 1, 5],
				["dir", "e"],
				["wait", 250],
				["walk", 19, 5],
				["dir", "s"],
				["wait", 500],
				["dir", "w"],
				["wait", 500],
				["dir", "n"],
				["wait", 250],
				["walk", 19, 1],
				["dir", "w"],
				["wait", 500],
				["dir", "s"],
				["wait", 250],
				["walk", 19, 11],
				["dir", "w"],
				["wait", 250],
				["dir", "n"],
				["wait", 1000],
				["dir", "w"]
				["wait", 250],
				["walk", 16, 10]
			]}
	],
	"map" :
	[
		[ "w", "w" , "a", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "w", "w"],
		[ "w", "o" , "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "w"],
		[ "w", "o" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "w"],
		[ "w", "o" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "o", "w"],
		[ "w", "o" , "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o" , "o", "o", "o", "w"],
		[ "w", "w" , "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w" , "w", "w", "w", "w"]
	],
	"defenition" : 
	{
		"w" : { "type" : "wall", "sprite" : "wall.png" , "passable" : false },
		"o" : { "type" : "floor", "sprite" : "floor.png" , "passable" : true },
		"a" : 
		{
			"type" : "altar", 
			"passable" : false,
			"sprites" : {
				"notVisited" : "altar.png",
				"visited" : "altar_visited.png"
			}
		}
	}
};