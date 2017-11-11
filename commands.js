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
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then(function(connection) {
                        voiceConnection = connection;
                        message.reply("joined channel");
                        voiceConnection.playFile('./sound/ohayou.wav');
                    })
            } else {
                message.reply("you need to be in a voice channel");
            }
        },
        help: "Join your voice channel"
    }
};
