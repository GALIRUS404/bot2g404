let handler = async (m, { text, conn }) => {
    const args = text.split(' ').map(arg => arg.trim());
    if (args.length < 1) {
        m.reply(`*Format salah!*\nPenggunaan:\n\`\`\`.delsrv <ID_SERVER>\`\`\`\n\nContoh:\n\`\`\`.delsrv 123\`\`\``);
        return;
    }

    const srv = args[0];
    const domain = global.linkPanel;
    const apikey = global.apikey;

    try {
        let response = await fetch(`${domain}/api/application/servers/${srv}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        if (response.ok) {
            m.reply('*SUCCESSFULLY DELETE THE SERVER*');
        } else {
            let res = await response.json();
            m.reply(res.errors ? '*SERVER NOT FOUND*' : '*FAILED TO DELETE THE SERVER*');
        }
    } catch (error) {
        m.reply(error.message);
    }
};

handler.help = ['delsrv'];
handler.tags = ['tools'];
handler.command = /^(delsrv)$/i;
handler.rowner = true;
module.exports = handler;
