var bitcore = require('bitcore');
var Transaction = bitcore.Transaction;
var Address = bitcore.Address;
var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var UnspentOutput = bitcore.Transaction.UnspentOutput;

var change = new Address('mursDVxqNQmmwWHACpM9VHwVVSfTddGsEM');

// sending key
var privateKey9 = PrivateKey.fromWIF('cQZpMgz5dskTBqm1vvXmkonoFAvRYux2EsPuMdBwxdnHjieAsgJE');

// recieving keys
var data = [
  'hello, world',
  'this data is stored in the blockchain',
  'by using it',
  'to create several keys',
  'which then receives bitcoin'
];

var publicKeys = [];

for( var i = 0; i < data.length; i++ ) {
  var datahash = bitcore.crypto.Hash.sha256ripemd160(new Buffer(data)).toString('hex');
  var key = new PrivateKey(datahash);
  publicKeys.push(key.toPublicKey());
}

var destination9 = Address.createMultisig(publicKeys, 4);

var unspent9 = UnspentOutput({
  "txid" : "16ef3f74507cec3b8471bad92ba8167bc0a88cf845a4b933de62dcc83723bc37",
  "vout" : 0,
  "address" : "mh2oHZfapsGVKL1UksAZvoxbBAfQhP6ryu",
  "scriptPubKey" : "76a914109d15b30d7ff173703946288f641d4535145c0e88ac",
  "amount" : 0.00210000
});

var transaction9 = Transaction();

transaction9
  .from(unspent9)
  .change(change)
  .fee(10000)
  .to(destination9, 180000)
  .sign(privateKey9);

//testnet3 txid: 3faf98e8017c77ee011ea176af3e3afc12839bc9645962e132ccad22259bcfe1

console.log(transaction9.serialize());
