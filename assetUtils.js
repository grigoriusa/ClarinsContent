const { sendData } = require("./communnicationUtils");

const environmentUrl = 'https://staging-eu01-clarins.demandware.net/s/-/dw/data/v19_10/libraries';
const clientId = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const library_id = 'clarins-v3';
const folder_id = 'SEOptiversal';
//const environmentUrl = 'https://staging-eu01-clarins.demandware.net/s/-/dw/data/v19_10/libraries';
//const clientId = '3b8fd415-29b4-43b7-b6ab-a3b90bf84526';

async function getOrCreateAssetById(data) {
    const id = data.slug;
    // Check if the asset exists
    const existingAsset = await getAssetById(id);
    var data = prepareData(data.slug, data.title, data.content, true, true);
    if (existingAsset) {
        // Update the existing asset
        await updateAsset(data);
        console.log('Asset updated successfully');
    } else {
        // Create a new asset
        await createAsset(data);
        console.log('Asset created successfully');
    }
}

async function getAssetById(id) {
    var data = {};
    let assetUrl = `${environmentUrl}/${library_id}/content/${id}?client_id=${clientId}`;
    const result = await sendData(data, assetUrl, 'GET');
    if (result.error && result.error === 'Not found') {
        return false;
    }
    return result.id;
}

async function getAllAssetsFromFolder(folderId) {
    const url = `https://staging-eu01-clarins.demandware.net/s/-/dw/data/v19_1/libraries/clarins-v3/folders/SEOptiversal/content`;
    const result = await sendData({}, url, 'GET');
    const ids = result.hits.map(hit => hit.id);
    return ids;
}

function prepareData(id, title, content, online, searchable) {
    // Prepare the data
    const data = {
        "_v": "19.10",
        "_type": "content_asset",
        "description": {
            "default": title
        },
        "id": id,
        "name": {
            "default": title
        },
        "online": {
            "default": online
        },
        "searchable": {
            "default": searchable
        },
        "c_body": {
            "default": {
                "_type": "markup_text",
                "markup": content,
                "source": content
            }
        },
        "page_description": {
            "default": title
        },
        "page_title": {
            "default": title
        },
        "site_map_included": {
            "default": 1
        },
    };
    return data;
}

async function updateAsset(data) {
    let assetUrl = `${environmentUrl}/${library_id}/content/${data.id}?client_id=${clientId}`;
    const result = await sendData(data, assetUrl, 'UPDATE');
    console.log(result);
}

async function createAsset(data) {
    let assetUrl = `${environmentUrl}/${library_id}/content/${data.id}?client_id=${clientId}`;
    const result = await sendData(data, assetUrl, 'PUT');
    console.log(result);
}

exports.getOrCreateAssetById = getOrCreateAssetById;
exports.getAllAssetsFromFolder = getAllAssetsFromFolder;