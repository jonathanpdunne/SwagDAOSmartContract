const MerchItem = artifacts.require("./MerchItem.sol");

contract("MerchItem", accounts => {
  it("should deploy a MerchItem instance", async () => {
    const merchItemInstance = await MerchItem.deployed();

    // Get the name of the deployed merch item 
    const itemName = await merchItemInstance.nameOfItem.call();
    const expected = "test"
    assert.equal(itemName, expected, "The name does not match with the expected value.");
  });
});
