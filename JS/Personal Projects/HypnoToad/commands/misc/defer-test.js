const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("defer")
    .setDescription("Replies with pong"), 
    async execute(interaction, client) {
        await interaction.deferReply();
        await wait(5000)
        await interaction.editReply({content: "Huh? Were you talking to me? Sorry!"})
        await wait(1500)
        await interaction.editReply({content: "Pong!"})
        
    }
}