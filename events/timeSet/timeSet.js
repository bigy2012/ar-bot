const { Client, Message, EmbedBuilder } = require('discord.js');
const TimeSet = require('../../models/TimeSet');


/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async (client, interaction) => {
    try {
        const result = new TimeSet({
            userId: interaction.user.id,
            name: interaction.user.globalName,
            text: interaction.options.get('text').value,
            date_added: Date.now()
        });

        await result.save();

        if (result) {
            const setTime = new EmbedBuilder()
                .setTitle('การบันทึกข้อมูล')
                .setDescription('บันทึกค่าสำเร็จ')

            interaction.reply({ embeds: [setTime] });
        }

    } catch (error) {
        console.log(`Error saving: ${error.message}`);
    }
}