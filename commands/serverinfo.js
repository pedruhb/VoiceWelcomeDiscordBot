/**
 * O Comando "serverinfo" mostrará informações do servidor
 */

const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')
module.exports = {
  run: function (client, message, args) {
    const date = message.guild.createdAt
    const joined = message.member.joinedAt
    const region = {
      brazil: ':flag_br: Brasil'
    }
    const embed = new Discord.MessageEmbed()
      .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
      // .setThumbnail(message.guild.iconURL)
      .setAuthor('🔍 Informações do servidor')
      .addField('**Nome**', message.guild.name, true)
      .addField('**ID**', message.guild.id, true)
      //.addField('**Dono(a)**', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
      .addField('**Região**', region[message.guild.region], true)
      //.addField('**Humanos | Bots**', `${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`)
      //.addField('**Canais**', message.guild.channels.size, true)
      //.addField('**Cargos**', message.guild.roles.size, true)
      .addField('**Criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
      .addField('**Você entrou em**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined))
      .setTimestamp()
    message.channel.send(embed)
  },
  conf: {},
	 help: {
    name: 'serverinfo',
    category: 'info',
    description: 'Informação sobre o servidor.',
    usage: 'serverinfo'
  }
}
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}