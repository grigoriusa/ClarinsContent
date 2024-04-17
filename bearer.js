const fs = require('fs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('querystring');

function readPrivateKey(path) {
  return fs.readFileSync(path, 'utf8');
}

function getBearerToken() {
  const privateKey = readPrivateKey('key.cer');
  // JWT payload
  const payload = {
    iss: '3b8fd415-29b4-43b7-b6ab-a3b90bf84526',
    sub: '3b8fd415-29b4-43b7-b6ab-a3b90bf84526',
    aud: 'https://account.demandware.com:443/dwsso/oauth2/access_token',
    exp: Math.floor(Date.now() / 1000) + 60, // Expires in 60 seconds
  };

  // JWT options
  const options = {
    algorithm: 'RS256',
  };

  // Sign the JWT
  const token = jwt.sign(payload, privateKey, options);
  return token;
}

async function getAccessToken() {
  const JWT = getBearerToken();

  const data = qs.stringify({
    client_assertion: JWT,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    grant_type: 'client_credentials'
  });

  const TOKEN_URL = 'https://account.demandware.com:443/dwsso/oauth2/access_token';

  try {
    const response = await axios.post(TOKEN_URL, data);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
}

function getBMToken() {
  return 'eyJ6aXAiOiJOT05FIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYiLCJraWQiOiJEMWhPUDdEODN4TjBqZWlqaTI3WWFvZFRjXC9BPSJ9.eyJzZXMiOiJ5dU5kZzlrdGFxVzBoc2NYbm51c0pFa05aWXpCWVI4SUhyem9RNTNXaVV5NzVPVEw2R21VZUV1bFNIZmxNUS1VOXJiWS1ReUtVN2lRaTNKUkx4S3RzUT09Iiwic3ViIjoiYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1ZGl0VHJhY2tpbmdJZCI6IjdhMDA4MzdmLTg3NmUtNGRkMS05YWYxLTFkMzU2YTdlZWExNCIsImlzcyI6ImFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYSIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6ImQyYTJjZmY5LTNiMzEtNGU5NC05NWFjLTNlZmQyZmNkYjhkOSIsImNsaWVudF9pZCI6ImFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYSIsImF1ZCI6ImFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYSIsIm5iZiI6MTcxMzM1ODkwOSwidXNyIjoieWV2aGVuaWlAY29udHJhY29sbGVjdGl2ZS5jb20iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwic2NvcGUiOlsibWFpbCJdLCJhdXRoX3RpbWUiOjE3MTMzNTg5MDksInJlYWxtIjoiXC8iLCJ0bnQiOiJia2NsXzAwMSIsImV4cCI6MTcxMzM1OTgwOSwiaWF0IjoxNzEzMzU4OTA5LCJleHBpcmVzX2luIjo4OTksImp0aSI6IjkzMWIxYmZjLTJiNWUtNGUxNS1iMmI3LWU3M2EwYzk1ZTdlYiJ9.ex8N8EQ-j7lBZt00hXW1uQUQe9JWN0dyleHfQDQnJ5z86qMwgv0XR7PqDcROv0D_IaWcqTLXf5jUyWBfTyyg3iX7pkZsAf0u9MG6ytfgCggSA_DdmDw5yS0q4vdLfTuDLopQmBg5SJis5ucG-EG82J50AgmrDdkku5-y5eYTksCV8Ar-dWRXf0JX8wyVust8m24Fjo3HBZukxN4gFr2eM9_YUQOZTa9vhXNjpsNW0im7f3QnMY6LGIeZB-SuuGXHiuuvJB7kR-25OBvU7I3tl6CwB-ibbdGdMYe0Cb-m9wOmOZn7RdV57LraaHy8Xzof566KA74PRk9ZNYhEWrwc3Q'
}

module.exports = getBMToken;

module.exports = getBearerToken;

module.exports = getAccessToken;