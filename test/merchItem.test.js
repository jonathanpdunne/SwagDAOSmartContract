const truffleAssert = require('truffle-assertions');
const MerchItem = artifacts.require("./MerchItem.sol");
const Token = artifacts.require("./Token.sol");

before(async () => {
  token = await Token.new();
  const newItemName = "test";
  const newItemCost = 30;
  const newItemTotalSupply = 30;
  const startPrice = 50;
  const newRateOfPricingDecline = 5;
  
  merchItem = await MerchItem.new(
    newItemName,
    newItemCost,
    newItemTotalSupply,
    startPrice,
    newRateOfPricingDecline,
    token.address
    );
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
    // console.log(balanceOfUser1)
    assert.equal(balanceOfAdmin, 100, 'the balance is not 10 tokens')
    assert.equal(balanceOfUser1, 0, 'the balance is not 0 tokens')
  });
  it("admin and user1 has 30 tokens after transferring 30 tokens from admin", async () => {
    await token.transfer(user1, 30);
    balanceOfAdmin = await token.balanceOf(admin);
    balanceOfUser1 = await token.balanceOf(user1);
    assert.equal(balanceOfAdmin, 70, 'the balance is not 70 tokens')
    assert.equal(balanceOfUser1, 30, 'the balance is not 30 tokens')
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
    assert.equal(itemCost, 30, "The itme cost does not match with the expected value.");
    assert.equal(itemSupply, 30, "The number of item supply does not match with the expected value.");
    assert.equal(itemPrice, 50, "The price of item does not match with the expected value.");
  });
  it("_checkPaymentAbility() should return true when a user has a payment ability for a purchase", async () => {
    const numOfItem = 1;
    const result = await merchItem._checkPaymentAbility(numOfItem, { from: admin });
    assert.ok(result, "the user does not have sufficient tokens")
  });
  // it("purchaseItem() should return true when a user has sufficient funds", async () => {
  //   const result = await merchItem.purchaseItem.call({ from: user1 })
  //   assert.ok(result, "user1 does not have sufficient funds")
  // });
  // it("purchaseItem() should return false when a user does not have sufficient funds", async () => {
  //   await truffleAssert.reverts(merchItem.purchaseItem.call({ from: user2 }), "insufficient funds");
  // });
});
