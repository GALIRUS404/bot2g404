let handler = async (m, { conn }) => {
  try {
      function formatUptime(uptimeInSeconds) {
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    return `${hours}:${minutes}:${seconds}`;
}
const uptimeInSeconds = process.uptime();
const quotes = ['The True Power Of Sigma Skibid', 'PermenMD Never Die!', 'Merusak Lebih Menyenangkan', 'Hidup Itu Berat', 'Ngoding? Tidak Aku Hanya Copy Paste', 'Woy Ini Script Mahal', 'Hanya Yang Terbaik Yang Akan Menang', 'Bacot Bocah Bened Skillnya Itu Itu Aja', 'PUBG, ML, FF, HOK, PB, BS Edyan', 'Semakin Dewasa Semakin Gede Jir', 'Jika Punyamu Kecil Berarti Untuk Anak Kecil', 'Hey Bung Umur Hanyalah Angka', 'No Wife No Problem, Wifi Mati Banting Modem', 'Hargailah Waktu Orang Lain', 'Ideku Lebih Mahal Darimu', 'Mastah Tools!!!']
const formattedUptime = formatUptime(uptimeInSeconds);

    const m2 = `┏❐ \`\`\`PermenMisc V7 Beta\`\`\` ❐

\`\`\`- Uptime: ${formattedUptime}\`\`\`
\`\`\`- Bot Name: ${global.namebot}\`\`\`
\`\`\`- Version: 7.0\`\`\`
┗❐
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Tracking Command\`
\`\`\`- .ipinfo\`\`\`
\`\`\`- .dw-check\`\`\`
\`\`\`- .nik-sniff\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`DDoS Command\`
\`\`\`- .botnet\`\`\`
\`\`\`- .ddos\`\`\`
\`\`\`- .gyat\`\`\`
\`\`\`- .kill_ssh\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Botnet Control\`
\`\`\`- .botnet-list\`\`\`
\`\`\`- .botnet-test\`\`\`
\`\`\`- .botnet-add\`\`\`
\`\`\`- .botnet-del\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`WhatsApp Attack Command\`
\`\`\`- .sikat\`\`\`
\`\`\`- .flood-otp\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Hacking Command\`
\`\`\`- .cctv-hijack\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Preparation Command\`
\`\`\`- .check-host\`\`\`
\`\`\`- .methods\`\`\`
\`\`\`- .proxy\`\`\`
\`\`\`- .ua\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Owner Command\`
\`\`\`- .addprem\`\`\`
\`\`\`- .delprem\`\`\`
\`\`\`- .listprem\`\`\`
\`\`\`- .self\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Pterodactyl Panel Command\`
\`\`\`- .cpanel\`\`\`
\`\`\`- .listsrv\`\`\`
\`\`\`- .listusr\`\`\`
\`\`\`- .delsrv\`\`\`
\`\`\`- .delusr\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Subdomain Command\`
\`\`\`- .subdo-add\`\`\`
\`\`\`- .subdo-del\`\`\`
\`\`\`- .subdo-list\`\`\`
\`\`\`- .subdo-check\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬
\`Fun Command\`
\`\`\`- .cekkhodam\`\`\`
\`\`\`- .vccgen\`\`\`
▬▭▬▭▬▭▬▭▬▭▬▭▬`;

conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: global.title,
body: quotes[Math.floor(Math.random() * quotes.length)],
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

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(misc)$/i;
module.exports = handler
