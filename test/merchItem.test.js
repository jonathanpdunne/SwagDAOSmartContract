const MerchItem = artifacts.require("./MerchItem.sol");

contract("MerchItem", accounts => {

  beforeEach(async () => {
    const newItemName = "test";
    const newItemCost = 10;
    const newItemTotalSupply = 100;
    merchItemInstance = await MerchItem.new(newItemName, newItemCost, newItemTotalSupply);
  });

  it("should deploy a MerchItem instance with passed arguments(nameOfItem, costOfItem, totalSupplyOfItem)", async () => {
    const itemName = await merchItemInstance.nameOfItem.call();
    const expectedName = "test"
    const itemCost = await merchItemInstance.costOfItem.call();
    const expectedCost = 10;
    const itemSupply = await merchItemInstance.totalSupplyOfItem.call();
    const expectedSupply = 100;
    assert.equal(itemName, expectedName, "The name does not match with the expected value.");
    assert.equal(itemCost, expectedCost, "The itme cost does not match with the expected value.");
    assert.equal(itemSupply, expectedSupply, "The number of item supply does not match with the expected value.");
  });

  it("'_checkPaymentAmount()' should return true", async () => {
    const result = await merchItemInstance.purchaseItem.call({ from: accounts[0] });
    assert.equal(result, true, "fail");
  });
});
