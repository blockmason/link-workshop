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

>**Note:** While all 10 of your local Ganache blockchain accounts should load automatically, you may only end up with just the first account and you will have to add additonal accounts manually using the *Import Account* function. 
![Import account](images/MetaMask_import_account.png)

>Once MetaMask is properly configured, you should see your web application load.
![Loaded dashboard](images/Lending_dashboard_loaded.png)

### Front-end HTML code
> Look through `src/index.html` which is a basic template for our Lending app. Note in particular:
* The `loader` and `content` divs
* The function called on form submission
* The components of the form
* The `accountAddress` info after the form

### Configure app.js
The scaffolding code for our `app.js` looks like the following which runs the web app upon window load and initiates and sets the web3 provider:
```
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by MetaMask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Lending.json", function(lending) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Lending = TruffleContract(lending);
      // Connect provider to interact with contract
      App.contracts.Lending.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var lendingInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.hide();
    content.show();
    //TODO: Render content on webpage
  },

  createLoan: function() {
      //TODO: Create and issue loan
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
```
>Compare what you see with the code in `index.html`. 

### Creating the Loan
For each function in our `App` object in `app.js`, we need to take an instance of the deployed Lending smart contract in order to then apply the smart contract function such as `addLoan(...)`.
```
    App.contracts.Lending.deployed().then(function(instance) {
        // Call instance.addLoan(...) for example
    });
```
Recall that the `addLoan(...)` function in the `Lending` contract takes the following arguments:
* address creditor
* address debtor
* uint amount (in Wei)
* uint term
* uint interest

The creditor will be the account currently logged in by the app user. We can access the account's public address with `App.account`. 

> Grab the form field values and pass them as arguments into the `addLoan(...)` function:
```
createLoan: function() {
    var debtor = $('#debtor').val();
    var loanAmount = $('#loanAmount').val();
    var loanTerm = $('#loanTerm').val();
    var interestRate = $('#interestRate').val();

    // Create the Loan
    App.contracts.Lending.deployed().then(function(instance) {
        return instance.addLoan(App.account, debtor, web3.toWei(loanAmount, 'ether'), loanTerm, interestRate, { from: App.account });
    }).then(function(result) {
        // For now, just show the loader while function executes
        $("#content").hide();
        $("#loader").show();
    }).catch(function(err) {
        console.error(err);
    });
}, 
```
### Rendering Lending data on webpage
Now let's complete our `render` function in `app.js`.
```
render: function() {
    var lendingInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.hide();
    content.show();
    //TODO: Render content on webpage
},
```
>First switch the loader to `show()` and the content to `hide()` which is the correct rendering order. 
```
    ...
    loader.show();
    content.hide();
    //TODO: Render content on webpage
    ...
```

>Then let us add the active account's information at the bottom of the webpage in the html paragraph with id `#accountAddress`. One way to get the active account is by calling the async function `web3.eth.getCoinbase(...)` which takes in a callback using the address of the active client as the result:
```
    web3.eth.getCoinbase(function(err, result) {
      if (err === null) {
        App.account = result;
        $("#accountAddress").html("Your Account: " + result);
      }
    });
```
>Then, we want to take an instance of the Lending contract and access the total number of Loan objects with the `loansCount` variable.
```
    App.contracts.Lending.deployed().then(function(instance) {
      //Assign instance to a variable to access it in our callback
      lendingInstance = instance;
      return lendingInstance.loansCount();
    }).then(function(loansCount) {
      var loans = $("#loans");
      loans.empty();

      // Loop through each Loan object and parse its contents to display

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
```
> Finally, fill out the loop code to iterate through each loan from the first to `loansCount`. We also only want to render the list of loans where the active user (i.e. `App.account`) is the creditor. 
```
    App.contracts.Lending.deployed().then(function(instance) {
      lendingInstance = instance;
      return lendingInstance.loansCount();
    }).then(function(loansCount) {
      var loans = $("#loans");
      loans.empty();

      for (var i = 1; i <= loansCount; i++) {
        lendingInstance.loans(i).then(function(loan) {
          if (loan[0] == App.account) {
            var debtor = loan[1];
            var amount = loan[2];
            var term = loan[3];
            var interest = loan[4];

            // Render existing loans table
            var loanTemplate = "<tr><td>" + web3.fromWei(amount, 'ether') + "</td><td>" + debtor + "</td><td>" + term + "</td><td>" + interest + "</td></tr>"
            loans.append(loanTemplate);
          } 
        });
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
```
That's it! Your Lending DApp is ready to go! Try to record a loan to another address. For each record, you will need to access the gas fee for the transaction in MetaMask (it should prompt you automatically through a pop-up). 

When you switch MetaMask accounts, you should only see the existing loans where your current account is the 'creditor'.

![Lending dashboard complete](images/Lending_Dashboard_w_txn.png)











