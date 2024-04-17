const getBMToken = require('./bearer.js');
const getBearerToken = require('./bearer.js');
const getAccessToken = require('./bearer.js');
const axios = require('axios');
const xml2js = require('xml2js');



async function sendData(data, url, method) {
    var token = await getAccessToken();
    console.log('token ' + token);
    try {
        if (method === 'GET') {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } else if (method === 'DELETE') {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } else if (method === 'POST') {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } else if (method === 'PUT') {
            const response = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error sending data:', error);
        if (error.response.status === 404) {
            return {error : 'Not found'}
        } else {
            return {error : '500 error'}
        }

    }
}

async function getData() {
    const url = 'https://clarins.stg.optiversal.com/data/mascara-for-long-lashes.json';
  
    try {
      const response = await axios.get(url);
      const data = response.data;
  
      // Extract the required fields
      const slug = data.slug;
      const title = data.title;
      const metaDescription = data.metaDescription;
      const schema = Buffer.from(data.schema, 'base64').toString();
      const content = Buffer.from(data.content, 'base64').toString();
  
      return { slug, title, metaDescription, schema, content };
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }
  
  async function getStringsAfterShop() {
    try {
      const response = await axios.get('https://clarins.stg.optiversal.com/sitemap.xml');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);
      const urls = result.urlset.url;
  
      const stringsAfterShop = urls.map(url => {
        const parts = url.loc[0].split('shop/');
        return parts[1];
      });
  
      return stringsAfterShop;
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  }
  
exports.getStringsAfterShop = getStringsAfterShop;
exports.getData = getData;
exports.sendData = sendData;