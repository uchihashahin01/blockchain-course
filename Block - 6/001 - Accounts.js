(async () => {
    let accounts = await web3.eth.getAccounts();
    console.log("Accounts: ", accounts);
    console.log("Accounts 1:", accounts[0]);

    //get account balance in wei
    let balance = await web3.eth.getBalance(accounts[0]);
    console.log(balance);

    //convert in ether
    let balanceInEth = await web3.utils.fromWei(balance.toString(), "ether");
    console.log(balanceInEth);
})();
