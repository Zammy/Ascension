//Audio objects
var backgroundTrack = new Audio("sound/bg_music.mp3");
//Looping

backgroundTrack.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

backgroundTrack.volume = 0.4;

var mainTheme = new Audio("sound/theme.mp3");

mainTheme.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var spikesFX = new Audio("sound/spikes.mp3");

var stepsFX = new Audio("sound/footsteps_stones.mp3");

stepsFX.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var finalExplosion = new Audio("sound/final_explosion.mp3");

mainTheme.play();
