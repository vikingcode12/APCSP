const {Client, GatewayIntentBits, ActivityType, EmbedBuilder} = require('discord.js')
const mongoose = require('mongoose')
const { addXP, checkLvl } = require('./level-sys/leveling-functions.js')
require('dotenv/config')

const levelingShema = require('./level-sys/leveling-sys-schema.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
  mongoose.connect(process.env.MONGODB, {
    keepAlive: true
  })

  let handler = require("./command-handler.js")
  if(handler.default) handler = handler.default

  handler(client)


  client.user.setPresence({
    activities: [{ name: `The Boot Screen`, type: ActivityType.Watching }],
    status: 'idle',
  });

    setTimeout(() => {
      client.user.setPresence({
        activities: [{ name: `House of Memories`, type: ActivityType.Listening }],
        status: 'dnd',
      });
    }, 15000)

})

// TO DO: Level system 
client.on('messageCreate', async (msg) => {
  if (!msg.guild || msg.author.bot) return;
  const userId = msg.author.id
  const guildId = msg.guildId
  await addXP(userId, guildId)
  let lvlStatus = await checkLvl(userId, guildId)
  if(lvlStatus?.newlvl) {
    const LvlEmbedTitle = 'Level Up!'
    const LvlEmbedDescription = `**Nice Job!** ${msg.author}, you just leveled up to level **${lvlStatus?.lvl}**!\nCongrats!`
    const LvlEmbedImg = 'https://c.tenor.com/ihS0L_QrTu8AAAAC/level-up.gif'

    const levelEmbed = new EmbedBuilder()
    .setTitle(LvlEmbedTitle)
    .setDescription(LvlEmbedDescription)
    .setImage(LvlEmbedImg)

    msg.channel.send({embeds: [levelEmbed]}).then((sendEmbed)=> {
        sendEmbed.react('🥳')
    }).catch((err) => console.log(err))
  }
  
})


client.login(process.env.token)