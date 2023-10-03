const path = require('path');
const getAllFiles = require("../utils/getAllFiles")


module.exports = (exceptions) => {
    let localCommands = [];


    const commandCatergories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    );

    for(const commandCatergory of commandCatergories){
        const commandFiles = getAllFiles(commandCatergory);

        for(commandFile of commandFiles){
            const commandObjects = require(commandFile);

            // if(exceptions.includes(commandObjects.name)){
            //     continue;
            // }

            localCommands.push(commandObjects);
        }

    }


    return localCommands;

}