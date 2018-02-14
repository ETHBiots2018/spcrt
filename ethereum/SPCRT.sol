pragma solidity ^0.4.19;

import "./SafeMath.sol";
import "./ERC20Interface.sol";
import "./Owned.sol";

/**
 * Contract function to receive approval and execute function in one call
 */
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}

/**
 * SPCRToken System implementation
 */
contract SPCRToken is ERC20Interface, Owned {
    using SafeMath for uint256;

    string public constant name = "SPCRToken";
    string public constant symbol = "SPC";
    uint8 public constant decimals = 18; // TODO

    uint256 public _totalSupply;

    mapping (address => mapping (address => uint256)) allowed;

    mapping (address => uint256) spcrtBasic;
    mapping (address => uint256) spcrtReputation;

    struct BPFRRequest {
        uint256 repairId;
        uint256 amount;
        address requester;
        address repairGuy;
    }

    // map a customer to a list of his/her repair orders
    mapping (address => BPFRRequest[]) BPFRRequests;

    function requestBPFR(address repairGuy, uint256 amount, uint256 id) private {
        address customer = msg.sender;
        BPFRRequests[customer].push(BPFRRequest(id, amount, customer, repairGuy));
    }

    function confirmBPFR(address customer, uint256 id) public {
        BPFRRequest[] BPFRRequestByCustomer = BPFRRequests[customer];
        for (uint256 i = 0; i < BPFRRequestByCustomer.length; i++) {
            BPFRRequest b = BPFRRequestByCustomer[i];

            // check for valid requests
            if (b.repairId == id) {
                delete BPFRRequests[customer][i];

                // give customer token
                spcrtBasic[b.requester] += b.amount;
            }

            break;
        }
    }

    /*
     * ERC20 Interface implementations
     */

    function totalSupply() public constant returns (uint) {
        return _totalSupply  - spcrtBasic[address(0)];
    }

    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return spcrtBasic[tokenOwner];
    }

    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
        spcrtBasic[msg.sender] = spcrtBasic[msg.sender].sub(tokens);
        spcrtBasic[to] = spcrtBasic[to].add(tokens);
        Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        spcrtBasic[from] = spcrtBasic[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        spcrtBasic[to] = spcrtBasic[to].add(tokens);
        Transfer(from, to, tokens);
        return true;
    }

    /**
     * Mint coins for recycling
     */
    function mintRecycle(address tokenOwner, uint256 tokens) public {
        spcrtBasic[tokenOwner] = spcrtBasic[tokenOwner].add(tokens);
    }

    /**
     * Mint coins referrals
     */
    function mintReferral(address tokenOwner, uint256 tokens) public {
    }

    /**
     * Mint coins for part purchases
     */
    function mintPurchases(address tokenOwner, uint256 tokens) public {
    }

    /**
     * Mint tokens
     */
    // function mint(address tokenOwner, uint tokens) public onlyOwner returns (bool success) {
    //     require(mintable);
    //     spcrtBasic[tokenOwner] = spcrtBasic[tokenOwner].add(tokens);
    //     _totalSupply = _totalSupply.add(tokens);
    //     Transfer(address(0), tokenOwner, tokens);
    //     return true;
    // }

    /**
     * Don't accept ethers
     */
    function () public payable {
        revert();
    }

    /**
     * Update reputation
     */
    function mintReputation(address repOwner, uint256 tokens) public onlyOwner returns (bool success) {
    }
}

