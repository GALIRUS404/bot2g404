const handler = async (m, { text, conn }) => {
    // Check if the message contains the '|' delimiter
    if (!text.includes('|')) {
        return m.reply('Usage: .chat <recipient>|<message>\n\nExample: .chat 628xxx|Hello, how are you?');
    }

    // Split the text using '|' to extract recipient and message
    const [recipient, ...messageParts] = text.split('|');
    const message = messageParts.join('|').trim(); // Join message parts in case '|' was used in the message

    if (!message) {
        return m.reply('Please provide a message to send.');
    }

    try {
        // Send the message to the recipient
        await conn.sendMessage(recipient.trim() + '@s.whatsapp.net', { text: message });

        // Notify the sender that the message was sent
        m.reply('Message sent anonymously.');
    } catch (error) {
        console.error('Error sending message:', error.message);
        m.reply('An error occurred while sending the message.');
    }
};

handler.command = ['chat'];
handler.rowner = false; // Restrict the command to the bot owner
module.exports = handler;