var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MerchItem = artifacts.require("./MerchItem.sol");

module.exports = function(deployer) {
  // deployer.deploy(MerchItem);
  deployer.deploy(MerchItem, "test", 10, 100);
};
