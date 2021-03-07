/* eslint-disable no-unused-vars */
const { create, Client } = require('@open-wa/wa-automate')
const { color, options } = require('./tools')
const { ind, eng } = require('./message/text/lang/')
const { loader } = require('./function')
const figlet = require('figlet')
const msgHandler = require('./message/geps')
const canvas = require('discord-canvas')
const config = require('./config.json')
const ownerNumber = config.ownerBot
const fs = require('fs-extra')
const { groupLimit, memberLimit } = require('./database/bot/setting.json')

const start = (geps = new Client()) => {
    console.log(color(figlet.textSync('--------------', 'Larry 3D'), 'green'))
    console.log(color(figlet.textSync(' DarkChat-BOT', 'Larry 3D'), 'red'))
    console.log(color(figlet.textSync('--------------', 'Larry 3D'), 'green'))
    console.log(color('=> Bot successfully loaded! Database:', 'green'), color(loader.getAllDirFiles('./database').length), color('Library:', 'yellow'), color(loader.getAllDirFiles('./lib').length), color('Function:', 'yellow'), color(loader.getAllDirFiles('./function').length))
    console.log(color('[MrG3P5]', 'cyan'), color('DarkChat-BOT is online now!', 'green'))
    console.log(color('[DEV]', 'cyan'), color('Welcome back, MrG3P5! Hope you are doing well~', 'green'))
    
    loader.nocache('../message/geps.js', m => console.log(color('[WATCH]', 'cyan'), color(`~> '${m}'`, 'green'), 'file is updated!'))
    loader.nocache('../message/text/lang/ind.js', m => console.log(color('[WATCH]', 'cyan'), color(`~> '${m}'`, 'green'), 'file is updated!'))
    //loader.nocache('../message/text/lang/eng.js', m => console.log(color('[WATCH]', 'orange'), color(`=> '${m}'`, 'yellow'), 'file is updated!'))

    // Force it to keep the current session
    geps.onStateChanged((state) => {
        ///console.log('[MrG3P5 STATE]', state)
        if (state === 'UNPAIRED' || state === 'CONFLICT' || state === 'UNLAUNCHED') geps.forceRefocus()
    })

    // Set all received message to seen
    geps.onAck((x) => {
        const { to } = x
        if (x !== 3) geps.sendSeen(to)
    })

    // Listening added to group
    geps.onAddedToGroup(async (chat) => {
        const gc = await geps.getAllGroups()
        if (ownerNumber.includes(chat.id)) {
            await geps.sendText(chat.id, ind.addedGroup(chat))
        } else if (gc.length > groupLimit) {
            await geps.sendText(chat.id, `Max groups reached!\n\nCurrent status: ${gc.length}/${groupLimit}`)
            await geps.deleteChat(chat.id)
            await geps.leaveGroup(chat.id)
        } else if (chat.groupMetadata.participants.length < memberLimit) {
            await geps.sendText(chat.id, `Need at least ${memberLimit} members in group!`)
            await geps.deleteChat(chat.id)
            await geps.leaveGroup(chat.id)
        } else {
            await geps.sendText(chat.id, ind.addedGroup(chat))
        }
    })

    // Listening to messages
    geps.onMessage((message) => {
        geps.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 2000) {
                    console.log(color('[MrG3P5]', 'cyan'), color(`Loaded message reach ${msg}, cuting message cache...`, 'green'))
                    //console.log('[MrG3P5]', color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
                    geps.cutMsgCache()
                    console.log(color('[MrG3P5]', 'cyan'), color('Success Cache deleted!', 'green'))
                    //console.log('[MrG3P5]', color('Cache deleted!', 'yellow'))
                }
            })
        // Below is an watched version but it will affect the performance
        require('./message/geps.js')(geps, message)
        // msgHandler(geps, message)
    })

    // Block person who called bot
    geps.onIncomingCall(async (callData) => {
        await geps.sendText(callData.peerJid, ind.blocked(ownerNumber))
        await geps.contactBlock(callData.peerJid)
        console.log(color('[BLOCK]', 'red'), color(`${callData.peerJid} has been blocked. Reason:`, 'yellow'), color('CALLING THE BOT', 'cyan'))
    })

    // Listen to group's event
    geps.onGlobalParticipantsChanged(async (event) => {
        const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
        const isWelcome = _welcome.includes(event.chat)
        const gcChat = await geps.getChatById(event.chat)
        const pcChat = await geps.getContact(event.who)
        let { pushname, verifiedName, formattedName } = pcChat
        pushname = pushname || verifiedName || formattedName
        const { name, groupMetadata } = gcChat
        const botNumbers = await geps.getHostNumber() + '@c.us'
        try {
            if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
                const pic = await geps.getProfilePicFromServer(event.who)
                if (pic === undefined) {
                    var picx = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picx = pic
                }
                const welcomer = await new canvas.Welcome()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picx)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://telegra.ph/file/9c41931cada0cfe68b8b7.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${welcomer.toBuffer().toString('base64')}`
                await geps.sendFile(event.chat, base64, 'welcome.png', `Halo ${pushname}!\nWelcome in ${name}\n\nNama : \nUmur :\nGender : \nAsal :\n\nSemoga Betah dan jangan lupa isi`)
            } else if (event.action === 'remove' && event.who !== botNumbers && isWelcome) {
                const pic = await geps.getProfilePicFromServer(event.who)
                if (pic === undefined) {
                    var picxs = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picxs = pic
                }
                const bye = await new canvas.Goodbye()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picxs)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://telegra.ph/file/9c41931cada0cfe68b8b7.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${bye.toBuffer().toString('base64')}`
                await geps.sendFile(event.chat, base64, 'welcome.png', `Si ${pushname} Pasti baperan, Nitip gorengan ya ceban:v`)
            }
        } catch (err) {
            console.error(err)
        }
    })
}

// Creating session
create(options(start))
    .then((geps) => start(geps))
    .catch((err) => console.error(err))
