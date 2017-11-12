var voiceConnection = null;
const fs = require("fs");

function setConnection(connection) {
    voiceConnection = connection;
}

function play(file) {
    if (voiceConnection) {
        voiceConnection.playFile(file);
    } else {
        console.log("No voice channel");
    }
}

function onii() {
    playRandom('./sound/onii/');
}

function welcome() {
    playRandom('./sound/welcome/');
}

function getChannel() {
    return voiceConnection.channel;
}

function playRandom(directory) {
    fs.readdir(directory, function(err, files) {
        play(directory + files[Math.floor(Math.random()*files.length)]);
    });
}

module.exports.play = play;
module.exports.onii = onii;
module.exports.setConnection = setConnection;
module.exports.getChannel = getChannel;
module.exports.welcome = welcome;