const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const commands = require("./commands.js");
const voice = require("./voice.js");

client.on("ready", function() {
    if (process.env.DEFAULT_GUILD && process.env.DEFAULT_VOICE) {
        const guild = client.guilds.find("name", process.env.DEFAULT_GUILD);
        const voiceChannel = guild.channels.find("name", process.env.DEFAULT_VOICE);
        voiceChannel.join().then(function (connection) {
           voice.setConnection(connection);
        });
    }

    console.log("IMOUTO-BOT 3000 IS READY");
});

client.on("message", function(message) {

    // Ignore bot messages to avoid botception
    if(message.author.bot) return;

    // Ignore non-prefix messages
    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let name;

    // help command with no arguments lists all commands, with an argument it gives help for the given command
    if (command === "help") {
        if (args.length === 0) {
            let commandList = "";
            for (name in commands) {
                commandList += config.prefix + name + " ";
            }
            message.channel.send("Commands: " + commandList);
        } else {
            if (commands.hasOwnProperty(args[0])) {
                message.channel.send(config.prefix + args[0] + ": " + commands[args[0]].help);
            } else {
                message.channel.send("Unknown command.");
            }
        }
        return;
    }

    // Find the command in commands.js and run it
    for (name in commands) {
        if (command === name) {
            commands[command].run(message, args);
        }
    }
});

client.on("voiceStateUpdate", function(oldMember, newMember) {

    // Ignore self
    if (newMember.user.id !== client.user.id) {

        // Check if the member moved to a channel the bot is in (only one channel for now - may change later)
        if (voice.getChannel().id === newMember.voiceChannelID
            && newMember.voiceChannelID !== oldMember.voiceChannelID) {
            voice.playRandom('welcome');
        }
    }
});


client.login(process.env.DISC_TOKEN);
