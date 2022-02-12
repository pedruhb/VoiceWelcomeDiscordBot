const discordTTS = require('discord-tts');

module.exports = {
  run: async (client, msg, args) => {
    if (msg.member.voice.channel !== null) {
      msg.member.voice.channel.leave()
    }
  },
  conf: {},
  help: {
    name: 'voiceleave',
    category: '',
    description: 'Sai do canal de voz.',
    usage: 'voiceleave'
  }
}