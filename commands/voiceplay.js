const discordTTS = require('discord-tts');
const ytdl = require('ytdl-core')

module.exports = {
  run: async (client, msg, args) => {
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join()
      playFileYoutube(connection, msg.content.substring(11))
    }
    else {
      msg.channel.send("Must be in a voice channel!")
    }
  },
  conf: {},
  help: {
    name: 'voiceplay',
    category: '',
    description: 'Toca uma música do youtube.',
    usage: 'voiceplay'
  }
}

async function playFileYoutube(connection, url) {
  return new Promise((resolve, reject) => {
    try {
      const dispatcher = connection.play(ytdl(url, { quality: 'highestaudio' }));
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
    } catch (e) {
      console.log(e);
    }
  })
}