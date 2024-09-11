const fs = require('fs');
const url = require('url')

const handler = async (m, { text }) => {
    if (!text) {
        return m.reply('Usage: .botnet-add <endpoint>');
    }
    const parsedUrl = new url.URL(text);
    const hostt = parsedUrl.host;
    const endpoint = 'http://' + hostt + '/permen'
    const botnetData = loadBotnetData();
    if (botnetData.endpoints.includes(endpoint)) {
        return m.reply(`Endpoint ${endpoint} is already in the botnet list.`);
    }

    botnetData.endpoints.push(endpoint);
    saveBotnetData(botnetData);
    m.reply(`Endpoint ${endpoint} added to botnet.`);
};

function loadBotnetData() {
    try {
        return JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        return { endpoints: [] };
    }
}

function saveBotnetData(botnetData) {
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
    }
}

handler.command = ['botnet-add'];
handler.help = ['botnet-add <endpoint>', 'Add a botnet endpoint to the list.'];
handler.tags = ['botnet'];
handler.rowner = true;
module.exports = handler;
