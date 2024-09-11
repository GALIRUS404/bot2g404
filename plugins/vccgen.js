// Array to store generated credit card information
let finalResult = [];

// Array of provided BINs with associated bank names and card types
const BINs = [
    { bin: 34, bank: "American Express", cardType: "American Express" },
    { bin: 37, bank: "American Express", cardType: "American Express" },
    { bin: 36, bank: "Diners Club International", cardType: "Discover" },
    { bin: 30000000, bank: "Discover", cardType: "Discover" },
    { bin: 30599999, bank: "Discover", cardType: "Discover" },
    { bin: 30950000, bank: "Discover", cardType: "Discover" },
    { bin: 30959999, bank: "Discover", cardType: "Discover" },
    { bin: 35280000, bank: "Discover", cardType: "Discover" },
    { bin: 35899999, bank: "Discover", cardType: "Discover" },
    { bin: 36, bank: "Diners Club International", cardType: "Discover" },
    { bin: 38, bank: "Discover", cardType: "Discover" },
    { bin: 39, bank: "Discover", cardType: "Discover" },
    { bin: 64, bank: "Discover", cardType: "Discover" },
    { bin: 65, bank: "Discover", cardType: "Discover" },
    { bin: 60110000, bank: "Discover", cardType: "Discover" },
    { bin: 60110999, bank: "Discover", cardType: "Discover" },
    { bin: 60112000, bank: "Discover", cardType: "Discover" },
    { bin: 60114999, bank: "Discover", cardType: "Discover" },
    { bin: 60117400, bank: "Discover", cardType: "Discover" },
    { bin: 60117499, bank: "Discover", cardType: "Discover" },
    { bin: 60117700, bank: "Discover", cardType: "Discover" },
    { bin: 60117999, bank: "Discover", cardType: "Discover" },
    { bin: 60118600, bank: "Discover", cardType: "Discover" },
    { bin: 60119999, bank: "Discover", cardType: "Discover" },
    { bin: 62212600, bank: "Discover", cardType: "Discover" },
    { bin: 62292599, bank: "Discover", cardType: "Discover" },
    { bin: 62400000, bank: "Discover", cardType: "Discover" },
    { bin: 62699999, bank: "Discover", cardType: "Discover" },
    { bin: 62820000, bank: "Discover", cardType: "Discover" },
    { bin: 62889999, bank: "Discover", cardType: "Discover" },
    { bin: 81000000, bank: "Discover", cardType: "Discover" },
    { bin: 81719999, bank: "Discover", cardType: "Discover" },
    { bin: 51, bank: "Mastercard", cardType: "Mastercard" },
    { bin: 52, bank: "Mastercard", cardType: "Mastercard" },
    { bin: 53, bank: "Mastercard", cardType: "Mastercard" },
    { bin: 54, bank: "Mastercard", cardType: "Mastercard" },
    { bin: 55, bank: "Mastercard", cardType: "Mastercard" },
    { bin: 222100, bank: "Mastercard", cardType: "Mastercard" },
    { bin: 272099, bank: "Mastercard", cardType: "Mastercard" },
    { bin: 4, bank: "Visa", cardType: "Visa" }
];

function getCardNumberLength(cardType) {
    switch (cardType) {
        case "American Express":
            return 15;
        case "Diners Club International":
            return 14;
        case "Discover":
            return Math.random() > 0.5 ? 14 : 16;
        case "Mastercard":
            return Math.random() > 0.5 ? 16 : 19;
        case "Visa":
            return Math.random() > 0.5 ? 16 : 19;
        default:
            return 16;
    }
}

function getRandomBIN() {
    const randomIndex = Math.floor(Math.random() * BINs.length);
    return BINs[randomIndex];
}

function calculateLuhnChecksum(number) {
    let sum = 0;
    let isSecondDigit = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));

        if (isSecondDigit) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isSecondDigit = !isSecondDigit;
    }

    return (sum % 10 === 0);
}

function generateCreditCards(howMany) {
    for (let i = 0; i < howMany; i++) {
        const selectedBIN = getRandomBIN();
        const BIN = selectedBIN.bin;
        const bank = selectedBIN.bank;
        const cardType = selectedBIN.cardType;

        let creditCardNumber = BIN.toString();
        const cardNumberLength = getCardNumberLength(cardType);

        for (let j = 0; j < cardNumberLength - BIN.toString().length - 1; j++) {
            creditCardNumber += Math.floor(Math.random() * 10);
        }

        for (let k = 0; k < 10; k++) {
            let tempNumber = creditCardNumber + k;
            if (calculateLuhnChecksum(tempNumber)) {
                creditCardNumber = tempNumber.toString();
                break;
            }
        }

        const cvv = Math.floor(100 + Math.random() * 900);
        const expiryMonth = Math.floor(1 + Math.random() * 12);
        const expiryYear = Math.floor(new Date().getFullYear() + Math.random() * 10);

        finalResult.push(formatCreditCardResult({
            creditCardNumber: creditCardNumber,
            cvv: cvv,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            bank: bank
        }));
    }
}

function formatCreditCardResult(card) {
    return `
[*] Generated Credit Card
> || PermenMD ||
> Number: ${card.creditCardNumber}
> Bank: ${card.bank}
> CVV: ${card.cvv}
> Exp Date: ${card.expiryMonth}/${card.expiryYear}
> Check: https://dnschecker.org/credit-card-validator.php?ccn=${card.creditCardNumber}
`;
}

let handler = async (m, { text }) => {
    if (!text || isNaN(parseInt(text))) {
        return m.reply('❌ Please provide a valid number for how many credit cards you want to generate.');
    }
    else if (parseInt(text) > 10) {
        return m.reply('❌ Too many credit cards requested. Please request 10 or fewer credit cards.');
    }
    generateCreditCards(parseInt(text));
const formattedResult = finalResult.filter(Boolean).join('\n');


conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Successfully Generated`,
body: `Total ${parseInt(text)}`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.banner,
sourceUrl: ``
}}, text: formattedResult}, {quoted: m}).then(() => {
        finalResult = [];
        result = [];
    });}

handler.help = ['vccgen'];
handler.tags = ['utility'];
handler.command = /^(vccgen)$/i;

module.exports = handler;
