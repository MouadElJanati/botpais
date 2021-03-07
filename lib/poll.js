const request = require('request');
const fs = require('fs');
const dm = require('@open-wa/wa-decrypt');
const multer = require('multer');
const upload = multer();

function voteadapter(geps, message, pollfile, voterslistfile) {
    console.log('flag1')
        //voteadapter
    console.log(voterslistfile, 'MrG3P5-BOT')
    if (isvoted(message, voterslistfile)) {
        geps.reply(message.chatId, 'Kamu sudah melakukan vote dalam polling ini!', message.id, true);
        return;
    }
    //console.log('flag2')
    let data = readJsonFile(pollfile)
    if (data['candis'] === 'null') {
        geps.reply(message.chatId, 'Tidak ada kandidat dalam poll ini!', message.id, true);
        return;
    }
    let arr = data['candis']
        // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        if (message.body.includes((i + 1)
                .toString())) {
            //console.log(i)
            addvote(geps, message, i, pollfile);
            return;
        }
    }
    console.log('here')
    geps.reply(message.chatId, 'Salah!!!', message.id, true);
}
async function addcandidate(geps, message, candi, pollfile, voterslistfile) {
    if (await isGroupAdmin(geps, message, message, message.author)) {
        //  console.log('admin logging')
    } else {
        geps.reply(message.chatId, `Hubungi admin grup untuk menambahkan ${candi}`, message.id, true);
        return;
    }
    let data = readJsonFile(pollfile)
    if (data['candis'] === 'null') {
        //  let arra=[];
        let cd = {
            name: candi,
            votes: 0
        };
        // cd.put('name',candi);
        // cd.put('votes',0);
        // arra.push(cd);
        delete data['candis'];
        // data.put('candis',arra);
        data['candis'] = [cd, ]
    } else {
        if (data['candis'].length >= 9) {
            geps.reply(message.chatId, 'Kamu tidak bisa menambahkan lebih dari 9 kandidat!', message.id, true);
            return;
        }
        let cd = {
            name: candi,
            votes: 0
        };
        data['candis'].push(cd);
    }
    //l(base.toString());
    saveJsonFile(pollfile, data)
    geps.reply(message.chatId, `Berhasil menambahkan ${candi} sebagai kandidat`, message.id, true);
}

function addvote(geps, message, num, pollfile, voterslistfile) {
    console.log(num)
    let data = readJsonFile(pollfile)
    let vts = data['candis'][num]['votes'];
    vts = vts + 1;
    delete data['candis'][num]['votes'];
    data['candis'][num]['votes'] = vts
    console.log(data)
    saveJsonFile(pollfile, data)
    let op;
    op ='*「 *POLL-RESULT* 」\n\n*TITLE:*\n• ' + data['title'] + '*\n\n';
    let ls = '';
    let arr = data['candis'];
    for (let i = 0; i < arr.length; i++) {
        let cd = arr[i];
        ls = ls + ((i + 1)
            .toString()) + '. ' + cd['name'] + ' : [ ' + cd['votes'] + ' Votes ]\n';
    }
    op = op + ls;
    op = op + '*Kamu memilih ' + data['candis'][num]['name'];
    geps.reply(message.chatId, op, message.id, true);
    addvotedlog(message);
}

function isvoted(message, voterslistfile) {
    let data = readJsonFile(voterslistfile)
        // console.log(data['list'])
    return data['list'].includes(message.author);
}

function addvotedlog(message) {
    let data = readJsonFile(voterslistfile)
    data['list'].push(message.author)
    saveJsonFile(voterslistfile, data);
}

function getpoll(geps, message, pollfile, voterslistfile) {
    let data = readJsonFile(pollfile)
        //console.log(data)
    let op = '';
    if (data['candis'] == 'null') {
        op = '「 *POLL-RESULT* 」\n\n*TITLE:*\n• ' + data['title'] + '*\n Tidak ada kandidat! \n gunakan #addcandidate <kandidat> untuk menambahkan kandidat';
    } else {
        op = '「 *POLL-RESULT* 」\n\n*TITLE:*\n• ' + data['title'] + '*\n';
        let ls = '';
        let arr = data['candis'];
        for (let i = 0; i < arr.length; i++) {
            let cd = arr[i];
            ls = ls + (i + 1)
                .toString() + '. ' + cd['name'] + ' : [ ' + cd['votes'] + ' Votes ]\n';
        }
        op = op + ls;
        op = op + '\nUntuk vote silakan ketik #vote <number> \n [Contoh *#vote 2*]';
    }
    geps.reply(message.chatId, op, message.id, true)
}
async function adminpollreset(geps, message, polltitle, pollfile, voterslistfile) {
    if (await isGroupAdmin(geps, message, message.author)) {
        var datetime = new Date();
        //  savefile(todaysdate+'.json',getFile(pollfile));
        try {
            saveJsonFile('poll_logs.json', readJsonFile(pollfile))
        } catch (e) {
            console.log('poll file not eist for backup')
        }
        let base = {
                title: polltitle,
                polldate: datetime.toISOString()
                    .slice(0, 10),
                candis: 'null'
            }
            //l(base.toString());
        saveJsonFile(pollfile, base)
        geps.reply(message.chatId, `「 *SUCCESS CREATE POLL* 」\n\n*TITLE*:\n• ${polltitle}\n\n\nNOTE: gunakan #addcandidate @tag untuk menambahkan candidate`, message.id);
        //voterresetter
        let data = {
            list: ['testentry']
        }
        saveJsonFile(voterslistfile, data);
    } else {
        geps.reply(message.chatId, '*Mohon maaf fitur ini hanya bisa digunakan oleh admin grup!*', message.id)
    }
}
var configFiles = './dbpoll/configFiles'

function readJsonFile(filename) {
    filename = configFiles + filename;
    let rawdata = fs.readFileSync(filename);
    return JSON.parse(rawdata);
}

function saveJsonFile(filename, object) {
    filename = configFiles + filename;
    // console.log('pokelog '+filename)
    var jsonContent = JSON.stringify(object);
    fs.writeFile(filename, jsonContent, 'utf8', function(err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.' + filename);
            return console.log(err);
        }
    });
}
async function isGroupAdmin(geps, message, author) {
    let value = await geps.getGroupAdmins(message.chatId)
    return value.toString()
        .includes(message.author)
}
module.exports = {
    addcandidate,
    voteadapter,
    getpoll,
    adminpollreset,
    readJsonFile,
    saveJsonFile
}