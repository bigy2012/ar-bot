const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    data: {
        name: 'time',
        description: 'Time Saved',
        options: [
            {
                name: 'text',
                description: 'Text Note.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    execute: null
}