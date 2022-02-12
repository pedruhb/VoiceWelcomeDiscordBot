/**
 * O Comando "serverinfo" mostrará informações do servidor
 */

const Discord = require('discord.js')
var request = require("request")

module.exports = {
  run: function (client, message, args) {
    var url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,BTC-USD";
    request({
      url: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const embed = new Discord.MessageEmbed()
          .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
          .setAuthor('💸 Cotações 💸')
          .setTimestamp();
        for (var k in body) {
          embed.fields.push({
            name: `**${body[k].name}**`,
            value: `*${body[k].bid} ${String(body[k].name).split("/")[1]}*`,
            inline: false
          })
        }
        message.channel.send(embed)
      } else {
        message.channel.send("Erro ao obter dados da API.");
      }
    })
  },
  conf: {},
  help: {
    name: 'moedas',
    category: '',
    description: 'Obtém cotação de algumas moedas.',
    usage: 'moedas'
  }
}