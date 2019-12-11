var MerchItem = artifacts.require("./MerchItem.sol");
var Token = artifacts.require("./Token.sol");

// const daiAddress = '0x6B175474E8/9094C44Da98b954EedeAC495271d0F';
// the 6th argument of MerchItem, Token.address, will be replaced with daiAddress

module.exports = function(deployer, accounts) {
	deployer.deploy(Token)
		.then(function() {
			return deployer.deploy(MerchItem, "test", 10, 30, 10, 10, Token.address);
		})
};
