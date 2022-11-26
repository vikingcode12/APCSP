const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"), 
    async execute(interaction, client) {
        await interaction.reply({content: `Pong! ${Date.now() - interaction.createdTimestamp}ms`});
        
    }
}