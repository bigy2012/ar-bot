const { REST, Routes, Collection, Client, IntentsBitField } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const commandsPath = path.join(__dirname, './commands/');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, './events/');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});
client.commands = new Collection();
const commands = [];


for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        delete require.cache[require.resolve(`./commands/${file}`)];
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data);
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.SERVER_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

for (const file of eventFiles) {
    console.log(file)
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        delete require.cache[require.resolve(`./events/${file}`)];
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        delete require.cache[require.resolve(`./events/${file}`)];
        client.on(event.name, (...args) => event.execute(...args));
    }
}



