pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MerchItem.sol";

contract TestInternalFunctions is MerchItem {
  function test_checkPaymentAmount() public {
    // MerchItem item = new MerchItem("test", 10, 100, 10, 5);
    uint input = 5;
    uint output = _checkPaymentAmount(input);
    Assert.equal(output, input, "should equal input");
  }
}