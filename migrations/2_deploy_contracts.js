var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MerchItem = artifacts.require("./MerchItem.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(MerchItem, "test", 10, 100);
};
