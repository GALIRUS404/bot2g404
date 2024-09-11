let handler = async (m, { text, conn }) => {
    const args = text.split(' ').map(arg => arg.trim());
    if (args.length < 1) {
        m.reply(`*Format salah!*\nPenggunaan:\n\`\`\`.delusr <ID_USER>\`\`\`\n\nContoh:\n\`\`\`.delusr 123\`\`\``);
        return;
    }

    const usr = args[0];
    const domain = global.linkPanel;
    const apikey = global.apikey;

    try {
        let response = await fetch(`${domain}/api/application/users/${usr}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            }
        });

        if (response.ok) {
            m.reply('*SUCCESSFULLY DELETE THE USER*');
        } else {
            let res = await response.json();
            m.reply(res.errors ? '*USER NOT FOUND*' : '*FAILED TO DELETE THE USER*');
        }
    } catch (error) {
        m.reply(error.message);
    }
};

handler.help = ['delusr'];
handler.tags = ['tools'];
handler.command = /^(delusr)$/i;
handler.rowner = true;
module.exports = handler;
