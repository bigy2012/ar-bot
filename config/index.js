const mongoose = require('mongoose');
require('dotenv').config();


module.exports = async (client) => {

    
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_DB_CONNECT, { keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true });

    client.on('ready', async function () {
        console.log(`${client.user.tag} is online`);
    })
    console.log('connect to the DB')
}
