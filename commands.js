const booru = require("booru");
const voice = require("./voice.js");

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
                        voice.setConnection(connection);
                        voice.play('./sound/ohayou.wav');
                    })
            } else {
                message.reply("you need to be in a voice channel");
            }
        },
        help: "Joins your voice channel"
    },

    "say" : {
        run: function(message, args) {
            if (args.length === 0) {
                message.reply("I need a directory to play from!");
            } else {
                voice.playRandom(args[0]);
            }
        },
        help: "Plays a random sound file from a directory."
    },

    "spam" : {
        run: function(message, args) {
            if (args.length === 0) {
                message.reply("I need a directory to play from!");
            } else {
                voice.spam(args[0]);
            }
        },
        help: "Says stuff forever"
    },

    "stop" : {
        run: function() {
            voice.stop();
        },
        help: "stops saying stuff"
    },

    "booru" : {
        run: function(message, args) {
            if (args.length === 0) {
                message.reply("I need a site to search");
                return;
            }

            const site = args.shift().toLowerCase();

            if (!booru.resolveSite(site)) {
                message.reply("I don't know that site");
            }

            // Get rid of things that would break Discord rules
            args.push('-loli', '-shota');

            booru.search(site, args, {random:true}).then(booru.commonfy).then(function(images) {
                const indexPage = "http://" + booru.resolveSite(site) + "/index.php?page=post&s=view&id=" + images[0].common.id;
                message.channel.send({
                    "embed": {
                        "title": indexPage,
                        "url": indexPage,
                        "image": {
                            "url": images[0].common.file_url
                        }
                    }
                });
            }).catch(function(err) {
                if (err.name === 'booruError') {
                    console.log(err.message);
                    if (err.message === "You didn't give any images") {
                        message.reply("I didn't find any images!");
                    }
                } else {
                    console.log(err);
                }
            })
        },
        help: "Gives a random image from a booru matching the given tags. Usage: booru [site] [tags]"
    }
};
