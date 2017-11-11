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
    }
};
