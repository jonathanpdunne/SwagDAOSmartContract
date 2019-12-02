pragma solidity ^0.5.0;

contract MerchItem {
  struct Patron {
    address patronAddress;
    uint256 numOfPurchasedItem;
    uint256 portionOfFunds;
    bool hasDelivered;
  }
  string public nameOfItem;
  uint256 public costOfItem;
  uint256 public totalSupplyOfItem;
  uint256 public totalAmountOfItemSold; // total amount of funds collected from patrons
  uint256 public auctionLimit;
  mapping(address => Patron) public patrons;

  constructor() public {
    nameOfItem = "MetaCartel T-shirt";
    costOfItem = 10;
    totalSupplyOfItem = 100;
    totalAmountOfItemSold = 0;
    auctionLimit = 1 weeks;

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

  function purchaseItem() public payable {
    require(_checkPaymentAmount(), "fail");
    require(_mappingPatronToList(), "fail");
    require(_calculatePortionOfFunds(), "fail");
    require(_extendAuctionTimeLimit(), "fail");
    require(_transferFundsToCompound(), "fail");
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
  function _checkPaymentAmount() internal pure returns(bool) {
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
