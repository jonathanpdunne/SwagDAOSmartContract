var MerchItem = artifacts.require("./MerchItem.sol");
var LibNote = artifacts.require("./LibNote.sol");
var Dai = artifacts.require("./Dai.sol");

// const daiAddress = '0x6B175474E8/9094C44Da98b954EedeAC495271d0F';

module.exports = function(deployer, accounts) {
  deployer.deploy(LibNote);
  deployer.deploy(Dai)
    .then(function() {
      return deployer.deploy(MerchItem, "test", 10, 30, 10, 10, Dai.address);
    })
};
