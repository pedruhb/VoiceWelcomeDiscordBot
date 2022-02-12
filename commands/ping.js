const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`🏓 | ${Math.floor(client.ws.ping).toFixed(0)}ms`)
    .setColor(0x00AE86)

    message.channel.send(embed)
  },

  conf: {},

   help: {
    name: 'ping',
    category: 'Info',
    description: 'Mostra a latencia do bot.',
    usage: 'ping'
  }
}
