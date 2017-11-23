let voiceConnection = null;
let talkTimer = null;
const config = require("./config.json");

const fs = require("fs");
const path = require("path");

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

function playRandom(directory) {
    let fullPath = path.join(config.soundDir, directory);

    fs.readdir(fullPath, function(err, files) {
        if (files.length > 0) {
            play(path.join(fullPath, files[Math.floor(Math.random() * files.length)]));
        } else {
            // Empty directory, should probably give some kind of error message
        }
    });
}


// Messing with playing everything in a directory in order, saving which one was next
/*function inOrder() {
    if (voiceConnection.speaking) {
        return;
    }

    fs.readFile(config.soundDir + "stuff/next", function (err, data) {
        if (err) {
            throw err;
        }
        fs.readdir(config.soundDir + "stuff/", function(err, files) {
            play(config.soundDir + "stuff/" + files[parseInt(data)]);
            fs.writeFile(config.soundDir +"stuff/next", (parseInt(data) + 1) % files.length);
        });

    });
}*/

function spam(directory) {
    talkTimer = setInterval( () => {
        if (!voiceConnection.speaking) {
            playRandom(directory);
        }
    }, 100);
}

function stop() {
    clearInterval(talkTimer);
}

function getChannel() {
    return voiceConnection.channel;
}

module.exports.play = play;
module.exports.playRandom = playRandom;
module.exports.spam = spam;
module.exports.stop = stop;
module.exports.setConnection = setConnection;
module.exports.getChannel = getChannel;