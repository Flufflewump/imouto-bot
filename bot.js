const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const commands = require("./commands.js");

client.on("ready", function() {
    console.log("IMOUTO-BOT 3000 IS READY");
});

client.on("message", function(message) {

    // Ignore bot messages to avoid botception
    if(message.author.bot) return;

    // Ignore non-prefix messages
    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    var name;

    // help command with no arguments lists all commands, with an argument it gives help for the given command
    if (command === "help") {
        if (args.length === 0) {
            var commandList = "";
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

client.login(config.token);
