const { performAction, getAllAssetsFromFolder } = require('./assetUtils');
const { getStringsAfterShop } = require('./communnicationUtils');
const getAccessToken = require('./bearer.js');
const variables = process.env;

function compareAssets(getAllClarinsAssets, allOptiversalAssets) {
    let result = [];

    allOptiversalAssets.forEach(asset => {
        let existsInClarins = getAllClarinsAssets.includes(variables.PREFIX + asset);
        result.push({ id: asset, action: existsInClarins ? 'update' : 'create' });
    });

    getAllClarinsAssets.forEach(asset => {
        let id = asset.replace(variables.PREFIX, '');
        if (!allOptiversalAssets.includes(id)) {
            result.push({ id: id, action: 'disable' });
        }
    });

    return result;
}

async function main() {
    try {
        const token = await getAccessToken();
        var getAllClarinsAssets = await getAllAssetsFromFolder(variables.FOLDER_ID, token);
        var allOptiversalAssets = await getStringsAfterShop();
        var result = compareAssets(getAllClarinsAssets, allOptiversalAssets);
        let promises = result.map(item => performAction(item.action, item.id, token));

        Promise.all(promises)
            .then(() => console.log('All actions completed'))
            .catch(error => console.error('An error occurred:', error));
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();