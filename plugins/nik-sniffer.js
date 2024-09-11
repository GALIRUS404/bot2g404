const { nikParser } = require('nik-parser')
const handler = async (m, { args }) => {
    if (args.length < 1) {
        return m.reply('Usage: .nik-sniff <NIK>');
    }

    const ktp = args[0];
    const nik = nikParser(ktp);

    if (!nik.isValid()) {
        return m.reply('Invalid NIK. Please provide a valid NIK.');
    }

    const info = `
NIK Information:
- Province ID: ${nik.provinceId()}
- Province: ${nik.province()}
- Kabupaten/Kota ID: ${nik.kabupatenKotaId()}
- Kabupaten/Kota: ${nik.kabupatenKota()}
- Kecamatan ID: ${nik.kecamatanId()}
- Kecamatan: ${nik.kecamatan()}
- Kodepos: ${nik.kodepos()}
- Gender: ${nik.kelamin()}
- Birthdate: ${nik.lahir().toISOString().split('T')[0]}
- Unique Code: ${nik.uniqcode()}
    `.trim();

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
            text: info         }, { quoted: m });

};

handler.command = ['nik-sniff'];
handler.rowner = true;
module.exports = handler;
