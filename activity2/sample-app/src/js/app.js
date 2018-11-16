App = {
    web3Provider: null,
  
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
      return App.showActiveAccount();
    },
  
    showActiveAccount: function() {
      // TODO: Load account data - display active account info on the webpage
      
    },
  
    sendMoney: function() {
      //TODO: send money from active account to receiver
  
    },
};
  
$(function() {
    $(window).load(function() {
      App.init();
    });
});