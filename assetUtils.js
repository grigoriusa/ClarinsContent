const { sendData, getData } = require("./communnicationUtils");
const variables = process.env;

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
    let assetUrl = `${variables.ENVIRONMENTURL}/${variables.LIBRARY_ID}/content/${id}?client_id=${variables.CLIENTID}`;
    const result = await sendData(data, assetUrl, 'GET');
    if (result.error && result.error === 'Not found') {
        return false;
    }
    return result.id;
}

async function getAllAssetsFromFolder(folderId, token) {
    const url = `${variables.ENVIRONMENTURL}/${variables.LIBRARY_ID}/folders/${folderId}/content`;
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
        "id": variables.PREFIX + id,
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
        "id": variables.PREFIX + id,
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
    let assetUrl = `${variables.ENVIRONMENTURL}/${variables.LIBRARY_ID}/content/${id}?client_id=${variables.CLIENTID}`;
    const result = sendData(data, assetUrl, 'PUT', token);
}

async function updateAsset(data, token) {
    let assetUrl = `${variables.ENVIRONMENTURL}/${variables.LIBRARY_ID}/content/${data.id}?client_id=${variables.CLIENTID}`;
    const result = await sendData(data, assetUrl, 'PUT', token);
}

async function createAsset(data, token) {
    let assetUrl = `${variables.ENVIRONMENTURL}/${variables.LIBRARY_ID}/content/${data.id}?client_id=${variables.CLIENTID}`;
    const result = await sendData(data, assetUrl, 'PUT', token);
}

async function assignAssetToFolder(content_id, token) {
    let assetUrl = `${variables.ENVIRONMENTURL}/${variables.LIBRARY_ID}/folder_assignments/${content_id}/${variables.FOLDER_ID}`;
    const result = await sendData({}, assetUrl, 'PUT', token);
}

async function performAction(action, id, token) {
    let data;
    console.log('Performing action: ' + action + ' on asset with id: ' + id);
    switch (action) {
        case 'create':
            data = await getData(id);
            var preparedData = prepareData(data.slug, data.title, data.content, true, false);
            createAsset(preparedData, token);
            return assignAssetToFolder(variables.PREFIX + id, token);
        case 'update':
            data = await getData(id);
            var preparedData = prepareData(data.slug, data.title, data.content, true, false);
            return updateAsset(preparedData, token);
        case 'disable':
            //return disableAsset(variables.PREFIX + id, token);
        default:
            return Promise.resolve();
    }
}

exports.performAction = performAction;
exports.getOrCreateAssetById = getOrCreateAssetById;
exports.getAllAssetsFromFolder = getAllAssetsFromFolder;