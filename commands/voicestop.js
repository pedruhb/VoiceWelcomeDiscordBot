const discordTTS = require('discord-tts');

module.exports = {
  run: async (client, msg, args) => {
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join()
      await playFile(connection, 'quiet.mp3')
    }
  },
  conf: {},
  help: {
    name: 'voicestop',
    category: '',
    description: 'Para de reproduzir.',
    usage: 'voicestop'
  }
}

async function playFile(connection, filePath) {
  return new Promise((resolve, reject) => {
    const dispatcher = connection.play(filePath)
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

