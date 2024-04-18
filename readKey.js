const fs = require('fs');
const crypto = require('crypto');

function readPrivateKey(filePath) {
    const keyData = fs.readFileSync(filePath, 'utf8');
    const pemLines = keyData.toString().split('\n');
    const pem = [];
    for (let i = 0; i < pemLines.length; i++) {
        if (pemLines[i].trim().length > 0 && pemLines[i].indexOf('-----BEGIN ') === 0) {
            while (i + 1 < pemLines.length && pemLines[i + 1].trim().length > 0 && pemLines[i + 1].indexOf('-----END ') !== 0) {
                pem.push(pemLines[++i].trim());
            }
            pem.push(pemLines[i].trim());
        }
    }
    const pemString = pem.join('');
    const buffer = Buffer.from(pemString, 'base64');
    return crypto.createPrivateKey(buffer);
}
const privateKey = readPrivateKey('clarins_key');