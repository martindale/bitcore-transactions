var bitcore = require('bitcore');
var Transaction = bitcore.Transaction;
var Address = bitcore.Address;
var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var UnspentOutput = bitcore.Transaction.UnspentOutput;

var change = new Address('mursDVxqNQmmwWHACpM9VHwVVSfTddGsEM');

// ** TESTNET MINER FEE TRANSACTION ** //

var unspent2 = UnspentOutput({
  "txid" : "0fdf4e24ca0936f77effad80081396ccab293232bcd7eb76544960576e03150e",
  "vout" : 0,
  "address" : "mwsXqRzBdnP7vLKpGadwNSJPW6LcFCrX8S",
  "scriptPubKey" : "76a914b36654943f895765d2769b3bd0d6fbdcbe0dfc2288ac",
  "amount" : 0.00050000,
  "confirmations" : 40037
});

var privateKey2 = PrivateKey.fromWIF('cRq6hUM6jsQ4j5t188cEC5jvjLGtZzgJ8UZgEz5933vbv2rA4gge');

var transaction2 = Transaction();
transaction2
  .from(unspent2)
  .fee(50000)
  .change(change);

transaction2.addData('hello, world');
transaction2.sign(privateKey2);

//testnet3 txid: 4b163326f01992f60a2a30ba414807a99d5c233039c4cb95f07c71bf73a56146

console.log(transaction2.uncheckedSerialize());
