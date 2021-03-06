pragma solidity ^0.5.14;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Token.sol";
// import "./IDai.sol";

contract MerchItem {
  using SafeMath for uint256;

  Token public token;
  // IDai dai;

  struct Patron {
    address patronAddress;
    uint256 numOfPurchasedItem;
    uint256 portionOfFunds;
    bool hasDelivered;
  }

  address public admin;

  string public nameOfItem;
  uint256 public costOfItem;
  uint256 public totalSupplyOfItem;
  uint256 public startPrice;
  uint256 public rateOfDecline;
  uint256 public itemNumber;
  uint256 public totalAmountOfItemSold; // total amount of funds collected from patrons
  uint256 public priceOfItem;
  uint256 public auctionTimeLimit;
  mapping(address => Patron) public patrons;

  constructor(
    string memory newNameOfItem,
    uint256 newCostOfItem,
    uint256 newTotalSupplyOfItem,
    uint256 newStartPrice,
    uint256 newRateOfDecline,
    address tokenAddress
    ) public {
    nameOfItem = newNameOfItem;
    costOfItem = newCostOfItem;
    totalSupplyOfItem = newTotalSupplyOfItem;
    startPrice = newStartPrice;
    rateOfDecline = newRateOfDecline;
    itemNumber = 1;
    totalAmountOfItemSold = 0;
    priceOfItem = _calculatePriceOfItem(itemNumber);
    // auctionLimit = now + 1 weeks;
    auctionTimeLimit = now + 1 minutes;

    // admin is a person who ups the merch item and started the auction
    admin = msg.sender;
    // Token will be replaced with DAI contract when testing on test networks/mainnet
    // DAIContract = Dai(daiAddress);
    token = Token(tokenAddress);
  }

  function purchaseItem(uint256 numOfItem) public returns (bool) {
    uint256 totalPayment = _calculateTotalPayment(numOfItem);
    require(token.balanceOf(msg.sender) >= totalPayment, "insufficient funds");
    require(token.transferFrom(msg.sender, address(this), totalPayment), "Transfer DAI to MerchItem failed");
    require(_updateStates(numOfItem, totalPayment), "failed to update the grobal states");
    require(_updatePatron(numOfItem, totalPayment), "fail to update patron info");
    require(_extendAuctionTimeLimit(), "fail to extend the auction time limit");
    // require(_transferFundsToCompound(), "fail");
    return true;
  }

  // Function to send/withdraw funds to a particular address

  /**
  distributes funds in this contract receiving from patrons
  to them, 50% of product sale
   */
  function distributeFundsToPatrons() public pure {
    // have to check how to transfer funds to maltiple patrons one time

  }


  /**
  allows the creators/artists who up items to an auction to
  claim the total sold amount in the auction, this function needs hasDelivered to be
  true, only creators/artists can invoke, 40% of product sale
   */
  function claimTotalSellingValue() public pure {
    // 
  }

  /**
  pays 10% of product sale to Operations
   */
  function payOperationalCost() public pure {

  }

  // - allows patrons to request to delivery an item they bought in an auction to the seller/designer, only a patron who bought an item can invoke
  function deliveryRequest() public pure {

  }

  // - updates the state of hasDelivered to true, only a patron who bought an item can invoke
  function receivedItem() public pure {

  }

  //////////////////////////
  //                      //
  //  Internal functions  //
  //                      //
  //////////////////////////


  // - checks who is in the patron list
  function _hasPurchasedItem() internal pure returns(bool) {
    return true;
  }

  function _calculateTotalPayment(uint256 numOfItem) internal view returns (uint256) {
    uint256 subTotal = 0;
    uint256 totalPayment = 0;

    for(uint256 i = 0; i < numOfItem; i++) {
      subTotal = _calculatePriceOfItem(itemNumber.add(i));
      totalPayment = totalPayment.add(subTotal);
    }
    return totalPayment;
  }

  function _calculatePriceOfItem(uint256 itemNum) internal view returns (uint256) {
    uint256 upper = (startPrice.sub(costOfItem)).mul(2);
    uint256 under = (rateOfDecline.mul(itemNum.sub(1))).add(2000000000000000000);
    uint256 result = (_specialDiv(upper, under, 18)).add(costOfItem);
    return result;
  }

  function _paymentForItem(uint256 totalPayment) internal returns (bool) {
    token.transferFrom(msg.sender, address(this), totalPayment);
    require(token.balanceOf(address(this)) == totalPayment, "The total payment amount has not been transferred to this contract yet");
    return true;
  }

  function _updateStates(uint256 numOfItem, uint256 totalPayment) internal returns (bool) {
    itemNumber = itemNumber.add(numOfItem);
    totalAmountOfItemSold = totalAmountOfItemSold.add(totalPayment);
    priceOfItem = _calculatePriceOfItem(itemNumber);
    return true;
  }
  function _createPatron(uint256 numOfItem, uint256 totalPayment) internal returns (bool) {
    patrons[msg.sender] = Patron({
      patronAddress: msg.sender,
      numOfPurchasedItem: numOfItem,
      portionOfFunds: totalPayment,
      hasDelivered: false
    }); 
    return true;
  }

  function _updatePatron(uint256 numOfItem, uint256 totalPayment) internal returns (bool) {
    Patron storage p = patrons[msg.sender];
    p.patronAddress = msg.sender;
    p.numOfPurchasedItem = p.numOfPurchasedItem.add(numOfItem);
    p.portionOfFunds = p.portionOfFunds.add(totalPayment);
    return true;
  }
  // - extends an auction adding 24 hours to the time limit
  function _extendAuctionTimeLimit() internal returns (bool) {
    auctionTimeLimit = auctionTimeLimit.add(24 hours);
    return true;

  }

  // - deposits the funds collected from patrons to Compound to earn interest until the auction finishes
  function _transferFundsToCompound() internal returns (bool) {
    return true;

  }

  function _specialDiv(uint256 a, uint256 b, uint256 precision) internal pure returns (uint256) {
    return a * (10 ** precision) / b;
  }

}
