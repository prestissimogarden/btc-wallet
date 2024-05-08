const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// blockchain test net (not main)
const network = bitcoin.networks.testnet

// address derivation path (HD)
const path = "m/49'/1'/0'/0"

// seed mnemonic
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// HD root
let root = bip32.fromSeed(seed, network)

// wallet (pvt-pub keys pair)
let wallet = root.derivePath(path)
let node = wallet.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address

console.log("Carteira gerada", '\n', "Endereço: \t ", btcAddress, '\n', "Chave PVT: \t ", node.toWIF(), '\n', "Seed: \t\t ", mnemonic)