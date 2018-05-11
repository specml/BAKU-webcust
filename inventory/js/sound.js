function beepSuccess() {
    $('<audio id="beepSuccess"><source src="sound/success.mp3" type="audio/mpeg"></audio>').appendTo('body');
    $('#beepSuccess')[0].play();
}
function beepError() {
    $('<audio id="beepError"><source src="sound/error.mp3" type="audio/mpeg"></audio>').appendTo('body');
    $('#beepError')[0].play();
}
function beepBell() {
    //$('#beepBell')[0].play();
}
