'use strict';
var fs = require('fs');
var ursa = require('ursa');
var msg, sig, enc, rcv, tosend, received_msg, network_JSON;

// Server has it's private and Client's public key
var privkeyServer = ursa.createPrivateKey(fs.readFileSync('./server/privatekey.pem'));
var pubkeyClient = ursa.createPublicKey(fs.readFileSync('./client/publickey.pem'));

// Client has it's private and Server's public key
var privkeyClient = ursa.createPrivateKey(fs.readFileSync('./client/privatekey.pem'));
var pubkeyServer = ursa.createPublicKey(fs.readFileSync('./server/publickey.pem'));

// SENDER's Side
// =========================================================
// JSON Message to send
tosend = {
  TEST: {
    MSG: "This is a test JSON message!"
  }
};
msg = JSON.stringify(tosend);
console.log("\nJSON message:\n "+msg+"\n");

// Encryption
console.log('Encrypt with clients public key and sign the encrypted message with servers private key ..\n');
enc = pubkeyClient.encrypt(msg, 'utf8', 'base64');
sig = privkeyServer.hashAndSign('sha256', enc, 'utf8', 'base64');

// Print encrypted text and signature
console.log('Encrypted message: ', enc, '\n');
console.log('Signature after encryption: ', sig, '\n');

// This JSON can be transmitted over the public Internet
// =========================================================
network_JSON = {
  enc: enc,
  sig: sig
};

// RECEIVER's Side
// =========================================================
// Signature verification
console.log("Verify signature with servers public key..\n")
var enc2 = new Buffer(network_JSON.enc).toString('base64');
if (!pubkeyServer.hashAndVerify('sha256', enc2, network_JSON.sig, 'base64')) {
  throw new Error("Invalid signature, discarding packet..");
}
else {
  console.log("Signature accepted!\n")

  // Valid signature, proceed to decrypting
  console.log('Decrypt with clients Private key...');
  rcv = privkeyClient.decrypt(network_JSON.enc, 'base64', 'utf8');
  received_msg = JSON.parse(rcv);
  
  // Print MSG part of the received JSON
  console.log('\nDecrypted message: ', received_msg.TEST.MSG, '\n');

}


