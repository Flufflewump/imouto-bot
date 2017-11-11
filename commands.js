const fs = require("fs");
var voiceConnection = null;

module.exports = {
    "ping" : {
        run: function(message) {
            message.channel.send("pong!");
        },
        help: 'Replies with "pong!" for testing'
    },

    "ping2" : {
        run: function(message) {
            message.channel.send("pong2!");
        },
        help: "Second ping because one isn't enough"
    },

    "join" : {
        run: function(message) {
            if (message.member && message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then(function(connection) {
                        voiceConnection = connection;
                        voiceConnection.playFile('./sound/ohayou.wav');
                    })
            } else {
                message.reply("you need to be in a voice channel");
            }
        },
        help: "Join your voice channel"
    },

    "onii" : {
        run: function() {
            if (voiceConnection) {
                fs.readdir('./sound/onii', function(err, files) {
                    voiceConnection.playFile('./sound/onii/' + files[Math.floor(Math.random()*files.length)]);
                });
            }
        },
        help: "Says 'Onii-chan'"
    }
};
