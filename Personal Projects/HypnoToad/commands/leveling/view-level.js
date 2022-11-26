const util = require("../../utilityClassesAndFunctions.js");
const lvls = require("../../level-sys/leveling-functions.js");
const {createCanvas, loadImage, registerFont} = require("canvas");
const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Displays the user's current level")
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('The member to check level')
            .setRequired(false)),
    async execute(interaction, client) {
        const target = interaction.options.getMember('target')?.user || interaction.user // Grab the target.
        if(!target?.id) return interaction.reply({content: "Seems like this user doesn't exist or isn't in this server."});
        else if(target.bot) return interaction.reply({content: `Bot XP isn't tracked so ${target.tag} does not have an XP profile.`});
        return interaction.reply({content: `Placeholder`});
    }
}