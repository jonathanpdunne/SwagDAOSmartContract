const MerchItem = artifacts.require("./MerchItem.sol");
const Token = artifacts.require("./Token.sol");

before(async () => {
  token = await Token.new();
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
    newRateOfPricingDecline,
    token.address
    );
    
    // console.log(merchItem)
  });
  
contract("MerchItem", accounts => {
  beforeEach(async () => {
    admin = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
  });
  it("admin has 10 tokens and user1 has 0 tokens", async () => {
    await token.mint(admin, 100);
    let balanceOfAdmin = await token.balanceOf(admin);
    let balanceOfUser1 = await token.balanceOf(user1);
    // console.log(balanceOfAdmin)
    assert.equal(balanceOfAdmin, 100, 'the balance is not 10 tokens')
    assert.equal(balanceOfUser1, 0, 'the balance is not 0 tokens')
  });
  it("admin and user1 has 5 tokens after transferring 5 tokens from admin", async () => {
    await token.transfer(user1, 30);
    balanceOfAdmin = await token.balanceOf(admin);
    balanceOfUser1 = await token.balanceOf(user1);
    assert.equal(balanceOfAdmin, 70, 'the balance is not 5 tokens')
    assert.equal(balanceOfUser1, 30, 'the balance is not 5 tokens')
  });
  it("should deploy a MerchItem instance with passed arguments", async () => {
    const admin = await merchItem.admin.call();
    const deployerAddress = accounts[0];

    const itemName = await merchItem.nameOfItem.call();
    const itemCost = await merchItem.costOfItem.call();
    const itemSupply = await merchItem.totalSupplyOfItem.call();
    const itemPrice = await merchItem.priceOfItem.call();

    assert.equal(admin, deployerAddress, "admin is not deployer");
    assert.equal(itemName, "test", "The name does not match with the expected value.");
    assert.equal(itemCost, 10, "The itme cost does not match with the expected value.");
    assert.equal(itemSupply, 30, "The number of item supply does not match with the expected value.");
    assert.equal(itemPrice, 20, "The price of item does not match with the expected value.");
  });
  it("purchaseItem() should return true", async () => {
    // const result = await merchItem.purchaseItem.call({ from: user1 })
    const result = await merchItem.purchaseItem.call({ from: user1 })
    // console.log(result)
    assert.equal(result, 30, "user1 does not have sufficient funds")
  });
});
