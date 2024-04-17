const { getOrCreateAssetById } = require('./assetUtils');
const { getData } = require('./communnicationUtils');

async function main() {
    try {
        var data = await getData();
        getOrCreateAssetById(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();