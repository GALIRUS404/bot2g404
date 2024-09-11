const axios = require('axios');
const fs = require('fs');

const handler = async (m, { args }) => {
    if (args.length < 1) {
        return m.reply(`Usage: .subdo-check <domains>`);
    }

    const domains = JSON.parse(fs.readFileSync('./lib/domains.json', 'utf8'));
    const domainIndex = parseInt(args[0]) - 1;

    if (!domains[Object.keys(domains)[domainIndex]]) {
        return m.reply(`Invalid domain index. Usage: .subdo-check <domains>`);
    }

    const domainInfo = domains[Object.keys(domains)[domainIndex]];
    const { zone, apiToken } = domainInfo;
    const tld = Object.keys(domains)[domainIndex];

    const listUrl = `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records?type=A`;
    const headers = {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json"
    };

    try {
        const { data: listData } = await axios.get(listUrl, { headers });
        if (listData.success && listData.result.length > 0) {
            let responseMessage = `Subdomains for ${tld}:\n\n`;
            listData.result.forEach(record => {
                responseMessage += `Hostname: https://${record.name}\nIP: ${record.content}\n\n`;
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
            text: responseMessage
    }, { quoted: m });

        } else {
            m.reply(`No subdomains found for ${tld}`);
        }
    } catch (error) {
        m.reply(`Failed to retrieve subdomains. Error: ${error.message}`);
    }
};

handler.command = ['subdo-check'];
handler.premium = true;
handler.group = true;
module.exports = handler;
