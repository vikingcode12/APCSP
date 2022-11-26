const fs = require("fs");
const { Collection, Events, REST, Routes } = require("discord.js")
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
        if (commandFile.data){
             commands.push(commandFile.data.toJSON())
     
             // Honestly have no idea why this is here but it was in the documentation and the program doesn't work without it. 
             // Perhaps the application checks to see if there is a matching command in the client?
             client.commands.set(commandFile.data.name, commandFile);
        }
    }

    // Set the commands in the actual bot
    client.application.commands.set(commands)

    console.log(`Updated ${commands.length} '/' command(s)`)
    

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

    // This works for text based commands but / commands are becoming more popular and pushed by discord so I will rewrite one that works for / commands
    // client.on('messageCreate', (message) => {
    //     if(message.author.bot || !message.content.startsWith('!')) return
    //     const args = message.content.slice(1).split(/ +/)
    //     const commandName = args.shift().toLowerCase()

    //     if(!commands[commandName]) return

    //     try {
    //         commands[commandName].callback(message, ...args)
    //     }
    //     catch (err){
    //         console.error(err)
    //     }
    // })
}

