SFCC Integration 
OCAPI Configuration
1. Create OCAPI key in Account Page. Make sure that OCAPI is enabled in BM.
    Help video - https://www.youtube.com/watch?v=Z3cZlQHWjtM&list=PLFNbZmUNjID7UuW9nGFwbNgAVF3yNlu3v&index=8
3. Create OCAPI config for Open Commerce API Settings, type - data, context - Global.
   {
	"_v": "19.10",//you can use your ocapi version
	"clients": [
		{
			"client_id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			"resources": [
				{
					"resource_id": "/libraries/*/folders/*",
					"methods": [
						"get",
						"put",
						"patch",
						"delete"
					],
					"read_attributes": "(**)",
					"write_attributes": "(**)"
				},
				{
					"resource_id": "/libraries/*/folders/*/content",
					"methods": [
						"get"
					],
					"read_attributes": "(**)",
					"write_attributes": "(**)"
				},
				{
					"resource_id": "/libraries/*/content/*",
					"methods": [
						"get",
						"put",
						"patch",
						"delete"
					],
					"read_attributes": "(**)",
					"write_attributes": "(**)"
				},
				{
					"resource_id": "/libraries/*/content/*/folders",
					"methods": [
						"get"
					],
					"read_attributes": "(**)",
					"write_attributes": "(**)"
				},
				{
					"resource_id": "/libraries/*/folder_assignments/*/*",
					"methods": [
						"get",
						"put",
						"delete"
					],
					"read_attributes": "(**)",
					"write_attributes": "(**)"
				}
			]
		}
	]
}
4. Insert public, private keys which Optiversal provide for the ocapi key.

Log into Account Manager and create an API Client. See Adding a client ID for the Open Commerce API.
Upload either a base64-encoded X.509 certificate containing the public key, or the Base64-encoded public key itself, to the JWT (Client JWT Bearer Public Key) section.
For Token Endpoint Auth Method, select private_key_jwt.
Create the JWT for requesting access tokens and sign it with the private key. The JWT format is described in the JWT Profile specification. Here's an example.
# header
{
  "alg": "RS256",
  "typ": "JWT"
}
# payload
{
  "iss": "[your_own_client_id]",           // string identifying the issuing client app
  "sub": "[your_own_client_id]",   // string identifying the issuing client app
  "exp": 1548407254, // must be not more than 30 minutes in future
  "aud": "https://account.demandware.com:443/dwsso/oauth2/access_token"
}
SFCC docs - https://developer.salesforce.com/docs/commerce/b2c-commerce/references/b2c-commerce-ocapi/oauth.html#requesting-an-access-token-using-a-jwt-and-key-pair

BM Config
1. Create folderID for the Optiversal where content will be stored.

At the end you need to provide such information
ENVIRONMENTURL = https://your-domain.demandware.net/s/-/dw/data/v19_10/libraries
LIBRARY_ID = 
FOLDER_ID = 
CLIENTID = 
