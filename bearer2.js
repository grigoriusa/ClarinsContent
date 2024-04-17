const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const AM_CLIENT_ID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const AM_TOKEN_URL = "https://account.demandware.net:443/dwsso/oauth2/access_token";

const payload = {
    iss: AM_CLIENT_ID,
    sub: AM_CLIENT_ID,
    aud: AM_TOKEN_URL,
    exp: Math.floor(Date.now() / 1000) + 1,
};

async function main() {
    try {
        const secret = await readFileAsync("yev.key", "utf8");

        const token = jwt.sign(payload, secret, { algorithm: "RS256" });

        const data = {
            client_assertion: token,
            client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            grant_type: "client_credentials",
        };

        const res = await axios.post(AM_TOKEN_URL, data);

       // console.log(res.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
