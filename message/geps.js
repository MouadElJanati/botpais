/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */

/**
 *
 * BASE SOURCE BY : Slavyandesu / BocchiBOT
 * Remodifikasi By : MrG3P5
 * 
 */

/********** MODULES **********/
require('dotenv').config()
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const config = require('../config.json')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const fetch = require('node-fetch')
const get = require('got')
const isPorn = require('is-porn')
const exec = require('await-exec')
const webp = require('webp-converter')
const sharp = require('sharp')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const ffmpeg = require('fluent-ffmpeg')
const google = require('google-it')
const bent = require('bent')
const path = require('path')
const ms = require('parse-ms')
const translatte = require('translatte')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
/********** END OF MODULES **********/

/********** UTILS **********/
const feature = require('../lib/poll');
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw2, nsfw, weeaboo, downloader, fun, misc, toxic } = require('../lib')
const { sleep, calender, uploadImages, toBuffer } = require('../tools/fetcher')
const { ind, eng } = require('./text/lang')
const { getStickerMaker } = require('../function/getStickerMaker')
const { limitfunction, balance, level, card, register, afk, reminder, premium, Ftebakgambar } = require('../function')
const Exif = require('../tools/exif')
const exif = new Exif()
const cd = 4.32e+7
const errorImg = 'https://telegra.ph/file/add78d25dcebb3f61a9ce.jpg'
const tanggal = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
/********** END OF UTILS **********/

/********** DATABASES **********/
const caklontong = JSON.parse(fs.readFileSync('./database/user/caklontong.json'))
const tebakgambar = JSON.parse(fs.readFileSync('./database/user/tebakgambar.json'))
const stickerlist = JSON.parse(fs.readFileSync('./database/bot/sticker.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const __start = JSON.parse(fs.readFileSync('./database/bot/start.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const limitmining = JSON.parse(fs.readFileSync('./database/user/koin.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const __auto = JSON.parse(fs.readFileSync('./database/group/auto.json'))
const _bg = JSON.parse(fs.readFileSync('./database/user/card/background.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
const _balance = JSON.parse(fs.readFileSync('./database/group/balance.json')) // THIS FOR ON/OFF
const banned = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const userbalance = JSON.parse(fs.readFileSync('./database/user/userbalance.json')) // THIS BALANCE USER
const msgLimit = JSON.parse(fs.readFileSync('./database/user/msgLimit.json'))
const imagelist = JSON.parse(fs.readFileSync('./database/bot/image.json'))
const vnlist = JSON.parse(fs.readFileSync('./database/bot/vn.json'))
const say = JSON.parse(fs.readFileSync('./database/bot/say.json'))
const { recognize } = require('../lib/ocr')
const { wrongFormat } = require('./text/lang/ind')
const { limitCount, limitMining } = JSON.parse(fs.readFileSync('./config.json'))
let { banChats, prefix, memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/

/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (geps = new Client(), message) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, caption, chatId, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        //let { pushname, verifiedName, formattedName } = sender
        //pushname = pushname || verifiedName || formattedName
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const botNumber = await geps.getHostNumber() + '@c.us'
        const blockNumber = await geps.getBlockedIds()
        const ownerNumber = config.ownerBot
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await geps.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''

        //const prefix  = config.prefix
        //body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        //const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''
        const SN = GenerateSerialNumber("0000000000")
        const serial = sender.id
        const timeStart = Date.now() / 1000
        const tms = (Date.now() / 1000) - (timeStart);
        global.pollfile = 'poll_Config_' + chat.id + '.json'
        global.voterslistfile = 'poll_voters_Config_' + chat.id + '.json'

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isBalanceOn = isGroupMsg ? _balance.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isImage = type === 'image'
        const isVideo = type === 'video'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)

        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
            for(var i=0; i < mask.length; i++){
                var maskChar = mask[i];
                serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                    }
                }
            return serialNumber;
        }

        const getLevelingBalanceId = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].id
            }
        } 
        
        const getLevelingBalance = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].level
            }
        }
        
        const getLevelingXpBC = (userId) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return userbalance[position].xp
            }
        }
        
        const addLevelingIdBC = (userId) => {
            const obj = { id: userId, xp: 0, level: 1 }
            userbalance.push(obj)
            fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
        }
        
        const addLevelingBalance = (userId, amount) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].level += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }
        
        const addLevelingXpBalance = (userId, amount) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].xp += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        const lessLevelingXpBalance = (userId, amount, userbalance) => {
            let position = null
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                userbalance[position].xp -= amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        const checkATMuser = (serial) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                return userbalance[position].xp
            }
        }
        
        const bayarLimit = (serial, amount) => {
            let position = false
            Object.keys(limit).forEach((i) => {
                if (limit[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                limit[position].limit -= amount;
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit))
            }
        }

        const bayarCoin = (userId, amount) => {
            let position = false
            Object.keys(limitmining).forEach((i) => {
                if (limitmining[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                limitmining[position].limit -= amount;
                fs.writeFileSync('./database/user/koin.json', JSON.stringify(limitmining))
            }
        }
            
        const confirmATM = (serial, amount) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                userbalance[position].xp -= amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        const addSaldo = (serial, amount) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                userbalance[position].xp += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        const confirmTranfer = (serial, amount) => {
            let position = false
            Object.keys(userbalance).forEach((i) => {
                if (userbalance[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                userbalance[position].xp += amount
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
            }
        }

        // FUNCTION TEBAK GAMBAR
			const addgambar = (serial, jawaban, expired) => {
				let obi = { id: serial, jawaban: jawaban, expired: Date.now() + toMs(`${expired}s`) }
				tebakgambar.push(obi)
				fs.writeFileSync('./database/user/tebakgambar.json', JSON.stringify(tebakgambar))
			}
			const getjawaban = (serial) => {
				let found = false
				Object.keys(tebakgambar).forEach((i) => {
					if (tebakgambar[i].id === serial) {
						found = i
					}
				})
				if (found !== false) {
					return tebakgambar[found].jawaban
				}
			}
			const isTebakGambar = (serial) => {
				let status = false
				Object.keys(tebakgambar).forEach((i) => {
					if (tebakgambar[i].id === serial) {
						status = true
					}
				})
				return status
			}
			const cekWaktuTG = (_dir, serial) => {
				setInterval(() => {
					let position = null
					Object.keys(tebakgambar).forEach((i) => {
						if (Date.now() >= tebakgambar[i].expired) {
							position = i
						}
					})
					if (position !== null) {
						geps.reply(from, `Waktu habis\n\n*Jawaban :* ${tebakgambar[position].jawaban}`, id)
						console.log(`Waktu Habis : ${tebakgambar[position].id}`)
						tebakgambar.splice(position, 1)
						fs.writeFileSync('./database/user/tebakgambar.json', JSON.stringify(tebakgambar))
					}
				}, 1000)
			}
			const gettgposi = (userId) => {
				let position = null
				Object.keys(tebakgambar).forEach((i) => {
					if (tebakgambar[i].id === userId) {
						position = i
					}
				})
				if (position !== null) {
					return position
				}
			}

            if(isTebakGambar(serial)){
				if (chats.match(getjawaban(serial))){
					//var htgm = Math.floor(Math.random() * 200) + 1
					//addbalance(serial, Number(htgm))
					//reply(`Selamat jawaban kamu benar\n*Jawaban :* ${getjawaban(from)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim ${prefix}tebakgambar`)
                    const tebokgambar = Math.floor(Math.random() * 10000) + 1;
                    geps.reply(from, `Benar!, Saldo ditambahkan +Rp ${convertBalanceToString(tebokgambar)}`, id)
                    addSaldo(serial, tebokgambar)
					tebakgambar.splice(gettgposi(serial, tebakgambar), 1)
                    fs.writeFileSync('./database/user/tebakgambar.json', JSON.stringify(tebakgambar))
				}

			}

                // FUNCTION FAMILY 100
			const addResultCaklontong = (serial, jawaban, expired) => {
				let obi = { id: serial, jawaban: jawaban, expired: Date.now() + toMs(`${expired}s`) }
				caklontong.push(obi)
				fs.writeFileSync('./database/user/caklontong.json', JSON.stringify(caklontong))
			}
			const getjawabanCaklontong = (serial) => {
				let found = false
				Object.keys(caklontong).forEach((i) => {
					if (caklontong[i].id === serial) {
						found = i
					}
				})
				if (found !== false) {
					return caklontong[found].jawaban
				}
			}
			const isCakLontong = (serial) => {
				let status = false
				Object.keys(caklontong).forEach((i) => {
					if (caklontong[i].id === serial) {
						status = true
					}
				})
				return status
			}
			const cekWaktuCaklontong = (_dir, serial) => {
				setInterval(() => {
					let position = null
					Object.keys(caklontong).forEach((i) => {
						if (Date.now() >= caklontong[i].expired) {
							position = i
						}
					})
					if (position !== null) {
						geps.reply(from, `Waktu habis\n\n*Jawaban :* ${caklontong[position].jawaban}`, id)
						console.log(`Waktu Habis : ${caklontong[position].id}`)
						caklontong.splice(position, 1)
						fs.writeFileSync('./database/user/caklontong.json', JSON.stringify(caklontong))
					}
				}, 1000)
			}
			const getCaklontongPosition = (userId) => {
				let position = null
				Object.keys(caklontong).forEach((i) => {
					if (caklontong[i].id === userId) {
						position = i
					}
				})
				if (position !== null) {
					return position
				}
			}

            if(isCakLontong(serial)){
				if (chats.match(getjawabanCaklontong(serial))){
					//var htgm = Math.floor(Math.random() * 200) + 1
					//addbalance(serial, Number(htgm))
					//reply(`Selamat jawaban kamu benar\n*Jawaban :* ${getjawaban(from)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim ${prefix}tebakgambar`)
                    const caklontonggs = Math.floor(Math.random() * 10000) + 1;
                    geps.reply(from, `Benar!, Saldo ditambahkan +Rp ${convertBalanceToString(caklontonggs)}`, id)
                    addSaldo(serial, caklontonggs)
					caklontong.splice(getCaklontongPosition(serial, caklontong), 1)
                    fs.writeFileSync('./database/user/caklontong.json', JSON.stringify(caklontong))
				}

			}

        function waktu(seconds) { // TOBZ
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
            var dDisplay = d > 0 ? d + (d == 1 ? " Hari," : " Hari,") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " Jam," : " Jam,") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " Menit," : " Menit,") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " Detik," : " Detik") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }

        const kelebihan = [
            'Soleh dan Soleha',
            'Pintar',
            'Rajin',
            'Teladan'
        ]
        const tipe = [
            'cool',
            'idaman',
            'Alami',
            'Keren',
            'Ideal',
            'Dia Bamget',
            'normal',
            'elite',
            'epic',
            'Legend'
        ]
        const ratenyaasu = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
        ]
        const sifat = [
            'Penolong',
            'Suka Membantu',
            'Saling Menolong',
            'Perhatian',
            'Ngak Cuek',
            'Romantis',
            'Dermawan',
            'Cool',
            'Peduli Kepada Sesama',
            'Suka Berkata Kasar'
        ]
        const hobby = [
            'Memasak',
            'Membantu Atok',
            'Mabar',
            'Nobar',
            'Sosmedtan',
            'Membantu Orang lain',
            'Nonton Anime',
            'Nonton Drakor',
            'Naik Motor',
            'Nyanyi',
            'Menari',
            'Bertumbuk',
            'Menggambar',
            'Foto fotoan Ga jelas',
            'Maen Game',
            'Berbicara Sendiri'
        ]
        const watak = [
            'top deh pokoknya',
            'penyayang',
            'pemurah',
            'Pemarah',
            'Pemaaf',
            'Penurut',
            'Baik',
            'baperan',
            'Baik-Hati',
            'penyabar',
            'UwU',
            'Suka Membantu'
        ]

        const cts = waktu(tms)
        function isMsgLimit(userId) {
            //if (isPremium) { return false; }
            let found = false;
            for (let i of msgLimit) {
                if (i.id === userId) {
                    if (i.msg >= 12) {
                        found === true
                        geps.reply(from, '*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!', id)
                        geps.contactBlock(userId)
                        banned.push(userId)
                        fs.writeFileSync('./database/user/banned.json', JSON.stringify(banned))
                        return true;
                    } else if (i.msg >= 7) {
                        found === true
                        geps.sendText(from, `*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!`, id)
                        return true
                    } else {
                        found === true
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${userId}`, msg: 1 };
                msgLimit.push(obj);
                fs.writeFileSync('./database/user/msgLimit.json', JSON.stringify(msgLimit));
                return false;
            }
        }

        function addMsgLimit(id) {
            //if (isPremium) { return false; }
            var found = false
            Object.keys(msgLimit).forEach((i) => {
                if (msgLimit[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                msgLimit[found].msg += 1;
                fs.writeFileSync('./database/user/msgLimit.json', JSON.stringify(msgLimit));
            }
        }

        function isLimit(userId) {
        if (isPremium) {return false;}
            let found = false;
            for (let i of limit) {
                if (i.id === userId) {
                    let limits = i.limit;
                    if (limits >= limitCount) {
                        found = true;
                        geps.reply(from, `Opps Perintah BOT anda sudah mencapai batas, coba esok hari :)`, id)
                        return true;
                    } else {
                        limit
                        found = true;
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${userId}`, limit: 1 };
                limit.push(obj);
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit));
                return false;
            }
        }

        /*function fishEye(ctxx, lepel, x, y, width, height) {
            const frame = ctxx.getImageData(x, y, width, height);
            const source = new Uint8Array(frame.mediaData);

            for(let i = 0; i < frame.mediaData.length; i += 4) {
                const sx = (i / 4) % frame.width;
                const sy = Math.floor(i / 4 / frame.width);

                const dx = Math.floor(frame.width / 2) - sx;
                const dy = Math.floor(frame.height / 2) - sy;

                const dist = Math.sqrt((dx * dx) + (dy * dy));
                const x2 = Math.round((frame.width / 2) - (dx * Math.sin(dist / (lepel * Math.PI))));
                const y2 = Math.round((frame.height / 2) - (dx * Math.sin(dist / (lepel * Math.PI))));
                const i2 = ((y2 * frame.width) + x2) * 4;

                frame.mediaData[i] = source[i2];
                frame.mediaData[i + 1] = source[i2 + 1];
                frame.mediaData[i + 2] = source[i2 + 2];
                frame.mediaData[i + 3] = source[i2 + 3];
            }
            ctxx.putImageData(frame, x, y);
            return ctxx;
        }*/

        function limitAdd(id) {
            if (isPremium) { return false; }
            var found = false;
            Object.keys(limit).forEach((i) => {
                if (limit[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                limit[found].limit += 1;
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(limit));
            }
        }

        function isLimitCoin(userId) {
            let found = false;
            for (let i of limitmining) {
                if (i.id === userId) {
                    let limits = i.limit;
                    if (limits >= limitMining) {
                        found = true;
                        geps.reply(from, `Coin anda sudah habis untuk bermain game silahkan beli di ${prefix}shopmenu atau menunggu jam 6 pagi untuk mendapatkan 30 Coin`)
                        return true;
                    } else {
                        limitmining
                        found = true;
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${userId}`, limit: 1 };
                limitmining.push(obj);
                fs.writeFileSync('./database/user/koin.json', JSON.stringify(limitmining));
                return false;
            }
        }

        function limitAddCoin(id) {
            var found = false;
            Object.keys(limitmining).forEach((i) => {
                if (limitmining[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                limitmining[found].limit += 1;
                fs.writeFileSync('./database/user/koin.json', JSON.stringify(limitmining));
            }
        }

        function convertBalanceToString(angka)
        {
            var balancenyeini = '';		
            var angkarev = angka.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) balancenyeini += angkarev.substr(i,3)+'.';
            return ''+balancenyeini.split('',balancenyeini.length-1).reverse().join('');
        }

        function clamp(value, min, max) {
            return Math.min(Math.max(min, value), max)
        }

            const isMuted = (chatId) => {
                if(muted.includes(chatId)){
                  return false
              }else{
                  return true
                  }
              }
      
              function banChat () {
                  if(banChats == true) {
                  return false
              }else{
                  return true
                  }
              }

        const sleeps = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // FUNCTION CALL ROLE / RANK
        const levelRole = level.getLevelingLevel(sender.id, _level)
        var role = 'Bronze'
        if (levelRole >= 10) {
            role = 'Silver'
        } else if (levelRole >= 15) {
            role = 'Gold'
        } else if (levelRole >= 20) {
            role = 'Platinum'
        } else if (levelRole >= 30) {
            role = 'Diamond'
        } else if (levelRole >= 40) {
            role = 'Master'
        } else if (levelRole >= 50) {
            role = 'GrandMaster'
        }

        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !level.isGained(sender.id) && !isBanned && isLevelingOn) {
            try {
                level.addCooldown(sender.id)
                const currentLevel = level.getLevelingLevel(sender.id, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
                const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const userLevel = level.getLevelingLevel(sender.id, _level)
                    const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                    await geps.reply(from, `*「 LEVEL UP 」*\n\n• *Name:* ${pushname}\n• *XP:* ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n• *Level:* ${currentLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n• *Rank:* ${role}\n\nCongrats!! 🎉🎉`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (isGroupMsg && !isBanned && isBalanceOn) {
            const CurrentBalance = getLevelingBalance(sender.id, userbalance)
            const checkIdBc = getLevelingBalanceId(sender.id, userbalance)
            const checkBgBc = card.getBg(sender.id, _bg)
            try {
                if (CurrentBalance === undefined && checkIdBc === undefined) addLevelingIdBC(sender.id, userbalance)
                if (checkBgBc === undefined) card.addBg(sender.id, _bg)
                const amountXpBC = Math.floor(Math.random() * 10) + 150
                const requiredXpBC = 200 * (Math.pow(2, CurrentBalance) - 1)
                const getLevelBC = getLevelingBalance(sender.id, userbalance)
                addLevelingXpBalance(sender.id, amountXpBC, userbalance)
                if (requiredXpBC <= getLevelingXpBC(sender.id, userbalance)) {
                    addLevelingBalance(sender.id, 1, userbalance)
                    const fetchXpBC = 200 * (Math.pow(2, getLevelingBalance(sender.id, userbalance)) - 1)
                    //console.log(`Something Get Balance\nName : ${pushname}\nXp : ${getLevelBC}\nLevel : ${getLevelBC}`)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Anti-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn) {
            if (args.includes(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await geps.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color(`「 *ANTI LINK* 」\n\nMaaf ${pushname} kamu mengirimkan link disaat antilink menyala, kamu akan dikick`, 'yellow'))
                    //await geps.reply(from, ind.linkDetected(), id)
                    //await geps.removeParticipant(groupId, sender.id)
                    return geps.reply(from, ind.linkDetected(), id)
                    .then(() => geps.removeParticipant(groupId, sender.id))
                    .then(() => {
                    geps.sendText(from, `Sudah tau antilink menyala:(`, id)
                    }).catch(() => geps.sendText(from, `Untung DarkChat-BOT Bukan Admin, Kalo Jadi Admin Udah Aku Kick Tuh! 😑`))
                } else {
                    console.log(color('[WARN]', 'yellow'), color('「 *ANTI LINK* 」\n\nSaya mengetahui link tersebut tpi selamat kamu tidak dikick karena link tersebut tidak valid', 'yellow'))
                }
            }
        }

        // Anti-fake-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (args.includes(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color(`「 *ANTI FAKE-LINK* 」\n\nMaaf ${pushname} kamu mengirimkan link disaat anti fake-link menyala, kamu akan dikick`, 'yellow'))
                await geps.reply(from, 'Fake group link detected!', id)
                await geps.removeParticipant(groupId, sender.id)	
            }
        }

        // Anti NSFW links but kinda uneffective
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await geps.reply(from, ind.linkNsfw(), id)
                        await geps.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }

        // Auto-sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await geps.sendImageAsSticker(from, imageBase64, { author:`${config.authorstickerpack}`, pack: `${config.packagenamestick}`, keepScale: false })
        }

        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await geps.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await geps.sendText(from, ind.afkDone(pushname))
            }
        }

        if (chats == 'prefix' || (chats == 'cekprefix')) {
            geps.reply(from, `Prefix yang digunakan saat ini adalah 「 *${prefix}* 」`, id)
        }

        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti-spam
        if (isCmd && !isOwner) msgFilter.addFilter(from)
        if (banChat() && !isBlocked && !isBanned || isOwner ) {
        switch (command) {
            case prefix+'banchat':
                if (config.banChats === true) return
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                config.banChats = true
                banChats = true
                fs.writeFileSync('./database/bot/setting.json', JSON.stringify(config, null, 2))
                geps.reply(from, 'Global chat has been enable!', id)
                break
            case prefix+'unbanchat':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                if(config.banChats === false) return
                config.banChats = false
                banChats = false
                fs.writeFileSync('./database/bot/setting.json', JSON.stringify(config, null, 2))
                geps.reply(from, 'Global chat has been disable!', id)
                break
            case prefix+'verify':
                const nonye = sender.id
                const pporang = await geps.getProfilePicFromServer(sender.id)
                if (pporang === undefined) {
                var pepe = errorImg
                } else {
                var pepe = pporang
                }
                var ceknya = nonye
                var obj = _registered.some((val) => {
                return val.id === ceknya
                })
                if (obj === true){
                return geps.reply(from, 'Kamu sudah melakukan verifikasi', id) // BAKAL RESPON JIKA NO UDAH ADA
                } else {
                const mentah = await geps.checkNumberStatus(nonye) // PENDAFTARAN
                const msg = (`┌─「 *VERIFY-SUCCES* 」
│
├ NAMA : ${pushname}
├ SERIAL : ${SN}
├ NOMOR : [@${nonye.replace(/[@c.us]/g, '')}]
├ API : wa.me/${nonye.replace('@c.us', '')}
├ WAKTU : ${moment().format('DD/MM/YY HH:mm:ss')}
│
├ Sebelum mulai silahkan kirim ${prefix}start
│ Total User yang telah terdaftar ${_registered.length}
│
└─「 *DarkChat-BOT* 」`)
                const hasil = mentah.canReceiveMessage ? msg : false
                if (!hasil) return geps.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                {
                const registersss = ({
                    id: mentah.id._serialized
                })
                const givebalance = ({
                    id: mentah.id._serialized,
                    xp: 5,
                    level: 1
                })
                const givexplepel = ({
                    id: mentah.id._serialized,
                    xp: 5,
                    level: 1
                })
                _registered.push(registersss)
                fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered)) // DATABASE
                userbalance.push(givebalance)
                fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(userbalance))
                _level.push(givexplepel)
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
                geps.sendFileFromUrl(from, pepe, 'ppnya.jpg', hasil)
                }
                }
                break
            case prefix+'totaluser':
            case prefix+'listverify':
            case prefix+'userlist':
                await geps.reply(from, `Total users : ${_registered.length}`, id)
                break
            case prefix+'infobtc':
                if (args.length === 0) {
                    axios.get('https://blockchain.info/ticker')
                        .then((res) => {
                            let damta = res.data
                            geps.reply(from, `*Nilai Bitcoin saat ini:*\n฿ ${damta.BRL.last}`, id)
                        })
                        .catch((err) => {
                            console.log(color('[ERROR BTC]', 'red'), err)
                        })
                }
                break
            case prefix+'wallpaperanime':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id);
                axios.get('https://akaneko-api.herokuapp.com/api/mobileWallpapers').then(res => {
                geps.sendFileFromUrl(from, res.data.url, 'Desktop Wallpaper.jpeg', '*Random Wallpaper Anime!*', id);
                });
                break
            /*case prefix+'fisheye':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isMedia && isImage || isQuotedImage) {
                try {
                    const { loadImage, createCanvas } = require("canvas")
                    const requests = require('node-superfetch')

                    const lepel = 50;
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await loadImage(encryptMedia, uaOverride)
                    const canvasnyoo = createCanvas(mediaData.width, mediaData.height);
                    const ctxx = canvasnyoo.getContext('2d');
                    await ctxx.drawImage(mediaData, 0, 0);
                    await fishEye(ctxx, lepel, 0, 0, mediaData.width, mediaData.height);
                    const attachments = canvasnyoo.toBuffer();
                    geps.reply(from, ind.wait(), id)
                    geps.sendImage(from, attachments, 'fisheye.png', '*Fish-Eye*', id)
                } catch (err) {
                    console.log(err)
                    geps.reply(from, `err`, id)
                }
            }
                break*/
            // Level [BETA] by Slavyan
            case prefix+'level':
            case prefix+'ceklevel':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                const ppLink = await geps.getProfilePicFromServer(sender.id)
                const bege = card.getBg(sender.id, _bg)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const namacardlevel = Math.floor(Math.random() * 10) + 20
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ff0000', '#ff0000')
                    .setRank(1, `${role}`, true)
                    .setCurrentXP(userXp)
                    .setOverlay('#ff0000', 100, false)
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#ff0000', 'COLOR')
                    .setBackground('IMAGE', bege)
                    .setUsername(pushname, '#ff0000')
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${namacardlevel}_card.png`)
                        await geps.sendFile(from, `${namacardlevel}_card.png`, `${namacardlevel}_card.png`, `「 *INFO LEVEL* 」\n\n• *Username:* ${pushname}\n• *Level:* ${userLevel}\n• *Rank:* ${role}\n• *Xp Info:* ${userXp} / ${requiredXp}`, id)
                        fs.unlinkSync(`${namacardlevel}_card.png`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'cekatm':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const userBalancenye = getLevelingXpBC(sender.id, userbalance)
                const cvbalance = convertBalanceToString(userBalancenye)
                if (cvbalance  === undefined) return await geps.reply(from, "Kamu belum memiki balance:(", id)
                geps.reply(from, `「 *INFO ATM USER* 」

• Name: ${pushname}
• Saldo: Rp ${cvbalance}`, id)
                break
            case prefix+'start':
                geps.reply(from, `Hallo ${pushname} 👋🏻

Thank you for using DCB, don't forget to read TOS

*TOS IND*
1. Teks dan nama pengguna WhatsApp anda akan kami simpan di dalam server selama bot aktif
2. Data anda akan di hapus ketika bot Offline
3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim
4. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot
6. Dilarang Spam Command Terhadap bot atau masuk kedalam listhell
7. Dilarang Telp/Vc Karena Sistem akan memblockir bagi yang menelpon
8. Dilarang Spam demi mendapatkan level!

*TOS ENG*
1. Text and your WhatsApp username will be stored on the server as long as the bot is active
2. Your data will be deleted when bot Offline
3. We do not store pictures, videos, files, audios and documents that you send
4. We will not ask you to provide personal information
5. If you find a bug / error, please report it directly to the bot Owner
6. Do not spam commands against bots or enter the listhell
7. Do not call / Vc because the system will block those who call
8. No Spam for each xp leveling!

_Now type ${prefix}menu_`, id)
                break
                case prefix+'hilih':
                    const hiliw = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hili = hiliw.replace(/a|u|e|o/g, "i")
                    await geps.reply(from, hili, id)
                    break
                case prefix+'halah':
                    const halah = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hala = halah.replace(/i|u|e|o/g, "a")
                    await geps.reply(from, hala, id)
                    break
                case prefix+'heleh':
                    const heleh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hele = heleh.replace(/i|u|a|o/g, "e")
                    await geps.reply(from, hele, id)
                    break
                case prefix+'holoh':
                    const holoh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const holo = holoh.replace(/i|u|e|a/g, "o")
                    await geps.reply(from, holo, id)
                    break
                case prefix+'huluh':
                    const huluh = quotedMsg.type == 'chat' ? quotedMsg.body : ''
                    const hulu = huluh.replace(/i|o|e|a/g, "u")
                    await geps.reply(from, hulu, id)
                    break

            case prefix+'toplevel':
            case prefix+'leaderboard':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                //const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '「 *TOP LEVEL* 」\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
                        leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@c.us', '')}\n• *Level:* ${_level[i].level}\n• *XP:* ${_level[i].xp}\n\n`
                    }
                    await geps.reply(from, leaderboard, id)
                } catch (err) {
                    //console.error(err)
                    await geps.reply(from, ind.minimalDb(), id)
                }
            break
            case prefix+'topbalance':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                userbalance.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboards = '「 *TOP BALANCE* 」\n\n'
                let nomBC = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nomBC++
                        leaderboards += `[ ${nomBC} ] \n• USER : @${userbalance[i].id.replace('@c.us', '')}\n• BALANCE : Rp ${convertBalanceToString(userbalance[i].xp)}\n\n`
                    }
                    await geps.sendTextWithMentions(from, leaderboards)
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, ind.minimalDb(), id)
                }
            break
            case prefix+'setbackground':
            case prefix+'setbg':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                    if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    const levels = level.getLevelingLevel(sender.id, _level)
                    const xps = level.getLevelingXp(sender.id, _level)
                    //const setbegelah = body.slice(7)
                    if (levels === undefined && xps === undefined) return await geps.reply(from, `Maaf ${pushname} kamu belum memiliki level:(`, id)
                    card.replaceBg(sender.id, linkImg, _bg)
                    await geps.reply(from, 'Success set new background!', id)
                } else {
                    await geps.reply(from, `Salah!, Silahkan reply/kirim image dengan caption ${prefix}setbg`, id)
                }
                break
            case prefix+'ocr':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                    if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    await recognize(mediaData, {lang: 'eng+ind', oem: 1, psm: 3})
                        .then(teks => {
                        geps.reply(from, teks, id)
                    })
                }
            break
            case prefix+'tebakgambar':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isTebakGambar(serial)) return await geps.reply(from, `*IND*\n• Masih ada jawaban yang belum dijawab\n\n*ENG*\n• There are still unanswered answers`, id)
                if (isLimitCoin(serial)) return geps.reply(from, `Sepertinya coinmu habis, Silahkan beli di ${prefix}shopmenu`, id)
                await limitAddCoin(serial)
                const hargatebakgambar = 2000
                const waktujwb = 30
                if (checkATMuser(serial) <= hargatebakgambar) return geps.reply(from, `Saldomu harus ada Rp. ${convertBalanceToString(hargatebakgambar)}+ untuk memainkan game ini, silahkan cek dengan cara ${prefix}cekatm`, id)
                if (checkATMuser(serial) >= hargatebakgambar) {
                    const resptebakgambar = await axios.get(`https://api.vhtear.com/tebakgambar&apikey=${config.vhtear}`)
                    if (resptebakgambar.data.error) return geps.reply(from, `Terjadi kesalahan`, id)
                    //const hadiahcl = hargatebakgambar * 2
                    const jwbntolw = resptebakgambar.data.result.jawaban.toLowerCase()
                    const replacetekstebakgambar = jwbntolw.replace(/a|i|u|e|o/g, "_")
                    geps.sendFileFromUrl(from, resptebakgambar.data.result.soalImg, 'tebakgambar.jpg', `_Silahkan Jawab Maksud Dari Gambar Ini_\n\n• Waktu: 30 dtk\n• Kisi-kisi: ${replacetekstebakgambar}`, id)
                    addgambar(serial, jwbntolw, waktujwb)
                    cekWaktuTG(serial)
                }
                break
                case prefix+'caklontong':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    if (isCakLontong(serial)) return await geps.reply(from, `*IND*\n• Masih ada jawaban yang belum dijawab\n\n*ENG*\n• There are still unanswered answers`, id)
                    if (isLimitCoin(serial)) return geps.reply(from, `Sepertinya coinmu habis, Silahkan beli di ${prefix}shopmenu`, id)
                    await limitAddCoin(serial)
                    const hargafamily100 = 2000
                    const waktufamily100 = 30
                    if (checkATMuser(serial) <= hargafamily100) return geps.reply(from, `Saldomu harus ada Rp. ${convertBalanceToString(hargafamily100)}+ untuk memainkan game ini, silahkan cek dengan cara ${prefix}cekatm`, id)
                    if (checkATMuser(serial) >= hargafamily100) {
                        const respcaklontong = await axios.get(`https://api.vhtear.com/funkuis&apikey=${config.vhtear}`)
                        if (respcaklontong.data.error) return geps.reply(from, `Terjadi kesalahan`, id)
                        //const hadiahcl = hargatebakgambar * 2
                        const jawabancaklontong = respcaklontong.data.result.jawaban.toLowerCase()
                        const replacetekscaklontong = jawabancaklontong.replace(/a|i|u|e|o/g, "_")
                        geps.reply(from, `*SOAL*\n• ${respcaklontong.data.result.soal} ?\n\n• WAKTU: 30 DETIK\n• Kisi-Kisi: ${replacetekscaklontong}`, id)
                        addResultCaklontong(serial, jawabancaklontong, waktufamily100)
                        cekWaktuCaklontong(serial)
                    }
                    break
            /*case prefix+'tebakgambar':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                const hargatebakgambar = 2000
                if (checkATMuser(serial) <= hargatebakgambar) return geps.reply(from, `Saldomu harus ada Rp. ${convertBalanceToString(hargatebakgambar)}+ untuk memainkan game ini, silahkan cek dengan cara ${prefix}cekatm`, id)
                if (checkATMuser(serial) >= hargatebakgambar) {
                await limitAdd(serial)
                try {
                    const resptebakgambar = await axios.get(`https://api.vhtear.com/tebakgambar&apikey=${config.vhtear}`)
                    if (resptebakgambar.data.error) return geps.reply(from, `Terjadi kesalahan`, id)
                    const jwban = `• Jawaban : ${resptebakgambar.data.result.jawaban}`
                    const hasiljawaban = `${resptebakgambar.data.result.jawaban}`
                    const hadiahcl = hargatebakgambar * 2
                    geps.sendFileFromUrl(from, resptebakgambar.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
                    console.log(hasiljawaban)
                    if ( quotedMsgObj == hasiljawaban ) {
                    addSaldo(serial, hadiahcl)
                    geps.reply(from, `Jawaban benar!, Saldomu ditambah *Rp. ${convertBalanceToString(hadiahcl)}*`, id)
                    } else if ( quotedMsgObj == null ) {
                    geps.sendText(from, `30 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(from, `20 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.sendText(from, `10 Detik Lagi...`, id)
                    await sleeps(10000)
                    geps.reply(from, jwban, id)
                    }
                } catch (err) {
                    console.error(err)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                }
            }
                break*/
            case prefix+'casino':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimitCoin(serial)) return geps.reply(from, `Sepertinya coinmu habis, Silahkan beli di ${prefix}shopmenu`, id)
                await limitAddCoin(serial)
                if (!q) return await geps.reply(from, `*IND*\n• Kirim perintah ${prefix}casino [taruhan]\nContoh: ${prefix}casino 5000\n\n*ENG*\n• Send command ${prefix}casino [howmuch]\nExample: ${prefix}casino 5000`, id)
                const betcasino = q * 1
                if (checkATMuser(serial) <= betcasino) return geps.reply(from, `*IND*\n• Sepertinya saldomu tidak cukup untuk taruhan Rp. ${convertBalanceToString(q)}, Silahkan cek dengan cara ${prefix}cekatm\n\n*ENG*\n• It looks like your balance is not enough for the bet Rp. ${convertBalanceToString(q)}, Please check your balance type ${prefix}cekatm`, id)
                if (checkATMuser(serial) >= betcasino) {
                    confirmATM(serial, betcasino)
                    geps.reply(from, `*Saldo dikurangkan -Rp ${convertBalanceToString(q)}*`, id)
                    const hadiahcsn = betcasino * 2
                    const maxcasino = 30
                    const thisyou = Math.floor(Math.random() * maxcasino) + 1;
                    const thiscomputer = Math.floor(Math.random() * maxcasino) + 1;
                    if (thisyou >= thiscomputer) {
                        geps.reply(from, `*RESULT*\n\n• You: ${thisyou}\n• Computer: ${thiscomputer}\n\nCongrats! You win and get Rp. ${convertBalanceToString(hadiahcsn)}`, id)
                        addSaldo(serial, hadiahcsn)
                    } else if (thisyou <= thiscomputer) {
                        geps.reply(from, `*RESULT*\n\n• You: ${thisyou}\n• Computer: ${thiscomputer}\n\Sorry! You lose:(`, id)
                    } else if (thisyou == thiscomputer) {
                        geps.reply(form, `*RESULT*\n\n• You: ${thisyou}\n• Computer: ${thiscomputer}\n\nDraw!`, id)
                    }
                }
                break
            case prefix+'suit':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimitCoin(serial)) return geps.reply(from, `Sepertinya coinmu habis, Silahkan beli di ${prefix}shopmenu`, id)
                await limitAddCoin(serial)
                if (!q) return await geps.reply(from, `Kirim perintah ${prefix}suit gunting | [jumlahtaruhan]\nContoh: ${prefix}suit gunting 5000`, id)
                //const hargasuit = 5000
                //const userspilih = body.slice(6)
                //const userspilih = body.slice(8)
                const userspilih = q.substring(0, q.indexOf('|') - 1)
                const jumlahsuit = q.substring(q.lastIndexOf('|') + 2)
                //const deteksaldo = jumlahsuit * 1
                // if (q.length > 1024) return await geps.reply(from, `Gagal membuat karena Teks melebihi 1.024`, id)
                if (checkATMuser(serial) <= jumlahsuit) return geps.reply(from, `Sepertinya saldomu tidak cukup untuk taruhan Rp. ${convertBalanceToString(jumlahsuit)}, silahkan cek dengan cara ${prefix}cekatm`, id)
                if (jumlahsuit.length > 5) return geps.reply(from, `HeyHey maximal Rp. 90.000`, id)
                if (checkATMuser(serial) >= jumlahsuit) {
                if (!userspilih.match(/batu|gunting|kertas/)) return geps.reply(from, `Format salah`, id)
                if (userspilih.match(/batu|gunting|kertas/)) {
                geps.reply(from, `*Saldo dikurangkan -Rp ${convertBalanceToString(jumlahsuit)}*`, id)
                confirmATM(serial, jumlahsuit)
                await sleeps(3000)

                var computer = Math.random();

                const hadiahnye = jumlahsuit * 2
                const hadiahtostr = convertBalanceToString(hadiahnye)
                const balikin = jumlahsuit * 1

                if (computer < 0.34 ) {
                    computer = 'batu';
                } else if( computer >= 0.34 && computer < 0.67) {
                    computer = 'gunting';
                } else {
                    computer = 'kertas';
                }

                //var hasils = '';
                if ( userspilih == computer ) {
                    //hasil = 'SERI!';
                    geps.reply(from, `Pertandingan Seri!\nSaldomu dikembalikan Rp ${convertBalanceToString(jumlahsuit)}`, id)
                    //const baackbalance = 5000
                    addSaldo(serial, balikin)
                } else if ( userspilih == 'batu' ) {
                    if( computer == 'gunting' ) {
                        // hasil = 'MENANG';
                        geps.reply(from, `Congrats!, Kamu memilih *BATU* dan bot *GUNTING* kamu menang!, SALDO +Rp ${hadiahtostr}`, id)
                        addSaldo(serial, hadiahnye)
                    } else {
                        geps.reply(from, `Opss kamu kalah, Kamu memilih *BATU* dan bot memilih *KERTAS*, Dan kamu tidak dapat apa-apa`, id)
                    }
                } else if ( userspilih == 'gunting' ) {
                    if( computer == 'batu' ) {
                        // hasil = 'MENANG';
                        geps.reply(from, `Opss kamu kalah, Kamu memilih *GUNTING* dan bot memilih *BATU*, Dan kamu tidak dapat apa-apa`, id)
                    } else {
                        geps.reply(from, `Congrats!, Kamu memilih *GUNTING* dan bot *KERTAS* kamu menang!, SALDO +Rp ${hadiahtostr}`, id)
                        addSaldo(serial, hadiahnye)
                    }
                } else if ( userspilih == 'kertas' ) {
                    if( computer == 'batu' ) {
                        // hasil = 'MENANG';
                        geps.reply(from, `Congrats!, Kamu memilih *KERTAS* dan bot *BATU* kamu menang!, SALDO +Rp ${hadiahtostr}`, id)
                        addSaldo(serial, hadiahnye)
                    } else {
                        geps.reply(from, `Opss kamu kalah, Kamu memilih *KERTAS* dan bot memilih *GUNTING*, Dan kamu tidak dapat apa-apa`, id)
                    }
                } 
            } else {
                geps.reply(from, `Salah, gunakan huruf kecil\nExample:\n\nk = kertas\ng = gunting\nb = batu\nContoh: ${prefix}suit g 15000`, id)
            }
        }
                break
            case prefix+'smule':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                const resp = await axios.get(`https://api.vhtear.com/getsmule?link=${q}&apikey=${config.vhtear}`)
                const { Type, title, url, image } = resp.data.result
                const sml3 = `*Music Ditemukan!*
    
➸ *Judul:* ${title}
➸ *Type:* ${Type}`
    
                geps.sendImage(from, image, `${title}.jpg`, sml3)
                geps.sendFileFromUrl(from, url, `${title}.mp3`, sml3, id)
                } catch (err) {
                 console.error(err.message)
                 await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Music tidak ditemukan')
                 geps.sendText(ownerNumber, 'Smule Error : ' + err)
               }
              break
            case prefix+'igdl': // by: VideFrelan
            case prefix+'instadl':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                downloader.insta(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.post.length; i++) {
                            if (result.post[i].type === 'image') {
                                await geps.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.jpg', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            } else if (result.post[i].type === 'video') {
                                await geps.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.mp4', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            }
                        }
                        //console.log('Success sending Instagram media!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            /*case prefix+'facebook':
            case prefix+'fb':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                downloader.fb(q)
                .then(async ({ result }) => {
                            await geps.sendFileFromUrl(from, result.VideoUrl, 'videofb.mp4', '', id)
                            console.log(from, 'Success sending Facebook video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break*/
            case prefix+'ytmp3': {
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                const puppeteer = require('puppeteer')
                try {
                    (async () => {
                        const browser = await puppeteer.launch({
                            headless: true,
                        });
                        const page = await browser.newPage();
                        await page
                            .goto("https://ytmp3.cc/en13/", {
                                waitUntil: "networkidle2"
                            })
                            .then(async () => {
                                await page.type("#input", q);
                                await page.click("#submit");
                                await new Promise(resolve => setTimeout(resolve, 5000));
                                const element = await page.$(
                                    'div[id="buttons"] > a'
                                );
                                const text = await (await element.getProperty("href")).jsonValue();
                                const ytmp3resp = await fetch(text);
                                const ytmp3buffer = await ytmp3resp.buffer();
                                const namefileytmp3 = Math.floor(Math.random() * 10) + 20 
                                await fs.writeFile(`./temp/${namefileytmp3}_youtube.mp3`, ytmp3buffer)
                                await geps.sendPtt(from, `./temp/${namefileytmp3}_youtube.mp3`)
                                fs.unlinkSync(`./temp/${namefileytmp3}_youtube.mp3`)
                                browser.close();

                            })
                            .catch((err => {
                                console.log(err)
                                geps.reply(from, 'error', id)
                            }))
                    })();
                } catch (error) {
                    console.log('error bang')
                    geps.reply(from, 'error', id)
                }
            }
                break
            case prefix+'infobioskop':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const datainfobioskop = await axios.get(`https://api.vhtear.com/downloadfilm?judul=${q}&apikey=${config.vhtear}`)
                    const datainfobioskops = datainfobioskop.data.result
                    let ingfobioskop = `*Hasil Pencarian Film : ${q}*\n`
                    for (let i = 0; i < datainfobioskops.data.length; i++) {
                        ingfobioskop += `\n──────────────\n\n• *Resolusi* : ${datainfobioskops.data[i].resolusi}\n• *Link* : ${datainfobioskops.data[i].urlDownload}\n• *Judul akhir* : ${datainfobioskops.judul}\n`
                    }
                    await geps.reply(from, ingfobioskop, id)
                } catch (err) {
                    //console.log(err)
                    geps.reply(from, 'Maaf ingfo tidak ditemukan', id)
                }
                break
            case prefix+'togel':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                try {
                    const dataplai = await axios.get(`https://api.vhtear.com/togel&apikey=${config.vhtear}`)
                    const dataplay = dataplai.data.result
                    let tomgel = `*Huzzzzz*\n`
                    for (let i = 0; i < dataplay.hasil.length; i++) {
                        tomgel += `\n═════════════════\n\n*Negara* : ${dataplay.hasil[i].Negara}\n*Result* : ${dataplay.hasil[i].Senin}\n*Result* : ${dataplay.hasil[i].Selasa}\n*Result* : ${dataplay.hasil[i].Rabu}\n*Result* : ${dataplay.hasil[i].Kamis}\n*Result* : ${dataplay.hasil[i].Jumat}\n*Result* : ${dataplay.hasil[i].Sabtu}\n*Result* : ${dataplay.hasil[i].Minggu}\n`
                    }
                    await geps.reply(from, tomgel, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'heroml':
               if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
               if (!q) return await geps.reply(from, ind.wrongFormat(), id)
               if (isLimit(serial)) return
               await limitAdd(serial)
               try {
                   const resp = await axios.get(`https://api.vhtear.com/herodetail?query=${q}&apikey=${config.vhtear}`)
                   const anm2 = `• Title : ${resp.data.result.title}\n• Quotes : ${resp.data.result.quotes}\n• Info : ${resp.data.result.info}\n• Atribut : ${resp.data.result.attributes}`
                   geps.sendFileFromUrl(from, resp.data.result.pictHero, 'hero.jpg', anm2, id)
                 } catch (err) {
                  //console.error(err.message)
                   await geps.reply(from, 'Maaf, Hero tidak ditemukan', id)
                }
                break
            case prefix+'threats':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrleee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=threats&url=${getUrleee}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrleee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=threats&url=${getUrleee}&raw=1`, `Nekonime.jpg`, 'Nehh...', id)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'snobg':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrlno = await uploadImages(mediaData, false)
                    const nobgf = await axios.get(`https://api.vhtear.com/removebgwithurl?link=${getUrlno}&apikey=${config.vhtear}`)
                    const nobgff = nobgf.data.result.image
                    geps.sendStickerfromUrl(from, nobgff)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrlno = await uploadImages(mediaData, false)
                    const nobgf = await axios.get(`https://api.vhtear.com/removebgwithurl?link=${getUrlno}&apikey=${config.vhtear}`)
                    const nobgff = nobgf.data.result.image
                    geps.sendStickerfromUrl(from, nobgff)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'blurpify':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrlb = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=blurpify&image=${getUrlb}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrlb = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=blurpify&image=${getUrlb}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'gay':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.rainbow(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.rainbow(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'deletedd':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.delete(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.delete(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'cute':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.beautiful(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.beautiful(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'affect':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.affect(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.affect(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'jail':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.jail(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.jail(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'trash':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)

                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    canvas.Canvas.trash(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    canvas.Canvas.trash(mediaData)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_triggered.png`)
                            await geps.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                            fs.unlinkSync(`${sender.id}_triggered.png`)
                            await limitAdd(serial)
                        })
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'captcha':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrliee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=captcha&url=${getUrliee}&username=${q}&raw=1`, `Nekonime.jpg`, 'Noh mhank', id)
                    await limitAdd(serial)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrliee = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=captcha&url=${getUrliee}&username=${q}&raw=1`, `Nekonime.jpg`, 'Noh mhank', id)
                    await limitAdd(serial)
                } else {
                    await geps.reply(from, `Wrong Format!\nReply image dengan caption ${prefix}captcha [teks]\nContoh : ${prefix}captcha anjay`, id)
                }
                break
            case prefix+'deepfry':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrla = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=deepfry&image=${getUrla}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrla = await uploadImages(mediaData, false)
                    geps.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=deepfry&image=${getUrla}&raw=1`, `Nekonime.jpg`, 'Nehhhh', id)
                } else {
                    await geps.reply(from, 'Wrong Format!', id)
                }
                break
            case prefix+'ytmp4':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                try {
                    const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${q}&apikey=${config.vhtear}`)
                    if (!ytvh.ok) throw new Error(`Error YTMP4 : ${ytvh.statusText}`)
                    const ytvh2 = await ytvh.json()
                    if (ytvh2.status == false) {
                        geps.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        //if (Number(ytvh2.result.size.split(' MB')[0]) > 30.00) return geps.sendFileFromUrl(from, ytvh2.result.imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${ytvh2.result.title}\n• *Filesize* : ${ytvh2.result.size}\n\n__Maaf, Durasi video melebihi 30 MB. Silahkan download video melalui link dibawah_.\n${ytvh2.result.UrlVideo}`, id)
                        const { title, UrlVideo, imgUrl, size, status, ext } = await ytvh2.result
                        console.log(`VHTEAR : ${ext}\n${size}\n${status}`)
                        geps.sendFileFromUrl(from, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`, id)
                        const namafilemp4 = Math.floor(Math.random() * 10) + 20 
                        const ytmp4resp = await fetch(UrlVideo);
                        const ytmp4buffer = await ytmp4resp.buffer();
                        await fs.writeFile(`./temp/${namafilemp4}_youtube.mp4`, ytmp4buffer)
                        await geps.sendFile(from, `./temp/${namafilemp4}_youtube.mp4`)
                        console.log('Success sending Ytmp4!')
                        fs.unlinkSync(`./temp/${namafilemp4}_youtube.mp4`)
                        //await geps.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id)
                    }
                } catch (err) {
                    //geps.sendText(ownerNumber, 'Error ytmp4 : ' + err)
                    geps.reply(from, 'Oppss something wrong', id)
                }
                break
            case prefix+'igstalk':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const istalk2 = await axios.get(`https://api.vhtear.com/igprofile?query=${q}&apikey=${config.vhtear}`)
                    let { biography, follow, follower, full_name, picture, post_count, is_private } = istalk2.data.result
                    const istalk3 = `*「 INSTAGRAM PROFILE 」*

• *Username:* @${q}
• *Nama:* ${full_name}
• *Pengikut:* ${convertBalanceToString(follower)}
• *Mengikuti*: ${convertBalanceToString(follow)}
• *Jumlah Postingan:* ${convertBalanceToString(post_count)}
• *Private:* ${is_private ? 'YEs' : 'No'}
• *Deskripsi:* ${biography}`

                    const pictk = await bent("buffer")(picture)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, q, istalk3)
                } catch (err) {
                    await geps.reply(from, 'Maaf, User tidak ditemukan', id)
                }
                break
            case prefix+'starmaker':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const smkr2 = await axios.get(`https://api.vhtear.com/starmakerdl?link=${q}&apikey=${config.vhtear}`)
                    const { image, url, title } = smkr2.data.result

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, 'image.jpg', 'nihh mhank')
                    geps.sendFileFromUrl(from, url, `${title}.mp4`, '', id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Error Starmaker : ' + err)
                }
                break
            case prefix+'tiktoknowm':
            case prefix+'tktnowm':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                downloader.tikNoWm(q)
                    .then(async (res) => {
                        fs.writeFileSync(`./temp/${sender.id}.mp4`, res)
                        await geps.sendFile(from, `./temp/${sender.id}.mp4`, 'nowm.mp4', '', id)
                        fs.unlinkSync(`./temp/${sender.id}.mp4`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'tiktok': 
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                downloader.tik(q)
                    .then(async ({ result })=> {
                        await geps.sendFileFromUrl(from, result.video, 'tiktok.mp4', '', id)
                    })
                    .catch(async (err) => {
                        console.log(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'twitter':
            case prefix+'twt':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                downloader.tweet(q)
                    .then(async (data) => {
                        if (data.type === 'video') {
                            const content = data.variants.filter((x) => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                            const result = await misc.shortener(content[0].url)
                            console.log('Shortlink:', result)
                            await geps.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link HD: ${result}`, id)
                                .catch(async (err) => {
                                    console.error(err)
                                    await geps.reply(from, 'Error!', id)
                                })
                        } else if (data.type === 'photo') {
                            for (let i = 0; i < data.variants.length; i++) {
                                await geps.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', id)
                                .catch(async (err) => {
                                    console.error(err)
                                    await geps.reply(from, 'Error!', id)
                                })
                            }
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break

            // Misc
            case prefix+'afk':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (isAfkOn) return await geps.reply(from, ind.afkOnAlready(), id)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await geps.reply(from, ind.afkOn(pushname, reason), id)
            break
            case prefix+'subreddit':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + q + '/');
                    const { postLink, title, subreddit, url, nsfw, spoiler } = response1.data
                    if (nsfw == true) {
                        if ((isGroupMsg)){
                            await geps.reply(from, ind.wait(), id)
                            await geps.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                        }
                    } else {
                        await geps.reply(from, ind.wait(), id)
                        await geps.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)                    }
                } catch (err) {
                    await geps.sendImage(from, errorImg, 'oppss.jpg', `${q} Tidak ditemukan`, id)
                }
                break
            case prefix+'wallanime':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const walnime = ['https://wallpaperaccess.com/full/395986.jpg', 'https://wallpaperaccess.com/full/21628.jpg', 'https://wallpaperaccess.com/full/21622.jpg', 'https://wallpaperaccess.com/full/21612.jpg', 'https://wallpaperaccess.com/full/21611.png', 'https://wallpaperaccess.com/full/21597.jpg', 'https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png', 'https://wallpaperaccess.com/full/21591.jpg', 'https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg', 'https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg', 'https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png', 'https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg', 'https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png', 'https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg', 'https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg', 'https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png', 'https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png', 'https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg', 'https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg', 'https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png', 'https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png', 'https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg', 'https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png', 'https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg', 'https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg', 'https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg', 'https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png', 'https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg', 'https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg', 'https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png', 'https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg', 'https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png', 'https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg', 'https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg', 'https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg', 'https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png', 'https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg', 'https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png', 'https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg', 'https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg', 'https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg', 'https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg', 'https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg', 'https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg', 'https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg', 'https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg', 'https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png', 'https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg', 'https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg', 'https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg', 'https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png', 'https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png', 'https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png', 'https://cdn.nekos.life/wallpaper/yO6ioREenLA.png', 'https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg', 'https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png', 'https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png', 'https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg', 'https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg', 'https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg', 'https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg', 'https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/32EAswpy3M8.png', 'https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png', 'https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg', 'https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png', 'https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg', 'https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png', 'https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png', 'https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg', 'https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg', 'https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png', 'https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png', 'https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg', 'https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg', 'https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg', 'https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png', 'https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg', 'https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png', 'https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg', 'https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png', 'https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg', 'https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg', 'https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg', 'https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg', 'https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg', 'https://cdn.nekos.life/wallpaper/9ru2luBo360.png', 'https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png', 'https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png', 'https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg', 'https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg', 'https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg', 'https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg', 'https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png', 'https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png', 'https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg', 'https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg', 'https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png', 'https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg', 'https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg', 'https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg', 'https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg', 'https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg', 'https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg', 'https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg', 'https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg', 'https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg', 'https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg', 'https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png', 'https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg', 'https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png', 'https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg', 'https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png', 'https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg', 'https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png', 'https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png', 'https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png', 'https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png', 'https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png', 'https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png', 'https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png', 'https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg', 'https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg', 'https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg', 'https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg', 'https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg', 'https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png', 'https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg', 'https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg', 'https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg', 'https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg', 'https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg', 'https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg', 'https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png', 'https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png', 'https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png', 'https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg', 'https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg', 'https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg', 'https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg', 'https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg', 'https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png', 'https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png', 'https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg', 'https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg', 'https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg', 'https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png', 'https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png', 'https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg', 'https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png', 'https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg', 'https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg', 'https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png', 'https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg', 'https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg', 'https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg', 'https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg', 'https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg', 'https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png', 'https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png', 'https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg', 'https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png', 'https://cdn.nekos.life/wallpaper/58C37kkq39Y.png', 'https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg', 'https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg', 'https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg', 'https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png', 'https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg', 'https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg', 'https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png', 'https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg', 'https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg', 'https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png', 'https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg', 'https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg', 'https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png', 'https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png', 'https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg', 'https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg', 'https://cdn.nekos.life/wallpaper/89MQq6KaggI.png', 'https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
                let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
                geps.reply(from, ind.wait(), id)
                geps.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '*Wallanime!*', id)
                break
            case prefix+'googleimage':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                const Scraper = require('images-scraper');

                const google = new Scraper({
                    puppeteer: {
                    headless: true,
                        },
                    });

                (async () => {
                const results = await google.scrape(q, 200);
                geps.sendFileFromUrl(from, `${results[0].url}`, `${q}.jpg`, `*RESULT:* ${q}`, id)
                //console.log('results', results[0].url);
                })();
            } catch (err) {
                console.log(err)
                geps.reply(from, `error cok`, id)
            }
                 break
            case prefix+'lyric':
            case prefix+'lirik':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.lirik(q)
                    .then(async ({ result }) => {
                        if (result.code !== 200) return await geps.reply(from, 'Not found.', id)
                        await geps.reply(from, result.result, id)
                    })
                    .catch(async (err) => {
                        //console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'shorttiny':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const surl = await axios.get(`https://tobz-api.herokuapp.com/api/tinyurl?url=${q}&apikey=BotWeA`)
                const surll = surl.data
                if (surll.error) return geps.reply(from, surll.error, id)
                const surl2 = `Link : ${q}\nShort URL : ${surll.result}`
                break
            case prefix+'shortbitly':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const surl3 = await axios.get(`https://tobz-api.herokuapp.com/api/bitly?url=${q}&apikey=BotWeA`)
                const surll2 = surl3.data
                if (surll2.error) return geps.reply(from, surll2.error, id)
                const surl22 = `Link : ${q}\nShort URL : ${surll2.result}`
                geps.reply(from, surl22, id)
                break
            case prefix+'maps':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const mapz2 = await axios.get(`https://mnazria.herokuapp.com/api/maps?search=${q}`)
                    const { gambar } = mapz2.data
                    const pictk = await bent("buffer")(gambar)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${q}*`)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', `Maaf, Maps ${q} tidak ditemukan`)
                    geps.sendText(ownerNumber, 'Error Maps : ' + err)
                }
                break
            case prefix+'qrcode':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${q}`, 'gambar.png', 'Nihh bree...', id)
                break
            case prefix+'shortlink':
            case prefix+'shorturl':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isUrl(url)) return await geps.reply(from, ind.wrongFormat(), id)
                const urlShort = await misc.shortener(url)
                await geps.reply(from, ind.wait(), id)
                await geps.reply(from, urlShort, id)
            break
            case prefix+'wiki':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                const wikipediotod = await axios.get(`https://api.vhtear.com/wikipedia?query=${q}&apikey=${config.vhtear}`)
                var { Info } = wikipediotod.data.result
                const resultwikitod = `
*HASIL DARI:* ${q}

• Result: ${Info}`
                geps.reply(from, resultwikitod, id)
            } catch (err) {
                geps.reply(from, `Pencarian Wiki dengan ${q} tidak ditemukan`, id)
            }
            break
            /*case prefix + 'setbackground':
            case prefix + 'setbg':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    const levels = level.getLevelingLevel(sender.id, _level)
                    const xps = level.getLevelingXp(sender.id, _level)
                    //const setbegelah = body.slice(7)
                    if (levels === undefined && xps === undefined) return await geps.reply(from, `Maaf ${pushname} kamu belum memiliki level:(`, id)
                    card.replaceBg(sender.id, linkImg, _bg)
                    await geps.reply(from, 'Success set new background!', id)
                } else {
                    await geps.reply(from, `Salah!, Silahkan reply/kirim image dengan caption ${prefix}setbg`, id)
                }
                break*/
                case prefix+'imagepuisi':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                try {
                    await geps.sendFileFromUrl(from, `https://api.vhtear.com/puisi_image&apikey=${config.vhtear}`, 'Randompuisi.jpg', 'Nih', id)
                } catch (err) {
                    await geps.reply(from, `Terdapat Kesalahan, Atau error disebabkan oleh sistem`, id)
                }
                    break
                case prefix+'ebase64':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const ebase64url = await axios.get(`https://api.vhtear.com/encode_string?string=${q}&apikey=${config.vhtear}`)
                    let { encode_string } = ebase64url.data.result
                    const sendingebase64 = `「 *ENCODE BASE64* 」

*FROM*
• ${q}

*TO*
• ${encode_string}`
                    geps.reply(from, sendingebase64, id)
                } catch (err) {
                    console.loh(err)
                    geps.reply(from, `Terjadi kesalahan, Atau disebabkan oleh sistem`, id)
                }
                    break
            case prefix+'debase64':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const debase64url = await axios.get(`https://api.vhtear.com/decode_string?string=${q}&apikey=${config.vhtear}`)
                    let { decode_string } = debase64url.data.result
                    const sendingdebase64 = `「 *DECODE BASE64* 」

*FROM*
• ${q}

*TO*
• ${decode_string}`
                    geps.reply(from, sendingdebase64, id)
                } catch (err) {
                    console.loh(err)
                    geps.reply(from, `Terjadi kesalahan, Atau disebabkan oleh sistem`, id)
                }
                break
                case prefix+'ehex':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const encodehex = await axios.get(`https://api.vhtear.com/text_to_hex?string=${q}&apikey=${config.vhtear}`)
                    let { hex_code } = encodehex.data.result
                    const sendingecodehex = `「 *ENCODE HEX* 」

*FROM*
• ${q}

*TO*
• ${hex_code}`
                    geps.reply(from, sendingecodehex, id)
                } catch (err) {
                    geps.reply(from, `Terjadi kesalahan, Atau disebabkan oleh sistem`, id)
                }
                    break
            case prefix+'dehex':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const decodehex = await axios.get(`https://api.vhtear.com/hex_to_text?string=${q}&apikey=${config.vhtear}`)
                    let { result_text } = decodehex.data.result
                    const sendingdecodehex = `「 *DECODE HEX* 」

*FROM*
• ${q}

*TO*
• ${result_text}`
                    geps.reply(from, sendingdecodehex, id)
                } catch (err) {
                    geps.reply(from, `Terjadi kesalahan, Atau disebabkan oleh sistem`, id)
                }
                break
            case prefix+'news':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                try {
                    const response2 = await fetch(`https://api.vhtear.com/beritaterbaru&apikey=${config.vhtear}`)
                    if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                    const jsonber = await response2.json()
                    const { data } = await jsonber.result
                    let xixixi = `*「 BERITA TERKINI 」*\n\n`
                    for (let i = 0; i < data.length; i++) {
                        xixixi += `\n─────────────────\n\n*Source* : ${data[i].url}\n*Penulis* : ${data[i].author}\n*Judul* : ${data[i].title}\n*Deskripsi* : ${data[i].description}\n*Dipublikasi* : ${data[i].publishedAt}\n*Konten* : ${data[i].content}\n`
                    }
                    await geps.sendFileFromUrl(from, data[0].urlToImage, 'thumbserc.jpg', xixixi, id)
                } catch (err) {
                        console.log(err)
                        await geps.sendFileFromUrl(from, errorImg, 'error.jpg', '💔️ Maaf, Berita tidak ditemukan')
                        geps.sendText(ownerNumber, 'Berita Error : ' + err)
                }
                break
            case prefix+'instastory':
            case prefix+'igstory':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isGroupMsg) return await geps.reply(from, `Command ini hanya bisa dilakukan diprivate chat dikarenakan akan mengirim semua igstory`, id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                misc.its(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.story.itemlist.length; i++) {
                            const { urlDownload } = result.story.itemlist[i]
                            await geps.sendFileFromUrl(from, urlDownload, '', 'Nehhh...', id)
                        }
                    })
            break
            case prefix+'google':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                geps.reply(from, ind.wait(), id)
                if (q == undefined || q == ' ') return geps.reply(from, `*Hasil Pencarian : ${q}* tidak ditemukan`, id)
                google({ 'query': q }).then(results => {
                    let vars = `_*Hasil Pencarian : ${q}*_\n`
                    for (let i = 0; i < results.length; i++) {
                        vars += `\n──────────────\n\n• *Judul* : ${results[i].title}\n• *Deskripsi* : ${results[i].snippet}\n• *Link* : ${results[i].link}\n`
                    }
                    geps.reply(from, vars, id);
                }).catch(e => {
                    //console.log(e)
                    geps.reply(from, `Pencarian ${q} tidak ditemukan`)
                })
                break
            case prefix+'kbbi':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.kbbi(q)
                    .then(async ({ result }) => {
                        await geps.reply(from, result.hasil, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'linesticker':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const getline = await axios.get(`http://enznoire.herokuapp.com/line?url=${q}`)	
                if (getline.status === false) {
                    return geps.relpy(from, 'Upss maaf terjadi kesalahan [ERROR] mungkin linknya tidak valid')
                } else {
                    geps.reply(from, ind.wait(), id)
                    await geps.sendStickerfromUrl(from, getline.data.thumb)
                    for (let i = 0; i < getline.data.sticker.length; i++) {
                    await geps.sendStickerfromUrl(from, `${getline.data.sticker[i]}`)
                    }
                }
                break
            case prefix+'newsline':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                misc.linesticker()
                    .then(async ({ result }) => {
                        let lines = '-----[ *NEW STICKER* ]-----'
                        for (let i = 0; i < result.hasil.length; i++) {
                            lines +=  `\n\n➸ *Title*: ${result.hasil[i].title}\n➸ *URL*: ${result.hasil[i].uri}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, lines, id)
                        console.log('Success sending sticker Line!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'gempa':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                misc.bmkg()
                    .then(async ({ kedalaman, koordinat, lokasi, magnitude, map, potensi, waktu }) => {
                        const teksInfo = `${lokasi}\n\nKoordinat: ${koordinat}\nKedalaman: ${kedalaman}\nMagnitudo: ${magnitude} SR\nPotensi: ${potensi}\n\n${waktu}`
                        await geps.sendFileFromUrl(from, map, 'gempa.jpg', teksInfo, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'talk':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.reply(from, q, id)
                break
            case prefix+'addsay':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const says = body.slice(8)
                say.push(says)
                fs.writeFileSync('./database/bot/say.json', JSON.stringify(say))
                geps.reply(from, `Add ${says} sukses!\nUntuk melihat list ketik ${prefix}saylist`, id)
                break
            case prefix+'delsay':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                let delsayso = say.indexOf(q)
                say.splice(delsayso, 1)
                fs.writeFileSync('./database/bot/say.json', JSON.stringify(say))
                geps.reply(from, `Delete ${q} sukses!`, id)
                break
            case prefix+'say':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const manggildlu = JSON.parse(fs.readFileSync('./database/bot/say.json'))
                const ngemathbre = manggildlu[Math.floor(Math.random() * (manggildlu.length))]
                geps.reply(from, `${ngemathbre}`, id)
                break
            case prefix+'saylist':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                let saylisto = `Random say list\nTotal : ${say.length}\n`
                for (let i of say) {
                    saylisto += `☛ ${i}\n`
                }
                await geps.reply(from, saylisto, id)
                break
            case prefix+'pollresult':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                try {
                feature.getpoll(geps, message, pollfile, voterslistfile)
            } catch (err) {
                //console.log(err)
                geps.reply(from, `Sepertinya belum ada event poll digrup ini, Silahkan buat event poll dengan cara ${prefix}addpoll [optional]`, id)
            }
                break
            case prefix+'vote':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                feature.voteadapter(geps, message, pollfile, voterslistfile)
                break
            case prefix+'addpoll':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                feature.adminpollreset(geps, message, message.body.slice(9), pollfile, voterslistfile)
                break
            case prefix+'addcandidate':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                feature.addcandidate(geps, message, message.body.slice(14), pollfile, voterslistfile)
                break
            case prefix+'cekspek':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.gsmarena(q)
                        .then(async ({ result }) => {
                            await geps.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.gsm(result), id)
                        })
                } catch (err) {
                    geps.reply(from, 'Spek Hp tidak ditemukan', id)
                }
            break
            case prefix+'findsticker':
            case prefix+'findstiker':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.sticker(q)
                        .then(async ({ result }) => {
                            if (result.response !== 200) return await geps.reply(from, 'Not found!', id)
                            for (let i = 0; i < result.data.length; i++) {
                                await geps.sendStickerfromUrl(from, result.data[i])
                            }
                        })
                } catch (err) {
                    await geps.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'movie':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                misc.movie(q)
                    .then(async ({ result }) => {
                        let movies = `Result for: *${result.judul}*`
                        for (let i = 0; i < result.data.length; i++) {
                            movies +=  `\n\n• *Quality*: ${result.data[i].resolusi}\n• *URL*: ${result.data[i].urlDownload}\n\n──────────────`
                        }
                        await geps.reply(from, movies, id)
                    })
                    .catch(async (err) => {
                        await geps.reply(from, `Movie ${q} Tidak ditemukan`, id)
                    })
            break
            case prefix+'ytstalk':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try{
                    const fetchs = require("node-superfetch");
                    const channel = await fetchs.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${config.keyYoutubeV3}&maxResults=1&type=channel`);
                    const resultchannel = await fetchs.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${config.keyYoutubeV3}`);
                    const datachannel = `「 *YOUTUBE-STALK* 」

• *CHANNEL* : ${channel.body.items[0].snippet.channelTitle}
• *DESKRIPSI* : ${channel.body.items[0].snippet.description}
• *TOTAL SUBS* : ${convertBalanceToString(resultchannel.body.items[0].statistics.subscriberCount)}
• *TOTAL VIEW* : ${convertBalanceToString(resultchannel.body.items[0].statistics.viewCount)}
• *TOTAL VIDEO* : ${convertBalanceToString(resultchannel.body.items[0].statistics.videoCount)}
• *DATA CREATED* : ${channel.body.items[0].snippet.publishedAt}
• *LINK* : https://www.youtube.com/channel/${channel.body.items[0].id.channelId}
`
                    geps.reply(from, ind.wait(), id)
                    geps.sendFileFromUrl(from, `${channel.body.items[0].snippet.thumbnails.high.url}`, `youtube-stalk.jpg`, `${datachannel}`, id)
                } catch (err) {
                    console.log(err)
                    geps.reply(from, `Channel tidak ditemukan!`, id)
                }
                break
            case prefix+'encodebinary':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (q.length > 1024) return await geps.reply(from, `Gagal membuat karena Teks melebihi 1.024`, id)
                try {
                    function encode(char) {
                        return char.split("").map(str => {
                        const converted = str.charCodeAt(0).toString(2);
                        return converted.padStart(8, "0");
                        }).join(" ")
                    };
                    geps.reply(from, `「 *ENCODE TEKS TO BINARY* 」

*FROM*
• ${q}
                    
*TO*
• ${encode(q)}`, id)
                } catch (err) {
                    console.log(err)
                    geps.reply(from, `Something err`, id)
                }
                break
                case prefix+'decodebinary':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                    if (q.length > 1024) return await geps.reply(from, `Gagal membuat karena Teks melebihi 1.024`, id)
                    try {
                        function decode(char) {
                            return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
                        }
                        geps.reply(from, `「 *DECODE BINARY TO TEKS* 」

*FROM*
• ${q}
                        
*TO*
• ${decode(q)}`, id)
                    } catch (err) {
                        console.log(err)
                        geps.reply(from, `Something err`, id)
                    }
                    break
            case prefix+'cekongkir':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                const kurir = q.substring(0, q.indexOf('|') - 1)
                const askot = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const tukot = q.substring(q.lastIndexOf('|') + 2)
                misc.ongkir(kurir, askot, tukot)
                    .then(async ({ result }) => {
                        let onkir = `-----[ *${result.title}* ]-----`
                        for (let i = 0; i < result.data.length; i++) {
                            onkir +=  `\n\n➸ *Layanan*: ${result.data[i].layanan}\n➸ *Estimasi*: ${result.data[i].etd}\n➸ *Tarif*: ${result.data[i].tarif}\n➸ *Info*: ${result.informasi}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, onkir, id)
                        console.log('Success sending ongkir info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ttp':
            case prefix+'tosticker':
                        try
                    {
                        const string = body.toLowerCase().includes('#ttp') ? body.slice(5) : body.slice(5)
                        if(args)
                        {
                            if(quotedMsgObj == null)
                            {
                                const gasMake = await getStickerMaker(string)
                                if(gasMake.status == true)
                                {
                                    try{
                                        //let imageBase64s = `data:${mimetype};base64,${gasMake.base64.toString('base64')}`
                                        await geps.sendImageAsSticker(from, gasMake.base64, { author:`${config.authorstickerpack}`, pack: `${config.packagenamestick}`, keepScale: false })
                                        //await geps.sendImageAsSticker(from, gasMake.base64)
                                    }catch(err) {
                                        await geps.reply(from, 'Gagal membuat.', id)
                                    } 
                                }else{
                                    await geps.reply(from, gasMake.reason, id)
                                }
                            }else if(quotedMsgObj != null){
                                const gasMake = await getStickerMaker(quotedMsgObj.body)
                                if(gasMake.status == true)
                                {
                                    try{
                                        //let imageBase64s = `data:${mimetype};base64,${gasMake.base64.toString('base64')}`
                                        await geps.sendImageAsSticker(from, gasMake.base64, { author:`${config.authorstickerpack}`, pack: `${config.packagenamestick}`, keepScale: false })
                                    }catch(err) {
                                        await geps.reply(from, 'Gagal membuat.', id)
                                    } 
                                }else{
                                    await geps.reply(from, gasMake.reason, id)
                                }
                            }
                           
                        }else{
                            await geps.reply(from, 'Tidak boleh kosong.', id)
                        }
                    }catch(error)
                    {
                        console.log(error)
                    }
                break
            case prefix+'distance':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const kotaAsal = q.substring(0, q.indexOf('|') - 1)
                const kotaTujuan = q.substring(q.lastIndexOf('|') + 2)
                misc.distance(kotaAsal, kotaTujuan)
                    .then(async ({ result }) => {
                        if (result.response !== 200) {
                            await geps.reply(from, 'Error!', id)
                        } else {
                            await geps.reply(from, result.data, id)
                            console.log('Success sending distance info!')
                        }
                    })
            break
            case prefix+`addimage`:
                let imageom = body.slice(10)
                if (!imageom) return geps.reply(from, `teksnya mana?\nContoh : ${prefix}addimage punya mrg3p5`, id)
                if (quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const filename = `./database/temp/image/${imageom}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    imagelist.push(imageom)
                    fs.writeFileSync('./database/bot/image.json', JSON.stringify(imagelist))
                    await geps.reply(from, `Image dengan nama ${imageom} berhasil disimpan!\nSilahkan ketik ${prefix}imagelist untuk melihat list image`, id)
                }else if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(message, uaOverride)
                    const filename = `./database/temp/image/${imageom}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    imagelist.push(imageom)
                    fs.writeFileSync('./database/bot/image.json', JSON.stringify(imagelist))
                    await geps.reply(from, `Image dengan nama ${imageom} berhasil disimpan!\nSilahkan ketik ${prefix}imagelist untuk melihat list image`, id)
                }else{
                    await geps.reply(from, 'Error! Silahkan coba kembali...', id)
                }
                break
                case prefix+`getimage`:
                    try {
                    const pftpt = body.slice(10)
                    await geps.sendImage(from, `./database/temp/image/${pftpt}.jpeg`, id)
                } catch (err) {
                    //console.error(err)
                    await geps.reply(from, `Pastikan nama image ada di ${prefix}imagelist`, id)
                }
                break
                case prefix+'imagelist':
                case prefix+'imglist':
                case prefix+'listimage':
                case prefix+'listimg':   
                    let imagebos = `┌─「 *LIST IMAGE RANDOM* 」\n│\n├ Total : ${imagelist.length}\n`
                    for (let i of imagelist) {
                    imagebos += `├ `
                    imagebos += `${i}\n`
                    }
                    imagebos += '│\n└─「 *DarkChat-BOT* 」'
                    await geps.sendText(from, imagebos)
                  break
                  case prefix+`getvn`:
                    try{
                    const namfil = body.slice(7)
                    await geps.sendPtt(from, `./database/temp/vn/${namfil}.mp3`, id)
                } catch (err) {
                    //console.error(err)
                    await geps.reply(from, `Pastikan nama vn ada di ${prefix}vnlist`, id)
                }
                    break
                case prefix+`addvn`:
                    let nmfil = body.slice(7)
                    if (!nmfil) return geps.reply(from, `teksnya mana?\nContoh : ${prefix}setvn desah`, id)
                    if (isQuotedAudio){
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const filename = `./database/temp/vn/${nmfil}.mp3`
                        await fs.writeFileSync(filename, mediaData)
                        vnlist.push(nmfil)
                        fs.writeFileSync('./database/bot/vn.json', JSON.stringify(vnlist))
                        await geps.reply(from, `Vn dengan nama ${nmfil} berhasil disimpan!\nSilahkan ketik ${prefix}vnlist untuk melihat list vn`, id)
                    }else if(isMedia && type === 'audio'){
                        const mediaData = await decryptMedia(message, uaOverride)
                        const filename = `./database/temp/vn/${nmfil}.mp3`
                        await fs.writeFileSync(filename, mediaData)
                        vnlist.push(nmfil)
                        fs.writeFileSync('./database/bot/vn.json', JSON.stringify(vnlist))
                        await geps.reply(from, `Vn dengan nama ${nmfil} berhasil disimpan!\nSilahkan ketik ${prefix}vnlist untuk melihat list vn`, id)
                    }else{
                        await geps.reply(from, 'Error! Silahkan coba kembali...', id)
                    }
                    break
                case prefix+'vnlist':
                case prefix+'listvn':
                    let vn = `┌─「 *LIST VN RANDOM* 」\n│\n├ Total : ${vnlist.length}\n`
                    for (let i of vnlist) {
                    vn += `├ `
                    vn += `${i}\n`
                    }
                    vn += '│\n└─「 *DarkChat-BOT* 」'
                    await geps.reply(from, vn, id)
                    break
            case prefix+'tiktokstalk':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const tstalk2 = await axios.get(`https://api.vhtear.com/tiktokprofile?query=${q}&apikey=${config.vhtear}`)
                    const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
                    const tiktod = `*User Ditemukan!*
• *Username:* ${username}
• *Judul:* ${title}
• *Bio:* ${bio}
• *Mengikuti:* ${follow}
• *Pengikut:* ${follower}
• *Jumlah Like*: ${like_count}
• *Jumlah Postingan:* ${video_post}
• *Deskripsi:* ${description}
• *Link:* ${url_account}`

                    const pictk = await bent("buffer")(picture)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, title, tiktod)
                } catch (err) {
                    await geps.reply(from, 'Username tidak ditemukan', id)
                }
                break
            /*case prefix+'tts':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const speech = q.substring(q.indexOf('|') + 2)
                const ptt = tts(ar[0])
                try {
                    ptt.save(`${speech}.mp3`, speech, async () => {
                        await geps.sendPtt(from, `${speech}.mp3`, id)
                        fs.unlinkSync(`${speech}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break*/
           case prefix+'tts':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                try {
                    var dataBhs = args[0]
                    const ttsHZ = require('node-gtts')(dataBhs)
                    var dataText = body.slice(8)
                    if (dataText === '') return geps.reply(from, 'Masukkan teksnya', id)
                    if (dataText.length > 500) return geps.reply(from, 'Teks terlalu panjang!', id)
                    var dataBhs = body.slice(5, 7)
                    ttsHZ.save('./temp/tts.mp3', dataText, function () {
                    geps.sendPtt(from, './temp/tts.mp3', id)
                    })
                } catch (err){
                    geps.reply(from, `Format salah! yang benar adalah\nContoh: ${prefix}tts id cek`, id)
                    }
                break
            case prefix+'flip':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const sides = Math.floor(Math.random() * 2) + 1
                if (sides == 1) {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/LJjkVK5/heads.png', id)
              } else {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/wNnZ4QD/tails.png', id)
              }
                break
                /*case prefix+'tomedia':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    if (isLimit(serial)) return
                    await limitAdd(serial)
                    if (isQuotedSticker) {
                    //if ((isMedia && isVideo || isQuotedVideo)) {
                        await geps.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedSticker ? quotedMsg : message
                        const _mimetype = isQuotedSticker ? quotedMsg.mimetype : mimetype
                        console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const temp = './temp'
                        const name = new Date() * 1
                        const fileInputPath = path.join(temp, 'webp', `${name}.${_mimetype.replace(/.+\//, '')}`)
                        //const fileOutputPath = path.join(temp, 'mp4', `${name}.mp4`)
                        const encodebase64321 = `data:${mimetype};base64,${fileInputPath.toString('base64')}`
                        await geps.sendGiphy(from, encodebase64321, 'ghipy.gif')
                    } else {
                        await geps.reply(from, `Reply videonya kaka dengan caption ${prefix}tomp3`, id)
                    }
                break*/
            case prefix+'pantun':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
                .then(res => res.text())
                .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                geps.reply(from, randompantun.replace(/aruga-line/g,"\n"), id)
                })
                .catch(() => {
                geps.reply(from, 'Ada yang Error!', id)
                })
                break
            case prefix+'fakta':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
                .then(res => res.text())
                .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                geps.reply(from, randomnix, id)
                })
                .catch(() => {
                geps.reply(from, 'Ada yang Error!', id)
                })
                break
            case prefix+'katabijak':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
                .then(res => res.text())
                .then(body => {
                let splitbijak = body.split('\n')
                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                geps.reply(from, randombijak, id)
                })
                .catch(() => {
                geps.reply(from, 'Ada yang Error!', id)
                })
                break
            case prefix+'tomp3': // by: Piyobot
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                if ((isMedia && isVideo || isQuotedVideo)) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .format('mp3')
                            .on('start', (commandLine) => {
                                //console.log(color('[FFmpeg]', 'green'), commandLine) Nyepam su
                            })
                            .on('progress', (progress) => {
                                //console.log(color('[FFmpeg]', 'green'), progress) Nyepam ugha
                            })
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await geps.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await geps.reply(from, `Reply videonya kaka dengan caption ${prefix}tomp3`, id)
                }
            break
            case prefix+'playstore':
            case prefix+'ps':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.playstore(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { app_id, icon, title, developer, description, price, free } = result[i]
                                await geps.sendFileFromUrl(from, icon, `${title}.jpg`, ind.playstore(app_id, title, developer, description, price, free))
                            }
                            console.log('Success sending PlayStore result!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'math':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                if (typeof mathjs.evaluate(q) !== 'number') {
                    await geps.reply(from, ind.notNum(q), id)
                } else {
                    await geps.reply(from, `*「 MATH 」*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
            } catch (err) {
                geps.reply(from, 'Terjadi Kesalahan', id)
            }
            break
            case prefix+'shopee':
            case prefix+'shoope':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const namaBarang = q.substring(0, q.indexOf('|') - 1)
                const jumlahBarang = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                try {
                    misc.shopee(namaBarang, jumlahBarang)
                        .then(async ({ result }) => {
                            for (let i = 0; i < result.items.length; i++) {
                                const { nama, harga, terjual, shop_location, description, link_product, image_cover } = result.items[i]
                                await geps.sendFileFromUrl(from, image_cover, `${nama}.jpg`, ind.shopee(nama, harga, terjual, shop_location, description, link_product))
                            }
                            console.log('Success sending Shopee data!')
                        })
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, `Error!\n\n${err}`, id)
                }
            break
            case prefix+'partner':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isGroupMsg) return await geps.reply(from, 'Command ini tidak bisa digunakan di dalam grup!\nKarena saya menjaga privasi seseorang untuk tidak diumbar!', id)
                await geps.reply(from, 'Looking for a partner...', id)
                await geps.sendContact(from, register.getRegisteredRandomId(_registered))
                await geps.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`, id)
            break
            case prefix+'fakename':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const linkfake = await axios.get(`https://freerestapi.herokuapp.com/api/v1/fakename?country=en`)
                const fakelink = linkfake.data
                geps.reply(from, `「 *FAKE-NAME* 」\n\n*Name* : ${fakelink.name} \n*Birthday* : ${fakelink.birthday} \n*Address* : ${fakelink.address} \n*City* : ${fakelink.city} \n*Region* : ${fakelink.region} \n*Country* : ${fakelink.country} \n*Zip* : ${fakelink.zip} \n*Phone Number* : ${fakelink.phone_number} \n*Username* : ${fakelink.username} \n*Password* : ${fakelink.password} \n*Email* : ${fakelink.email}`, id)
                break
            case prefix+'next':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isGroupMsg) return await geps.reply(from, 'Command ini tidak bisa digunakan di dalam grup!\nKarena saya menjaga privasi seseorang untuk tidak diumbar!', id)
                await geps.reply(from, 'Looking for a partner...', id)
                await geps.sendContact(from, register.getRegisteredRandomId(_registered))
                await geps.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`, id)
            break
            case prefix+'tafsir':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (args.length === 0) return geps.reply(from, `Untuk menampilkan ayat Al-Qur'an tertentu beserta tafsir dan terjemahannya\ngunakan ${prefix}tafsir surah ayat\n\nContoh: ${prefix}tafsir Al-Mulk 10`, id)
                await geps.reply(from, ind.wait(), id)
                const responSurah = await axios.get('https://raw.githubusercontent.com/VideFrelan/words/main/tafsir.txt')
                const { data } = responSurah.data
                const idx = data.findIndex((post) => {
                    if ((post.name.transliteration.id.toLowerCase() === args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() === args[0].toLowerCase())) return true
                })
                const nomerSurah = data[idx].number
                if (!isNaN(nomerSurah)) {
                    const responseh = await axios.get('https://api.quran.sutanlab.id/surah/'+ nomerSurah + '/'+ args[1])
                    const { data } = responseh.data
                    let pesan = ''
                    pesan += 'Tafsir Q.S. ' + data.surah.name.transliteration.id + ':' + args[1] + '\n\n'
                    pesan += data.text.arab + '\n\n'
                    pesan += '_' + data.translation.id + '_\n\n' + data.tafsir.id.long
                    await geps.reply(from, pesan, id)
                }
            break
            case prefix+'listsurah':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.reply(from, ind.wait(), id)
                misc.listSurah()
                    .then(async ({ result }) => {
                        let list = '-----[ AL-QUR\'AN LIST ]-----\n\n'
                        for (let i = 0; i < result.list.length; i++) {
                            list += `${result.list[i]}\n\n`
                        }
                        await geps.reply(from, list, id)
                        console.log('Success sending Al-Qur\'an list!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'surah':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.getSurah(args[0])
                    .then(async ({ result }) => {
                        await geps.reply(from, `${result.surah}\n\n${result.quran}`, id)
                        console.log('Success sending surah!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'motivasi':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                misc.motivasi()
                    .then(async (body) => {
                        const motivasiSplit = body.split('\n')
                        const randomMotivasi = motivasiSplit[Math.floor(Math.random() * motivasiSplit.length)]
                        await geps.reply(from, randomMotivasi, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'play':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                misc.ytPlay(q)
                    .then(async ({ result }) => {
                        if (Number(result.size.split(' MB')[0]) >= 20.0) return geps.reply(from, `Maaf ${pushname}, Maximal File 20mb`, id)
                        await geps.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.ytPlay(result), id)
                        const responses = await fetch(result.mp3);
                        const buffer = await responses.buffer(); 
                        const namefileplay = Math.floor(Math.random() * 10) + 20
                        await fs.writeFile(`./temp/${namefileplay}.mp3`, buffer)
                        //await geps.sendFile(from, `./temp/${result.title}.mp3`, `${result.title}`, id)
                        await geps.sendPtt(from, `./temp/${namefileplay}.mp3`)
                        console.log('Success sending Play MP3!')
                        fs.unlinkSync(`./temp/${namefileplay}.mp3`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'joox':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                downloader.joox(q)
                    .then(async ({ result }) => {
                        if (Number(result[0].filesize.split(' MB')[0]) >= 10.0) return geps.sendFileFromUrl(from, result[0].linkImg, `${result[0].judul}.jpg`, `Judul: ${result[0].judul}\nSize: *${result[0].filesize}*\n\nGagal, Maksimal video size adalah *10MB*!`, id)
                        await geps.sendFileFromUrl(from, result[0].linkImg, `${result.title}.jpg`, ind.joox(result), id)
                        const responsess = await fetch(result[0].linkMp3);
                        const buffers = await responsess.buffer();
                        const namefilejoox = Math.floor(Math.random() * 10) + 20
                        await fs.writeFile(`./temp/${namefilejoox}_joox.mp3`, buffers)
                        await geps.sendPtt(from, `./temp/${namefilejoox}_joox.mp3`)
                        console.log('Success sending Joox!')
                        fs.unlinkSync(`./temp/${namefilejoox}_joox.mp3`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ssweb':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.sendFileFromUrl(from, `https://api.vhtear.com/ssweb?link=${q}&type=pc&apikey=${config.vhtear}`, 'ssurl.jpg', `*Result* : ${q}`, id)
                break
            case prefix+'whois':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.whois(args[0])
                    .then(async ({ result }) => {
                        await geps.reply(from, `*「 WHOIS 」*\n\n➸ *IP address*: ${result.ip_address}\n➸ *City*: ${result.city}\n➸ *Region*: ${result.region}\n➸ *Country*: ${result.country}\n➸ *ZIP code*: ${result.postal_code}\n➸ *Latitude and longitude*: ${result.latitude_longitude}\n➸ *Time zone*: ${result.time_zone}\n➸ *Call code*: ${result.calling_code}\n➸ *Currency*: ${result.currency}\n➸ *Language code*: ${result.languages}\n➸ *ASN*: ${result.asn}\n➸ *Organization*: ${result.org}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'toxic':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.reply(from, toxic(), id)
            break
            case prefix+'alkitab':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                misc.alkitab(q)
                    .then(async ({ result }) => {
                        let alkitab = '-----[ *AL-KITAB* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            alkitab +=  `\n\n➸ *Ayat*: ${result[i].ayat}\n➸ *Isi*: ${result[i].isi}\n➸ *Link*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, alkitab, id)
                        console.log('Success sending Al-Kitab!')
                    })
            break
            case prefix+'quran':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const qura = `https://api.vhtear.com/quran?no=${q}&apikey=${config.vhtear}`
                const quraan = await axios.get(qura)
                const quraann = quraan.data
                let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
                await geps.reply(from, `${hasqu}`, id).catch(() => geps.reply(from, `*Terdapat kesalahan saat mencari surat ${q}*`, id))
                break
            case prefix+'reminder': // by Slavyan
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await geps.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await geps.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${reminder.getReminderMsg(sender.id, _reminder)}`)
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
            break
            case prefix+'join':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, `Linknya mana?\nContoh ${prefix}join https://example.com`, id)
                const checkInvite = await geps.inviteInfo(q)
                if (isOwner) {
                    await geps.joinGroupViaLink(q)
                    await geps.reply(from, ind.ok(), id)
                    await geps.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                } else {
                    const getGroupData = await geps.getAllGroups()
                    if (getGroupData.length >= groupLimit) {
                        await geps.reply(from, `Invite refused. Max group is: ${groupLimit}`, id)
                    } else if (getGroupData.size <= memberLimit) {
                        await geps.reply(from, `Invite refused. Minimum member is: ${memberLimit}`, id)
                    } else {
                        await geps.joinGroupViaLink(q)
                        await geps.reply(from, ind.ok(), id)
                        await geps.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                    }
                }
            break
            case prefix+'imagetourl':
            case prefix+'imgtourl':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await geps.reply(from, linkImg, id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'infohoax':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.reply(from, ind.wait(), id)
                misc.infoHoax()
                    .then(async ({ result }) => {
                        let txt = '*「 HOAXES 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { tag, title, link } = result[i]
                            txt += `\n\n➸ *Status*: ${tag}\n➸ *Deskripsi*: ${title}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.sendFileFromUrl(from, result[0].image, 'hoax.jpg', txt, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'pinterest':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${q}&apikey=${config.vhtear}`)
                const ptrs = await ptrst.json()
                const ptrsn = ptrs.result
                const b = JSON.parse(JSON.stringify(ptrsn))
                const ptrs2 = b[Math.floor(Math.random() * b.length)]
                const image = await bent("buffer")(ptrs2)
                const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                await geps.sendImage(from, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${q}*`, id)
            } catch (err) {
                geps.reply(from, `Pencarian ${q} tidak ditemukan`, id)
            }
                break
            case prefix+'brainly':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/branly?query=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(from, resp.data.error, id)
                    const anm2 = `➸ Jawaban : ${resp.data.result.data}`
                    geps.reply(from, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Brainly Error : ' + err)
                }
                break
            case prefix+'estetik':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const aestetic = ["http://wa-botstiker.my.id/images/aesthetic/aachal-6geVJeZJMg8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/abyan-athif-BCx6t5pJwVw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-UUJzCuHUfYI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-kx1r9Fgqe7s-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-lXaOSpd_UQw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anders-jilden-AkUR27wtaxs-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/andrea-boschini-5Ipk8IgNpPg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anmol-gupta-6Zpojuvyr-E-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/austin-chan-ukzHlkoz1IE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/bantersnaps-1sUs8JbGx74-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/beasty--HxIhfS_dUk-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/daniel-tseng-W9kq9suABY4-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/estee-janssens-MUf7Ly04sOI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/fabian-moller-gI7zgb80QWY-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/florian-klauer-mk7D-4UCfmg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/ian-dooley-aaAllJ6bmac-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/karthikeya-gs-ZMM2sVJKd3A-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/kevin-laminto-hSeh-3ID830-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/larm-rmah-CB8tGaFoW38-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/matthew-ronder-seid-GWzCpqXPNDw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/orfeas-green-G5A5ZNjS2tE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/pari-karra-elK1z1WcsR8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-qEWEz-U5p8Q-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-z4gWzj0p93c-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/tamara-gore-ldZrvy2SOEA-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/vanessa-serpas-S4fYv5LQ4_A-unsplash.jpg"]
                let aes = aestetic[Math.floor(Math.random() * aestetic.length)]
                geps.sendFileFromUrl(from, aes, 'aestetic.jpg', 'aesthetic')
                break
            case prefix+'cecan':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const itemslh = ["https://i.pinimg.com/originals/69/d7/b3/69d7b3d5a089e7cbee0250ea5da9b14b.jpg","https://i.pinimg.com/originals/78/fa/10/78fa10ab94c0dc9e19a18358a9752070.jpg","https://i.pinimg.com/originals/93/e0/a3/93e0a3816183696ff89b1ad7db2fd3c0.jpg","https://i.pinimg.com/originals/a6/34/cf/a634cfa655269069439e9476780b46fe.jpg","https://i.pinimg.com/originals/dc/f5/69/dcf569a7b08efcae64d0747b51d04a7d.jpg","https://i.pinimg.com/originals/4f/96/2b/4f962b89bd7ceb438b3e9ebbd075184c.jpg","https://i.pinimg.com/originals/c2/fb/e7/c2fbe7a6955a85c51b9ee8062a7b68d3.jpg","https://i.pinimg.com/originals/44/54/24/44542415cf206f2c041e3bbb52a69419.jpg","https://i.pinimg.com/originals/ae/3c/40/ae3c40e0a2f653811b5a67ccd6b9d8cc.jpg","https://i.pinimg.com/originals/bd/fa/33/bdfa3317d96e6cdafaf27e3b337d05b4.jpg","https://i.pinimg.com/originals/75/6a/f2/756af236ae909431567ed184c43aae6f.png","https://i.pinimg.com/originals/a5/95/d7/a595d7fe6b8dc00d1aaa7287f1dd304e.jpg","https://i.pinimg.com/originals/40/37/78/40377871ee06a4a434c39e90b1f647e1.jpg","https://i.pinimg.com/originals/45/73/ac/4573ac9484c480500872b7c91f758040.jpg","https://i.pinimg.com/originals/32/7d/0b/327d0be89cc60321128d0f0bdaadfc15.jpg","https://i.pinimg.com/originals/f4/a1/0f/f4a10ffd44aea604383be84a34f69f90.jpg","https://i.pinimg.com/originals/ec/7f/b5/ec7fb5506136f72876633aab957a755a.jpg","https://i.pinimg.com/originals/4c/e9/15/4ce915c8245586f541c4d0a8b71cc500.jpg","https://i.pinimg.com/originals/03/2a/14/032a145e96154753e33bdda30d9f41f1.jpg","https://i.pinimg.com/originals/f4/5b/07/f45b070de82acec89092eaea1b415029.jpg","https://i.pinimg.com/originals/a9/f2/da/a9f2da1277fb7bc801856c3b9c12d37d.jpg","https://i.pinimg.com/originals/af/ab/93/afab93ebbf109a601dcb77b5baa494b4.jpg","https://i.pinimg.com/originals/b9/38/df/b938dfba6c139ad45ce51203a43eac0d.jpg","https://i.pinimg.com/originals/af/10/0a/af100a49cb8f53f0dd5b48664ede9db8.jpg","https://i.pinimg.com/originals/99/18/6c/99186c2145e1223f885103f51817be78.jpg","https://i.pinimg.com/originals/3c/fd/c9/3cfdc9ba7cf79ed061808e162162f4da.jpg","https://i.pinimg.com/originals/31/95/64/319564a33b5ed46a52d30c18d2310f22.jpg","https://i.pinimg.com/originals/1c/2d/9f/1c2d9ffdd104200355bab43c9d3fad20.gif","https://i.pinimg.com/originals/4a/aa/12/4aaa12940f51fdfb1684964df3796c4c.jpg","https://i.pinimg.com/originals/37/90/bc/3790bc29be16d95174af4eff4ee3859f.jpg","https://i.pinimg.com/originals/4c/12/8f/4c128fda6e71a9f4c670a78a21d8c196.jpg","https://i.pinimg.com/originals/34/92/10/3492100b4a924458a2bf5340d68293c2.jpg","https://i.pinimg.com/originals/5a/dd/12/5add12091eafba364ec76c91d20e75ac.jpg","https://i.pinimg.com/originals/da/c3/59/dac359d1fc87193c2b9d85bb96fedcbc.jpg","https://i.pinimg.com/originals/2e/d6/a9/2ed6a9670d942220eab92b99bb0d1c09.jpg","https://i.pinimg.com/originals/f1/89/e3/f189e3d9b353f91b60060cc64e6706c9.jpg","https://i.pinimg.com/originals/8c/06/c2/8c06c22283cf98abdb8922e2f3aa0a6a.jpg","https://i.pinimg.com/originals/8b/6f/0b/8b6f0b1e213240eaad90894292a2d3c1.jpg","https://i.pinimg.com/originals/89/bf/b8/89bfb86392d39477adcd66444cf19845.jpg","https://i.pinimg.com/originals/35/e2/cc/35e2cc3c535d8f1cfeaf13cce69ac984.jpg","https://i.pinimg.com/originals/c0/01/a1/c001a16e2629872a3d7ea7fdbe5a4e98.jpg","https://i.pinimg.com/originals/b4/eb/48/b4eb486def2d413716c5fa033af9fb34.jpg","https://i.pinimg.com/originals/55/ee/7b/55ee7b5f4889cc34ec1a01d2e7875b53.jpg","https://i.pinimg.com/originals/0c/b3/0e/0cb30ea660aafbae32cc07433bf3eea2.jpg","https://i.pinimg.com/originals/1f/50/23/1f5023991f2a01cff748e84c4cf3612d.jpg","https://i.pinimg.com/originals/ab/53/07/ab5307df9234934f385eb6235aa6c2cd.jpg","https://i.pinimg.com/originals/e1/a1/7c/e1a17c5f359846741c687ef1fcadb316.jpg","https://i.pinimg.com/originals/16/1b/21/161b215ee2f8e0a040c91f18c054d705.jpg","https://i.pinimg.com/originals/da/07/1a/da071a5fafbc6487d38edd4e9f3401db.jpg","https://i.pinimg.com/originals/54/f4/26/54f42615f9ad45743e6fb08ed86623f0.jpg"]
                let cewelh = itemslh[Math.floor(Math.random() *itemslh.length)]
                geps.sendFileFromUrl(from, cewelh, 'ptlsh.jpeg', 'Wkwkwkw', id)
                break
            case prefix+'cogan':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const lista = ["https://croedil.com/wp-content/uploads/2020/04/jmet-6.jpg","https://1.bp.blogspot.com/-VgD8M3SboB4/VjrXsjMuqVI/AAAAAAAAAEw/u3XH204M-v4/s1600/emo-alay.jpg,","https://cdn.idntimes.com/content-images/qna/2020/04/1127-0e907286abdd5b121c1ba478bf438740_600x400.jpg","https://pbs.twimg.com/media/EZurOJKUYAA9SOm.jpg","https://cdn-brilio-net.akamaized.net/news/2020/05/08/184074/1223821-8-penampakan-tokoh-upin-ipin-jadi-jamet.jpg","https://i1.sndcdn.com/avatars-000563943594-kprysk-t500x500.jpg","https://4.bp.blogspot.com/-tipqBt89hso/UEp1Kbk57BI/AAAAAAAAA3I/UkCWeaubvY8/s280/531597_204824659645932_284866801_n.jpg","https://i.pinimg.com/236x/f2/cd/f2/f2cdf277b050a4177a413cbb1a3670a2.jpg","https://3.bp.blogspot.com/-fX4LAMxwtTw/T0pK9AMCk_I/AAAAAAAAADY/Vjycs-5daNk/s1600/383980_317815444909102_100000419486231_1170665_1061758354_n.jpg","https://2.bp.blogspot.com/-6ClgolefeeM/U-uDyvQRA3I/AAAAAAAALmY/sx7_-93-qac/s1600/MANUSIA%2BPALING%2BJELEK%2BSEDUNIA.jpg","https://jajanksblog.files.wordpress.com/2012/02/hikmah2bjadi2borang2bjelek.jpg"]
                let ra = lista[Math.floor(Math.random() * lista.length)]
                geps.sendFileFromUrl(from, ra, 'cwo.jpeg', 'nih cogan !')
                break
            case prefix+'dadu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const dice = Math.floor(Math.random() * 6) + 1
                await geps.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
                break
            case prefix+'koin':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const side = Math.floor(Math.random() * 2) + 1
                if (side == 1) {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
                } else {
                geps.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
                }
                break
            case prefix+'ptl':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
                let pep = pptl[Math.floor(Math.random() * pptl.length)]
                geps.sendFileFromUrl(from, pep, 'pptl.jpg', 'Nehhh', id)
                break
                case prefix+'bass':{
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    if (!isQuotedAudio) return await geps.reply(from, `Reply vnnya kaka dengan valuenya\nContoh : ${prefix}bass 1000`, id)
                    if (isLimit(serial)) return
                    await limitAdd(serial)
                    if (isQuotedAudio) {
                        let dB = 20
                        let freq = 60
                        if (args[0]) dB = clamp(parseInt(args[0]) || 20, 0, 50)
                        if (args[1]) freq = clamp(parseInt(args[1]) || 20, 20, 500)
                        let mediaData = await decryptMedia(quotedMsg)
                        let temp = './temp'
                        let name = new Date() * 1
                        let fileInputPath = path.join(temp, 'audio', `${name}.mp3`)
                        let fileOutputPath = path.join(temp, 'audio', `${name}_2.mp3`)
                        console.log(color('[fs]', 'green'), `Writing media into '${fileInputPath}'`)
                        fs.writeFile(fileInputPath, mediaData, err => {
                            if (err) return geps.sendText(from, 'Ada yang error saat menulis file', id)
                            ffmpeg(fileInputPath)
                                .audioFilter('equalizer=f=' + freq + ':width_type=o:width=2:g=' + dB)
                                .format('mp3')
                                .on('start', function (commandLine) {
                                    //console.log(color('[FFmpeg]', 'green'), commandLine)
                                })
                                .on('progress', function (progress) {
                                    //console.log(color('[FFmpeg]', 'green'), progress)
                                })
                                .on('end', function () {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                                    // if (err) return client.sendText(from, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                                    geps.sendPtt(from, fileOutputPath, id)
                                    // })
                                    setTimeout(() => {
                                        try {
                                            fs.unlinkSync(fileInputPath)
                                            fs.unlinkSync(fileOutputPath)
                                        } catch (e) { _err(e) }
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    }
                }
                break
            case prefix+'jobseek':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                misc.jobSeek()
                    .then(async ({ result }) => {
                        let txt = '*「 JOB SEEKER 」*'
                        for (let i = 0; i < result.length; i++) {
                            const { perusahaan, link, profesi, gaji, lokasi, pengalaman, edukasi, desc, syarat } = result[i]
                            txt += `\n\n➸ *Perusahaan*: ${perusahaan}\n➸ *Lokasi*: ${lokasi}\n➸ *Profesi*: ${profesi}\n➸ *Gaji*: ${gaji}\n➸ *Pengalaman*: ${pengalaman}\n➸ *Deskripsi*: ${desc}\n➸ *Syarat*: ${syarat}\n➸ *Edukasi*: ${edukasi}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, txt, id)
                        console.log('Success sending jobseek!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'menu':
            case prefix+'help':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const getIngfoLevel = level.getLevelingLevel(sender.id, _level)
                const fetchReqLevel = 5 * Math.pow(getIngfoLevel, 2) + 50 * getIngfoLevel + 100
                const BalanceUser = getLevelingXpBC(sender.id, userbalance)
                const BalanceUserToString = convertBalanceToString(BalanceUser)
                function format(seconds){
                    function pad(s){
                    return (s < 10 ? '0' : '') + s;
                    }
        
                    var hours = Math.floor(seconds / (60*60));
                    var minutes = Math.floor(seconds % (60*60) / 60);
                    var seconds = Math.floor(seconds % 60);
        
                    return pad(hours) + 'H ' + pad(minutes) + 'M ' + pad(seconds) + 'S';
                    }
            
                    var uptime = process.uptime();
                geps.reply(from, `┌──「 *DarkChat-BOT* 」
│        
├「 *USER STATUS* 」
│
├ *Nama:* ${pushname}
├ *Level:* ${levelMenu}
├ *XP:* ${xpMenu} / ${fetchReqLevel}
├ *Rank:* ${role}
├ *Premium:* ${isPremium ? 'Yes' : 'No'}
├ *Balance:* Rp ${BalanceUserToString}
├ *Total User:* ${jumlahUser}
│          
├「 *LIST MENU* 」
│
├ ${prefix}gamemenu
├ ${prefix}shopmenu
├ ${prefix}downloadmenu
├ ${prefix}ownermenu
├ ${prefix}funmenu
├ ${prefix}groupmenu
├ ${prefix}mediamenu
├ ${prefix}animemenu
├ ${prefix}kerangmenu
├ ${prefix}praymenu
├ ${prefix}premiummenu
├ ${prefix}othermenu
├ ${prefix}stickermenu
├ ${prefix}infomenu
├ ${prefix}systemmenu
├ ${prefix}toolsmenu
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'kapankah':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const when = args.join(' ')
                const kapankah = ['1 Minggu lagi', 'Tidak mungkin', '1 Bulan lagi', '1 Tahun lagi']
                const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
                if (!when) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`, id)
                break
            case prefix+'nilai':
            case prefix+'rate':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const rating = args.join(' ')
                const rate = ['100%', '95%', '90%', '85%', '80%', '75%', '70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%', '30%', '25%', '20%', '15%', '10%', '5%']
                const awr = rate[Math.floor(Math.random() * (rate.length))]
                if (!rating) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`, id)
                break
            case prefix+'berapakah':
                if (!isRegistered) return await geps.reply(from, ind.notRegistered(), id)
                if (!q) return await geps.reply(from, ind.emptyMess(), id)
                const xixixixi = Math.floor(Math.random() * 10) + 15
                geps.reply(from, `Pertanyaan: Berapakah ${q}\nJawaban: ${xixixixi}`, id)
                break
            case prefix+'apakah':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const nanya = args.join(' ')
                const apakah = ['Ya', 'Tidak', 'Mungkin', 'Coba Ulangi']
                const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                if (!nanya) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`, id)
                break
            case prefix+'bisakah':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const bsk = args.join(' ')
                const bisakah = ['Bisa', 'Tidak Bisa', 'Mungkin', 'Coba Ulangi']
                const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                if (!bsk) geps.reply(from, 'Format salah! Ketik *#menu* untuk penggunaan.')
                await geps.reply(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`, id)
                break
            case prefix+'rategay':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                const rategay = Math.floor(Math.random() * 1000) + 1;
                geps.reply(from, `• Seberapa Gay: ${q}\n• Jawaban : ${rategay}%`, id)
                break
            case prefix+'ratelesbi':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                const ratelesbi = Math.floor(Math.random() * 1000) + 1;
                geps.reply(from, `• Seberapa Lesbi: ${q}\n• Jawaban : ${ratelesbi}%`, id)
                break
            case prefix+'ratetampan':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                const ratetampan = Math.floor(Math.random() * 1000) + 1;
                geps.reply(from, `• Nama: ${q}\n• Tingkat Ketampanan: ${ratetampan}%`, id)
                break
            case prefix+'ratecantik':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, ind.wrongFormat(), id)
                const ratecantik = Math.floor(Math.random() * 1000) + 1;
                geps.reply(from, `•Nama: ${q}\n• Tingkat Kecantikan: ${ratecantik}%`, id)
                break
            case prefix+'animesearch':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const anser = body.slice(13)
                if (!anser) return geps.reply(from, `Kirim perintah ${prefix}animesearch [query], Contoh : ${prefix}animesearch DXD (Hanya Bisa Satu Kata)`, id)
                geps.reply(from, ind.wait(), id)
                try {
                    const response2 = await fetch(`https://mnazria.herokuapp.com/api/anime?query=${encodeURIComponent(anser)}`)
                    if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                    const animeser = await response2.json()
                    const { result } = await animeser
                    let xixixi = `Hasil Pencarian : ${anser}\n`
                    for (let i = 0; i < result.length; i++) {
                        xixixi += `\n──────────────\n\n• *Judul* : ${result[i].title}\n• *Ditonton* : ${result[i].url}\n`
                    }
                    await geps.reply(from, xixixi, id)
                } catch (err) {
                    //console.log(err)
                    await geps.reply(from, `Maaf anime ${q} tidak ditemukan`, id)
                }
                break
            case prefix+'groupinfo':
            case prefix+'grupinfo':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                var totalMem = chat.groupMetadata.participants.length
                var desc = chat.groupMetadata.desc
                var groupnames = name
                var welgrp = _welcome.includes(chat.id)
                var antlink = _antilink.includes(chat.id)
                var levelings = _leveling.includes(chat.id)
                var balances = _balance.includes(chat.id)
                var autostick = _autosticker.includes(groupId)
                var antinsfw = _antinsfw.includes(groupId)
                var grouppic = await geps.getProfilePicFromServer(chat.id)
                if (grouppic == undefined) {
                    var pfp = errorurl
                } else {
                    var pfp = grouppic
                }
                await geps.sendFileFromUrl(from, pfp, 'group.png', `*「 GROUP INFO 」*

• *Name* : ${groupnames}
• *Members* : ${totalMem}
• *Welcome* : ${welgrp ? 'On' : 'Off'}
• *Anti Link* : ${antlink ? 'On' : 'Off'}
• *Anti Nsfw* : ${antinsfw ? 'On' : 'Off'}
• *Auto Sticker* : ${autostick ? 'On' : 'Off'}
• *System Balance* : ${balances ? 'On' : 'Off'}
• *System Leveling* : ${levelings ? 'On' : 'Off'}
• *Group Description*
${desc}`)
                break
            case prefix+'fun':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, '*IND*\n• perintah ini hanya dapat digunakan di dalam grup\n\n*ENG*\n• This command can only be used within the group', id)
                const tanyanya = body.slice(5)
                const groupMemeks = await geps.getGroupMembers(groupId)
                const memsmek = groupMemeks
                const auahajg = memsmek[Math.floor(Math.random() * memsmek.length)];
                const sapaa = `${tanyanya} adalah @${auahajg.id.replace(/@c.us/g, '')}`
                await geps.sendTextWithMentions(from, sapaa, id)
                break
            case prefix+'iklan':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.iklandulu(), id)
                break
            case prefix+'downloadmenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *DOWNLOAD-MENU* 」
│
├ ${prefix}ytmp3 [link]
├ ${prefix}ytmp4 [link]
├ ${prefix}igdl [link]
├ ${prefix}fb [link]
├ ${prefix}twitter [link]
├ ${prefix}smule [link]
├ ${prefix}tiktoknowm [link]
├ ${prefix}tiktok [link]
├ ${prefix}starmaker [link]
├ ${prefix}joox [optional]
├ ${prefix}igstory [username]
│
└──「 *DarkChat-BOT* 」`, id)
                break
            case prefix+'stickermenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *STICKER-MENU* 」
│
├ ${prefix}tocs [reply sticker]
├ ${prefix}cs [reply image]
├ ${prefix}ttps [teks]
├ ${prefix}ttp [teks]
├ ${prefix}ttg [teks]
├ ${prefix}snobg [reply image]
├ ${prefix}stickerwaifu
├ ${prefix}sticker [reply image]
├ ${prefix}sgif
├ ${prefix}ttg [teks]
├ ${prefix}ttp [teks]
├ ${prefix}ttps [teks]
├ ${prefix}tosticker [reply chat]
├ ${prefix}stickerfull [reply image]
├ ${prefix}stickerwm author | packname
├ ${prefix}takestick author | packname
├ ${prefix}esticker [emoji]
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'grupmenu':
            case prefix+'groupmenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *GROUP-MENU* 」
│
├ ${prefix}addpoll [optional]
├ ${prefix}addcandidate @tag
├ ${prefix}pollresult
├ ${prefix}vote [number]
├ ${prefix}tagme
├ ${prefix}grayscale @tag
├ ${prefix}beautiful @tag
├ ${prefix}blur @tag
├ ${prefix}invert @tag
├ ${prefix}jokeoverhead @tag
├ ${prefix}hitler @tag
├ ${prefix}pacefalm @tag
├ ${prefix}circle @tag
├ ${prefix}sepia @tag
├ ${prefix}shit @tag
├ ${prefix}rainbow @tag
├ ${prefix}rip @tag
├ ${prefix}wanted @tag
├ ${prefix} [teks]
├ ${prefix}reminder 10s | pesan_pengingat
├ ${prefix}jadian
├ ${prefix}fun [tanya]
├ ${prefix}truth
├ ${prefix}dare
├ ${prefix}tod
├ ${prefix}ava [reply chat orang]
├ ${prefix}afk [alasan]
├ ${prefix}setgrupname [optional]
├ ${prefix}sider [reply chat bot]
├ ${prefix}linkgrup
├ ${prefix}resetlinkgrup
├ ${prefix}setgroupicon [reply image]
├ ${prefix}groupinfo
├ ${prefix}adminlist
├ ${prefix}ownergroup
├ ${prefix}leave
├ ${prefix}delete [reply chat bot]
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'funmenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *FUN-MENU* 」
│
├ ${prefix}cekwatak
├ ${prefix}citacita
├ ${prefix}toxic
├ ${prefix}talk [teks]
├ ${prefix}addsay [teks]
├ ${prefix}delsay [teks]
├ ${prefix}say
├ ${prefix}partner
├ ${prefix}next
├ ${prefix}hug @tagmember
├ ${prefix}pat @tagmember
├ ${prefix}nye @tagmember
├ ${prefix}saylist
├ ${prefix}slap @tagmember
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'ownermenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *OWNER-MENU* 」
│
├ ${prefix}readallchat
├ ${prefix}exec [execute cmd]
├ ${prefix}resetlimit
├ ${prefix}gcbanall
├ ${prefix}blacklist add @tag/628xx
├ ${prefix}blacklist del @tag/628xx
├ ${prefix}getses
├ ${prefix}exif pack_name | author_name
├ ${prefix}shutdown
├ ${prefix}bc
├ ${prefix}leaveall
├ ${prefix}restart
├ ${prefix}eval [kode javascript]
├ ${prefix}setname
├ ${prefix}setstatus
├ ${prefix}setpict
├ ${prefix}banchat
├ ${prefix}premium add @tag/628xx 30d
├ ${prefix}premium del @tag/628xx
├ ${prefix}unbanchat
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'mediamenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *MEDIA-MENU* 」
│
├ ${prefix}ytstalk [username]
├ ${prefix}googleimage [optional]
├ ${prefix}infobioskop [optional]
├ ${prefix}togel
├ ${prefix}lk21 [optional]
├ ${prefix}heroml [optional]
├ ${prefix}shortbitly [LINK]
├ ${prefix}shorttiny [LINK]
├ ${prefix}subreddit [optional]
├ ${prefix}happymod [optional]
├ ${prefix}moddroid [optional]
├ ${prefix}tiktokstalk [username]
├ ${prefix}findsticker [optional]
├ ${prefix}cekspek [model hp]
├ ${prefix}pasangan nama | pasangan
├ ${prefix}artinama [optional]
├ ${prefix}movie [optional]
├ ${prefix}wallpaper 
├ ${prefix}nulis [teks]
├ ${prefix}tts [kode_bahasa] [teks]
├ ${prefix}igstalk [username]
├ ${prefix}kbbi [optional] 
├ ${prefix}wiki [optional] 
├ ${prefix}google [optional] 
├ ${prefix}pinterest [optional]  
├ ${prefix}brainly [optional] 
├ ${prefix}lirik [optional]
├ ${prefix}qrcode [optional] 
├ ${prefix}maps [optional] 
├ ${prefix}whois [ipnya] 
├ ${prefix}ssweb [linknya] 
├ ${prefix}shorturl [linknya] 
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'animemenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *ANIME-MENU* 」
│
├ ${prefix}wallpaperanime
├ ${prefix}animesearch [optional]
├ ${prefix}maluser [optional]
├ ${prefix}doujin [KODE NUKLIR]
├ ${prefix}wallanime
├ ${prefix}kemono
├ ${prefix}loli
├ ${prefix}shota
├ ${prefix}waifu
├ ${prefix}husbu
├ ${prefix}wait [reply image]
├ ${prefix}malanime [optional]
├ ${prefix}malcharacter [optional] 
├ ${prefix}animesearch [optional] 
├ ${prefix}anoboylast
├ ${prefix}neonimelast
├ ${prefix}randomcry
├ ${prefix}randomanime
├ ${prefix}randomkiss
├ ${prefix}randomhug
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'kerangmenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *KERANG-MENU* 」
│
├ ${prefix}berapakah [optional]
├ ${prefix}apakah [optional]
├ ${prefix}rate [optional]
├ ${prefix}bisakah [optional]
├ ${prefix}kapankah [optional]
├ ${prefix}ratecantik [optional]
├ ${prefix}ratetampan [optional]
├ ${prefix}ratelesbi [optional]
├ ${prefix}rategay [optional]
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'praymenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *PRAY-MENU* 」
│
├ ${prefix}alkitabharian
├ ${prefix}renungan
├ ${prefix}alkitab [nama_injil]
├ ${prefix}quran [urutan surah] 
├ ${prefix}tafsir [nama surah] [ayat] 
├ ${prefix}jadwalsholat [daerah] 
├ ${prefix}listsurah 
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'premiummenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *PREMIUM-MENU* 」
│
├ ${prefix}doujin [kode nuklir]
├ ${prefix}mediafire [link]
├ ${prefix}play [optional]
├ ${prefix}shopee [optional]
├ ${prefix}playstore [optional]
├ ${prefix}stickerwm author | packname
├ ${prefix}takestick author | packname
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'toolsmenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *TOOLS-MENU* 」
│
├ ${prefix}ebase64 [teks]
├ ${prefix}debase64 [encrypt base64]
├ ${prefix}ehex [teks]
├ ${prefix}dehex [encrypt hex]
├ ${prefix}encodebinary [teks]
├ ${prefix}decodebinary [kode binary]
│
└──「 *DarkChat-BOT* 」`, id)
                break
            case prefix+'shopmenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *SHOP-MENU* 」
│
├ ${prefix}buycoin [jumlah]
├ ${prefix}buylimit [jumlah]
├ ${prefix}buypremium2
├ ${prefix}buypremium1
│
└──「 *DarkChat-BOT* 」`, id)
                break
            case prefix+'gamemenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *GAME-MENU* 」
│
├ ${prefix}tebakgambar
├ ${prefix}caklontong
├ ${prefix}suit batu | 5000
├ ${prefix}casino [jumlah]
│
└──「 *DarkChat-BOT* 」`, id)
                break
            case prefix+'othermenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *OTHER-MENU* 」
│
├ ${prefix}transfer to @tag [jumlah]
├ ${prefix}cekatm
├ ${prefix}imagepuisi
├ ${prefix}apkpure [optional]
├ ${prefix}randompuisi
├ ${prefix}bucin
├ ${prefix}infomobil [optional]
├ ${prefix}infomotor [optional]
├ ${prefix}zodiak [optional]
├ ${prefix}me
├ ${prefix}fakename
├ ${prefix}triggered [reply pesan]
├ ${prefix}weton tanggal | bulan | tahun
├ ${prefix}motivasi
├ ${prefix}cekongkir kurir | asal | tujuan
├ ${prefix}tosticker [reply chat orang]
├ ${prefix}hilih [reply chat]
├ ${prefix}halah [reply chat]
├ ${prefix}holoh [reply chat]
├ ${prefix}heleh [reply chat]
├ ${prefix}huluh [reply chat]
├ ${prefix}cekpremium
├ ${prefix}readmore teks1 | teks2
├ ${prefix}imgtourl
├ ${prefix}infohoax
├ ${prefix}jobseek
├ ${prefix}asupan
├ ${prefix}wasted [reply image]
├ ${prefix}kiss [reply chat]
├ ${prefix}jadwalbola
├ ${prefix}news
├ ${prefix}newsline
├ ${prefix}distance daerah1 | daerah2
├ ${prefix}addimage [teks]
├ ${prefix}getimage [nama]
├ ${prefix}imagelist
├ ${prefix}addvn [reply vn]
├ ${prefix}getvn [nama vn]
├ ${prefix}addsticker [nama]
├ ${prefix}gs [nama]
├ ${prefix}stickerlist
├ ${prefix}listvn
├ ${prefix}linesticker [link]
├ ${prefix}trendtwit
├ ${prefix}cecan
├ ${prefix}cogan
├ ${prefix}estetik
├ ${prefix}bass [reply vn]
├ ${prefix}tomp3 [reply video]
├ ${prefix}flip
├ ${prefix}katabijak
├ ${prefix}fakta
├ ${prefix}pantun
├ ${prefix}bahasa
├ ${prefix}toimg
├ ${prefix}neko
├ ${prefix}nomorhoki [nohp]
├ ${prefix}artimimpi [optional]
├ ${prefix}infoalamat [optional]
├ ${prefix}pokemon
├ ${prefix}inu
├ ${prefix}quotes
├ ${prefix}infogempa
├ ${prefix}ptl
├ ${prefix}dadu
├ ${prefix}koin
├ ${prefix}bugreport [teks]
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'infomenu':
                 if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *INFO-MENU* 」
│
├ ${prefix}limit
├ ${prefix}cekcoin
├ ${prefix}totaluser
├ ${prefix}runtime
├ ${prefix}ping
├ ${prefix}speed
├ ${prefix}iklan
├ ${prefix}info
├ ${prefix}limit
├ ${prefix}tos
├ ${prefix}donate
├ ${prefix}mikugroup
├ ${prefix}owner
├ ${prefix}listhell
├ ${prefix}listpremium
├ ${prefix}listgroup
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'systemmenu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `┌──「 *SYSTEM-MENU* 」
│
├ ${prefix}antilink enable|disable
├ ${prefix}autosticker enable|disable
├ ${prefix}antinsfw enable|disable
├ ${prefix}leveling enable|disable
├ ${prefix}balance enable|disable
├ ${prefix}cekatm
├ ${prefix}ceklevel
├ ${prefix}topbalance
├ ${prefix}toplevel
│
└──「 *DarkChat-BOT* 」
`, id)
                break
            case prefix+'donate':
            case prefix+'donasi':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.donatenya(), id)
                break
            case prefix+'tos':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.snk(), id)
                break
            case prefix+'bahasa':
            case prefix+'listbahasa':
            case prefix+'bahasalist':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.listbahasatts(), id)
                break
            case prefix+'mikugroup':
            case prefix+'mikugrup':
            case prefix+'Mikugroup':
            case prefix+'Mikugrup':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, `*LINK GC INGFO 1*
https://chat.whatsapp.com/CFRdFIIVXukJiLL5YSi6My
                
*LINK GC INGFO 2*
https://chat.whatsapp.com/KsVijc349VY9N0DzIpo1Kw\nDont forget join ${pushname}, for get information update!`, id)
                break
            case prefix+'ping':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const loadedMsg = await geps.getAmountOfLoadedMessages()
                const chatIds = await geps.getAllChatIds()
                const groups = await geps.getAllGroups()
                const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '6281281370986@c.us'].includes(x.id._serialized)).includes(true))
                const me = await geps.getMe()
                const battery = await geps.getBatteryLevel()
                const isCharging = await geps.getIsPlugged()
                const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                return cpu
                })
                geps.reply(from, `「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝘾𝙃𝘼𝙏* 」
            
- *Loaded Messages* > ${loadedMsg}
- *Group Chats* > ${groups.length}
- *Group Joined* > ${groupsIn.length}
- *Group Left* > ${groups.length - groupsIn.length}
- *Personal Chats* > ${chatIds.length - groups.length}
- *Personal Chats Active* > ${chatIds.length - groups.length - groupsIn.length}
- *Total Chats* > ${chatIds.length}
- *Total Chats Active* > ${chatIds.length - groupsIn.length}
- *Charger* > ${isCharging}
- *Penggunaan RAM* > ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
- *Cpu* > ${cpus.length}
\n「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝙃𝙋 𝘽𝙊𝙏* 」\n${(`
\n- *Battery* ${battery}% ${isCharging ? 'Loading Power...' : 'Power Ready!'}
${Object.keys(me.phone).map(key => `*- ${key}* > ${me.phone[key]}`).join('\n')}`.slice(1, -1))}\n\n\n*Speed* > Uwuuu!`, id)
                break
            case prefix+'listhell':
            case prefix+'helllist':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                let block = ind.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await geps.reply(from, block, id)
            break
            case prefix+'speed':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const speeds = moment() / 1000 - t
                geps.reply(from, `「 *𝙎𝙋𝙀𝙀𝘿 𝙏𝙀𝙎𝙏* 」\nMerespon dalam ${speeds} Sec 💬`, id)
            break
            case prefix+'ownerbot':
            case prefix+'owner':
            case prefix+'creator':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.sendContact(from, ownerNumber)
            break
            /*case prefix+'darkjokes':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const djokes = await axios.get(`http://api.zeks.xyz/api/darkjokes?apikey=apivinz`)
                geps.sendFileFromUrl(from, djokes.data.result, 'djokes.jpg', `......`, id)
                break
            case prefix+'randompic':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const rpic = await axios.get(`https://api.zeks.xyz/api/estetikpic?apikey=apivinz`)
                geps.sendFileFromUrl(from, rpic.data.result.result, 'Rpic.jpg', `Random Pic`, id)
                break*/
            case prefix+'tagme':
                geps.sendTextWithMentions(from, `@${sender.id.replace("@c.us", "")} Tagged`)
                break   
            case prefix+'delete':
            case prefix+'del':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!quotedMsg) return await geps.reply(from, ind.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
            case prefix+'listgroup':
                geps.getAllGroups().then((res) => {
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                gc += `\n═════════════════\n\n• *No* : ${i+1}\n• *Nama* : ${res[i].name}\n• *Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n• *Tidak Spam* : ${res[i].notSpam}\n`
                }
                geps.reply(from, gc, id)
                })
                break
                case prefix+'bugreport':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    if (!q) return await geps.reply(from, ind.emptyMess(), id)
                    if(isGroupMsg){
                        geps.sendText(ownerNumber, `「 *BUG-REPORT* 」\n• *Waktu:* ${time}\n• *No Pengirim:* wa.me/${sender.id.match(/\d+/g)}\n• *Group:* ${formattedTitle}\n• *Message:* ${q}`)
                        geps.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.' ,id)
                    }else{
                        geps.sendText(ownerNumber, `「 *BUG-REPORT* 」\n• *Waktu:* ${time}\n• *No Pengirim:* wa.me/${sender.id.match(/\d+/g)}\n• *Message:* ${q}`)
                        geps.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
                    }
                    break
            case prefix+'premiumcheck':
            case prefix+'cekpremium':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return await geps.reply(from, ind.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await geps.reply(from, `*「 PREMIUM EXPIRE 」*
• *ID*: ${sender.id.replace('@c.us', '')}
• *Premium left*: ${cekExp.days} Hari ${cekExp.hours} Jam ${cekExp.minutes} Menit`, id)
            break
                case prefix+'premiumlist':
                case prefix+'listpremium':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    let listPremi = '「 PREMIUM USER LIST 」\n\n'
                        let nomorList = 0
                        const deret = premium.getAllPremiumUser(_premium)
                        const arrayPremi = []
                        for (let i = 0; i < deret.length; i++) {
                            const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                            arrayPremi.push(await geps.getContact(premium.getAllPremiumUser(_premium)[i]))
                            nomorList++
                            listPremi += `${nomorList}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n• Expired : ${checkExp.days}d ${checkExp.hours}h ${checkExp.minutes}m\n\n`
                        }
                        await geps.reply(from, listPremi, id)
                    break
            case prefix+'limit':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isPremium) return await geps.sendText(from, `*「 LIMIT INFO 」*\n\n• Status : Premium👑\n• Sisa limit anda : 9999999\n• Note: Limit reset setip hari!\n• Limit Perhari : Unlimitied`, id)
                var found = false
                const limidat = JSON.parse(fs.readFileSync('./database/user/limit.json'))
                for (let lmt of limidat) {
                    if (lmt.id === serial) {
                        const limitCounts = limitCount - lmt.limit
                        if (limitCounts <= 0) return geps.reply(from, `Limit request anda sudah habis\nUpgrade ke user premium untuk mendapatkan unlimited limit\n_Note : Limit akan direset setiap jam 6 Pagi!_`, id)
                        geps.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\nUpgrade ke user premium untuk mendapatkan unlimited limit\n_Note : Limit akan direset setiap jam! 6 Pagi_`, id)
                        found = true
                    }
                }
                if (found === false) {
                    let obj = { id: `${serial}`, limit: 1 };
                    limit.push(obj);
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(limit, 1));
                    geps.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\nUpgrade ke user premium untuk mendapatkan unlimited limit\n_Note : Limit akan direset setiap jam 6 Pagi!_`, id)
                }
                break
            case prefix+'cekcoin':
            case prefix+'coin':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                var found = false
                const limidata = JSON.parse(fs.readFileSync('./database/user/koin.json'))
                for (let lmt of limidata) {
                    if (lmt.id === serial) {
                        const limitMinings = limitMining - lmt.limit
                        if (limitMinings <= 0) return geps.reply(from, `Coin anda telah habis, silah beli di ${prefix}shopmenu\n\nNOTE: Coin akan ditambah setiap jam 6 pagi/30 coin`, id)
                        geps.reply(from, `*「 INFO - COIN 」*\n\n• Username: ${pushname}\n• Coin: *${limitMinings}* Coin left`, id)
                        found = true
                    }
                }

                if (found === false) {
                    let obj = { id: `${serial}`, limit: 1};
                    limitmining.push(obj);
                    fs.writeFileSync('./database/user/koin.json', JSON.stringify(limitmining, 1));
                    geps.reply(from, `*「 INFO - COIN 」*\n\n• Username: ${pushname}\n• Coin: *${limitMining}* Coin left`, id)
                }
                break
                case prefix+'getstatus':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    if (mentionedJidList.length !== 0) {
                        const statusarray = []
                        const userStatus = await geps.getStatus(mentionedJidList[0])
                        if (userStatus === undefined) {
                            var pek = `Bio Disembunyikan`
                        } else {
                            var pek = userStatus
                        }
                        const hahay = {
                            status: pek
                        }
                        //statusarray.push(hahay)
                        await geps.reply(from, `Yahahah Bionya ${mentionedJidList[0]}\n> ${hahay}`, id)
                    } else {
                        await geps.reply(from, ind.wrongFormat(), id)
                    }
                break
            case prefix+'getpic':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (mentionedJidList.length !== 0) {
                    const userPic = await geps.getProfilePicFromServer(mentionedJidList[0])
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await geps.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await geps.getProfilePicFromServer(args[0] + '@c.us')
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await geps.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break

            // Weeb zone
            case prefix+'neko':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.reply(from, ind.wait(), id)
                console.log('Getting neko image...')
                await geps.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', 'Neko', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'nomorhoki':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const nande = body.slice(11)
                if (!nande) return geps.reply(from, 'Kirim perintah *#nomorhoki [no hp kamu]*\nContoh : *#nomorhoki 0895384009405*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/nomerhoki?no=${nande}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(from, resp.data.error, id)
                const anm2 = `➸ Hasil :\n ${resp.data.result.hasil}`
                geps.reply(from, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, Nomor Hoki tidak ditemukan', id)
                    geps.sendText(ownerNumber, 'Nomorhoki Error : ' + err)
               }
                break
            case prefix+'artimimpi':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const piye = body.slice(10)
                if (!piye) return geps.reply(from, 'Kirim perintah *#artimimpi [mimpi]*\nContoh : *#artimimpi ular*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/artimimpi?query=${piye}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(from, resp.data.error, id)
                const anm2 = `➸ Artimimpi : ${resp.data.result.hasil}`
                geps.reply(from, anm2, id)
                } catch (err) {
                console.error(err.message)
                await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, Mimpi tidak ditemukan', id)
                geps.sendText(ownerNumber, 'Artimimpi Error : ' + err)
                }
                break
            case prefix+'stickerw':
            case prefix+'stickerwaifu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const wast = ["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010", "0011", "0012", "0013", "0014", "0015", "0016", "0017", "0018", "0019", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029", "0030", "0031", "0032", "0033", "0034", "0035", "0036", "0037", "0038", "0039", "0040", "0041", "0042", "0043", "0044", "0045", "0046", "0047", "0048", "0049", "0050", "0051", "0052", "0053", "0054", "0055", "0056", "0057", "0058", "0059", "0060", "0061", "0062", "0063", "0064", "0065", "0066", "0067", "0068", "0069", "0070", "0071", "0072", "0073", "0074", "0075", "0076", "0077", "0078", "0079", "0080", "0081", "0082", "0083", "0084", "0085", "0086", "0087", "0088", "0089", "0090", "0091", "0092", "0093", "0094", "0095", "0096", "0097", "0098", "0099"]
                const wast2 = wast[Math.floor(Math.random() * (wast.length))]
                await geps.sendStickerfromUrl(from, `http://randomwaifu.altervista.org/images/${wast2}.png`)
                break
            case prefix+'maluser':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                geps.reply(from, ind.wait(), id)
                try {
                    const result = await axios.get(`https://api.jikan.moe/v3/user/${q}`)
                    const jikan = result.data
                    const Data = `*「 USER - MYANIMELIST 」*

• Username: ${jikan.username}
• User ID: ${jikan.user_id}
• Gender: ${jikan.gender}
• Location: ${jikan.location}
• Joined: ${jikan.joined}

*Anime Stats*
• Days Watched: ${jikan.anime_stats.days_watched}
• Mean Score: ${jikan.anime_stats.mean_score}
• Currently Watching: ${jikan.anime_stats.watching}
• Completed: ${jikan.anime_stats.completed}
• On Hold: ${jikan.anime_stats.on_hold}
• Dropped: ${jikan.anime_stats.dropped}
• Plan to Watch: ${jikan.anime_stats.plan_to_watch}

*Manga Stats*
• Days Read: ${jikan.manga_stats.days_read}
• Mean Score: ${jikan.manga_stats.mean_score}
• Currently Reading: ${jikan.manga_stats.reading}
• Completed: ${jikan.manga_stats.completed}
• On Hold: ${jikan.manga_stats.on_hold}
• Dropped: ${jikan.manga_stats.dropped}
• Plan to Read: ${jikan.manga_stats.plan_to_read}`

                    await geps.sendFileFromUrl(from, `${jikan.image_url}`, `user.png`, Data)
                } catch (err) {
                    console.log(err)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, User tidak ditemukan')
                }
                break
            case prefix+'apkpure':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const puree = await axios.get(`https://api-melodicxt-3.herokuapp.com/api/apkpure/search?query=${q}&apiKey=administrator`)
                let purex = `*「 ApkPure Search 」*\nKata Kunci ${q}\n\n`
                for (let i = 0; i < puree.data.result.data_apk.length; i++) {
                    purex += `=> Title : ${puree.data.result.data_apk[i].title}\n=> Author : ${puree.data.result.data_apk[i].detail_author}\n=> SDK : ${puree.data.result.data_apk[i].detail_sdk}\n=> Link : ${puree.data.result.data_apk[i].link}\n=> Download Link : ${puree.data.result.data_apk[i].download_link}\n=> Deskripsi : ${puree.data.result.data_apk[i].description}\n\n`
                }
                geps.reply(from, purex, id)
                break
            case prefix+'lk21':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                const filmm = await axios.get(`https://api.vhtear.com/downloadfilm?judul=${q}&apikey=${config.vhtear}`)
                const filmxx = filmm.data
                let filmx = `*「 Download Film 」*\nJudul : ${filmxx.result.judul}\n\n`
                for (let i = 0; i < filmxx.result.data.length; i++) {
                    filmx += `Resolusi : ${filmxx.result.data[i].resolusi}\nLink Download : ${filmxx.result.data[i].urlDownload}\n\n`
                }
                    geps.reply(from, filmx, id)
            } catch (err) {
                    geps.reply(from, 'Tidak ditemukan judul tsb!', id)
                }
                break
            case prefix+'infomotor':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const istalk2s = await axios.get(`https://api.vhtear.com/infomotor?merk=${q}&apikey=${config.vhtear}`)
                    const { title, harga, kekurangan, kelebihan, image, spesifikasi } = istalk2s.data.result
                    const istalk3s = `*Data Ditemukan!*
• *Nama* : ${title}
• *Harga* : ${harga}
• *Kekurangan* : ${kekurangan}
• *Kelebihan* : ${kelebihan}
• *Spek* : ${spesifikasi}`

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, image, istalk3s)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, Data tidak ditemukan')
                    geps.sendText(ownerNumber, 'infomotor Error : ' + err)
                }
                break
            case prefix+'infomobil':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const istalk2ss = await axios.get(`https://api.vhtear.com/infomobil?merk=${q}&apikey=${config.vhtear}`)
                    const { title, harga, kekurangan, kelebihan, image, spesifikasi } = istalk2ss.data.result
                    const istalk3ss = `*Data Ditemukan!*
• *Nama* : ${title}
• *Harga* : ${harga}
• *Kekurangan* : ${kekurangan}
• *Kelebihan* : ${kelebihan}
• *Spek* : ${spesifikasi}`

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    geps.sendImage(from, base64, image, istalk3ss)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, Data tidak ditemukan')
                    geps.sendText(ownerNumber, 'infomobil Error : ' + err)
                }
                break
            case prefix+'infoalamat':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const isekai = body.slice(11)
                if (!isekai) return geps.reply(from, 'Kirim perintah *#infoalamat [optional]*Contoh : *#infoalamat jakarta*', id)
                try {
                const resp = await axios.get(`https://api.vhtear.com/infoalamat?query=${isekai}&apikey=${config.vhtear}`)
                if (resp.data.error) return geps.reply(from, resp.data.error, id)
                const anm2 = `• Info : ${resp.data.result.data}
• Deskripsi : ${resp.data.result.deskripsi}`
                geps.reply(from, anm2, id)
                } catch (err) {
                console.error(err.message)
                await geps.sendFileFromUrl(from, errorImg, 'error.png', 'Maaf, User tidak ditemukan', id)
                geps.sendText(ownerNumber, 'Ingfoalamat Error : ' + err)
                }
                break
            case prefix+'pokemon':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                q7 = Math.floor(Math.random() * 890) + 1;
                geps.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
                break
            case prefix+'quote':
            case prefix+'quotes':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes?apikey=BotWeA')
                geps.reply(from, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
                break
            case prefix+'infogempa':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const bmkg = await axios.get('https://tobz-api.herokuapp.com/api/infogempa?apikey=BotWeA')
                const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg.data
                const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
                geps.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
                break
            case prefix+'inu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
                let kya = list[Math.floor(Math.random() * list.length)]
                geps.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu', id)
                break
            case prefix+'wallpaper':
            case prefix+'wp':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.reply(from, ind.wait(), id)
                await geps.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .catch(async (err) => {
                        await geps.reply(from, 'Random Wallpaper tidak ditemukan', id)
                    })
            break
            case prefix+'kemono':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.reply(from, ind.wait(), id)
                await geps.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'komiku':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                weeaboo.manga(q)
                    .then(async ({ genre, info, link_dl, sinopsis, thumb }) => {
                        let mangak = `${info}${genre}\nSinopsis: ${sinopsis}\nLink download:\n${link_dl}`
                        await geps.sendFileFromUrl(from, thumb, 'mangak.jpg', mangak, null, null, true)
                    })
                    .catch(async (err) => {
                        await geps.reply(from, 'Error!', id)
                    })
            break
        case prefix+'wait':
            if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                geps.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        geps.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `• Title Japanese: ${title}\n• Title chinese: ${title_chinese}\n• Title Romaji: ${title_romaji}\n• Title English: ${title_english}\n`
                    teks += `• Ecchi: ${is_adult}\n`
                    teks += `• Eps: ${episode.toString()}\n`
                    teks += `• Kesamaan: ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    geps.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                    geps.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    geps.reply(from, 'Error !', id)
                })
            } else {
                geps.reply(from, `Format salah, Silahkan reply gambar anime dengan caption ${prefix}wait`, id)
            }
            break
            case prefix+'waifu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await geps.sendFileFromUrl(from, url, 'waifu.png', '*WAIFU!*', id)
                            .then(() => console.log('Success sending waifu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'husbu':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const diti = fs.readFileSync('./lib/husbu.json')
                const ditiJsin = JSON.parse(diti)
                const rindIndix = Math.floor(Math.random() * ditiJsin.length)
                const rindKiy = ditiJsin[rindIndix]
                geps.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
                break
            case prefix+'malanime':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const keyword = body.slice(10)
                try {
                    const data = await fetch(
                        `https://api.jikan.moe/v3/search/anime?q=${keyword}`
                    )
                    const parsed = await data.json()
                    if (!parsed) {
                        await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                        return null
                    }
                    const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
                    const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

                    const image = await bent("buffer")(image_url)
                    const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                    geps.sendImage(from, base64, title, content)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                }
                break
            case prefix+'malcharacter':
                const keywords = args.join(' ')
                try {
                    const data = await fetch(
                        `https://api.jikan.moe/v3/search/character?q=${keywords}`
                    )
                    const parsed = await data.json()
                    if (!parsed) {
                        await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                        return null
                    }
                    const { name, alternative_names, url, image_url } = parsed.results[0]
                    const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

                    const image = await bent("buffer")(image_url)
                    const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                    geps.sendImage(from, base64, name, contentt)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                }
                break
            case prefix+'shota':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const imageToBase64 = require('image-to-base64')
                var shouta = ['shota anime', 'anime shota'];
                var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
                var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;

                axios.get(urlshot)
                    .then((result) => {
                        var sht = JSON.parse(JSON.stringify(result.data));
                        var shotaak = sht[Math.floor(Math.random() * sht.length)];
                        imageToBase64(shotaak)
                            .then(
                                (response) => {
                                    let img = 'data:image/jpeg;base64,' + response
                                    geps.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
                                })
                            .catch(
                                (error) => {
                                    console.log(error);
                                })
                    })
                break
            case prefix+'loli':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${config.vhtear}`)
                const loly = loli.data.result
                geps.sendFileFromUrl(from, loly.result, 'loli.jpeg', '*LOLI*', id)
                break
            case prefix+'anitoki':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                weeaboo.anitoki()
                    .then(async ({ result }) => {
                        let anitoki = '-----[ *ANITOKI LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anitoki += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await geps.reply(from, anitoki, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'neonimelast':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                weeaboo.neonime()
                    .then(async ({ status, result }) => {
                        if (status !== 200) return await geps.reply(from, 'Not found.', id)
                        let neoInfo = '-----[ *NEONIME LATEST* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            const { date, title, link, desc } = result[i]
                            neoInfo += `\n\n• *Title*: ${title}\n• *Date*: ${date}\n• *Synopsis*: ${desc}\n• *Link*: ${link}\n\n──────────────`
                        }
                        await geps.reply(from, neoInfo, id)
                    })
                    .catch(async (err) => {
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'anoboylast':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                weeaboo.anoboy()
                    .then(async ({ result }) => {
                        let anoboyInfo = '-----[ *ANOBOY ON-GOING* ]-----'
                        for (let i = 0; i < result.length; i++) {
                            anoboyInfo += `\n\n• *Title*: ${result[i].title}\n• *URL*: ${result[i].url}\n\n──────────────`
                        }
                        await geps.reply(from, anoboyInfo, id)
                    })
                    .catch(async (err) => {
                        await geps.reply(from, 'Error!', id)
                    })
            break

            // Fun
            case prefix+'asupan': // shansekai
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                fun.asupan()
                    .then(async (body) => {
                        const asupan = body.split('\n')
                        const asupanx = asupan[Math.floor(Math.random() * asupan.length)]
                        await geps.sendFileFromUrl(from, `http://sansekai.my.id/ptl_repost/${asupanx}`, 'asupan.mp4', 'Nehhh...', id)
                    })
                    .catch(async (err) => {
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'citacita': // Piyobot
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                fun.cita()
                    .then(async (body) => {
                        const cita = body.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        await geps.sendFileFromUrl(from, randomCita, 'cita.mp3', '', id)
                    })
                    .catch(async (err) => {
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'profile':
            case prefix+'me':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await geps.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await geps.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await geps.sendFileFromUrl(from, pfp, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await geps.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await geps.getStatus(sender.id)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const premi = isPremium ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 200 * (Math.pow(2, levelMe) - 1)
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await geps.sendFileFromUrl(from, pfps, `${username}.jpg`, ind.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            case prefix+'hartatahta':
            case prefix+'tahta':
            case prefix+'harta':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                console.log('Creating harta tahta text...')
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'artinama':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/artinama?nama=${q}&apikey=${config.vhtear}`)
                    if (resp.data.error) return geps.reply(from, resp.data.error, id)
                    const anm2 = `➸ Artinama : ${resp.data.result.hasil}`
                    geps.reply(from, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    geps.sendText(ownerNumber, 'Artinama Error : ' + err)
                }
                break
            case prefix+'pasangan':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                const nama = q.substring(0, q.indexOf('|') - 1)
                const pasangan = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                fun.pasangan(nama, pasangan)
                    .then(async ({ result }) => {
                        await geps.reply(from, result.hasil, id)
                            //.then(() => console.log('Success sending fortune!'))
                    })
                    .catch(async (err) => {
                        //console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'zodiac':
            case prefix+'zodiak':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (args.length !== 1) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                await geps.reply(from, ind.wait(), id)
                fun.zodiak(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await geps.reply(from, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}`
                            await geps.reply(from, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'nulis':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                await geps.reply(from, ind.wait(), id)
                await geps.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${q}&apikey=${config.vhtear}`, 'nulis.jpg', 'Nih bre', id)
                } catch (err) {
                    geps.reply(from, `Terjadi kesalahan, Atau disebabkan oleh sistem`, id)
                }
            break
            /*case prefix+'':
                const que = body.slice(2)
                const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
                const sigot = sigo.data
                geps.reply(from, sigot.success, id)
                //console.log(sigot)
                break*/
            case prefix+'calender':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.reply(from, ind.wait(), id)
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const getUrli = await uploadImages(mediaData, false)
                    const imgnya = await calender(getUrli)
                    const calnder = imgnya.result.imgUrl
                    await geps.sendFileFromUrl(from, calnder)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const getUrli = await uploadImages(mediaData, false)
                    const imgnya = await calender(getUrli)
                    const calnder = imgnya.result.imgUrl
                    await geps.sendFileFromUrl(from, calnder)
                } else {
                    await geps.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #calender`, id)
                }
                break
            case prefix+'tod':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                await geps.reply(from, 'Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.' , id)
                await geps.sendText(from, `Silakan ketik *${prefix}truth* atau *${prefix}dare*`)
            break
            case prefix+'weton':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const tgl = q.substring(0, q.indexOf('|') - 1)
                const bln = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const thn = q.substring(q.lastIndexOf('|') + 2)
                await geps.reply(from, ind.wait(), id)
                fun.weton(tgl, bln, thn)
                    .then(async ({ result }) => {
                        await geps.reply(from, result.hasil, id)
                        console.log('Success sending weton info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'truth':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                fun.truth()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await geps.reply(from, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'dare':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                fun.dare()
                    .then(async (body) => {
                        const dare = body.split('\n')
                        const randomDare = dare[Math.floor(Math.random() * dare.length)]
                        await geps.reply(from, randomDare, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'triggered':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await decryptMedia(message, uaOverride)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(from, `${sender.id}_triggered.png`)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(from, `${sender.id}_triggered.png`)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    } else {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.trigger(ppRaw)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                await geps.sendFile(from, `${sender.id}_triggered.png`)
                                fs.unlinkSync(`${sender.id}_triggered.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'darkness':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const darkness = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.darkness(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_darkness.png`)
                                await geps.sendFile(from, `${sender.id}_darkness.png`, `${sender.id}_darkness.png`, '', id)
                                fs.unlinkSync(`${sender.id}_darkness.png`)
                            })
                    } else if (hitler == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.darkness(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_darkness.png`)
                                await geps.sendFile(from, `${sender.id}_darkness.png`, `${sender.id}_darkness.png`, '', id)
                                fs.unlinkSync(`${sender.id}_darkness.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.darkness(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_darkness.png`)
                                await geps.sendFile(from, `${sender.id}_darkness.png`, `${sender.id}_darkness.png`, '', id)
                                fs.unlinkSync(`${sender.id}_darkness.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'pixelate':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const youtube = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        canvas.Canvas.pixelate(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_youtube.png`)
                                await geps.sendFile(from, `${sender.id}_youtube.png`, `${sender.id}_youtube.png`, '', id)
                                fs.unlinkSync(`${sender.id}_youtube.png`)
                            })
                    } else if (hitler == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        canvas.Canvas.pixelate(ppRawww)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_youtube.png`)
                                await geps.sendFile(from, `${sender.id}_youtube.png`, `${sender.id}_youtube.png`, '', id)
                                fs.unlinkSync(`${sender.id}_youtube.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        canvas.Canvas.pixelate(jnckk)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(from, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'randomcaptcha':
            case prefix+'rcaptcha':
const { CaptchaGenerator } = require('captcha-canvas')
const options132 = {height: 200, width: 600};  //options for captcha image
const captcha321 = new CaptchaGenerator(options132); //getting captcha constructor
captcha321.text; //returns text of the captcha image.
const buff546 = await captcha321.generate(); //returns buffer of the captcha image
 
const gaskeun = fs.writeFileSync(`${sender.id}_random_captcha.png`, buff546);
await geps.sendFile(from, `${sender.id}_random_captcha.png`, `${sender.id}_random_captcha.png`, `${captcha321.text}`, id)
fs.unlinkSync(`${sender.id}_random_captcha.png`)
                    break
            case prefix+'wasted':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                    await geps.reply(from, ind.wait(), id)
                    //await geps.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Ini..., sticker nya lagi di kirim', id)
                    //.then(() => 
                    .then(async (body) => {
                    await geps.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`)
                    console.log('Success Wasted Sticker')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
                } else {
                    await geps.reply(from, `Format salah! Silahkan kirim gambar dengan caption${prefix}wasted atau reply gambar dengan caption ${prefix}wasted`, id)
                }
                break
                case prefix+'jadwalbola':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    geps.reply(from, ind.wait(), id)
                    try {
                        const jdbola = await fetch(`https://api.vhtear.com/jadwalbola&apikey=${config.vhtearkey}`)
                        if (!jdbola.ok) throw new Error(`unexpected response ${jdbola.statusText}`)
                        const jdbola2 = await jdbola.json()
                        const { data } = await jdbola2.result
                        let xixixi = `*「 JADWAL BOLA 」*\n\n`
                        for (let i = 0; i < data.length; i++) {
                            xixixi += `\n─────────────────\n\n*Kick-Off* : ${data[i].kickoff}\n*Pertandingan* : ${data[i].pertandingan}\n*Stasiun TV* : ${data[i].stasiuntv}\n`
                        }
                        await geps.sendText(from, xixixi, id)
                    } catch (err) {
                            console.log(err)
                            await geps.sendFileFromUrl(from, errorImg, 'error.png', '💔️ Maaf, Jadwal tidak ditemukan')
                            geps.sendText(ownerNumber, 'Jadwal Bola Error : ' + err)
                    }
                    break
            case prefix+'kiss':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                try {
                    if (isMedia && isImage) {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(message, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await geps.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else if (quotedMsg) {
                        const ppRaw = await geps.getProfilePicFromServer(sender.id)
                        const ppSecond = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                        if (ppRaw === undefined) {
                            var ppFirsts = errorImg
                        } else {
                            ppFirsts = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirsts, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await geps.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await geps.reply(from, ind.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
            break
            case prefix+'readmore':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const rawReadMore = `a


​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​���​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​b`
                const pertama = q.substring(0, q.indexOf('|') - 1)
                const kedua = q.substring(q.lastIndexOf('|') + 2)
                const formatted1 = rawReadMore.replace('a', pertama)
                const formatted2 = formatted1.replace('b', kedua)
                await geps.sendText(from, formatted2)
            break

            // Sticker
            case prefix+'stickerwm': // By Slavyan
            case prefix+'stcwm':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author, `stc_${sender.id}`)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/stc_${sender.id}.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stc_${sender.id}.exif`)
                                    }
                                })
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await geps.reply(from, 'Error!', id)
                        })
                    } else {
                        await geps.reply(from, ind.wrongFormat(), id)
                    }
            break
            /*case prefix+'stickermeme':
            case prefix+'stcmeme':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${getUrl}`
                    const meme = await bent('buffer')(create)
                    webp.buffer2webpbuffer(meme, 'png', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return await geps.reply(from, `Pastikan data sudah benar!`, id)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break*/
            case prefix+'takestick': // By: VideFrelan
            case prefix+'take':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    const mediaDataTake = await decryptMedia(quotedMsg, uaOverride)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    exif.create(packname, author, `takestick_${sender.id}`)
                    webp.buffer2webpbuffer(mediaDataTake, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/takestickstage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/takestick_${sender.id}.exif ./temp/takestickstage_${sender.id}.webp -o ./temp/takestick_${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/takestick_${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/takestick_${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        //console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/takestick_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/takestickstage_${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/takestick_${sender.id}.exif`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'tocs':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    await geps.reply(from, ind.wait(), id)
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const roundedCorner = Buffer.from(
                        '<svg><rect x="0" y="0" width="600" height="600" rx="300" ry="300"/></svg>'
                    );
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(mediaData).resize({
                                width: 600,
                                height: 600
                            }).composite([{
                                input: roundedCorner,
                                blend: 'dest-in'
                            }])
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
                break
            case prefix+'circlesticker':
            case prefix+'circlestiker':
            case prefix+'cs':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const roundedCorners = Buffer.from(
                        '<svg><rect x="0" y="0" width="600" height="600" rx="300" ry="300"/></svg>'
                    );
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(mediaData).resize({
                                width: 600,
                                height: 600
                            }).composite([{
                                input: roundedCorners,
                                blend: 'dest-in'
                            }])
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
                break
            case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isMedia && isImage || isQuotedImage) {
                    const encryptMediass = isQuotedImage ? quotedMsg : message
                    const mediaDatass = await decryptMedia(encryptMediass, uaOverride)
                    const namestickernye = Math.floor(Math.random() * 10) + 30
                    webp.buffer2webpbuffer(mediaDatass, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${namestickernye}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${namestickernye}.webp -o ./temp/${namestickernye}_stikel.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${namestickernye}_stikel.webp`)) {
                                        const data = fs.readFileSync(`./temp/${namestickernye}_stikel.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        //console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${namestickernye}_stikel.webp`)
                                        fs.unlinkSync(`./temp/stage_${namestickernye}.webp`)
                                    }
                                })
                        })
                } else {
                    await geps.sendText(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'stickerfull':
            case prefix+'stikerfull':
            case prefix+'sfull':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isMedia && isImage || isQuotedImage) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize({
                                    width: 512,
                                    height: 512,
                                    fit: 'contain',
                                    background: {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        alpha: 0							
                                    }
                                })
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: false })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await geps.sendRawWebpAsSticker(from, base64)
                                        //console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                   await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'ttps':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const ttp2t = body.slice(6)
                if (!ttp2t) return await geps.reply(from, `Kirim perintah ${prefix}ttps [teks]\nContoh : ${prefix}ttps halo`, id)
                const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
                const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
                await geps.sendStickerfromUrl(from, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${config.vhtear}`)
                break
            case prefix+'setprefix':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                _setting.prefix = q
                prefix = q
                fs.writeFileSync('./database/bot/setting.json', JSON.stringify(_setting))
                geps.sendText(from, `Berhasil Mengganti Prefix Ke 「 *${q}* 」`, id)
                break
            case prefix+'stickergif':
            case prefix+'stikergif':
            case prefix+'sgif':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isMedia && type === 'video' || mimetype === 'image/gif') {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        //await geps.sendMp4AsSticker(from, videoBase64, { fps: 15, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                        await geps.sendMp4AsSticker(from, videoBase64, null, { stickerMetadata: true, pack: `${config.packagenamestick}`, author: `${config.authorstickerpack}`, fps: 15, startTime: `00:00:00.0`, endTime : `00:00:05.0`, crop: false, loop: 0 })
                    } catch (err) {
                        //console.error(err)
                        await geps.reply(from, ind.videoLimit(), id)
                    }
                } else if (isQuotedGif || isQuotedVideo) {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendMp4AsSticker(from, videoBase64, null, { stickerMetadata: true, pack: `${config.packagenamestick}`, author: `${config.authorstickerpack}`, fps: 15, startTime: `00:00:00.0`, endTime : `00:00:05.0`, crop: false, loop: 0 })
                        //await geps.sendMp4AsSticker(from, videoBase64, { fps: 15, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                    } catch (err) {
                        await geps.reply(from, ind.videoLimit(), id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'ttg':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                await geps.reply(from, ind.wait(), id)
                await geps.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${q}&apikey=${config.vhtear}`)
                    //.then(() => 
                    //console.log('Success creating GIF!'))
                    .catch(async (err) => {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    })
            break
            case prefix+'stickertoimg':
            case prefix+'stikertoimg':
            case prefix+'toimg':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (isQuotedSticker) {
                    await geps.reply(from, ind.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await geps.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await geps.reply(from, 'Error!', id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'emojisticker':
            case prefix+'emojistiker':
            case prefix+'esticker':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (args.length !== 1) return geps.reply(from, ind.wrongFormat(), id)
                const emoji = emojiUnicode(args[0])
                await geps.reply(from, ind.wait(), id)
                //console.log('Creating emoji code for =>', emoji)
                try {
                await geps.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.vhtear}`)
            } catch (err) {
                    //console.error(err)
                    await geps.reply(from, 'Cukup satu emoji tidak boleh 2', id)
            }        
            break
            case prefix+'jadian':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                const groupMemek = await geps.getGroupMembers(groupId)
                const mem = groupMemek
                const aku = mem[Math.floor(Math.random() * mem.length)];
                const kamu = mem[Math.floor(Math.random() * mem.length)];
                const sapa = `Cieee... @${aku.id.replace(/@c.us/g, '')} 💘 @${kamu.id.replace(/[@c.us]/g, '')} baru jadian nih\nBagi pj nya dong`
                await geps.sendTextWithMentions(from, sapa, id)
                break
            case prefix+'hug':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const janjing = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                geps.sendTextWithMentions(from, `${prefix}` + janjing + ' *peyuuuk* ' + q)
                break
            case prefix+'slap':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const person = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
                geps.sendTextWithMentions(from, '@' + person + ' *slapped* ' + q)
                break
            case prefix+'pat':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                const jartod = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                geps.sendTextWithMentions(from, jartod + ' *👈 Si Mengelu-elus si👉* ' + q)
                break
            case prefix+'randomhug':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug?apikey=BotWeA')
                const rhug = shug.data
                geps.sendFileFromUrl(from, rhug.result, `RandomHug.jpg`, 'Random Hug!', id)
                break
            case prefix+'randomcry':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry?apikey=BotWeA')
                const rcry = scry.data
                geps.sendFileFromUrl(from, rcry.result, `RandomCry.jpg`, 'Random Cry!', id)
                break
            case prefix+'randomkiss':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA')
                const rkiss = skiss.data
                geps.sendFileFromUrl(from, rkiss.result, `RandomKiss.jpg`, 'Random Kiss!', id)
                break
            case prefix+'ava':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, 'Fitur ini hanya bisa diugnakan di dalam grup', id)
                if (!quotedMsg) return geps.reply(from, 'Quote/reply pesan seseorang yang akan di download fotonya!!', id)
                try {
                    const dp = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                    if (dp == undefined) {
                        var pfp = geps.reply(from, 'Dia ini pemalu, mungkin sedang depresi tidak berani memasang foto profil', id)
                    } else {
                        var pfp = geps.sendFileFromUrl(from, dp, 'profile.png', 'Nih bro', id)
                    }
                } catch {
                    geps.reply(from, 'Tidak ada foto profil/private', id)
                }
                break
            case prefix+'setgroupname':
            case prefix+'setgrupname':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return geps.reply(from, ind.botNotAdmin(), id)
                const namagrup = body.slice(13)
                let sebelum = chat.groupMetadata.formattedName
                let halaman = global.page ? global.page : await geps.getPage()
                await halaman.evaluate((chatId, subject) =>
                    Store.WapQuery.changeSubject(chatId, subject), groupId, `${namagrup}`)
                geps.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us', '')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
                break
            case prefix+'adminlist':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                let mimin = ''
                for (let admon of groupAdmins) {
                    mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
                }
                await sleeps(2000)
                await geps.sendTextWithMentions(from, mimin)
                break
            case prefix+'ownergroup':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const Owner_ = chat.groupMetadata.owner
                await geps.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
                break
            case prefix+'leave':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                await geps.sendText(from, 'Sayounara~ 👋')
                await geps.leaveGroup(groupId)
            break	
            case prefix+'groupicon':
            case prefix+'setgroupicon':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return geps.reply(from, ind.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await geps.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setGroupIcon(groupId, imageBase64)
                    await geps.sendText(from, ind.ok())
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'antilink':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await geps.reply(from, ind.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await geps.reply(from, ind.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await geps.reply(from, ind.detectorOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'leveling':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await geps.reply(from, ind.levelingOnAlready(), id)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await geps.reply(from, ind.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await geps.reply(from, ind.levelingOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'balance':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, "Fitur ini hanya bisa digunakan didalam Grup!", id)
                if (!isGroupAdmins) return await geps.reply(from, "Hanya admin yang bisa mengaktifkan fitur ini!", id)
                if (ar[0] === 'enable') {
                    if (isBalanceOn) return await geps.reply(from, "Fitur Ini sudah diaktifkan sebelumnya", id)
                    _balance.push(groupId)
                    fs.writeFileSync('./database/group/balance.json', JSON.stringify(_balance))
                    await geps.reply(from, "「 *FITUR BALANCE ENABLE!* 」\n\nKlean akan mendapatkan balance jika tidak menjadi seorang sider:v", id)
                } else if (ar[0] === 'disable') {
                    _balance.splice(groupId, 1)
                    fs.writeFileSync('./database/group/balance.json', JSON.stringify(_balance))
                    await geps.reply(from, `「 *FITUR BALANCE DISABLE!* 」\n\nFitur balance dimatikan oleh admin ${pushname}!`, id)
                } else {
                    await geps.reply(from, "Pilih enable atau disable cantik:v", id)
                }
            break
            case prefix+'sider':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (!quotedMsg) return geps.reply(from, `Tolong Reply Pesan DarkChat-BOT`, id)
                if (!quotedMsgObj.fromMe) return geps.reply(from, `Tolong Reply Pesan DarkChat-BOT`, id)
                try {
                    const reader = await geps.getMessageReaders(quotedMsgObj.id)
                    let list = ''
                    for (let pembaca of reader) {
                        list += `• @${pembaca.id.replace(/@c.us/g, '')}\n`
                    }
                    geps.sendTextWithMentions(from, `*List sider*\n${list}`)
                } catch (err) {
                    console.log(err)
                    geps.reply(from, `*IND*\nMaaf, Belum Ada Yang Membaca Pesan DarkChat-BOT atau Mereka Menonaktifkan Read Receipts\n\n*ENG*\nSorry, no one has read the DarkChat-BOT messages yet or they have disabled Read Receipts`, id)
                }
                break
            case prefix+'linkgroup':
            case prefix+'linkgrup':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return geps.reply(from, ind.botNotAdmin(), id)
                const namagcnye = chat.formattedTitle
                var gclink = await geps.getGroupInviteLink(groupId)
                var linkgc = `Link group : *${namagcnye}*\n\n ${gclink}`
                geps.reply(from, linkgc, id)
                break
            case prefix+'resetlinkgrup':
            case prefix+'setlink':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return geps.reply(from, ind.botNotAdmin(), id)
                if (isGroupMsg) {
                    await geps.revokeGroupInviteLink(groupId);
                    geps.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
                }
                break
            case prefix+'welcome':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (ar[0] === 'enable') {
                    if (isWelcomeOn) return await geps.reply(from, ind.welcomeOnAlready(), id)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await geps.reply(from, ind.welcomeOn(), id)
                } else if (ar[0] === 'disable') {
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await geps.reply(from, ind.welcomeOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'autosticker':
            case prefix+'autostiker':
            case prefix+'autostik':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAutoStickerOn) return await geps.reply(from, ind.autoStikOnAlready(), id)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await geps.reply(from, ind.autoStikOn(), id)
                } else if (ar[0] === 'disable') {
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await geps.reply(from, ind.autoStikOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'antinsfw':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return await geps.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await geps.reply(from, ind.adminOnly(), id)
                if (!isBotGroupAdmins) return await geps.reply(from, ind.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await geps.reply(from, ind.antiNsfwOnAlready(), id)
                    _antinsfw.push(groupId)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await geps.reply(from, ind.antiNsfwOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antinsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await geps.reply(from, ind.antiNsfwOff(), id)
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'moddroid':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const moddroid = await axios.get(`https://tobz-api.herokuapp.com/api/moddroid?q=${q}&apikey=BotWeA`)
                    if (moddroid.data.error) return geps.reply(from, moddroid.data.error, id)
                    const modo = moddroid.data.result[0]
                    const resmod = `• *Title* : ${modo.title}\n• *Publisher* : ${modo.publisher}\n• *Size* : ${modo.size}\n• *MOD Info* : ${modo.mod_info}\n• *Version* : ${modo.latest_version}\n• *Genre* : ${modo.genre}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                    geps.sendFileFromUrl(from, modo.image, 'MODDROID.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                }
                break
            case prefix+'runtime':
                function format(seconds) {
                    function pad(s) {
                        return (s < 10 ? '0' : '') + s;
                    }
                    var hours = Math.floor(seconds / (60 * 60));
                    var minutes = Math.floor(seconds % (60 * 60) / 60);
                    var seconds = Math.floor(seconds % 60);

                    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
                }

                var uptime = process.uptime();
                geps.reply(from, `Bot telah berjalan selama ${format(uptime)}`, id)
                break
            case prefix+'mediafire':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const firem = await axios.get(`https://docs-jojo.herokuapp.com/api/mediafire?url=${q}`)
                geps.reply(from, ind.wait(), id)
                geps.reply(from, `➸ *Filename* : ${firem.data.filename}\n➸ *Deskripsi* : ${firem.data.desc}\n➸ *Filetype* : ${firem.data.filetype}\n➸ *Filesize* : ${firem.data.filesize}\n➸ *diupload pada* : ${firem.data.uploaded}`, id)
                geps.sendFileFromUrl(from, firem.data.url, firem.data.filename, 'Nih')
                break
            case prefix+'alkitabharian':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const alkitab = await axios.get(`https://docs-jojo.herokuapp.com/api/alkitab`)
                geps.sendFileFromUrl(from, alkitab.data.result.img,'alkitab.jpg',`➸ *Ayat* : ${alkitab.data.result.ayat}\n➸ *Isi* : ${alkitab.data.result.isi}\n➸ *Link* : ${alkitab.data.result.link}`,id)
                break
            case prefix+'grayscale':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const grayscale = body.slice(11)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.greyscale(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(from, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })
                    } else if (grayscale == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.greyscale(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(from, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })

                    } else {
                        var texnugmm = body.slice(11)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.greyscale(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_grayscale.png`)
                                await geps.sendFile(from, `${sender.id}_grayscale.png`, `${sender.id}_grayscale.png`, '', id)
                                fs.unlinkSync(`${sender.id}_grayscale.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'beautiful':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const beautiful = body.slice(11)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.beautiful(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(from, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })
                    } else if (beautiful == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.beautiful(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(from, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })

                    } else {
                        var texnugmm = body.slice(11)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.beautiful(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_beautiful.png`)
                                await geps.sendFile(from, `${sender.id}_beautiful.png`, `${sender.id}_beautiful.png`, '', id)
                                fs.unlinkSync(`${sender.id}_beautiful.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'blur':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const blur = body.slice(6)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.blur(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(from, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })
                    } else if (blur == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.blur(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(from, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })

                    } else {
                        var texnugmm = body.slice(6)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.blur(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_blur.png`)
                                await geps.sendFile(from, `${sender.id}_blur.png`, `${sender.id}_blur.png`, '', id)
                                fs.unlinkSync(`${sender.id}_blur.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'invert':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const invert = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.invert(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(from, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })
                    } else if (invert == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.invert(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(from, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.invert(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_invert.png`)
                                await geps.sendFile(from, `${sender.id}_invert.png`, `${sender.id}_invert.png`, '', id)
                                fs.unlinkSync(`${sender.id}_invert.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'jokeoverhead':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const jookOverHead = body.slice(14)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.jokeOverHead(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(from, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })
                    } else if (jookOverHead == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.jokeOverHead(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(from, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })

                    } else {
                        var texnugmm = body.slice(14)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.jokeOverHead(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_jookOverHead.png`)
                                await geps.sendFile(from, `${sender.id}_jookOverHead.png`, `${sender.id}_jookOverHead.png`, '', id)
                                fs.unlinkSync(`${sender.id}_jookOverHead.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'hitler':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const hitler = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.hitler(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(from, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })
                    } else if (hitler == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.hitler(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(from, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.hitler(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_hitler.png`)
                                await geps.sendFile(from, `${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                                fs.unlinkSync(`${sender.id}_hitler.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'pacefalm':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const facepalm = body.slice(10)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.facepalm(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(from, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })
                    } else if (facepalm == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.facepalm(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(from, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })

                    } else {
                        var texnugmm = body.slice(10)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.facepalm(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_facepalm.png`)
                                await geps.sendFile(from, `${sender.id}_facepalm.png`, `${sender.id}_facepalm.png`, '', id)
                                fs.unlinkSync(`${sender.id}_facepalm.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'circle':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const circle = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.circle(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(from, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })
                    } else if (circle == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.circle(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(from, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.circle(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_circle.png`)
                                await geps.sendFile(from, `${sender.id}_circle.png`, `${sender.id}_circle.png`, '', id)
                                fs.unlinkSync(`${sender.id}_circle.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'opinion':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const opinion = body.slice(9)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.opinion(pfp, opinion)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_opinion.png`)
                                await geps.sendFile(from, `${sender.id}_opinion.png`, `${sender.id}_opinion.png`, '', id)
                                fs.unlinkSync(`${sender.id}_opinion.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'fuse':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)
                var ppRaww = await geps.getProfilePicFromServer(quotedMsgObj.sender.id)
                var getnomberr = await geps.checkNumberStatus(texnugmm)
                var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                var imagee = await geps.getProfilePicFromServer(useriqq)
                if (imagee === undefined) {
                    var pfp = errorImg
                } else {
                    pfp = imagee
                }

                canvas.Canvas.fuse(pfp, imagee)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_fuse.png`)
                        await geps.sendFile(from, `${sender.id}_fuse.png`, `${sender.id}_fuse.png`, '', id)
                        fs.unlinkSync(`${sender.id}_fuse.png`)
                    })
                break
            case prefix+'ohno':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)

                canvas.Canvas.ohno(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_ohno.png`)
                        await geps.sendFile(from, `${sender.id}_ohno.png`, `${sender.id}_ohno.png`, '', id)
                        fs.unlinkSync(`${sender.id}_ohno.png`)
                    })
                break
            case prefix+'clyde':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)

                canvas.Canvas.clyde(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_clyde.png`)
                        await geps.sendFile(from, `${sender.id}_clyde.png`, `${sender.id}_clyde.png`, '', id)
                        fs.unlinkSync(`${sender.id}_clyde.png`)
                    })
                break
            case prefix+'changemymind':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(14)

                canvas.Canvas.changemymind(texnugmm)
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_changemymind.png`)
                        await geps.sendFile(from, `${sender.id}_changemymind.png`, `${sender.id}_changemymind.png`, '', id)
                        fs.unlinkSync(`${sender.id}_changemymind.png`)
                    })
                break
            case prefix+'randompuisi':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                geps.sendFileFromUrl(from, `https://api.vhtear.com/puisi_image&apikey=${config.vhtear}`, 'puisi.jpg', `Nih`, id)
                break
            case prefix+'burn':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                var texnugmm = body.slice(6)
                if (isMedia && isImage || isQuotedImage) {
                    var encryptMedia = isQuotedImage ? quotedMsg : message
                    var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                    if (ppRawww === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = ppRawww
                    }
                    canvas.Canvas.burn(pfp, texnugmm)
                        .then(async (buffer) => {
                            canvas.write(buffer, `${sender.id}_burn.png`)
                            await geps.sendFile(from, `${sender.id}_burn.png`, `${sender.id}_burn.png`, '', id)
                            fs.unlinkSync(`${sender.id}_burn.png`)
                        })
                }
                break
            case prefix+'sepia':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const sepia = body.slice(7)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.sepia(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(from, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })
                    } else if (sepia == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.sepia(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(from, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })

                    } else {
                        var texnugmm = body.slice(7)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.sepia(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_sepia.png`)
                                await geps.sendFile(from, `${sender.id}_sepia.png`, `${sender.id}_sepia.png`, '', id)
                                fs.unlinkSync(`${sender.id}_sepia.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'shit':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const shit = body.slice(6)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.shit(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(from, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })
                    } else if (shit == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.shit(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(from, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })

                    } else {
                        var texnugmm = body.slice(6)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.shit(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_shit.png`)
                                await geps.sendFile(from, `${sender.id}_shit.png`, `${sender.id}_shit.png`, '', id)
                                fs.unlinkSync(`${sender.id}_shit.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'rainbow':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const rainboww = body.slice(9)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.rainbow(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(from, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })
                    } else if (rainboww == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.rainbow(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(from, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })

                    } else {
                        var texnugmm = body.slice(9)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.rainbow(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rainbow.png`)
                                await geps.sendFile(from, `${sender.id}_rainbow.png`, `${sender.id}_rainbow.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rainbow.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'rip':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const ripp = body.slice(5)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRawww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.rip(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(from, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })
                    } else if (ripp == "me") {
                        var ppRawww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRawww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRawww
                        }
                        canvas.Canvas.rip(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(from, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })

                    } else {
                        var texnugmm = body.slice(5)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnckk = await geps.getProfilePicFromServer(useriqq)
                        if (jnckk === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnckk
                        }
                        canvas.Canvas.rip(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_rip.png`)
                                await geps.sendFile(from, `${sender.id}_rip.png`, `${sender.id}_rip.png`, '', id)
                                fs.unlinkSync(`${sender.id}_rip.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'wanted':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                const wantedd = body.slice(8)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        var encryptMedia = isQuotedImage ? quotedMsg : message
                        var ppRaww = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRaww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRaww
                        }
                        canvas.Canvas.wanted(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })
                    } else if (wantedd == "me") {
                        var ppRaww = await geps.getProfilePicFromServer(sender.id)
                        if (ppRaww === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = ppRaww
                        }
                        canvas.Canvas.wanted(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })

                    } else {
                        var texnugmm = body.slice(8)
                        var getnomberr = await geps.checkNumberStatus(texnugmm)
                        var useriqq = getnomberr.id.replace('@', '') + '@c.us'
                        var jnck = await geps.getProfilePicFromServer(useriqq)
                        if (jnck === undefined) {
                            var pfp = errorImg
                        } else {
                            pfp = jnck
                        }
                        canvas.Canvas.wanted(pfp)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_wanted.png`)
                                await geps.sendFile(from, `${sender.id}_wanted.png`, `${sender.id}_wanted.png`, '', id)
                                fs.unlinkSync(`${sender.id}_wanted.png`)
                            })
                    }
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, 'Error!', id)
                }
                break
            case prefix+'cekwatak':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                var namao = pushname
                var prfx = await geps.getProfilePicFromServer(sender)
                const wtk = watak[Math.floor(Math.random() * (watak.length))]
                const akhlak = ratenyaasu[Math.floor(Math.random() * (ratenyaasu.length))]
                const sft = sifat[Math.floor(Math.random() * (sifat.length))]
                const hby = hobby[Math.floor(Math.random() * (hobby.length))]
                const klbh = kelebihan[Math.floor(Math.random() * (kelebihan.length))]
                const typo = tipe[Math.floor(Math.random() * (tipe.length))]
                await geps.reply(from, `[ INTROGASI SUKSES ]\n\n• *Nama* : ${namao}\n• *Watak* : ${wtk}\n• *Akhlak* : ${akhlak}\n• *Sifat* : ${sft}\n• *Hobby* : ${hby}\n• *Tipe* : ${typo}\n• *Kelebihan* : ${klbh}\n\n*Note*\n_ini hanya main main_`, id)
                break
            case prefix+'nye':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                const jancuk7 = author.replace('@c.us', '')
                await geps.sendGiphyAsSticker(from, `https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif`)
                geps.sendTextWithMentions(from, '@' + jancuk7 + ' *nye nye* ' + q)
                break
            case prefix+'bucin':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                fetch('https://raw.githubusercontent.com/beniismael/whatsapp-bot/master/bucin.txt')
                    .then(res => res.text())
                    .then(body => {
                        let splitcinta = body.split('\n')
                        let randomcinta = splitcinta[Math.floor(Math.random() * splitcinta.length)]
                        geps.reply(from, randomcinta, id)
                    })
                    .catch(() => {
                        geps.reply(from, `Ada yang Error!`, id)
                    })
                break
            case prefix+'doujin':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                if (!isPremium) return geps.reply(from, `Maaf kak ${pushname}\nPerintah ini hanya bisa digunakan user premium!`, id)
                if (isLimit(serial)) return
                await limitAdd(serial)
                try {
                const lnuklir = await axios.get(`https://api.vhtear.com/nhentaipdfdownload?query=${q}&apikey=${config.vhtear}`)
                geps.reply(from, ind.wait(), id)
                geps.reply(from, `• *Title* : ${lnuklir.data.result.title}\n• *Secondary Title* : ${lnuklir.data.result.secondary_title}\n\nTunggu sebentar...\nFile PDF sedang dikirim`, id)
                geps.sendFileFromUrl(from, lnuklir.data.result.pdf_file, `${lnuklir.data.result.title}.pdf`, 'Nih.....', id)
            } catch (err) {
                geps.reply(from, 'Format salah', id)
        }
                break
            case prefix+'gcbanall':
                if (!isGroupMsg) return geps.reply(from, `Perintah ini hanya bisa digunakan dalam group!`, id)
                if (!isOwner) return geps.reply(from, `Perintah ini hanya untuk Owner Bot!`, id)
                const bMem = await geps.getGroupMembers(groupId)
                const groupnamae = name
                let banal = `Banned All Members~!\n*Group :* ${groupnamae}\n\n`
                for (let i = 0; i < bMem.length; i++) {
                    banal += '• '
                    banal += ` @${bMem[i].id.replace(/@c.us/g, '')}\n`
                    banned.push(bMem[i].id)
                    fs.writeFileSync('./database/user/banned.json', JSON.stringify(banned))
                }
                banal += `\nBanned : 365 days!`
                await sleeps(2000)
                await geps.sendTextWithMentions(from, banal)
                break
            case prefix+'happymod':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    const happymod = await axios.get(`https://tobz-api.herokuapp.com/api/happymod?q=${q}&apikey=BotWeA`)
                    if (happymod.data.error) return geps.reply(from, happymod.data.error, id)
                    const modo = happymod.data.result[0]
                    const resmod = `• *Title* : ${modo.title}\n• *Purchase* : ${modo.purchase}\n• *Size* : ${modo.size}\n• *Root* : ${modo.root}\n• *Version* : ${modo.version}\n• *Price* : ${modo.price}\n• *Link* : ${modo.link}\n• *Download* : ${modo.download}`
                    geps.sendFileFromUrl(from, modo.image, 'HAPPYMOD.jpg', resmod, id)
                } catch (err) {
                    console.log(err)
                }
                break
            // Owner command
            case prefix+'info':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const urlinfo = 'https://telegra.ph/file/2720768eae96398309f86.jpg'
                await geps.sendFileFromUrl(from, `${urlinfo}`,'bc.jpg', `\n┌──「 *INFORMATION* 」
│ 
├ *BOT TYPE* : NodeJS V14
├ *NAME*  : DarkChat-BOT
├ *VERSION* : 1.4.1
├ *INSTAGRAM* : mrg3p5_id
├ *YOUTUBE* : X - MrG3P5
│
├─「 *𝙏𝙃𝘼𝙉𝙆𝙎 𝙏𝙊* 」
│
├ ALLAH SWT
├ EMAK
├ MHANKBARBAR
├ Slavyandesu
├ Tobz
├ VEZA
├ ZAM
├ And all creator bot
│
└──「 *DarkChat-BOT* 」`, id)
                break
            case prefix+'bc':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                bctxt = body.slice(4)
                txtbc = `「 *DarkChat-BOT BC* 」\n${bctxt}`
                const semuagrup = await geps.getAllChatIds();
                if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for (let grupnya of semuagrup) {
                        var cekgrup = await geps.getChatById(grupnya)
                        if (!cekgrup.isReadOnly)
                            geps.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    geps.reply(from, 'Broadcast sukses!', id)
                } else {
                    for (let grupnya of semuagrup) {
                        var cekgrup = await geps.getChatById(grupnya)
                        if (!cekgrup.isReadOnly)
                            geps.sendText(grupnya, txtbc)
                    }
                    geps.reply(from, 'Broadcast Success!', id)
                }
                break
            case prefix+'clearall':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                const allChats = await geps.getAllChats()
                for (let delChats of allChats) {
                    await geps.deleteChat(delChats.id)
                }
                await geps.reply(from, ind.doneOwner(), id)
            break
            case prefix+'leaveall':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q) return await geps.reply(from, ind.emptyMess(), id)
                const allGroup = await geps.getAllGroups()
                for (let gclist of allGroup) {
                    await geps.sendText(gclist.contact.id, q)
                    await geps.leaveGroup(gclist.contact.id)
                }
                await geps.reply(from, ind.doneOwner())
            break
            case prefix+'getses':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                const ses = await geps.getSnapshot()
                await geps.sendFile(from, ses, 'session.png', ind.doneOwner())
            break
            case prefix+'blacklist':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)      
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                            await geps.contactBlock(benet)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await geps.reply(from, ind.doneOwner(), id)
                    } else {
                        await geps.contactBlock(args[1] + '@c.us')
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(from, ind.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                        await geps.contactUnblock(mentionedJidList[0], 1)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(from, ind.doneOwner(), id)
                    } else{
                        await geps.contactUnblock(args[1] + '@c.us', 1)
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await geps.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'resetlimit':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                try {
                geps.reply(from, `「 *RESET-LIMIT* 」\n\nSedang Mereset semua limit`, id)
                const remset = []
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(remset));
                fs.writeFileSync('./database/group/welcome.json', JSON.stringify(remset));
                fs.writeFileSync('./database/user/koin.json', JSON.stringify(remset));
                geps.sendText(from, `*Berhasil Mereset Limit user!*`, id)
                } catch (err) {
                    console.log(err)
                    geps.sendText(from, `Terjadi Kesalahan`, id)
                }
                break
            /*case prefix+'restart': // WORK IF YOU RUN USING PM2
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                    geps.sendText(from, '*[WARN]* Restarting ...')
                    setting.restartState = true
                    setting.restartId = chatId
                    var obj = []
                    fs.writeFileSync('./database/user/limit.json', JSON.stringify(obj));
                    fs.writeFileSync('./database/msgLimit.json', JSON.stringify(obj));
                    fs.writeFileSync('./database/banned.json', JSON.stringify(obj));
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(obj));
                    fs.writeFileSync('./database/left.json', JSON.stringify(obj));
                    fs.writeFileSync('./database/Simsimi.json', JSON.stringify(obj));
                    fs.writeFileSync('./database/nsfwz.json', JSON.stringify(obj));
                    const spawn = require('child_process').exec;
                    function os_func() {
                        this.execCommand = function (command) {
                            return new Promise((resolve, reject) => {
                                spawn(command, (error, stdout) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve(stdout)
                                });
                            })
                        }
                    }
                    var oz = new os_func();
                    oz.execCommand('pm2 restart index').then(() => {
                    }).catch(err => {
                        console.log("os >>>", err);
                    })
                break
                case prefix+'start-adventure':
                    const path = require('path')
                    //const spawns = require('child_process')
                    const spawns = require('child_process').exec;
                    function os_func() {
                        this.execCommand = function (command) {
                            return new Promise((resolve, reject) => {
                                spawns(command, (error, stdout) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve(stdout)
                                });
                            })
                        }
                    }
                    var oz = new os_func();
                    ngc = ``
                    teks = `WELCOME IN CYBER-SPACE`
                    teks2 = `${__start.length} MEMBER`
                    oz.execCommand('convert', [
                    './font/polosan.png',
                    '-gravity',
                    'Center',
                    '-fill',
                    '#FFFFFF',
                    '-font',
                    './font/geps.ttf',
                    '-size',
                    '3000x1800',
                    '-pointsize',
                    '50',
                    '-interline-spacing',
                    '8',
                    '-annotate',
                    '+0+110',
                    ngc,
                    '-gravity',
                    'Center',
                    '-fill',
                    '#FFFFFF',
                    '-font',
                    './font/geps.ttf',
                    '-size',
                    '3000x1800',
                    '-pointsize',
                    '50',
                    '-interline-spacing',
                    '8',
                    '-annotate',
                    '+0-65',
                    pushname,
                    '-gravity',
                    'Center',
                    '-fill',
                    '#FFFFFF',
                    '-font',
                    './font/geps.ttf',
                    '-size',
                    '3000x1800',
                    '-pointsize',
                    '50',
                    '-interline-spacing',
                    '8',
                    '-annotate',
                    '-350+230',
                    teks2,
                    '-gravity',
                    'Center',
                    '-fill',
                    '#FFFFFF',
                    '-stroke',
                    '#6FCBDE',
                    '-strokewidth',
                    '5',
                    '-font',
                    './font/geps.otf',
                    '-size',
                    '3000x1800',
                    '-pointsize',
                    '90',
                    '-interline-spacing',
                    '8',
                    '-annotate',
                    '+0-190',
                    teks,
                    './temp/adventure.png'
                    ])
                    .on('exit', () => {
                        //febb.sendMessage(from, fs.readFileSync('./temp/bpink.png'), image, {quoted: mek})
                        const imageadv = fs.readFileSync('./temp/adventure.png')
                        const nomernya = sender.id
                        const cekbrooo = geps.checkNumberStatus(nomernya) 
                        const adventurebro = ({
                            id: cekbrooo.id._serialized
                       })
                        __start.push(adventurebro)
                        fs.writeFileSync('./database/bot/start.json', JSON.stringify(__start))
                        geps.sendFile(from, imageadv, 'adventure.png', `*「 SUCCES - START 」*\n\n• *USERNAME:* ${pushname}\n• *ID:* ${sender.id.replace('@c.us', '')}\n• *SN:* ${SN}`, id)
                    })
                    break*/
            case prefix+'exec':
                if (!isOwner) return geps.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner Miku!`, id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                //const execute = require("child_process")
                const spawn = require('child_process').exec;
                    function os_func() {
                        this.execCommand = function (command) {
                            return new Promise((resolve, reject) => {
                                spawn(command, (error, stdout) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve(stdout)
                                });
                            })
                        }
                    }
                    var oz = new os_func();
                    oz.execCommand(q).then((res) => {
                    geps.reply(from, `> root@MrG3P5:~ # ${res}`, id)
                    }).catch(err => {
                        return geps.reply(from, `> root@MrG3P5:~ # ${err}`, id)
                        console.log("os >>>", err);
                    })
                /*execute(q, (err, stdout) => {
                    if(err) return geps.reply(from, `> root@MrG3P5:~ # ${err}`, id)
                    if(stdout) {
                        return geps.reply(from, `> root@MrG3P5:~ # ${stdout}`, id)
                    }
                })*/
                break
            case prefix+'eval':
            case prefix+'ev':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q) return await geps.reply(from, ind.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await geps.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await geps.reply(from, `[Error]\n> ${err}`, id)
                }
            break
            case prefix+'setname':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                const setnem = body.slice(9)
                await geps.setMyName(setnem)
                geps.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us', '')} 😘`)
                break
            case prefix+'setstatus':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                const setstat = body.slice(11)
                await geps.setMyStatus(setstat)
                geps.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us', '')} 😘`)
                break
            case prefix+'setpict':
                if (!isOwner) return geps.reply(from, ind.ownerOnly(), id)
                if (isMedia) {
                    const mediaData = await decryptMedia(message)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setProfilePic(imageBase64)
                    geps.reply(from, `Makasih Owner Sama Foto Profilenya 😘`, id)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await geps.setProfilePic(imageBase64)
                    geps.reply(from, `Makasih Owner Sama Foto Profilenya 😘`, id)
                } else {
                    geps.reply(from, ind.wrongFormat(), id)
                }
                break
            case prefix+'shutdown':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                await geps.sendText(from, 'Otsukaresama deshita~ 👋')
                    .then(async () => await geps.kill())
                    .catch(() => new Error('Target closed.'))
            break
            case prefix+'buylimit':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, `Berapa limit yang mau di beli bre?\n1 Point Limit = Rp. 1500\n\nPastiin uang kakak cukup juga kak!\nCara Pembelian: ${prefix}buylimit 1\nCara cek uang: ${prefix}cekatm`, id)
                const koinPerlimit = 1500 //Silahkan Custom Sendiri Price BuyLimit
                const total = koinPerlimit * q
                if (checkATMuser(serial) <= total) return geps.reply(from, `maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`, id)
                if (checkATMuser(serial) >= total ) {
                confirmATM(serial, total)
                bayarLimit(serial, q)
                const xxz = `${checkATMuser(serial)}`
                await geps.reply(from, `*「 PEMBAYARAN BERHASIL 」*\n\n• *Penerima:* ${pushname}\n• *Total harga:* Rp. ${convertBalanceToString(total)} / ${q} limit\n• *Sisa saldo:* Rp. ${checkATMuser(xxz)}\n\nproses berhasil dengan nomer pembayaran \n${SN}`, id)
                   }
               break
            case prefix+'buycoin':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, `Berapa limit yang mau di beli bre?\n1 Coin = Rp. 1500\n\nPastiin uang kakak cukup juga kak!\nCara Pembelian: ${prefix}buycoin 5\nCara cek uang: ${prefix}cekatm`, id)
                const koinPerlimits = 1500 //Silahkan Custom Sendiri Price BuyLimit
                const totals = koinPerlimits * q
                if (checkATMuser(serial) <= totals) return geps.reply(from, `maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`, id)
                if (checkATMuser(serial) >= totals ) {
                confirmATM(serial, totals)
                bayarCoin(serial, q)
                const xpw = `${checkATMuser(serial)}`
                await geps.reply(from, `*「 PEMBAYARAN BERHASIL 」*\n\n• *Penerima:* ${pushname}\n• *Total harga:* Rp. ${convertBalanceToString(totals)} / ${q} Coin\n• *Sisa saldo:* Rp. ${convertBalanceToString(xpw)}\n\nproses berhasil dengan nomer pembayaran \n${SN}`, id)
                   }
                break
            case prefix+'readallchat':
                if (!isOwner) return geps.reply(from, 'Perintah ini hanya untuk Owner DarkChat-BOT', id)
                const readall = await geps.getAllChats()
                for (let allchatnye of readall) {
                    await sleeps(3000)
                    await geps.sendSeen(allchatnye.id)
                }
                geps.reply(from, 'Succes read all chat!', id)
                break
            case prefix+'buypremium1':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                const hargapremi = 1000000
                const cekExps = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                if (isPremium) return await geps.reply(from, `*「 ALREADY PREMIUM 」*
• *ID*: ${sender.id.replace('@c.us', '')}
• *Premium left*: ${cekExps.days} Hari ${cekExps.hours} Jam ${cekExps.minutes} Menit`, id)
                if (checkATMuser(serial) <= hargapremi) return geps.reply(from, `Maaf saldo anda tidak cukup untuk membeli 3hari premium dengan harga Rp. ${convertBalanceToString(hargapremi)}. silahkan kumpulkan dan beli nanti`, id)
                if (checkATMuser(serial) >= hargapremi ) {
                    confirmATM(serial, hargapremi)
                    premium.addPremiumUser(serial, '3d', _premium)
                    const sisanya = checkATMuser(serial)
                    geps.reply(from, `*「 PEMBELIAN SUCCESS 」*

• *USERNAME :* ${serial.replace('@c.us', '')}
• *HARGA :* Rp. ${convertBalanceToString(hargapremi)}
• *MASA AKTIF :* 3 Hari
• *SISA SALDO :* Rp. ${convertBalanceToString(sisanya)}
• *SN :* ${SN}`, id)
                }
                break
                case prefix+'buypremium2':
                    if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                    const hargapremium = 5000000
                    const cekExps1 = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                    if (isPremium) return await geps.reply(from, `*「 ALREADY PREMIUM 」*
• *ID*: ${sender.id.replace('@c.us', '')}
• *Premium left*: ${cekExps1.days} Hari ${cekExps1.hours} Jam ${cekExps1.minutes} Menit`, id)
                    if (checkATMuser(serial) <= hargapremium) return geps.reply(from, `Maaf saldo anda tidak cukup untuk membeli 7hari premium dengan harga Rp. ${convertBalanceToString(hargapremium)}. silahkan kumpulkan dan beli nanti`, id)
                    if (checkATMuser(serial) >= hargapremium ) {
                        confirmATM(serial, hargapremium)
                        premium.addPremiumUser(serial, '7d', _premium)
                        const sisanyaa = checkATMuser(serial)
                        geps.reply(from, `*「 PEMBELIAN SUCCESS 」*
    
• *USERNAME :* ${serial.replace('@c.us', '')}
• *HARGA :* Rp. ${convertBalanceToString(hargapremium)}
• *MASA AKTIF :* 7 Hari
• *SISA SALDO :* Rp. ${convertBalanceToString(sisanyaa)}
• *SN :* ${SN}`, id)
                    }
                    break
            case prefix+'premium':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                            premium.addPremiumUser(benet, args[2], _premium)
                            await geps.reply(from, `*「 PREMIUM ADDED 」*\n\n• *ID*: ${benet}\n• *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await geps.reply(from, `*「 PREMIUM ADDED 」*\n\n• *ID*: ${args[1]}@c.us\n• *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await geps.reply(from, ind.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await geps.reply(from, ind.doneOwner(), id)
                    }
                } else {
                    await geps.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'stickerlist':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                let liststickerss = `┌─「 *LIST STICKER RANDOM* 」\n│\n├ Total : ${stickerlist.length}\n`
                for (let i of stickerlist) {
                    liststickerss += `├ `
                    liststickerss += `${i}\n`
                }
                liststickerss += '│\n└─「 *DarkChat-BOT* 」'
                await geps.reply(from, liststickerss, id)
                break
            case prefix+'gs':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, `*IND*\n• Apa nama sticker didatabase?, cek dengan cara ${prefix}stickerlist\n\n*ENG*\n• What name sticker in database?, check with type ${prefix}stickerlist`, id)
                try {
                const get_stick = await fs.readFileSync(`./database/temp/sticker/${q}.jpeg`, { encoding: "base64" })
                await geps.sendImageAsSticker(from, `data:image/jpeg;base64,${get_stick.toString('base64')}`)
                } catch (err) {
                    geps.reply(from, `*IND*\n• Sticker dengan nama ${q} tidak ditemukan di ${prefix}stickerlist\n\n*ENG*\n• Sticker with name ${q} not found in ${prefix}stickerlist`, id)
                }
                break
            case prefix+'addsticker':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, `teksnya mana?\nContoh : ${prefix}addsticker punya mrg3p5`, id)
                if (quotedMsg && quotedMsg.type == 'sticker'){
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const filename = `./database/temp/sticker/${q}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    stickerlist.push(q)
                    fs.writeFileSync('./database/bot/sticker.json', JSON.stringify(stickerlist))
                    await geps.reply(from, `Sticker dengan nama ${q} berhasil disimpan!`, id)
                }else if(quotedMsg && quotedMsg.type == 'sticker'){
                    const mediaData = await decryptMedia(message, uaOverride)
                    const filename = `./database/temp/sticker/${q}.jpeg`
                    await fs.writeFileSync(filename, mediaData)
                    stickerlist.push(q)
                    fs.writeFileSync('./database/bot/sticker.json', JSON.stringify(stickerlist))
                    await geps.reply(from, `Sticker dengan nama ${q} berhasil disimpan!`, id)
                }else{
                    await geps.reply(from, 'Error! Silahkan coba kembali...', id)
                }
                break
            case prefix+'ngehek':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q) return geps.reply(from, `targetnya apa?`, id)
                const hasilhek = 30000000
                addSaldo(serial, hasilhek)
                geps.reply(from, `Succes ngehek ${q} dan mendapatkan ${convertBalanceToString(hasilhek)}`, id)
                break
            case prefix+'transfer':
                if (!isRegistered) return await geps.reply(from, `*IND*\n• Nomermu belum terdaftar didatabase, Silahkan register dengan cara ${prefix}verify\n\n*ENG*\n• Your number has not been registered in the database, please register by way ${prefix}verify`, id)
                if (!q) return geps.reply(from, `*IND*\n • Format salah!, Kirim perintah ${prefix}transfer to @tag [jumlah], Contoh: ${prefix}transfer to @temen 5000\n\n*ENG*\n• Wrong format!, type command ${prefix}transfer to @tag [amount], Example: ${prefix}transfer to @friend 20000`, id)
                // premium.addPremiumUser(benet, args[2], _premium)
                const sendbalance = args[2] * 1
                if (ar[0] === 'to') {
                if (checkATMuser(serial) <= sendbalance) return geps.reply(from, `*IND*\n• Transaksi dibatalkan karena saldo sebesar Rp. ${convertBalanceToString(args[2])} tidak mencukupi\n\n*ENG*\n• The transaction is canceled because the balance is Rp. ${convertBalanceToString(args[2])} insufficient`, id)
                if (mentionedJidList.length !== 0) {
                for (let benet of mentionedJidList) {
                if (benet === botNumber) return await geps.reply(from, ind.wrongFormat(), id)
                if (checkATMuser(serial) >= sendbalance ) {
                // const mbayar = args[2]
                const himlih = checkATMuser(serial)
                confirmATM(serial, sendbalance, userbalance)
                await sleeps(2000)
                addSaldo(benet, sendbalance, userbalance)
                await geps.reply(from, `*「 TRANSFER SUCCESS 」*

• *PENERIMA :* ${benet.replace('@c.us', '')}
• *JUMLAH TF :* Rp. ${convertBalanceToString(sendbalance)}
• *SISA SALDO :* Rp. ${convertBalanceToString(himlih)}
• *SN :* ${SN}`, id)
                   } else {
                    confirmATM(serial, sendbalance, userbalance)
                    await sleeps(2000)
                    addSaldo(args[1] + '@c.us', sendbalance, userbalance)
                    const himlihs = checkATMuser(serial)
                    await geps.reply(from, `*「 TRANSFER SUCCESS 」*

• *PENERIMA :* ${args[1].replace('@c.us', '')}
• *JUMLAH TF :* Rp. ${convertBalanceToString(sendbalance)}
• *SISA SALDO :* Rp. ${convertBalanceToString(himlihs)}
• *SN :* ${SN}`, id)
                   }
                }
            }
        }
               break
            case prefix+'setstatus':
            case prefix+'setstats':
            case prefix+'setstat':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q) return await geps.reply(from, ind.emptyMess(), id)
                await geps.setMyStatus(q)
                await geps.sendText(from, ind.doneOwner())
            break
            case prefix+'exif':
                if (!isOwner) return await geps.reply(from, ind.ownerOnly(), id)
                if (!q.includes('|')) return await geps.reply(from, ind.wrongFormat(), id)
                const namaPack = q.substring(0, q.indexOf('|') - 1)
                const authorPack = q.substring(q.lastIndexOf('|') + 2)
                exif.create(namaPack, authorPack)
                await geps.reply(from, ind.doneOwner(), id)
            break
            default:
                if (isCmd) {
                    await geps.reply(from, ind.cmdNotFound(command), id)
                }
            break
        }
    }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/
