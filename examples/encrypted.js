var bitcore = require('bitcore');
var UnspentOutput = bitcore.Transaction.UnspentOutput;
var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var Script = bitcore.Script;
var Output = bitcore.Transaction.Output;
var Transaction = bitcore.Transaction;
var arc4 = require('arc4');

var alice1Key = PrivateKey.fromWIF('cNRh8zP8ScbFxm9ftsbddtum5N59ca83iut2ywjCEoDXaPFh2HAc');
var alice1PublicKey = alice1Key.toPublicKey();

var alice1Unspent = UnspentOutput({
  "txid" : "1bc8a6e9f111ea4781401dc1cfe2d7441c051a9d721f46061e7dfd71bd63c4b0",
  "vout" : 0,
  "address" : "n2z1WJAhYq1TPDC6QieJKd6b3Ux12cy3Xd",
  "scriptPubKey" : "76a914eb788d8b229b4924c48b5ea16968748ec6bad2f388ac",
  "amount" : 0.00250000
});

var alice2Key = PrivateKey.fromWIF('cREbj8ed8xTMZrym1vugXo8jsS8Dsw6desUQVuhyjRP3MLsAJppF');
var alice2PublicKey = alice2Key.toPublicKey();

var message = 'a secret message that is encrypted in the bitcoin blockchain';

var cipher = arc4('arc4', alice2Key.bn.toString('hex'));

var encrypted = cipher.encodeString(message);

var buffer = new Buffer(encrypted, 'hex');
var part1 = buffer.slice(0, 32);
var part2short = buffer.slice(32, buffer.length);
var filler = new Buffer(32 - part2short.length);
var part2 = Buffer.concat([part2short, filler]);

var publicKey1 = PublicKey.fromString('02' + part1.toString('hex'));
var publicKey2 = PublicKey.fromString('02' + part2.toString('hex'));

var transaction = Transaction();

transaction.from(alice1Unspent);
transaction.fee(10000);

transaction.addOutput(new Output({
  script: Script.buildMultisigOut([alice2PublicKey, publicKey1, publicKey2], 1, true),
  satoshis: 240000
}));

transaction.sign(alice1Key);

// testnet3 txid: 88982fc299016eec2b980b1b077589ffee61de10f9189f30e43722051c274ef1

console.log(transaction.serialize());
