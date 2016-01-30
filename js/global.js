var state = null;
var renderer = null;
var stage = null;

var levels = [];
var TILE_HEIGHT = 64;
var TILE_WIDTH = 64;

var player = null;
var guards = null;

var gameStartTime = null;
var currentTime = null;

var STEP_TIME = Math.floor(1000/30);
var PLAYER_COMPLETE_MOVEMENT_MS = 1000;
var ZERO_EPS = 0.1;

var PLAYER_SPEED = 150;
var GUARD_SPEED = 100;

var PLAYER_ANIM_SCALE = 0.42;
var GUARD_ANIM_SCALE = 0.2;
