const { join } = require('path');
const fs = require('fs');

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    const m2 = `       ≡ *𒄆DDoS Method Layer 7*🪽
┌─⊷
\`| -tls\` +10%
\`| -mix\`
\`| -https\`
\`| -ninja\`
\`| -kill\` +10%
\`| -rape\` +60%
\`| -browsers\`
\`| -bypass\`
\`| -raw\`
\`| -strike\` +30%
└───────────
      ≡ *𒄆DDoS Method Layer 4*🪽
┌─⊷
\`Available Only On PermenMisc V3 Rework\`
└───────────`;


conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: global.title,
body: `Full Powererd DDoS 2023-2024`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.banner,
sourceUrl: ``
}}, text: m2}, {quoted: m})
	  } catch (e) {
    conn.reply(m.chat, 'Menu Error Bejir', m);
    throw e;
  }
};

handler.help = ['methods'];
handler.tags = ['main'];
handler.command = /^(methods)$/i;

module.exports = handler
