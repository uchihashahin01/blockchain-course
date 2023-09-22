const NFT = artifacts.require("Practice");

module.exports = function(deployer, network, accounts) {
    console.log("Deploying NFT to network: " + network); // to print the network where the contract is being deployed
    console.log("Deployer account: " + accounts[0]); // to print the account that is deploying the contract
    console.log("This is all the accounts: " + accounts); // to print all the accounts
    deployer.deploy(NFT);
}