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

      // App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  // listenForEvents: function() {
  //   App.contracts.Lending.deployed().then(function(instance) {
  //     instance.createLoanEvent({}, {
  //       fromBlock: 0,
  //       toBlock: 'latest'
  //     }).watch(function(error, event) {
  //       console.log("event triggered", event)
  //       // Reload when a new loan is recorded
  //       App.render();
  //     });
  //   });  
  // },

  render: function() {
    var lendingInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.hide();
    content.show();

    // // Load account data - display your account info on the webpage
    // web3.eth.getCoinbase(function(err, account) {
    //   if (err === null) {
    //     App.account = account;
    //     $("#accountAddress").html("Your Account: " + account);
    //   }
    // });

    // // Load contract data
    // App.contracts.Lending.deployed().then(function(instance) {
    //   lendingInstance = instance;
    //   return lendingInstance.loansCount();
    // }).then(function(loansCount) {
    //   var loans = $("#loans");
    //   loans.empty();

    //   for (var i = 1; i <= loansCount; i++) {
    //     lendingInstance.loans(i).then(function(loan) {
    //       if (loan[0] == App.account) {
    //         var debtor = loan[1];
    //         var amount = loan[2];
    //         var term = loan[3];
    //         var interest = loan[4];

    //         // Render existing loans table
    //         var loanTemplate = "<tr><td>" + web3.fromWei(amount, 'ether') + "</td><td>" + debtor + "</td><td>" + term + "</td><td>" + interest + "</td></tr>"
    //         loans.append(loanTemplate);
    //       } 
    //     });
    //   }
    //   loader.hide();
    //   content.show();
    // }).catch(function(error) {
    //   console.warn(error);
    // });
  },

  createLoan: function() {
    var debtor = $('#debtor').val();
    var loanAmount = $('#loanAmount').val();
    var loanTerm = $('#loanTerm').val();
    var interestRate = $('#interestRate').val();
    
    // Create the Loan
    App.contracts.Lending.deployed().then(function(instance) {
      return instance.addLoan(App.account, debtor, web3.toWei(loanAmount, 'ether'), loanTerm, interestRate, { from: App.account });
    }).then(function(result) {
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  // issueLoan: function(receiver, amount) {
  //   web3.eth.sendTransaction({
  //     from: App.account,
  //     to: receiver,
  //     value: web3.toWei(amount, 'ether')
  //   }).then(function(txHash) {
  //     console.log(txHash);
  //   }).catch(function(err) {
  //     console.error(err);
  //   });
  // },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});