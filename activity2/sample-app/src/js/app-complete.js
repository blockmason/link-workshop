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
    // Load account data - display your account info on the webpage
    web3.eth.getCoinbase(function(err, result) {
      if (err === null) {
        App.account = result;
        $("#accountAddress").html("Your Account: " + result);
      }
    });
  },

  // Send money function based on form inputs
  sendMoney: function() {
    const receiver = $('#receiver').val();
    const amount = $('#amount').val();

    web3.eth.sendTransaction({
        from: App.account,
        to: receiver,
        value: web3.toWei(amount, 'ether')
      }, function(err, txnHash) {
        if (!err) {
          console.log('txnHash is ' + txnHash);
        }
      });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});