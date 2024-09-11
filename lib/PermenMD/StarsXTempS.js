const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const readline = require("readline");
const pino = require('pino');

const usePairingCode = true;

// Ensure global.sessionName is defined
global.sessionName = './ror'; // Provide a default path or adjust as needed

const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(text, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

async function connectToWhatsApp() {
  const { state } = await useMultiFileAuthState(global.sessionName);
  const haikal = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ['Chrome (Linux)', '', '']
  });

  if (usePairingCode && !haikal.authState.creds.registered) {
    const phoneNumber = process.argv[2]
    const code = await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
await haikal.requestPairingCode(phoneNumber.trim());
      console.log(`Pairing code: ${code}`);
  }
}

// Call the connectToWhatsApp function
connectToWhatsApp();
