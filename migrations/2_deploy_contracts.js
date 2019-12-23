var Token = artifacts.require("./Token.sol");
var MerchItem = artifacts.require("./MerchItem.sol");

module.exports = function(deployer, accounts) {
	deployer.deploy(Token)
		.then(function() {
			return deployer.deploy(MerchItem, "test", 30, 50, 30, 5, Token.address);
		})
};
