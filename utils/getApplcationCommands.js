module.exports = async (client, serverId) => {
    let applicationCommands;

    if (serverId) {
        const guild = await client.guilds.fetch(serverId);

        applicationCommands = guild.commands;
    } else {
        applicationCommands = await client.application.commands;
    }

    await applicationCommands.fetch();
    console.log(applicationCommands.cache.find((cmd) => cmd.name === name))
    return applicationCommands;
}