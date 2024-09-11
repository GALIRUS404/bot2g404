const leakCheckEndpoint = 'https://leakcheck.io/api/public?check=';

const handler = async (m, { text }) => {
    if (!text) {
        return m.reply('Format: .dw-check <keyword>');
    }

    try {
        const url = `${leakCheckEndpoint}${encodeURIComponent(text)}`;

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        let messageText = `Darkweb leak check results for "${text}":\n\nFound: ${data.found}\nFields: ${data.fields.join(', ')}\n\n`;

        if (data.success && data.found > 0) {
            data.sources.forEach(source => {
                messageText += `Source: ${source.name}\n`;
                messageText += `Date: ${source.date}\n\n`;
            });
        } else {
            messageText += 'No results found.\n';
        }

        await conn.sendMessage(m.chat, { contextInfo: {
        externalAdReply: {
          showAdAttribution: true, 
          title: `Free Dark Web Leaks Check`,
          body: `${text} Data On Dark Web`,
          mediaType: 1,  
          renderLargerThumbnail : true,
          thumbnailUrl: global.tracking,
          sourceUrl: ``

        }

      }, text: messageText}, {quoted: m});
    } catch (error) {
        console.error('Failed to check :', error);
        await m.reply(`Failed to check : ${error.message}`);
    }
};

handler.command = ["dw-check"]
module.exports = handler;
