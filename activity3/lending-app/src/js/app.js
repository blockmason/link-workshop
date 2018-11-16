App = {
    web3Provider: null,
    contracts: {},
  
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
      let lendingInstance;
      const loader = $("#loader");
      const content = $("#content");
  
      loader.hide();
      content.show();
      //TODO: Render content on webpage
    },
  
    createLoan: function() {
        //TODO: Create the loan
    },
  
    issueLoan: function() {
        //TODO: Issue the loan by transferring ETH
    }
};
  
$(function() {
    $(window).load(function() {
      App.init();
    });
});