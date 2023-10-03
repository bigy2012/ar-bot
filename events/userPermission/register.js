const { Client, Message, EmbedBuilder } = require('discord.js');
const Users = require('../../models/userModels/Users');


/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async (client, interaction) => {
    try {

        const query = {
            userId: interaction.user.id,
        }

        const users = await Users.findOne(query);

        if (users) {
            users.fname = interaction.options.get('first_name').value;
            users.lname = interaction.options.get('last_name').value;
            users.age = interaction.options.get('age').value;

            await users.save()
                .then(() => {
                    const setTime = new EmbedBuilder()
                        .setTitle('การบันทึกข้อมูล')
                        .setDescription('บันทึกข้อมูลสำเร็จ');

                    interaction.reply({ embeds: [setTime] });
                })
                .catch((err) => {
                    console.log(err);
                });

        } else {
            const result = new Users({
                userId: interaction.user.id,
                fname: interaction.options.get('first_name').value,
                lname: interaction.options.get('last_name').value,
                age: interaction.options.get('age').value,
                date_added: Date()
            });

            await result.save();

            if (result) {
                const setTime = new EmbedBuilder()
                    .setTitle('การบันทึกข้อมูล')
                    .setDescription('สมัครสมาชิกสำเร็จ');

                interaction.reply({ embeds: [setTime] });
            }

        }
    } catch (error) {
        console.log(`Error saving: ${error.message}`);
    }
}



