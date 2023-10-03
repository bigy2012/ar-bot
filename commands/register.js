const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    data: {
        name: 'register',
        description: 'Register Now',
        options: [
            {
                name: 'first_name',
                description: 'First Name',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'last_name',
                description: 'Last Name',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'age',
                description: 'Age',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
        ]
    },
    execute: null
}