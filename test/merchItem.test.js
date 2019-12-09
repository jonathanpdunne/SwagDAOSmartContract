const MerchItem = artifacts.require("./MerchItem.sol");
const Dai = artifacts.require("./Dai.sol");
const InternalFunc = artifacts.require("./TestForInternalFunc.sol");

contract("MerchItem", accounts => {
  beforeEach(async () => {
    const DaiInstance = await Dai.new();
    const daiAddress = await DaiInstance.address;
    console.log(daiAddress)

    const newItemName = "test";
    const newItemCost = 10;
    const newItemTotalSupply = 100;
    const newMaximumAdditionalPrice = 10;
    const newRateOfPricingDecline = 5;

    merchItemInstance = await MerchItem.new(
      newItemName,
      newItemCost,
      newItemTotalSupply,
      newMaximumAdditionalPrice,
      newRateOfPricingDecline,
      daiAddress
      );
  });

  it("should deploy a MerchItem instance with passed arguments", async () => {
    const itemName = await merchItemInstance.nameOfItem.call();
    const itemCost = await merchItemInstance.costOfItem.call();
    const itemSupply = await merchItemInstance.totalSupplyOfItem.call();
    const itemPrice = await merchItemInstance.priceOfItem.call();
    assert.equal(itemName, "test", "The name does not match with the expected value.");
    assert.equal(itemCost, 10, "The itme cost does not match with the expected value.");
    assert.equal(itemSupply, 100, "The number of item supply does not match with the expected value.");
    assert.equal(itemPrice, 20, "The price of item does not match with the expected value.");
  });

  it("_checkPaymentAmount() should return true", async () => {
    const result = await merchItemInstance.checkPaymentAmount.call();
    
    assert.equal(result, true, "fail");
  });
});
