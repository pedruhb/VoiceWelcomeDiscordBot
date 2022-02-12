const discordTTS = require('discord-tts');

module.exports = {
  run: async (client, msg, args) => {
    if (!msg.member.voice.channel) {
      msg.channel.send("Must be in a voice channel!")
    }
    else {
      msg.member.voice.channel.join()
    }
  },
  conf: {},
  help: {
    name: 'voicejoin',
    category: '',
    description: 'Entra no canal de voz.',
    usage: 'voicejoin'
  }
}