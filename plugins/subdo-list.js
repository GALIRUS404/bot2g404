const fs = require('fs');

const handler = async (m) => {
    try {
        const domains = JSON.parse(fs.readFileSync('./lib/domains.json', 'utf8'));
        let message = "Available domains:\n\n";
        Object.keys(domains).forEach((domain, index) => {
            message += `${index + 1}. ${domain}\n`;
        });
  conn.sendMessage(m.chat, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: global.title,
                    body: global.namebot,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: global.banner,
                    sourceUrl: ``
                }
            },
            text: message
        }, { quoted: m });
    } catch (error) {
        console.log(error)
        m.reply('Failed to fetch available domains. Please try again later.');
    }
};

handler.command = ['subdo-list'];
handler.premium = true;
handler.group = true;
module.exports = handler;
