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
  it("account[0] has been allocated some tokens on the deployment process", async () => {
    await token.mint(accounts[0], 10);
    let balanceOne = await token.balanceOf(accounts[0]);
    let balanceTwo = await token.balanceOf(accounts[1]);
    console.log('balance: ', balanceOne)
    console.log('balance: ', balanceTwo)
    assert.equal(balanceOne, 10, 'the balance is not 10 tokens')
    assert.equal(balanceTwo, 0, 'the balance is not 0 tokens')
    
    await token.transfer(accounts[1], 5);
    balanceOne = await token.balanceOf(accounts[0]);
    balanceTwo = await token.balanceOf(accounts[1]);
    console.log('balance: ', balanceOne)
    console.log('balance: ', balanceTwo)
    assert.equal(balanceOne, 5, 'the balance is not 5 tokens')
    assert.equal(balanceTwo, 5, 'the balance is not 5 tokens')
  });
  
  
  // it("_checkPaymentAmount() should return true", async () => {
  //   const result = await merchItem.checkPaymentAmount.call();
    
  //   assert.equal(result, true, "fail");
  // });
});
