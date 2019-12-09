pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
// import "./IDai.sol";
import "./Dai.sol";

contract MerchItem {
  using SafeMath for uint256;

  Dai public DAIContract;

  struct Patron {
    address patronAddress;
    uint256 numOfPurchasedItem;
    uint256 portionOfFunds;
    bool hasDelivered;
  }

  address public admin;

  string public nameOfItem;
  uint256 public costOfItem;
  uint256 public maximumAdditionalPrice;
  uint256 public rateOfPricingDecline; // accepts from 1 to 20, and divide it by 10 when calculating priceOfItem
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
    uint256 newMaximumAdditionalPrice,
    uint256 newRateOfPricingDecline,
    address daiAddress
    ) public {
    nameOfItem = newItemName;
    costOfItem = newItemCost;
    totalSupplyOfItem = newItemTotalSupply;
    maximumAdditionalPrice = newMaximumAdditionalPrice;
    rateOfPricingDecline = newRateOfPricingDecline;
    totalAmountOfItemSold = 0;
    priceOfItem = (maximumAdditionalPrice.mul(2).div((rateOfPricingDecline.div(10).mul(totalAmountOfItemSold).add(2)))).add(costOfItem);
    auctionLimit = 1 weeks;

    admin = msg.sender;
    DAIContract = Dai(daiAddress);
  }

  function purchaseItem(uint256 numOfItem, uint256 daiPayment) public returns (bool) {
    require(_checkPaymentAmount(daiPayment), "fail");
    require(_mappingPatronToList(), "fail");
    require(_calculatePortionOfFunds(), "fail");
    require(_extendAuctionTimeLimit(), "fail");
    require(_transferFundsToCompound(), "fail");
    return true;
  }

  // Function to send/withdraw funds to a particular address

  /**
  distributes funds in this contract receiving from patrons
  to them, 50% of product sale
   */
  function distributeFundsToPatrons() public {

  }


  /**
  allows the creators/artists who up items to an auction to
  claim the total sold amount in the auction, this function needs hasDelivered to be
  true, only creators/artists can invoke, 40% of product sale
   */
  function claimTotalSellingValue() public {

  }

  /**
  pays 10% of product sale to Operations
   */
  function payOperationalCost() public {

  }

  // - allows patrons to request to delivery an item they bought in an auction to the seller/designer, only a patron who bought an item can invoke
  function deliveryRequest() public {

  }

  // - updates the state of hasDelivered to true, only a patron who bought an item can invoke
  function receivedItem() public {

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

  // - checks if the payment amount is enough to buy an item  
  function _checkPaymentAmount(uint256 daiPayment) internal view returns (bool) {
    // check if the user's DAI balance is greater than the payment amount
    require(DAIContract.balanceOf(msg.sender) >= daiPayment, "insufficient funds");

    // get the current item price and check if the purchaser's DAI balance is sufficient (one item vs purchaser balance)

    // if an user want to buy more than two items,
    // you should calculate the item price after the current purhcasing(loop until the purchasing finish)

    // create a new Patron struct and push it to patrons(mapping)
    return true;
  }
  
  // - adds a patron struct to patrons list(mapping)
  function _mappingPatronToList() internal pure returns(bool) {
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
