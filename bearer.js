const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');
const axios = require('axios');
const querystring = require('querystring');
function readPrivateKey(filePath) {
  const keyData = fs.readFileSync(filePath, 'utf8');
  return crypto.createPrivateKey({
      key: keyData,
      format: 'pem',
      type: 'pkcs1' // or 'pkcs8' depending on your key format
  });
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


function getBMToken() {
  return 'eyJ6aXAiOiJOT05FIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYiLCJraWQiOiJEMWhPUDdEODN4TjBqZWlqaTI3WWFvZFRjXC9BPSJ9.eyJzZXMiOiJ4VDFlMk1kRWM0blJra01NYk5vdmt0LUVLTl9aSzV1T1Q5eGROREp3WHZHSVlldnFtdmU1clJsblAweG01Nml0U0UxbTBrVmJncmduTzU5V3VaYVZ3dz09Iiwic3ViIjoiYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1ZGl0VHJhY2tpbmdJZCI6IjExYmY2N2ZjLTlhNmQtNGQ3YS1iZmNkLWEyZTNmYTYxMDA4NiIsImlzcyI6ImFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYSIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6IjJlODI2NzEyLTU2MjktNDI2MS1iZDBiLTlkODJlMGM5NzVkYiIsImNsaWVudF9pZCI6ImFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYSIsImF1ZCI6ImFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYSIsIm5iZiI6MTcxMjUwNDA5MywidXNyIjoieWV2aGVuaWlAY29udHJhY29sbGVjdGl2ZS5jb20iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwic2NvcGUiOlsibWFpbCJdLCJhdXRoX3RpbWUiOjE3MTI1MDQwOTMsInJlYWxtIjoiXC8iLCJ0bnQiOiJia2NsXzAwMSIsImV4cCI6MTcxMjUwNDk5MywiaWF0IjoxNzEyNTA0MDkzLCJleHBpcmVzX2luIjo4OTksImp0aSI6IjdiNDA4MWZkLTg1NTUtNDMwOC05NGMyLWQ1MWQ1MTAzZTJmNyJ9.GHuuhD_cmBN6TQ9riv0ogZIlk5hJVt8aLYJG8iaNmwNcWJP48M0le6iEXcFyfOA-WYOnrm8e34NIVyTGesEvsVzr3zpVe3SS_iD3EdJZv3X7X8DcJ2HTg56kLyVJoI8q-HRcL_mvcCbaZGYUzu60XzPzNd8q6xYe_xfo2JUAvUUAokl5dPIuFBnqpN4JGq9_DoC9k5CFiBQMP8V4KqmVmhiSM_rp98NI6843wYDK-N--WzH78JbyKCnVUkzLrFEHC33Xv_d2HOYERBLBTgOyqLadrANeBHhm2MZv5pnH7wxbSS9EvVbQs7VuLVKsf-IzN-3B8GmH-N05QOvfQkgT5Q'
}

module.exports = getBMToken;

module.exports = getBearerToken;