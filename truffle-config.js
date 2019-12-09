const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()

var mnemonic = "whip segment decrease ostrich cheap wage expand huge pole right wage scorpion"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // match any network
    },
    test: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/");
      },
      network_id: '*',
    },
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.RINKEBY_API}`);
      },
      network_id: 4
    },
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/YOUR-PROJECT-ID");
    //   },
    //   network_id: '3',
    // },
  },
  compilers: {
    solc: {
      version: "0.5.0"
    }
  }
};
