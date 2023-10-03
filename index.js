const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const Config = require('./config/index');

const eventTimeSet = require('./events/timeSet/timeSet');
const eventDel = require('./events/control/del');
const eventRegister = require('./events/userPermission/register');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});



(async () => {
    try {
        Config(client);

        client.on('interactionCreate', async interaction => {
            if (!interaction.isChatInputCommand()) return;

            if (interaction.commandName === 'time') {
                eventTimeSet(client, interaction);
            }

            if (interaction.commandName === 'del') {
                eventDel(client, interaction);
            }

            if (interaction.commandName === 'register') {
                eventRegister(client, interaction);
            }
        });

        client.login(process.env.DISCORD_TOKEN);

    } catch (error) {
        console.log(`Error processing command: ${error.message}.`)
    }
})();





