let handler = async (m, { text, conn }) => {
    const args = text.split(' ').map(arg => arg.trim());
    const page = args[0] ? args[0] : '1';

    const domain = global.linkPanel;
    const apikey = global.apikey;

    try {
        let response = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        let res = await response.json();
        let users = res.data;
        let messageText = "Berikut list user:\n\n";

        for (let user of users) {
            let u = user.attributes;
            messageText += `ID: ${u.id} - Status: ${u.server_limit === null ? 'Inactive' : 'Active'}\n`;
            messageText += `${u.username}\n`;
            messageText += `${u.first_name} ${u.last_name}\n\n`;
        }

        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Users: ${res.meta.pagination.count}`;

        await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });

        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
            m.reply(`Gunakan perintah .listusr ${parseInt(res.meta.pagination.current_page) + 1} untuk melihat halaman selanjutnya.`);
        }
    } catch (error) {
        m.reply(error.message);
    }
};

handler.help = ['listusr'];
handler.tags = ['tools'];
handler.command = /^(listusr)$/i;
handler.rowner = true;
module.exports = handler;
