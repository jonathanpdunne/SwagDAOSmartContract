const MerchItem = artifacts.require("./MerchItem.sol");
const Token = artifacts.require("./Token.sol");

contract("MerchItem", accounts => {
  beforeEach(async () => {
    const token = await Token.new();
    console.log(token)

    const newItemName = "test";
    const newItemCost = 10;
    const newItemTotalSupply = 30;
    const newMaximumAdditionalPrice = 10;
    const newRateOfPricingDecline = 10;

    merchItem = await MerchItem.new(
      newItemName,
      newItemCost,
      newItemTotalSupply,
      newMaximumAdditionalPrice,
      newRateOfPricingDecline
      );

      console.log(merchItem)
  });

  it("should deploy a MerchItem instance with passed arguments", async () => {
    const itemName = await merchItem.nameOfItem.call();
    const itemCost = await merchItem.costOfItem.call();
    const itemSupply = await merchItem.totalSupplyOfItem.call();
    const itemPrice = await merchItem.priceOfItem.call();
    assert.equal(itemName, "test", "The name does not match with the expected value.");
    assert.equal(itemCost, 10, "The itme cost does not match with the expected value.");
    assert.equal(itemSupply, 100, "The number of item supply does not match with the expected value.");
    assert.equal(itemPrice, 20, "The price of item does not match with the expected value.");
  });

  it("_checkPaymentAmount() should return true", async () => {
    const result = await merchItem.checkPaymentAmount.call();
    
    assert.equal(result, true, "fail");
  });
});
