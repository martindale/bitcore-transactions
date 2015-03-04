var bitcore = require('bitcore');
var Transaction = bitcore.Transaction;
var Address = bitcore.Address;
var PrivateKey = bitcore.PrivateKey;
var PublicKey = bitcore.PublicKey;
var UnspentOutput = bitcore.Transaction.UnspentOutput;

var change = new Address('mursDVxqNQmmwWHACpM9VHwVVSfTddGsEM');

// ** TESTNET BASIC TRANSACTION ** //

var privateKey1 = PrivateKey.fromWIF('cW1wwrvnJB3V2qe9HE6aW85vkGhuVX9JSaDLQ6k6uRuhMFhdi3jC');

var unspent1 = UnspentOutput({
  "txid" : "0516af39393b4173e8e2e6732c2d5dc22aa4c55c1258d20a2e07836e26f4e8de",
  "vout" : 0,
  "address" : "mqM8h7jDiuTiqgeDDkibNHmKxCmbqAF7Gy",
  "scriptPubKey" : "76a9146bd5c7192e244326a6ddc41268227a805c0cb35288ac",
  "amount" : 0.00240000,
  "confirmations" : 37928
});

var destination = new Address('mnCXgzs3x4dfMMGacuPRCLmVci1x93C42u');

var transaction = Transaction();
transaction
  .from(unspent1)
  .to(destination, 230000)
  .fee(10000)
  .change(change)
  .sign(privateKey1);

// testnet3 txid: 7d62d8ac87f1250f77d76c51b69fd193883b6a77f473c318a10e4e0c5bcd3d67

console.log(transaction.serialize());
