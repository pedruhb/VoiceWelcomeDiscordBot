require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core')
const discordTTS = require('discord-tts');

client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'x9 das call', type: "LISTENING" }, status: 'online' })
})

client.login(process.env.BOT_TOKEN)

client.on("message", async (msg) => {

    if (msg.author.bot) return

    if (msg.content == "!voicejoin") {
        if (!msg.member.voice.channel) {
            msg.channel.send("Must be in a voice channel!")
        }
        else {
            msg.member.voice.channel.join()
        }
    }

    if (msg.content == "!voiceleave") {
        if (msg.member.voice.channel !== null) {
            msg.member.voice.channel.leave()
        }
    }

    if (msg.content.includes("!voiceplay ")) {
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join()
            playFileYoutube(connection, msg.content.substring(9))
        }
        else {
            msg.channel.send("Must be in a voice channel!")
        }
    }

    if (msg.content.includes("!voicestop")) {
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join()
            await playFile(connection, 'quiet.mp3')
        }
    }

    if (msg.content.includes("!say ")) {
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
    }
})

client.on('voiceStateUpdate', async (oldPresence, newPresence) => {
    if (oldPresence.channelID === null) {
        const member = newPresence.member;
        if (member.user.bot) return;
        if (member.voice.channel) {
            var name_user = member.nickname;
            if (!name_user)
                name_user = member.user.username;
            const connection = await member.voice.channel.join()
            return new Promise((resolve, reject) => {
                const dispatcher = connection.play(discordTTS.getVoiceStream(`${name_user} entrou na cau!`, { lang: "pt" }));
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
    } else if (newPresence.channelID === null) {
        const member = oldPresence.member;
        if (member.user.bot) return;
        const connection = await oldPresence.guild.channels.cache.get(oldPresence.channelID).join()
        var name_user = member.nickname;
        if (!name_user)
            name_user = member.user.username;
        return new Promise((resolve, reject) => {
            const dispatcher = connection.play(discordTTS.getVoiceStream(`${name_user} saiu da cau!`, { lang: "pt" }));
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
})

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
