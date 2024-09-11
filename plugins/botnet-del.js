const fs = require('fs');

const handler = async (m, { args }) => {
    if (args.length < 1) {
        return m.reply('Usage: .botnet-del <index>');
    }

    const index = parseInt(args[0]) - 1;
    const botnetData = loadBotnetData();

    if (index < 0 || index >= botnetData.endpoints.length) {
        return m.reply(`Invalid index. Please provide a valid index from 1 to ${botnetData.endpoints.length}.`);
    }

    botnetData.endpoints.splice(index, 1);
    saveBotnetData(botnetData);

    m.reply('Botnet endpoint deleted successfully.');
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

handler.command = ['botnet-del'];
handler.rowner = true;
module.exports = handler;
