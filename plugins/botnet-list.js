const fs = require('fs');

const handler = async (m, { args }) => {
    const botnetData = loadBotnetData();

    if (botnetData.endpoints.length === 0) {
        return m.reply('Botnet list is empty.');
    }

    let response = 'Current Botnet:\n\n';
    botnetData.endpoints.forEach((endpoint, index) => {
        response += `${index + 1}. ${endpoint}\n`;
    });

    m.reply(response);
};

function loadBotnetData() {
    try {
        return JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        return { endpoints: [] };
    }
}

handler.command = ['botnet-list'];
handler.rowner = true;
module.exports = handler;
