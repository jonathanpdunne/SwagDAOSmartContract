const truffleAssert = require('truffle-assertions');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const Token = artifacts.require("./Token.sol");
const MerchItem = artifacts.require("./MerchItem.sol");
const ExposedMerchItem = artifacts.require("./ExposedMerchItem.sol");

contract("MerchItem", accounts => {
  before(async () => {
    token = await Token.new();
    // const oneDAI = 1000000000000000000; //10 ** 18
    const newItemName = "test";
    const newItemCost = web3.utils.toWei('30.00', 'ether')// * oneDAI;
    const newItemTotalSupply = 30// * oneDAI;
    const newStartPrice = web3.utils.toWei('50.00', 'ether')// * oneDAI;
    const newRateOfPricingDecline = web3.utils.toWei('0.50', 'ether')// * oneDAI;
    
    merchItem = await MerchItem.new(
      newItemName,
      newItemCost,
      newItemTotalSupply,
      newStartPrice,
      newRateOfPricingDecline,
      token.address
    );

    admin = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    merchItemAddress = merchItem.address;
    
    mintAmount = web3.utils.toWei('1000', 'ether')// * oneDAI;
    await token.mint(admin, mintAmount);
      
    balanceOfAdmin = await token.balanceOf(admin);
    balanceOfUser1 = await token.balanceOf(user1);
    balanceOfUser2 = await token.balanceOf(user2);
  });
  it("admin has 100 tokens and user1 has 0 tokens", async () => {
    assert.equal(balanceOfAdmin, mintAmount, 'the balance is not 10 tokens')
    assert.equal(balanceOfUser1, 0, 'the balance is not 0 tokens')
  });
  it("admin and user1 has 30 tokens after the admin transferred the same amount of tokens", async () => {
    let transferAmount = web3.utils.toWei('30.00', 'ether')// * oneDAI;
    await token.transfer(user1, transferAmount, { from: admin });

    balanceOfAdmin = await token.balanceOf(admin);
    balanceOfUser1 = await token.balanceOf(user1);

    const expected = mintAmount - transferAmount;
    assert.equal(balanceOfAdmin, expected, 'the balance is not 70 tokens')
    assert.equal(balanceOfUser1, transferAmount, 'the balance is not 30 tokens')
  });
  it("should deploy a MerchItem instance with passed arguments", async () => {
    const calledAdmin = await merchItem.admin.call();

    const nameOfItem = await merchItem.nameOfItem.call();
    const itemNumber = await merchItem.itemNumber.call();
    const costOfItem = await merchItem.costOfItem.call();
    const totalSupplyOfItem = await merchItem.totalSupplyOfItem.call();
    const startPrice = await merchItem.startPrice.call();
    const priceOfItem = await merchItem.priceOfItem.call();
    const rateOfDecline = await merchItem.rateOfDecline.call();
    
    assert.equal(calledAdmin, admin, "admin is not deployer");
    assert.equal(nameOfItem, "test", "The name does not match with the expected value.");
    assert.equal(itemNumber, 1, "The 1st item number should be '1'");
    assert.equal(costOfItem, web3.utils.toWei('30.00', 'ether'), "The item cost does not match with the expected value.");
    assert.equal(totalSupplyOfItem, 30, "The number of item supply does not match with the expected value.");
    assert.equal(startPrice, web3.utils.toWei('50.00', 'ether'), "The price of item does not match with the expected value.");
    assert.equal(priceOfItem, web3.utils.toWei('50.00', 'ether'), "The price of item does not match with the expected value.");
    assert.equal(rateOfDecline, web3.utils.toWei('0.50', 'ether'), "The rate of decline does not match with the expected value.");
  });
  it("purchaseItem() should return true when a user has sufficient funds", async () => {
    const numOfItem = 3;
    balanceOfAdmin = await token.balanceOf(admin);
    
    await token.approve(merchItemAddress, balanceOfAdmin, { from: admin })
    await merchItem.purchaseItem(numOfItem, { from: admin })
    
    const itemNumber = await merchItem.itemNumber.call()
    const totalAmountOfItemSold = await merchItem.totalAmountOfItemSold.call()
    const priceOfItem = await merchItem.priceOfItem.call()
    
    assert.equal(itemNumber, 4, "failed to update the item number")
    assert.equal(totalAmountOfItemSold, web3.utils.toWei('139.333333333333333333', 'ether'), "failed to update ")
    assert.equal(priceOfItem, web3.utils.toWei('41.428571428571428571', 'ether'), "failed to update the price of item")
  });
  it("purchaseItem() should return false when a user does not have sufficient funds", async () => {
    const numOfItem = 3;
    await truffleAssert.reverts(merchItem.purchaseItem(numOfItem, { from: user2 }), "insufficient funds");
  });
});

contract("ExposedMerchItem", accounts => {
  before(async () => {
    token = await Token.new()

    const newItemName = "test";
    const newItemCost = web3.utils.toWei('30.00', 'ether')// * oneDAI;
    const newItemTotalSupply = 30// * oneDAI;
    const newStartPrice = web3.utils.toWei('50.00', 'ether')// * oneDAI;
    const newRateOfPricingDecline = web3.utils.toWei('0.50', 'ether')// * oneDAI;

    eMerchItem = await ExposedMerchItem.new(
      newItemName,
      newItemCost,
      newItemTotalSupply,
      newStartPrice,
      newRateOfPricingDecline,
      token.address
    );

    admin = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    eMerchItemAddress = eMerchItem.address;
    
    mintAmount = web3.utils.toWei('1000', 'ether')
    await token.mint(admin, mintAmount)

    balanceOfAdmin = await token.balanceOf(admin)
    balanceOfUser1 = await token.balanceOf(user1)
    balanceOfUser2 = await token.balanceOf(user2)
  })
  it('_updateStates() should return true when the updating process succeeded', async () => {
    let numOfItem = 3;
    let result = await eMerchItem.updateStates(numOfItem,  web3.utils.toWei('139.333333333333333333', 'ether'))
    assert.ok(result, "should be true")

    let itemNumber = await eMerchItem.itemNumber.call();
    assert.equal(itemNumber, 4, "the item number has not been changed properly")
  
    let priceOfItem = await eMerchItem.priceOfItem.call();
    assert.equal(priceOfItem, web3.utils.toWei('41.428571428571428571', 'ether'), "#2 failed to calculate the item price")
  
    let totalAmountOfItemSold = await eMerchItem.totalAmountOfItemSold.call();
    assert.equal(totalAmountOfItemSold, web3.utils.toWei('139.333333333333333333', 'ether'), "#3 failed to calculate the total amount of item sold")
  });
  it('_paymentForItem() should return true when the transfer process succeeded', async () => {
    await token.approve(merchItemAddress, balanceOfAdmin, { from: admin })
    let result = await eMerchItem.paymentForItem(web3.utils.toWei('20.00', 'ether'))
    let balanceAfterPayment = await token.balanceOf(admin)
    let balanceOfContract = await token.balanceOf(eMerchItemAddress)
  
    assert.ok(result, 'should be true');
    assert.equal(balanceAfterPayment, web3.utils.toWei('980', 'ether'), "should be 980 tokens")
    assert.equal(balanceOfContract, web3.utils.toWei('20', 'ether'), 'should be 20 tokens')
  });
  it('_updatePatron() should return true', async () => {
    let result = await eMerchItem.updatePatron(3, web3.utils.toWei('139.333333333333333333', 'ether'), { from: user1 })
    let patron = await eMerchItem.patrons(user1)
    assert.ok(result, 'should be true') 
    assert.equal(patron.patronAddress, user1, 'patron address has not been updated properly');
    assert.equal(patron.numOfPurchasedItem, 3, 'patron number of purchased item has not been updated properly');
    assert.equal(patron.portionOfFunds, web3.utils.toWei('139.333333333333333333', 'ether'), 'patron portion of funds has not been updated properly');
  })
});