const path = require("path");
var mnemonic = "whip segment decrease ostrich cheap wage expand huge pole right wage scorpion"
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/YOUR-PROJECT-ID");
    //   },
    //   network_id: '3',
    // },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // match any network
      // websockets: true
    },
    test: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/");
      },
      network_id: '*',
    },
  }
};
