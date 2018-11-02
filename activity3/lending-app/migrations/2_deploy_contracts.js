const Lending = artifacts.require("./Lending.sol");

module.exports = function(deployer) {
  deployer.deploy(Lending);
};