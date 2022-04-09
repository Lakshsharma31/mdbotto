let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')
const defaultMenu = {
          before: `Info Penggunaan Bot:\n*${lim} : Memakai Limit*\n*${prem} : Khusus Premium*\n${ucpn}%readmore`.trimStart(),
  header: `${sa}${kki} ${zt}%category${zt} ${kka}`,
  body: `${gy} ${zc}%cmd${zc} %islimit %isPremium`,
  footer: `${sb}\n`,
          after: ``,
}

let handler = async (m, { conn, usedPrefix: _p, args, command, DevMode }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'maker', 'edukasi', 'news', 'random', 'game', 'xp', 'islamic', 'stiker', 'rpg', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
      'main': 'UTAMA', 
      'anime': 'ANIME', 
      'admin': `ADMIN ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
      'group': 'GROUP',
      'absen': 'ABSEN',
      'vote': 'VOTING',
      'anonymous': 'ANONYMOUS CHAT', 
      'audio': 'PENGUBAH SUARA', 
      'downloader': 'DOWNLOADER',
      'database': 'DATABASE',
      'edukasi': 'EDUKASI', 
      'fun': 'FUN',
      'game': 'GAME',
      'xp': 'EXP & LIMIT',
      'info': 'INFO',
      'internet': 'INTERNET',
      'islamic': 'ISLAMIC',
      'jadibot': 'JADI BOT',
      'kerang': 'KERANG AJAIB',
      'news': 'NEWS', 
      'nulis': 'MAGER NULIS & LOGO',
      'maker': 'FOTO & VIDEO MAKER', 
      'nsfw': 'NSFW',
      'premium': 'PREMIUM',
      'quotes': 'QUOTES',
      'rpg': 'RPG', 
      'random': 'RANDOM',
      'sticker': 'STIKER',
      'tools': 'TOOLS',
      'update': 'UPDATE',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo',
    'maker': 'Foto & Video Maker'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'islamic') tags = {
    'islamic': 'Islamic'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al-Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'update') tags = {
    'update': 'Update'
  }
 

  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = await registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    
let aoa = `${ucapan()} ${name}.`.trim()
let anu = `Silahkan Pilih Menu Dibawah!`.trim()
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') {
        const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: aoa,
            description: anu,
            buttonText: 'Pilih Disini',
            listType: 1,
            footerText: wm,
            mtype: 'listMessage',
            sections: [
              {
                "rows": [
                {
                  "title": `CREDITS`,
                  "description": "ᴹᴿ᭄ ᴋᴀᴋᴀsʜɪོ ×፝֟͜× Instagram link",
                  "rowId": ".git"
                }, {
                  "title": "🎐Game menu🎐",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? game"

                }, {
                  "title": "🧧XP menu🧧",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? xp"
                  
                },{
                  "title": "🧧Sticker side🧧",
                  "description": "Features for making stickers",
                  "rowId": ".? stiker"
                }, { 
                "title": "🎐Anime Menu🎐",
                "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                "rowId": ".? anime"
              },  {
                  "title": "❄Quotes menu❄",
                  "description": "Gives You random quotes",
                  "rowId": ".? quote"
                }, {
                  "title": "🧧Admin Side🧧",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? admin"
                }, {
                  "title": "🎐Group Menu🎐",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? grup"
                }, {
                  "title": "🧧Premium Menu🧧",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? premium"
                }, {
                  "title": "🎐Media side🎐",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? internet"
                }, {
                  "title": "🧧Anonymous chat menu🧧",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? anonymous"
                }, {
                  "title": "🎐Random answer Menu🎐",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": `.? magicshell`
                }, {
                  "title": "🧧Nulis & Logo Menu🧧",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? nulis"
                }, {
                  "title": "🎐Downloader Menu🎐",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? downloader"
                }, {
                  "title": "🧧Tools Menu🧧",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? tools"
                }, {
                  "title": "🎐Voice Changer Menu🎐",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": `.? audio`
                }, {
                  "title": "🧧Fun menu🧧",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? fun"
                }, {
                  "title": "🎐Database Menu🎐",
                  "description": "ـہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? database"
                },{
                  "title": "🍁Owner menu🍁",
                  "description": "ــہہـــــــــــــــــــــ٨ــــــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــہـــــــــــــــــــــ❥ــ٨ــــــــــــــــــــــــــــ",
                  "rowId": ".? owner"
                }
              ]
            }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: m });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? `${lim}` : '')
                  .replace(/%isPremium/g, menu.premium ? `${prem}` : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      name, weton, week, date, dateIslamic, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //let pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => path.join(__dirname, '../src/avatar_contact.png'))
    //await conn.sendTBL(m.chat, text.trim(), wm, fla + teks, dtu, urlnya, dtc, nmbrnya, `🏅Owner`, `${_p}owner`, `🎖ThanksTo`, `${_p}tqto`, `🎗  Info Bot  🎗`, `${_p}infobot`, m)
    await conn.sendTBD(m.chat, text, wm, thumbd, dtu, urlnya, dtc, nmbrnya, `🏅Owner`, `${_p}owner`, `🎖ThanksTo`, `${_p}tqto`, `🎗  Info Bot  🎗`, `${_p}infobot`)
    } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "jangan lupa tidur yaah, lop yu<3"
  if (time >= 4) {
    res = "Selamat Pagi ☀"
  }
  if (time > 10) {
    res = "Selamat Siang 🌞"
  }
  if (time >= 15) {
    res = "Selamat Sore 🌝"
  }
  if (time >= 18) {
    res = "Selamat Malam 🌚"
  }
  return res
}
