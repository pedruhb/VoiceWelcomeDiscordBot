const discordTTS = require('discord-tts');

module.exports = {
  run: async (client, msg, args) => {
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join()
      return new Promise((resolve, reject) => {
        const dispatcher = connection.play(discordTTS.getVoiceStream(msg.content.substring(4), { lang: "pt" }));
        dispatcher.setVolume(1)
        dispatcher.on('start', () => {
        })
        dispatcher.on('end', () => {
          resolve()
        })
        dispatcher.on('error', (error) => {
          console.error(error)
          reject(error)
        })
      })
    }
    else {
      msg.channel.send("Must be in a voice channel!")
    }
  },
  conf: {},
  help: {
    name: 'say',
    category: 'Admin',
    description: 'Faz o bot falar uma mensagem.',
    usage: 'say'
  }
}