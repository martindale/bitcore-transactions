var bitcore = require('bitcore');
var Transaction = bitcore.Transaction;
var Address = bitcore.Address;
var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var UnspentOutput = bitcore.Transaction.UnspentOutput;
var Output = bitcore.Transaction.Output;
var Script = bitcore.Script;

var change = new Address('mursDVxqNQmmwWHACpM9VHwVVSfTddGsEM');

// ** USE MULTISIGNATURE AS DATA ** // 

// input
var privateKey6 = PrivateKey.fromWIF('cQhLwztVnteREBFR6ebVxNaNpD9HcpPvHmAhStjNvySGMJmQw1Fn');

// output 1
var privateKey7 = PrivateKey.fromWIF('cUBEC9yJaARM9EAViVTpAyN2nx8a5D81Qvq3iTgGgqEn2Qwqxthk');
var publicKey7 = privateKey7.toPublicKey();

// output 2
var data = 'hello world';
var datahash = bitcore.crypto.Hash.sha256ripemd160(new Buffer(data)).toString('hex');
var privateKey8 = new PrivateKey(datahash);
var publicKey8 = privateKey8.toPublicKey();

// construct transaction
var transaction6 = Transaction();

var unspent6 = UnspentOutput({
  "txid" : "1256eddc7fcb279664dcb58853bc6172d0648ac8a07d91aa2e70db8ecc2c95e3",
  "vout" : 1,
  "address" : "n1QYBu3YpCkt7tH2BhWogwUVU3zgC2vS8J",
  "scriptPubKey" : "76a914da2be5a960dd2fcfdfb71c7ed5f6822370e6b94588ac",
  "amount" : 0.04160000
});

transaction6.from(unspent6);
transaction6.fee(10000);

transaction6.addOutput(new Output({
  script: Script.buildMultisigOut([publicKey7, publicKey8], 1),
  satoshis: 4150000
}));

transaction6.sign(privateKey6);

// testnet3 txid: 098acedb2bc18a1f46410b0390b9e2726e3544fe49732c1235516a004df8e9ec

console.log(transaction6.serialize());
