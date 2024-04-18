const fs = require('fs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('querystring');
const variables = process.env;

function readPrivateKey(path) {
  return fs.readFileSync(path, 'utf8');
}

function getBearerToken() {
  const privateKey = readPrivateKey('key.cer');
  // JWT payload
  const payload = {
    iss: variables.CLIENTID,
    sub: variables.CLIENTID,
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

module.exports = getBearerToken;

module.exports = getAccessToken;