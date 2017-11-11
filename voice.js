var voiceConnection = null;

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

module.exports.play = play;
module.exports.setConnection = setConnection;
