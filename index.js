const { getOrCreateAssetById, getAllAssetsFromFolder } = require('./assetUtils');
const { getData, getStringsAfterShop } = require('./communnicationUtils');
const library_id = 'clarins-v3';
const folder_id = 'SEOptiversal';

async function main() {
    try {
        var getAllClarinsAssets = await getAllAssetsFromFolder('BlogPosts');
        var allOptiversalAssets = await getStringsAfterShop();
        console.log(getAllClarinsAssets);
        console.log(allOptiversalAssets);
        var data = await getData();
        //console.log(data);
        //getOrCreateAssetById(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();