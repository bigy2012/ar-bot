const { Client, Message, EmbedBuilder } = require('discord.js');
const Delete = require('../../models/Delete');


/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async (client, interaction) => {
    try {
        const channel = interaction.channel;

        const fetched = await channel.messages.fetch({ limit: 100 });
        if (fetched.size > 0) {
            await channel.bulkDelete(fetched, true);

            const result = new Delete({
                userId: interaction.user.id,
                title: "Delete",
                // title: interaction.options.get('title').value,
                date_added: Date(),
                date_updated: Date()
            });

            await result.save();

            const setTime = new EmbedBuilder()
                .setTitle('การบันทึกข้อมูล')
                .setDescription('ลบข้อความออกแล้ว');

            interaction.reply({ embeds: [setTime] });

        }
    } catch (error) {
        console.log(`Error saving: ${error.message}`);
    }
}



