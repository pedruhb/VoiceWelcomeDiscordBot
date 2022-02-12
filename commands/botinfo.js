/**
 * O Comando "botinfo"mostrará informações do bot
 */

const Discord = require('discord.js')
const moment = require('moment')
let os = require('os')

moment.locale('pt-br')

module.exports = {

  run: function (client, message, args) {
    const inline = true
    const botAvatar = client.user.displayAvatarURL
    const userName = client.user.username
    const status = {
      online: '`🟢` Online',
      offline: '`⚫` Offline'
    }

    function bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };

    const embed = new Discord.MessageEmbed()
      .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
      .setThumbnail(botAvatar)
      .setAuthor('🤖 Minhas informações 🤖')
      .addField('**Nome**', userName)
      .addField('**Uptime**', moment().to(client.startTime, true))
      .addField('**Sistema**', os.type() + " " + os.arch())
      .addField('**Uso de RAM**', `${bytesToSize((process.memoryUsage().heapUsed).toFixed(2))} de ${bytesToSize((os.totalmem()).toFixed(2))}`)
      .setFooter(`${client.user.username}.`)
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        '**Status**',
        `${status[client.user.presence.status]}`,
        inline,
        true
      )
    }

    message.channel.send(embed)
  },
  conf: {},
  help: {
    name: 'botinfo',
    category: 'Info',
    description: 'Mostra as informações do bot.',
    usage: 'botinfo'
  }
}
