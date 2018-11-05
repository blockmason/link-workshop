# Create, deploy, and interact with a basic Smart Contract with a front-end web app
## Goal
In this activity, we will program a basic Smart Contract, deploy it to a test network, and interact with it using a basic front-end. 

## Exercise
This activity will require you to:
* Use Solidity to write a basic smart contract to record a loan
* Use web3js to interact between a local blockchain network and a web front-end
* Use HTML and JavaScript for the front-end web application

### Setup

> In the `activity3/lending-app/` folder, run:
```
    npm install
```
This will install all the node dependencies. 

> Ensure you have Ganache running a local blockchain at `http://127.0.0.1:7545`.

### Create a Smart Contract

First, we will create the `Lending` contract which will be written in Solidity and stored in the `/contracts` folder. For an introduction to Solidity contracts, check out `https://solidity.readthedocs.io/en/v0.4.24/introduction-to-smart-contracts.html`

> Create a file `Lending.sol` in the `contracts/` folder.

> First, let's add the boilerplate code specifying the version of Solidity for the compiler and the contract name:
```
    pragma solidity ^0.4.24;

    contract Lending {
    
    }
```
Then we want to create a `Loan` object, specific for our web app. When extending a loan, key attributes include: the creditor, debtor, the amount loaned, the duration of the loan and the interest rate being charged. 

> Create a `struct` object with the following attributes:
```
    contract Lending {
        struct Loan {
            address creditor;
            address debtor;
            uint amount;
            uint term; // in months
            uint interest;
        }
    }
```

We want to keep track of all the loans. A simple way to do this is by using a dictionary with a loan ID. 

```
    contract Lending {
        ...

        mapping(uint => Loan) public loans;
        uint public loansCount;
    }
```
By using the keyword `public`, we are able to access the `loans` dictionary and `loansCount` variable in our web app.

>Then we will create a constructor for the `Lending` contract:

```
    contract Lending {
        ...

        constructor () public {

        }   
    }
```

>Finally, we will create the `addLoan` function:
```
    function addLoan(address creditor, address debtor, uint amount, uint term, uint interest) public {
        loansCount ++;
        loans[loansCount] = Loan(creditor, debtor, amount, term, interest);;
    }
```
>Save your `Lending.sol` contract and create a file `2_deploy_contracts.js` in the `migrations/` folder.

The files in the `migrations/` folder will deploy the contracts onto the blockchain. 

>Copy and adapt the code in the default `1_initial_migration.js` file to deploy the `Lending` smart contract:
```
    const Lending = artifacts.require("./Lending.sol");

    module.exports = function(deployer) {
        deployer.deploy(Lending);
    };
```
Now we are ready to compile our contract and deploy to our blockchain using `truffle`. Note the network specified in `truffle.js` to correspond to the IP and port of our local blockchain. 

>From within `activity3/lending-app/` run the following from the Terminal:
```
    truffle compile
```
This will compile and build your contract artifacts in a folder called `build/`. 

>Then to deploy the contracts on the local blockchain, run:
```
    truffle migrate
```
You should see each contract deployed with a hash address in your Terminal output. 

In addition, you should also see the first account in Ganache have slightly less than 100ETH as a small amount of ETH was used as a gas fee to transact with the local network.

So we have now created our Lending smart contract and deployed it to our local blockchain.

### Front-end Setup with MetaMask
In order to interact with our Lending smart contract, we will work with a basic front-end consisting of HTML/CSS and JavaScript. We will use Bootstrap for our CSS. 

The focus for this part of the activity will be on the JavaScript code in `src/js/app.js`. 

Notice in our `package.json` that we have `lite-server` installed under the `dev` script, which will be used to run our Lending app locally. 

> To get the Lending app up and running using `lite-server`, run:
```
    npm run dev
```
> Now direct your browser to `http://localhost:3000` to see the Loans Dashboard.

You will notice that the web page indicates it is loading, but no content appears because we need to first connect the front-end application with our local blockchain. We will do this by setting up the MetaMask chrome extension, similar to what we did in Activity 2.

> Open up the MetaMask extension and *Import using account seed phrase*. The phrase will be the mnemonic from Ganache. 

![Import using account seed phrase](images/MetaMask_restore_seed_phrase.png)

>Then from the list of networks, select `Custom RPC`. Here, set the *New RPC URL* to `http://127.0.0.1:7545`

![Set new RPC](images/MetaMask_set_rpc.png)

Now your Lending Dashboard should load. 

>**Note:** While all 10 of your local Ganache blockchain accounts should load automatically, you may only end up with just the first account and you will have to add additonal accounts manually using the *Import Account* function. 
![Import account](images/MetaMask_import_account.png)


