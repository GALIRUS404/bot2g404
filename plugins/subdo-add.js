const axios = require('axios');
const fs = require('fs');
const path = require('path');

const handler = async (m, { args }) => {
    if (args.length < 2) {
        return m.reply(`Usage: .subdo-add <domains> <hostnames>|<ip>
Example: .subdo-add 1 panell|1.1.1.1`);
    }

    const domains = JSON.parse(fs.readFileSync('./lib/domains.json', 'utf8'));
    const apalah = args.join(' ').split(' ');
    const domainIndex = parseInt(apalah[0]) - 1;
    const [subdomain, ip] = apalah.slice(1).join(' ').split('|').map(str => str.trim());

    if (!domains[Object.keys(domains)[domainIndex]]) {
        return m.reply(`Invalid domain index. Usage: .subdo-add <domains> <hostnames>|<ip>
Example: .subdo-add 1 panell|1.1.1.1`);
    }

    const domainInfo = domains[Object.keys(domains)[domainIndex]];
    const { zone, apiToken } = domainInfo;
    const tld = Object.keys(domains)[domainIndex];

    const url = `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`;
    const payload = {
        type: "A",
        name: `${subdomain}.${tld}`,
        content: ip.replace(/[^0-9.]/gi, ""),
        ttl: 3600,
        priority: 10,
        proxied: false
    };
    const headers = {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json"
    };

    try {
        const { data } = await axios.post(url, payload, { headers });
        if (data.success) {
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
            text: `Subdomain created successfully:\n\n${data.result.name}`
        }, { quoted: m });
        } else {
            m.reply(`Failed to create subdomain. Error: ${data.errors[0]?.message || "Unknown error"}`);
        }
    } catch (error) {
        m.reply(`Failed to create subdomain. Error: ${error.message}`);
    }
};

handler.command = ['subdo-add'];
handler.premium = true;
handler.group = true;
module.exports = handler;
