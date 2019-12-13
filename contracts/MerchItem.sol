pragma solidity ^0.5.0;

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
  uint256 public itemNumber;
  uint256 public costOfItem;
  uint256 public startPrice;
  uint256 public rateOfPricingDecline;
  uint256 public totalSupplyOfItem;
  uint256 public priceOfItem;
  uint256 public totalAmountOfItemSold; // total amount of funds collected from patrons
  uint256 public auctionLimit;
  mapping(address => Patron) public patrons;

  // constructor() public {
  constructor(
    string memory newItemName,
    uint256 newItemCost,
    uint256 newItemTotalSupply,
    uint256 newStartPrice,
    uint256 newRateOfPricingDecline,
    address tokenAddress
    ) public {
    nameOfItem = newItemName;
    itemNumber = 1;
    costOfItem = newItemCost;
    totalSupplyOfItem = newItemTotalSupply;
    startPrice = newStartPrice;
    rateOfPricingDecline = newRateOfPricingDecline;
    totalAmountOfItemSold = 0;
    priceOfItem = _calculatePriceOfItem(itemNumber);
    auctionLimit = 1 weeks;

    admin = msg.sender;
    // Token will be replaced with Dai contract when testing on test networks/mainnet
    // DAIContract = Dai(daiAddress);
    token = Token(tokenAddress);
  }

  function purchaseItem(uint256 numOfItem) public view returns (uint256) {
    // require(_checkPaymentAbility(), "user does not have sufficient funds");
    // require(_mappingPatronToList(), "fail");
    // require(_calculatePortionOfFunds(), "fail");
    // require(_extendAuctionTimeLimit(), "fail");
    // require(_transferFundsToCompound(), "fail");
    // return true;
  }

  // Function to send/withdraw funds to a particular address

  /**
  distributes funds in this contract receiving from patrons
  to them, 50% of product sale
   */
  function distributeFundsToPatrons() public pure {

  }


  /**
  allows the creators/artists who up items to an auction to
  claim the total sold amount in the auction, this function needs hasDelivered to be
  true, only creators/artists can invoke, 40% of product sale
   */
  function claimTotalSellingValue() public pure {

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

  function _checkPaymentAbility(uint256 numOfItem) public returns (bool) {
    uint256 subTotal = 0;
    uint256 totalPayment = 0;

    for(uint256 i = 0; i < numOfItem; i++) {
      subTotal = _calculatePriceOfItem(itemNumber.add(i));
      totalPayment = totalPayment.add(subTotal);
    }

    if (_userHasEnoughFunds(totalPayment)) {
      itemNumber = itemNumber.add(numOfItem);
      totalAmountOfItemSold = totalAmountOfItemSold.add(totalPayment);
      return true;
    }
    return false;
  }

  function _calculatePriceOfItem(uint256 itemNum) public returns (uint256) {
    return startPrice.sub(costOfItem).mul(2).div((rateOfPricingDecline.div(10).mul(itemNum.sub(1)).add(2))).add(costOfItem);
  }
  
  // - checks if the payment amount is enough to buy an item  
  function _userHasEnoughFunds(uint256 totalPayment) public returns (bool) {
    // check if the user's DAI balance is greater than the payment amount
    require(token.balanceOf(msg.sender) >= totalPayment, "insufficient funds");

    return true;
  }
  
  // - adds a patron struct to patrons list(mapping)
  function _mappingPatronToList() internal pure returns(bool) {
    // create a new Patron struct and push it to patrons(mapping)
    return true;
    
  }

  function _calculatePortionOfFunds() internal pure returns(bool) {
    return true;

  }

  // - extends an auction adding 24 hours to the time limit
  function _extendAuctionTimeLimit() internal pure returns(bool) {
    return true;

  }

  // - deposits the funds collected from patrons to Compound to earn interest until the auction finishes
  function _transferFundsToCompound() internal pure returns(bool) {
    return true;

  }


}
