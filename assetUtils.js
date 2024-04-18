const { sendData, getData } = require("./communnicationUtils");

const environmentUrl = 'https://staging-eu01-clarins.demandware.net/s/-/dw/data/v19_10/libraries';
const library_id = 'clarins-v3';
const folder_id = 'SEOptiversal';
const clientId = '3b8fd415-29b4-43b7-b6ab-a3b90bf84526';
const prefix = 'OPVSL_';

async function getOrCreateAssetById(data) {
    const id = data.slug;
    // Check if the asset exists
    const existingAsset = await getAssetById(id);
    var data = prepareData(data.slug, data.title, data.content, true, false);
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

async function getAllAssetsFromFolder(folderId, token) {
    const url = `https://staging-eu01-clarins.demandware.net/s/-/dw/data/v19_1/libraries/clarins-v3/folders/${folderId}/content`;
    const result = await sendData({}, url, 'GET', token);
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
        "id": prefix + id,
        "name": {
            "default": title
        },
        "online": {
            "default": false,
            "default@clarinsuk": online
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
            "default": 0,
            "default@clarinsuk": 1
        },
    };
    return data;
}

function prepareDataForDisable(id) {
    // Prepare the data
    const data = {
        "_v": "19.10",
        "_type": "content_asset",
        "id": prefix + id,
        "online": {
            "default": false,
            "default@clarinsuk": false
        },
        "searchable": {
            "default": false
        }
    };
    return data;
}

function disableAsset(id, token) {
    var data = prepareDataForDisable(id);
    let assetUrl = `${environmentUrl}/${library_id}/content/${id}?client_id=${clientId}`;
    const result = sendData(data, assetUrl, 'PUT', token);
    console.log(result);
}

async function updateAsset(data, token) {
    let assetUrl = `${environmentUrl}/${library_id}/content/${data.id}?client_id=${clientId}`;
    const result = await sendData(data, assetUrl, 'PUT', token);
    console.log(result);
}

async function createAsset(data, token) {
    let assetUrl = `${environmentUrl}/${library_id}/content/${data.id}?client_id=${clientId}`;
    const result = await sendData(data, assetUrl, 'PUT', token);
    console.log(result);
}

async function assignAssetToFolder(content_id, token) {
    let assetUrl = `${environmentUrl}/${library_id}/folder_assignments/${content_id}/${folder_id}`;
    const result = await sendData({}, assetUrl, 'PUT', token);
    console.log(result);
}

async function performAction(action, id, token) {
    let data;
    console.log('Performing action: ' + action + ' on asset with id: ' + id);
    switch (action) {
        case 'create':
            data = await getData(id);
            var preparedData = prepareData(data.slug, data.title, data.content, true, false);
            createAsset(preparedData, token);
            return assignAssetToFolder(prefix + id, token);
        case 'update':
            data = await getData(id);
            var preparedData = prepareData(data.slug, data.title, data.content, true, false);
            return updateAsset(preparedData, token);
        case 'disable':
            return disableAsset(prefix + id, token);
        default:
            return Promise.resolve();
    }
}

exports.performAction = performAction;
exports.getOrCreateAssetById = getOrCreateAssetById;
exports.getAllAssetsFromFolder = getAllAssetsFromFolder;