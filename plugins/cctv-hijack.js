const axios = require('axios');
const fs = require('fs');
const path = require('path');

const handler = async (m, { args, conn }) => {
    const headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Host": "www.insecam.org",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    };

    if (args.length < 1) {
        try {
            const url = "http://www.insecam.org/en/jsoncountries/";
            const resp = await axios.get(url, { headers });
            const countries = resp.data.countries;

            let countryList = "Available country codes:\n\n";
            for (const [code, countryInfo] of Object.entries(countries)) {
                countryList += `Code: (${code}) - ${countryInfo.country} / (${countryInfo.count} cameras)\n`;
            }

            return m.reply(countryList);
        } catch (error) {
            console.error('Error fetching country codes:', error.message);
            return m.reply('An error occurred while fetching the country codes.');
        }
    }
await m.reply('PermenMisc Hijacking...')

    const countryCode = args[0];

    try {
        let res = await axios.get(`http://www.insecam.org/en/bycountry/${countryCode}`, { headers });
        const lastPageMatch = res.data.match(/pagenavigator\("\?page=", (\d+)/);
        if (!lastPageMatch) {
            return m.reply('Could not determine the number of pages.');
        }

        const lastPage = parseInt(lastPageMatch[1]);
        const findIpRegex = /http:\/\/\d+\.\d+\.\d+\.\d+:\d+/g;
        const ips = [];

        for (let page = 1; page <= lastPage; page++) {
            res = await axios.get(`http://www.insecam.org/en/bycountry/${countryCode}/?page=${page}`, { headers });
            const pageIps = res.data.match(findIpRegex);
            if (pageIps) {
                ips.push(...pageIps);
            }
        }

        if (ips.length === 0) {
            return m.reply('No IPs found.');
        }

        if (ips.length > 100) {
            const filePath = path.join(__dirname, `${countryCode}.txt`);
            fs.writeFileSync(filePath, ips.join('\n'), 'utf8');
            await conn.sendMessage(m.chat, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: global.title,
                        body: global.namabot,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnailUrl: global.tracking,
                        sourceUrl: ``
                    }
                },
                text: `Found ${ips.length} IPs. Sending as a file...`
            }, { quoted: m });
            return await conn.sendFile(m.chat, filePath, `${countryCode}.txt`, `Found ${ips.length} IPs.`, m);
        } else {
            await conn.sendMessage(m.chat, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: global.title,
                        body: global.namabot,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnailUrl: global.tracking,
                        sourceUrl: ``
                    }
                },
                text: `Found ${ips.length} IPs:\n\n${ips.join('\n')}`
            }, { quoted: m });
        }
    } catch (error) {
        console.error('Error:', error.message);
        m.reply('An error occurred while hijacking CCTV feeds.');
    }
};

handler.command = ['cctv-hijack'];
handler.rowner = true;
module.exports = handler;
