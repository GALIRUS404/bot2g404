let handler = async (m, { text, conn }) => {
    const args = text.split('|').map(arg => arg.trim());
    if (args.length < 2) {
        m.reply(`*Format salah!*\nPenggunaan:\n\`\`\`.createadmin <user>|<nomer>\`\`\`\n\nContoh:\n\`\`\`.createadmin permen|@tag/nomor\`\`\``);
        return;
    }

    const username = args[0];
    const email = `${username}@permen.com`
    const nomor = args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    if (!username) return m.reply(`Ex: .createadmin username|@tag/nomor\n\nContoh:\n.createadmin permen|@user`);
    if (!nomor) return m.reply(`Ex: .createadmin username|@tag/nomor\n\nContoh:\n.createadmin permen|@user`);

    const password = username + Math.random().toString(36).substring(7);;
    const domain = global.linkPanel;
    const apikey = global.apikey;

    try {
        let response = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            },
            body: JSON.stringify({
                email: email,
                username: username,
                first_name: username,
                last_name: "Memb",
                language: "en",
                root_admin: true,
                password: password.toString()
            })
        });

        let data = await response.json();
        if (data.errors) throw new Error(JSON.stringify(data.errors[0], null, 2));

        let user = data.attributes;

        let tks = `
ID: ${user.id}
UUID: ${user.uuid}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
LANGUAGE: ${user.language}
ADMIN: ${user.root_admin}
CREATED AT: ${user.created_at}

LOGIN: ${domain}
`;

        const listMessage = { text: tks };
        await conn.sendMessage(m.chat, listMessage);

        await conn.sendMessage(nomor, { contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `Paket Mendarat Dengan Selamat`,
                    body: `Panel Details`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: `https://telegra.ph/file/a9a0700945f96ed0bde39.jpg`,
                    sourceUrl: ``
                }
            }, 
            text: `*BERIKUT DETAIL AKUN ADMIN PANEL ANDA*\n\nUSERNAME: ${username}\nPASSWORD: ${password}\nLOGIN: ${domain}\n\n*NOTE: OWNER HANYA MENGIRIM 1X DATA AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI*`,
        }, { quoted: m });

    } catch (error) {
        m.reply(error.message);
    }
};

handler.help = ['createadmin'];
handler.tags = ['tools'];
handler.command = /^(createadmin)$/i;
handler.rowner = true;
module.exports = handler;
