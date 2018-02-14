pragma solidity ^0.4.19;

import "SafeMath.sol";
import "ERC20Interface.sol";

/**
 * SPCRT Token System
 */
contract SPCRToken is ERC20Interface {
    string public constant name = "SPCRToken";
    string public constant symbol = "SPC";
    uint8 public constant decimals = 0; // TODO
}

