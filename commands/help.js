/**
 * O Comando "serverinfo" mostrará informações do servidor
 */

const Discord = require('discord.js')

module.exports = {
  run: function (client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
      .setAuthor('🔍 Comandos disponíveis')
      .setTimestamp();
    let commands = client.commands
    commands.forEach(command => {
      if (command.alias) return
      embed.fields.push({
        name: `**${process.env.PREFIX}${command.help.name}**`,
        value: `*Descrição*: ${command.help.description}`
      })
    })
    message.channel.send(embed)
  },
  conf: {},
  help: {
    name: 'help',
    category: '',
    description: 'Ajuda',
    usage: 'help'
  }
}
