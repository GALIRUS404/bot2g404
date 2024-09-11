let handler = async (m, { text, conn }) => {
    const args = text.split(' ').map(arg => arg.trim());
    const page = args[0] ? args[0] : '1';

    const domain = global.linkPanel;
    const apikey = global.apikey;
    const capikey = global.capikey;

    try {
        let response = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        let res = await response.json();
        let servers = res.data;
        let messageText = "Berikut adalah daftar server:\n\n";

        for (let server of servers) {
            let s = server.attributes;

            let statusResponse = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${capikey}`
                }
            });

            let statusData = await statusResponse.json();
            let status = statusData.attributes ? statusData.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Server: ${res.meta.pagination.count}`;

        await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });

        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
            m.reply(`Gunakan perintah .listsrv ${parseInt(res.meta.pagination.current_page) + 1} untuk melihat halaman selanjutnya.`);
        }
    } catch (error) {
        m.reply(error.message);
    }
};

handler.help = ['listsrv'];
handler.tags = ['tools'];
handler.command = /^(listsrv)$/i;
handler.rowner = true;
module.exports = handler;
