const NFT = artifacts.require("Practice");

module.exports = function(deployer) {
    deployer.deploy(NFT);
}