require('dotenv').config()
const discordTTS = require('discord-tts');
const Discord = require('discord.js')
const client = new Discord.Client()
const { readdirSync } = require('fs')
const cmdFiles = readdirSync('./commands/')
const Enmap = require('enmap')
client.commands = new Enmap()
client.startTime = Date.now()

console.log('\u001b[33m [INFO]', `\u001b[32mIniciando o CyanBot \u001b[31mv1.0`)
console.log('\u001b[33m [INFO]', `\u001b[32mCarregando o total de \u001b[31m${cmdFiles.length} \u001b[32mcomandos.`)

cmdFiles.forEach(f => {
    try {
        const props = require(`./commands/${f}`)
        if (f.split('.').slice(-1)[0] !== 'js') return;
        //console.log('\u001b[33m [INFO]', `\u001b[32mCarregando o comando \u001b[0m\u001b[31m${props.help.name}\u001b[0m`)
        if (props.init) props.init(client)
        client.commands.set(props.help.name, props)
        if (props.help.aliases) {
            props.alias = true
            props.help.aliases.forEach(alias => client.commands.set(alias, props))
        }
    } catch (e) {
        console.log('\u001b[31m [ERRO]', `\u001b[32mImpossível carregar o ocmando \u001b[0m\u001b[31m${f}: ${e}\u001b[0m`)
    }
})

client.login(process.env.BOT_TOKEN)

client.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.content.indexOf(`${process.env.PREFIX}`) !== 0) return;
    const args = msg.content.slice(`${process.env.PREFIX}`.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    if (cmd.conf.onlyguilds && !msg.guild) return;
    cmd.run(client, msg, args);
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


client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'x9 das call', type: "LISTENING" }, status: 'online' })
    console.log('\u001b[33m [INFO]', `\u001b[32mBot iniciado com sucesso! \u001b[0m\u001b`)
})