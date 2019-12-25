const Token = artifacts.require("./Token.sol");
const MerchItem = artifacts.require("./MerchItem.sol");
const { toHex } = web3.utils;

const decimal = 10 ** 18;
const newItemName = "test"
const newItemCost = toHex(30 * decimal)
const newItemTotalSupply = toHex(30)
const newStartPrice = toHex(50 * decimal)
const newRateOfDecline = toHex(5 * decimal)

module.exports = function(deployer, accounts) {
	deployer.deploy(Token)
	.then(function() {
		deployer.deploy(
			MerchItem,
			newItemName,
			newItemCost,
			newItemTotalSupply,
			newStartPrice,
			newRateOfDecline,
			Token.address
		);
	})
};
