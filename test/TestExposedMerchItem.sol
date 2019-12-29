pragma solidity ^0.5.14;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../contracts/Token.sol";
import "../contracts/MerchItem.sol";

contract ExposedMerchItem is MerchItem {
  using SafeMath for uint256;

  constructor(
    string memory newItemName_,
    uint256 newItemCost_,
    uint256 newItemTotalSupply_,
    uint256 newStartPrice_,
    uint256 newRateOfDecline_,
    address tokenAddress_
    ) MerchItem (
      newItemName_,
      newItemCost_,
      newItemTotalSupply_,
      newStartPrice_,
      newRateOfDecline_,
      tokenAddress_
    ) public { }

  // - checks who is in the patron list
  function hasPurchasedItem() public pure returns(bool) {
    return _hasPurchasedItem();
  }

  function calculateTotalPayment(uint256 numOfItem) public view returns (uint256) {
    return _calculateTotalPayment(numOfItem);
  }

  function calculatePriceOfItem(uint256 itemNum) public view returns (uint256) {
    return _calculatePriceOfItem(itemNum);
  }

  function paymentForItem(uint256 totalPayment) public returns (bool) {
    return _paymentForItem(totalPayment);
  }

  function updateStates(uint256 numOfItem, uint256 totalPayment) public returns (bool) {
    _updateStates(numOfItem, totalPayment);
  }

  // - adds a patron struct to patrons list(mapping)
  function updatePatron(uint256 numOfItem, uint256 totalPayment) public returns(bool) {
    // create a new Patron struct and push it to patrons(mapping)
    return _updatePatron(numOfItem, totalPayment);
    
  }

  function calculatePortionOfFunds() public pure returns(bool) {
    return _calculatePortionOfFunds();

  }

  // - extends an auction adding 24 hours to the time limit
  function extendAuctionTimeLimit() public pure returns(bool) {
    return _extendAuctionTimeLimit();

  }

  // - deposits the funds collected from patrons to Compound to earn interest until the auction finishes
  function transferFundsToCompound() public pure returns(bool) {
    return _transferFundsToCompound();

  }

    function specialDiv(uint256 a, uint256 b, uint256 precision) public pure returns (uint256) {
    return _specialDiv(a, b, precision);
  }
}

contract TestExposedMerchItem {
  using SafeMath for uint256;
  Token token;
  ExposedMerchItem eMerchItem;
  uint256 decimal = 10 ** 18;

  function beforeEach() public {
    token = new Token();
    eMerchItem = new ExposedMerchItem(
      "test",
      30 * decimal,
      30,
      50 * decimal,
      (5 * decimal) / 10,
      address(token)
    );
  }
  function test_hasPurchasedItem() public {
    bool output = eMerchItem.hasPurchasedItem();
    Assert.equal(output, true, "should be true");
  }
  function test_calculateTotalPayment() public {
    uint256 expected = 139333333333333333333;
    uint256 output = eMerchItem.calculateTotalPayment(3);
    Assert.equal(output, expected, "should be totally 139.333333333333333333 tokens (139_333_333_333_333_333_333)");
  }
  function test_calculatePriceOfItem() public {
    uint256 expected = 41428571428571428571;
    uint256 output = eMerchItem.calculatePriceOfItem(4);
    Assert.equal(output, expected, "should be 41.428571428571428571 tokens (41_428_571_428_571_428_571)");
  }
  function test_specialDiv() public {
    uint256 expected = 3333333333333333333;
    uint256 output = eMerchItem.specialDiv(10, 3, 18);
    Assert.equal(output, expected, "should be 3.333333333333333333 tokens (3_333_333_333_333_333_333)");
  }
}
