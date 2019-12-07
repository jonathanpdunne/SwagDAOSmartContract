const MerchItem = artifacts.require("./MerchItem.sol");

contract("MerchItem", accounts => {

  beforeEach(async () => {
    const newItemName = "test";
    const newItemCost = 10;
    const newItemTotalSupply = 100;
    merchItemInstance = await MerchItem.new(newItemName, newItemCost, newItemTotalSupply);
  });

  it("should deploy a MerchItem instance", async () => {
    // Get the name of the deployed merch item 
    const itemName = await merchItemInstance.nameOfItem.call();
    const expected = "test"
    assert.equal(itemName, expected, "The name does not match with the expected value.");
  });
});
