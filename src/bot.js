const Discord = require('discord.js');
const fs = require('fs');


const { prefix } = require('./config.json');
const client = new Discord.Client();
// Set up discord to take commands from file
client.commands = new Discord.Collection();

// Get commands from directory
const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	let command = require(`${__dirname }/commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Verify we're all good to go!
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    const contents = message.content;
    // make sure the message is for the bot and not by a bot
    if (!contents.startsWith(prefix) || message.author.bot) return;

    // get command and arguments
    const args = contents.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
 
    // pass if command doesn't exist
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);


    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.reply('sorry, there\'s been and error, blame Alex!')
    }
});

client.login(process.env.DM_ASSISTANT_KEY);