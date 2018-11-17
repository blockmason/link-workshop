# Overall workshop flow

1. Introduce web3.js (both the current release and the beta 1.00), running a local blockchain with Ganache, getting and sending ETH between accounts locally on the server side, getting ETH balance from a mainnet account using Infura.

2. Creating a very basic DApp with a front-end to send ETH between accounts using MetaMask. This activity uses boilerplate HTML/JS/CSS code which will then be used in Activity 3 in building a Lending app. 

3. As a stretch exercise, continue with activity 2b to learn how to build, sign and broadcast a transaction to the Ropsten account from scratch. This is useful if developing without MetaMask to sign transactions. Introduce `Buffer`, nonces, and `ethereumjs-tx` library. 

4. Activity 3 is the meat of the workshop. Participants will:
    1. Build a solidity contract for a Lending app with a `Loan` struct
    2. Contract also has an `addLoan` function which executes a write transaction to the network
    3. Use Truffle to compile and deploy contract to local blockchain
    4. Use HTML/CSS/JS templates to wire up front-end similar to Activity 2
    5. Discuss use of Promises in a few different ways:
        1. `.then(function(..){})`
        2. Callback functions passed into `web3.eth.sendTransaction({}, cb{})` for example
        3. `async/await`
    6. Rendering blockchain data in the HTML
    7. Identify which account is 'active'

5. Activity 3b is to deploy the Lending app in the previous exercise onto the Ropsten network using Truffle's `HDWalletProvider` tool and Infura to pay the gas fee for deploying the contract to Ropsten.  

6. Then we take a step back to discuss Smart Contract security considerations, specifically:
    1. Re-entrancy
    2. Underflows/overflows
and an introduction to the `Checks-Effects-Interactions` pattern. Participants will also use EthFiddle to interact with smart contract code in the browser.

6. Activity 5 is then to refactor the Lending app to use Link. In particular, the activity requires refactoring the `createLoan` function in `app.js` to make an `ajax` requests (`$.post` and `$.get`) using the Link API smart contract endpoints. 

By the end of the workshop, participants will:
* Be familiar with some of the common blockchain development tools in the marketplace today
* Be able to make transactions on a local and public Ethereum blockchain
* Create a web app that interacts with a local and public Ethereum blockchain
* Create, deploy and interact with your own smart contract, both locally and on the public testnet
* Learn and debug some common security flaws in smart contract development
* Be the first users of Blockmason Link!

## Devhub Workshop Timing
* 10-10:30am    - Intros, setup
* 10:30-11am    - Activity 1
* 11-12pm       - Activity 2
* 12-12:30pm    - Lunch, Activity 2b*
* 12:30-1:30pm  - Activity 3
* 1:30-2pm      - Activity 3b
* 2-2:30pm      - Activity 4
* 2:30-2:45     - Break
* 2:45-3:45     - Activity 5
* 3:45-4pm      - Wrap up
  
