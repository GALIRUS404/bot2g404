let handler = async (m, { text }) => {
    const args = text.split('|').map(arg => arg.trim());
    if (args.length < 3) {
        m.reply(`*Format salah!*\nPenggunaan:\n\`\`\`.cpanel <size>|<username>|<nomer>\`\`\`\n\n<size> bisa berupa 1gb-32gb atau unli.`);
        return;
    }

    const apiKey = global.apikey
    const domain = global.linkPanel
    const egg = global.egg
    const location = global.loc
    const size = args[0].toLowerCase();
    const username = args[1]
    const userNumber = args[2].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let memo, cpu, disk;

    if (size === "unli") {
        memo = "0";
        cpu = "0";
        disk = "0";
    } else if (/^\d+gb$/.test(size)) {
        const gbSize = parseInt(size.replace('gb', ''), 10);
        if (gbSize < 1 || gbSize > 32) {
            m.reply(`*Size tidak valid!*\nPenggunaan:\n\`\`\`.cpanel <size>|<username>|<nomer>\`\`\`\n\n<size> bisa berupa 1gb-32gb atau unli.`);
            return;
        }
        memo = (gbSize * 1000).toString();
        cpu = (gbSize * 30).toString();
        disk = (gbSize * 1000).toString();
    } else {
        m.reply(`*Size tidak valid!*\nPenggunaan:\n\`\`\`.cpanel <size>|<username>|<nomer>\`\`\`\n\n<size> bisa berupa 1gb-32gb atau unli.`);
        return;
    }

    const email = `${username}@permen.com`;
    const password = 'Permen' + Math.random().toString(36).substring(7);;
    const akunlo = global.standby;

    try {
        let userFetch = await fetch(`${domain}/api/application/users`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({ email, username, first_name: username, last_name: username, language: "en", password })
        });
        let userData = await userFetch.json();
        if (userData.errors) throw new Error(JSON.stringify(userData.errors[0], null, 2));
        let user = userData.attributes;

        let eggFetch = await fetch(`${domain}/api/application/nests/5/eggs/${egg}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        });
        let eggData = await eggFetch.json();
        let startup_cmd = eggData.attributes.startup;

        let serverFetch = await fetch(`${domain}/api/application/servers`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                name: username,
                description: " ",
                user: user.id,
                egg: parseInt(egg),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: startup_cmd,
                environment: { INST: "npm", USER_UPLOAD: "0", AUTO_UPDATE: "0", CMD_RUN: "npm start" },
                limits: { memory: memo, swap: 0, disk, io: 500, cpu },
                feature_limits: { databases: 5, backups: 5, allocations: 1 },
                deploy: { locations: [parseInt(location)], dedicated_ip: false, port_range: [] }
            })
        });
        let serverData = await serverFetch.json();
        if (serverData.errors) throw new Error(JSON.stringify(serverData.errors[0], null, 2));

        m.reply(`PROSES ⚡`);
        let ctf = `Paket Untuk @${userNumber.split('@')[0]}\n\n *USERNAME* : ${user.username}\n *PASSWORD* : ${password}\n *LOGIN* : ${domain}\n\nNOTE :\nData Dikirim 1x Jangan Di Hilangkan Dan Simpan Bukti Transaksi\n`;
        conn.sendMessage(userNumber, { contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `Paket Mendarat Dengan Selamat`,
                    body: `Panel Details`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: akunlo,
                    sourceUrl: ``
                }
            }, 
            text: ctf
        }, { quoted: m });

        m.reply(`*Pterodactyl Panel Created*\n▬▭▬▭▬▭▬▭▬▭▬▭▬\nUser Details\n▬▭▬▭▬▭▬▭▬▭▬▭▬\nID: ${user.id}\nUUID: ${user.uuid}\nUSERNAME: ${user.username}\nMAIL: ${user.email}\nNAME: ${user.first_name} ${user.last_name}\nLANGUAGE: ${user.language}\nADMIN: ${user.root_admin}\nCREATED AT: ${user.created_at}\n▬▭▬▭▬▭▬▭▬▭▬▭▬\n*Data Sended To @${userNumber.split('@')[0]}*`);
    } catch (error) {
        m.reply(error.message);
    }
};

handler.help = ['cpanel'];
handler.tags = ['tools'];
handler.command = /^(cpanel)$/i;
handler.premium = true;
module.exports = handler;
