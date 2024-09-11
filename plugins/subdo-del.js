const axios = require('axios');
const fs = require('fs');

const handler = async (m, { args }) => {
    if (args.length < 2) {
        return m.reply(`Usage: .subdo-del <domains> <hostnames>`);
    }

    const domains = JSON.parse(fs.readFileSync('./lib/domains.json', 'utf8'));
    const domainIndex = parseInt(args[0]) - 1;
    const subdomain = args[1].trim();

    if (!domains[Object.keys(domains)[domainIndex]]) {
        return m.reply(`Invalid domain index. Usage: .subdo-del <domains> <hostnames>`);
    }

    const domainInfo = domains[Object.keys(domains)[domainIndex]];
    const { zone, apiToken } = domainInfo;
    const tld = Object.keys(domains)[domainIndex];
    const fullSubdomain = `${subdomain}.${tld}`;

    const listUrl = `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records?type=A&name=${fullSubdomain}`;
    const headers = {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json"
    };

    try {
        const { data: listData } = await axios.get(listUrl, { headers });
        if (listData.success && listData.result.length > 0) {
            const recordId = listData.result[0].id;
            const deleteUrl = `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records/${recordId}`;

            const { data: deleteData } = await axios.delete(deleteUrl, { headers });
            if (deleteData.success) {
                m.reply(`Subdomain deleted successfully:\n\n${fullSubdomain}`);
            } else {
                m.reply(`Failed to delete subdomain. Error: ${deleteData.errors[0]?.message || "Unknown error"}`);
            }
        } else {
            m.reply(`Subdomain not found:\n\n${fullSubdomain}`);
        }
    } catch (error) {
        m.reply(`Failed to delete subdomain. Error: ${error.message}`);
    }
};

handler.command = ['subdo-del'];
handler.premium = true;
handler.group = true;
module.exports = handler;
