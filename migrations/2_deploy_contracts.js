var MerchItem = artifacts.require("./MerchItem.sol");
var Token = artifacts.require("./Token.sol");

// const daiAddress = '0x6B175474E8/9094C44Da98b954EedeAC495271d0F';

module.exports = function(deployer, accounts) {
    deployer.deploy(MerchItem, "test", 10, 30, 10, 10);
    deployer.deploy(Token);

};
