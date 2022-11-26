const fs = require("fs");
const {Collection ,REST, Routes, Events } = require('discord.js');
const getFiles = require("./get-files")
require('dotenv/config')


module.exports = async (client) => {
    client.commands = new Collection()
    const commands = []
    const suffix = '.js'
    const cmdFiles = getFiles('./commands', suffix)
    
    for (const command of cmdFiles) {
        let commandFile = require(command)
        if (commandFile.default) commandFile = commandFile.default
        const split = command.replace(/\\/g, '/').split('/')
        const commandName = split[split.length - 1].replace(suffix, '')
        if ("data" in commandFile && 'execute' in commandFile){
            commands.push(commandFile.data.toJSON())
     
            // Honestly have no idea why this is here but it was in the documentation and the program doesn't work without it. 
            // Perhaps the application checks to see if there is a matching command in the client?
            client.commands.set(commandFile.data.name, commandFile);
        }
    }

    
    // Register the commands in the actual bot
    const rest = new REST({ version: '10' }).setToken(process.env.token);

      (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
      
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
      })();
    

    client.on(Events.InteractionCreate, async interaction => {
        // Make sure that the interaction is indeed a slash command
        if (!interaction.isChatInputCommand()) return;

        // Attempt to fetch the command
        const command = interaction.client.commands.get(interaction.commandName);

        // If no matching command was found report an err
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error("Command could not be completed: " + err);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

}

