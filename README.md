# JSON - Encryption with SHA256 Signatures

## Description

A simple, safe way to encrypt a JSON object to be transported over the Internet using OpenSSL - 8192 bit RSA along with SHA256 signatures.

## Execution

Clone this repository and change directories.

Make two new folders named `server` & `client` and then run the commands below (in each folder) in Terminal on Ubuntu/Linux/macOS.

* Generate the 8192 bit RSA keys using,

	`openssl genrsa -out privatekey.pem 8192` to generate the private key
	
	`openssl rsa -in privatekey.pem -pubout -out publickey.pem` to generate the public key.

Change directories again (where package.json is located).

Run `npm install` to automatically install all dependencies required by this project.

Run the project using `nodejs index.js` or `node index.js` (for legacy node installations).