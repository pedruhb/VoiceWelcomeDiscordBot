const Discord = require('discord.js')

module.exports = {

  async run(client, message, args) {
    if (!message.guild.me.hasPermission('ATTACH_FILES')) return message.channel.send('Eu preciso da permissão `enviar arquvios` para fazer isso!');
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const avatar = user.avatarURL({ dynamic: true, format: 'png', size: 1024 });
    const embed = new Discord.MessageEmbed()
      .setColor('#4cd8b2')
      .setTitle('Avatar carregado')
      .setDescription(`Avatar de ${user}`)
      .setImage(avatar);
    await message.channel.send(embed);
  },

  conf: {},
   help: {
    name: 'avatar',
    category: 'Info',
    description: 'Mostra o avatar de um usuário.',
    usage: 'avatar'
  }
}
