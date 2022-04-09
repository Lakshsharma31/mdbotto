let handler = async m => {
    const grouplink = `🎐🍁Well... I'm that case sasuke support group https://chat.whatsapp.com/EQVwc08goNlLtSivsfmpUT`
    m.reply(grouplink, m.sender) 
    m.reply('🧧🍁send you a personal message regarding this🎐🍁')
}
handler.help = ['support']
handler.tags = ['info']
handler.command = /^support$/i

module.exports = handler
