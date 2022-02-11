require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

// https://discord.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=8

client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'x9 das call', type: "LISTENING" }, status: 'online' })
})

client.login(process.env.BOT_TOKEN)

client.on("message", async (msg) => {

    if (msg.author.bot) return;

    if (msg.content == "!voicejoin") {
        if (!msg.member.voice.channel) {
            msg.channel.send("Must be in a voice channel!");
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
                const dispatcher = connection.play("https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURI(msg.content.substring(4)) + "&tl=pt_BR&total=1&idx=0&textlen=3&client=tw-ob&prev=input");
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
            console.log(`${name_user} entrou no canal de voz!`);
            const connection = await member.voice.channel.join()
            return new Promise((resolve, reject) => {
                const dispatcher = connection.play("https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURI(name_user) + " entrou no canal de voz!&tl=pt_BR&total=1&idx=0&textlen=3&client=tw-ob&prev=input");
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
        console.log(`${name_user} saiu do canal de voz!`);
        return new Promise((resolve, reject) => {
            const dispatcher = connection.play("https://translate.google.com/translate_tts?ie=UTF-8&q=" + encodeURI(name_user) + " saiu do canal de voz!&tl=pt_BR&total=1&idx=0&textlen=3&client=tw-ob&prev=input");
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