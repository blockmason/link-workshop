# Introduction to web3 and Ethereum
## Goal
In this activity, we will read basic account information from local and public blockchains and write a basic transfer of the ether (ETH) cryptocurrency locally.

## Exercise
This activity will require you to:
* Use web3js - a collection of libraries to interact with local or remote ethereum nodes
* Run a local ethereum blockchain using Ganache
* Interact with the local blockchain through web3js functions and work with promises and basic callbacks
* Send ETH cryptocurrency between 2 unlocked accounts on your local blockchain

### Setup
> Install web3 using the node package manager in your Terminal:
```
    npm install web3 
```
> Open up Ganache. By default, your local blockchain will run on `http://127.0.0.1:7545`.
   
> Run node from your Terminal window: 
```
    node
```
> Create an instance of the web3 libary you just installed and connect it with our local blockchain :
``` 
    > const Web3 = require('web3')
    > const localUrl = 'http://127.0.0.1:7545'
    > const localWeb3 = new Web3(localUrl)
    > localWeb3
```

### The web3 object
*Discuss web3 object, and in particular:*
* `unitMap` object - wei, gwei, ether values and units
* `web3.utils` object functions `toWei` and `fromWei` for unit conversions and `toHex` to convert to hexadecimal.
* The `web3.eth` object and in particular the `getAccounts` `getBalance` and `sendTransaction`  functions

### Get Account Balance

Now let us get the balance of one of the local accounts. Function calls to the blockchain return **promises** so we can invoke callback functions which execute after the promise has been fulfilled. 

> From your local blockchain, select the address of the first account. E.g. `0xdeF4f71e2DA944Ca4118c04CcF120f8a2bc7B92B`. Then call the `getBalance` function in the `web3.eth` object:
```
    > localWeb3.eth.getBalance (
        '0xdeF4f71e2DA944Ca4118c04CcF120f8a2bc7B92B', (err, wei) => {
        balance = localWeb3.utils.fromWei(wei, 'ether')
    })

    > balance
```
Note that the response from the function call is a Promise which resolves to the balance of the first account - 100 ETH. 

Currently we are using a local blockchain but we can do exactly the same thing with the public ethereum mainnet. 

> From the Infura website, select the `MAINNET` endpoint and copy the API URL. This will be our mainnet url that we use to interact with the main ethereum network. 
```
    > const mainnetUrl = 'https://mainnet.infura.io/v3/182b941b70e6443b8854cc53786a3007'
    > const mainnetWeb3 = new Web3(mainnetUrl)
    > mainnetWeb3
```
> Look at the list of top ethereum accounts at `https://etherscan.io/accounts` and pick the first address: `0x281055afc982d96fab65b3a49cac8b878184cb16`. Similar to the `getBalance` function we ran locally, we can do the following:
```
    > mainnetWeb3.eth.getBalance (
        '0x281055afc982d96fab65b3a49cac8b878184cb16', (err, wei) => {
        balance = mainnetWeb3.utils.fromWei(wei, 'ether')
    })

    > balance
```
And the balance we get should match the balance displayed on the etherscan accounts webpage. 

### Send ETH between accounts

Finally, back to our local blockchain, let us send ETH from one account to another representing a basic money transfer between wallets. 

Currently, these local accounts are unlocked, meaning that transactions are automatically signed on the account holder's behalf.

From the web3js docs (https://web3js.readthedocs.io/en/1.0/web3-eth.html#eth-sendtransaction), the `sendTransaction` function takes in a transaction object containing the to/from addresses, transaction value in Wei and optional parameters like gas/gasPrice which we won't worry about at the moment. 

> Call the `sendTransaction` function passing in the transaction object:
```
    > localWeb3.eth.sendTransaction({
        from: '0xdeF4f71e2DA944Ca4118c04CcF120f8a2bc7B92B',
        to: '0x20eCfb735EEAd9902b43Cd553F485Fd7a04D2791',
        value: localWeb3.utils.toWei('1', 'ether')
    })
```
This, as expected, returns a promise. Taking a look at the account summaries of our local blockchain in Ganache, we see the first account balance has been reduced by 1 ETH and the second account balance has increased by 1 ETH. **We have successfully excuted our first money transfer!**


