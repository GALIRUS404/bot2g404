const fs = require('fs');

const handler = async (m, { args }) => {
    if (args.length < 1) {
        return m.reply(`Usage: .domains-add <zone>|<apiToken>|<domain>`);
    }

    const input = args.join(' ').split('|');
    if (input.length !== 3) {
        return m.reply(`Invalid format. Usage: .domains-add <zone>|<apiToken>|<domain>`);
    }

    const [zone, apiToken, domain] = input.map(item => item.trim());

    if (!zone || !apiToken || !domain) {
        return m.reply(`All fields are required. Usage: .domains-add <zone>|<apiToken>|<domain>`);
    }

    try {
        const domains = JSON.parse(fs.readFileSync('./lib/domains.json', 'utf8'));
        domains[domain] = { zone, apiToken };

        fs.writeFileSync('./lib/domains.json', JSON.stringify(domains, null, 2));
        m.reply(`Domain added successfully:\n\nDomain: ${domain}\nZone: ${zone}\nAPI Token: ${apiToken}`);
    } catch (error) {
        m.reply(`Failed to add domain. Error: ${error.message}`);
    }
};

handler.command = ['domains-add'];
handler.rowner = true;
module.exports = handler;
