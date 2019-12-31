pragma solidity ^0.5.14;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./MerchItem.sol";

contract ExposedMerchItem is MerchItem {
  using SafeMath for uint256;

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
  function updatePatron() public pure returns(bool) {
    // create a new Patron struct and push it to patrons(mapping)
    return _updatePatron();
    
  }
  function extendAuctionTimeLimit() public pure returns(bool) {
    return _extendAuctionTimeLimit();

  }

  // - deposits the funds collected from patrons to Compound to earn interest until the auction finishes
  function transferFundsToCompound() public returns(bool) {
    return _transferFundsToCompound();

  }

  function specialDiv(uint256 a, uint256 b, uint256 precision) public pure returns (uint256) {
    return _specialDiv(a, b, precision);
  }

}