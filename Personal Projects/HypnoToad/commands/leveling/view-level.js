const { sleep } = require("../../utilityClassesAndFunctions.js");
const lvls = require("../../level-sys/leveling-functions.js");
const {createCanvas, loadImage, registerFont} = require("canvas");
const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { fetchStatus } = require('../../level-sys/leveling-functions.js')

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
        await interaction.deferReply() // Need an await just incase the code finished before the reply is defered
        
        const userStatus = await fetchStatus(target.id, interaction.guildId) 
        if(!userStatus) return interaction.editReply({content:`Seems like ${target.tag} has not earned any xp so far.`})
        
        const lvl = userStatus.lvl
        const xp = userStatus.xp
        const nextLvl = userStatus.xpNeeded
        const rank = userStatus.place

        registerFont('fonts/AreaKilometer50.ttf', {
            family:'a AreaKilometer50',
        })

        
        const canvas = createCanvas(500, 150),
        cWidth = canvas.width,
        cHeight = canvas.height;
        const ctx = canvas.getContext('2d'),
        bar_width = 300;
        let bg,
        avatar;

        // Grab images
        bg = await loadImage('https://cdn.discordapp.com/attachments/649377254891323422/999805136039850104/bg.png')
        avatar = await loadImage(target.displayAvatarURL({extension:'png', dynamic:false}))
        
        //Background Image
        ctx.drawImage(bg, 0, 0, cWidth, cHeight);
        
        
        //Begin Drawing
        ctx.beginPath();
        ctx.arc(65, 80, 55, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.closePath();
        
        //XP Bar
        ctx.lineJoin = 'round';
        ctx.lineWidth = 35
        
        //shadow
        ctx.strokeStyle = '#C0C0C0'
        ctx.strokeRect(150, 126, bar_width, 0)
        
        //Empty
        ctx.strokeStyle = 'black'
        ctx.strokeRect(150, 125, bar_width, 0)
        
        //Filled Bar
        ctx.strokeStyle = '#333b66'
        ctx.strokeRect(150, 125, bar_width * xp / nextLvl, 0)
        
        //Text 
        ctx.font = '40px "a AreaKilometer50"';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        
        ctx.fillText(`RANK`, 250, 40, 75)
        ctx.fillText(`LEVEL`, 405, 40, 75)
        
        ctx.font = '40px Arial';
        ctx.fillText(`#${rank}`, 320, 40, 50)
        ctx.fillText(`${lvl}`, 465, 40, 50)
        
        ctx.font = '20px "a AreaKilometer50"';
        ctx.textAlign = 'left';
        ctx.fillText(`${target.tag}`, 147, 105, 200)
        
        ctx.textAlign = 'left';
        ctx.fillText(`${xp}/${nextLvl} XP`, 355, 105, 100)
        
        //Remove corners
        ctx.beginPath();
        ctx.arc(65, 80, 55, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip()
        
        //Draw Avatar
        ctx.drawImage(avatar, 10    , 25, 120, 110);
        
        const attachment = new AttachmentBuilder()
        .setFile(canvas.toBuffer(), "rank.png")

        interaction.editReply({
            files:[attachment]
        })
    }
}