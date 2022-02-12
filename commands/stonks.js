const Discord = require('discord.js')
const Canvas = require('canvas');
module.exports = {
  async run(client, message, args) {
    if (!message.guild.me.hasPermission('ATTACH_FILES')) return message.reply('Eu preciso da permissão `enviar arquvios` para fazer isso!');
    const canvas = Canvas.createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    const sayMessage = args.join(' ');
    if (!sayMessage) return message.reply('digite algo antes');
    if (sayMessage.length > 33) return message.reply("digite até 35 caractéres")
    message.channel.startTyping();
    const background = await Canvas.loadImage('./assets/images/stonks.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(`${sayMessage}`, canvas.width / 15.5, canvas.height / 13.5);
    ctx.beginPath();
    ctx.arc(125, 125, 100, 6, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'stonks.png');
    message.channel.stopTyping();
    message.reply(attachment);
  },
  conf: {},
  help: {
    name: 'stonks',
    category: 'Info',
    description: 'Cria um meme stonks.',
    usage: 'stonks'
  }
}