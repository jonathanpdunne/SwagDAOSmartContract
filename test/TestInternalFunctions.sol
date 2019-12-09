pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MerchItem.sol";

contract TestInternalFunctions is MerchItem {
  // function test_checkPaymentAmount() public {
  //   // MerchItem item = new MerchItem("test", 10, 100, 10, 5);
  //   uint256 daiPayment = 20;
  //   bool result = _checkPaymentAmount(daiPayment);
  //   Assert.equal(true, result, "should equal input");
  // }
}