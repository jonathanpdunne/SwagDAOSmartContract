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
    newRateOfPricingDecline
    );
    
    // console.log(merchItem)
  });
  
contract("MerchItem", accounts => {
  beforeEach(async () => {
    admin = accounts[0];
    user1 = accounts[1];
    user1 = accounts[2];
  });
  it("admin has 10 tokens and user1 has 0 tokens", async () => {
    await token.mint(admin, 100);
    let balanceOne = await token.balanceOf(admin);
    let balanceTwo = await token.balanceOf(user1);
    // console.log(balanceOne)
    assert.equal(balanceOne, 100, 'the balance is not 10 tokens')
    assert.equal(balanceTwo, 0, 'the balance is not 0 tokens')
  });
  it("admin and user1 has 5 tokens after transferring 5 tokens from admin", async () => {
    await token.transfer(accounts[2], 30);
    balanceOne = await token.balanceOf(admin);
    balanceTwo = await token.balanceOf(user1);
    assert.equal(balanceOne, 70, 'the balance is not 5 tokens')
    assert.equal(balanceTwo, 30, 'the balance is not 5 tokens')
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
  it("_checkPaymentAmount() should return true", async () => {
    balanceOne = await token.balanceOf(admin);

  });

});
