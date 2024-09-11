const fs = require('fs');
const { exec } = require('child_process');

let handler = async (m, { text, args }) => {
    if (!text) { 
        return m.reply('❌ What do you want.'); 
    }
    
    const command = args[0];
    const need = args[1];

    if (command === 'create') {
        if (!need) {
            return m.reply('❌ Please provide the required input for create.');
        }
        
        exec(`node ./lib/PermenMD/uagen.js ${need} ua.txt`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error Creating User Agent:', error);
                m.reply('Error Creating User Agent.');
            } else {
                console.log('User Agent created successfully.');
            conn.sendMessage(m.chat, { 
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true, 
                        title: `𝙿𝚎𝚛𝚖𝚎𝚗𝙼𝚒𝚜𝚌 𝚅4`,
                        body: `Bahan Spoofing Ready`,
                        mediaType: 1,  
                        renderLargerThumbnail: true,
                        thumbnailUrl: global.standby,
                        sourceUrl: ``
                    }
                }, 
                text: 'User Agent created successfully.'}, { quoted: m });
            }
        });
    } else if (command === 'total') {
        fs.readFile('./ua.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading ua file:', err);
                m.reply('Error reading ua file.');
                return;
            }

            const proxies = data.trim().split('\n');
            const totalProxies = proxies.length;
            conn.sendMessage(m.chat, { 
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true, 
                        title: `User Agent Total`,
                        body: `List ${totalProxies}`,
                        mediaType: 1,  
                        renderLargerThumbnail: true,
                        thumbnailUrl: global.standby,
                        sourceUrl: ``
                    }
                }, 
                text: `User Agemt Total: ${totalProxies}` 
            }, { quoted: m });
        });
    } else if (command === 'download') {
        const proxyPath = './ua.txt';
        conn.sendFile(m.chat, proxyPath, 'PermenMD_UA.txt', 'Downloaded User Agent...');
    } else {
        m.reply('Invalid .ua command. Usage: .ua create <input>, total, or download');
    }
};

handler.help = ['ua'];
handler.tags = ['utility'];
handler.command = /^(ua)$/i;
handler.rowner = true;
module.exports = handler
