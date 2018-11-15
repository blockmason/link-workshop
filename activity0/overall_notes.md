# Overall workshop flow

1. Introduce web3.js (both the current release and the beta 1.00), running a local blockchain with Ganache, getting and sending ETH between accounts locally, getting ETH balance from a mainnet account using Infura.

2. Learn how to build, sign and broadcast a transaction to the Ropsten account from scratch. This is useful if developing without MetaMask to sign transactions. Introduce `Buffer`, nonces, and `ethereumjs-tx` library. 

3. Activity 3 is the meat of the workshop. Participants will:
    1. Build a solidity contract for a Lending app with a `Loan` struct
    2. Contract also has an `addLoan` function which executes a write transaction to the network
    3. Use Truffle to compile and deploy contract to local blockchain
    4. Setup a MetaMask account
    5. Use HTML/CSS/JS templates to wire up front-end
    6. Discuss use of Promises in a few different ways:
        1. `.then(function(..){})`
        2. Callback functions passed into `web3.eth.sendTransaction({}, cb{})` for example
        3. `async/await`
    7. Rendering blockchain data in the HTML
    8. Identify which account is 'active'

4. Activity 3b is deploying the Lending DApp in the previous exercise onto the Ropsten network using Truffle's `HDWalletProvider` tool and Infura to pay the gas fee for deploying the contract to Ropsten.  

5. Then we take a step back to discuss Smart Contract security considerations, specifically:
    1. Re-entrancy
    2. Underflows/overflows
and an introduction to the `Checks-Effects-Interactions` pattern. Participants will also use ETHFiddle to interact with smart contract code in the browser.

6. Activity 5 is then to refactor the Lending DApp to use Link:
    1. Requires refactoring `app.js` to use `$.get()` and `$.post()` requests
7. 