# Smart Contract Security Considerations
## Goal
In this activity, we will discuss some of the most common smart contract security pitfalls and how to address them.

## Exercise
This activity will require you to:

## Setup
> This discussion will reference the following Solidity documentation. **Read through this in detail on your own as it contains several helpful security tips!**
>https://solidity.readthedocs.io/en/develop/security-considerations.html

### Private information and Randomness
> It is worth reiterating that **everything** you use in a smart contract is publicly visible, even variables marked `private`. Everything the contract sees, the public sees.

> When using a blockhash, timestamp or otherm miner-defined value for randomness, keep in mind a miner has a choice of whether or not to publish a block, and thus to potentially cheat a block. 

### Re-Entrancy
> A contract receiving Ether can call back into the initiating contract before the transaction is completing, allowing for multiple calls. For example:
```
    pragma solidity >=0.4.0 <0.6.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    
    /// Withdraw your share.
    function withdraw() public {
        if (msg.sender.send(shares[msg.sender]))
            shares[msg.sender] = 0;
    }
}
```
Here, the `withdraw()` function could be called multiple times before `msg.sender.send(shares[msg.sender])` completes and `shares[msg.sender]` is set to 0. However in this case, the `.send()` function inherently sets the gas limit at 2300 which is usually enough to create one event. Hence, multiple calls would fail.

However, using `address.call.value(...)` function allows you to set the gas limit which could allow for multiple `withdraw()` function calls:
```
    function withdraw() public {
        (bool success,) = msg.sender.call.value(shares[msg.sender])("");
        if (success)
            shares[msg.sender] = 0;
    }
```

> **Best Practice** - use the `Checks-Effects-Interactions` pattern which:
* Check - who called the function, are arguments in range, does their account have enough Ether, etc..
* Effects - changes to the state variables
* Interactions - any interactions with other contracts should be the very last step in any function.
  
  Here's an example:
```
    function withdraw() public {
        uint share = shares[msg.sender];  // Checks the sender's account
        shares[msg.sender] = 0;  // Effects on the 'shares' variable
        msg.sender.transfer(share);  // This is the actual Interaction with the contract, done last.
    }
```

### Underflows / Overflows
> Solidity's integer types are not actually integers - they resemble integers when the values are small, but behave differently if the numbers are large. 

> For example, an `uint8` variable type in Solidity is 8 bits so the largest binary value it can hold is `11111111` or 255 in decimal. Thus if you add 1 to this, the value resets back to `00000000`. This is an example of an **overflow**. 
```
    uint8(255) + uint8(1) == 0
```
>The opposite is an **underflow**:
```
    uint8(0) - uint8(1) == 255  // unsigned integers cannot be negative
```
> **Best Practice** - use a library like SafeMath (<https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol>) to ensure math operations account for overflows/underflows and revert on error.

### Take Compiler Warnings Seriously!
> **Even if you do not think that this particular warning has security implications, there might be another issue buried beneath it. Any compiler warning we issue can be silenced by slight changes to the code.**
