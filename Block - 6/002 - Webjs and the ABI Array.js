(async() => {

    const address = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";
    const abi = [
    {
        "inputs": [],
        "name": "myUint",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newUint",
                "type": "uint256"
            }
        ],
        "name": "setMyUint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


async function updateMyUint() {
  // Create an instance of the contract
  let contractInstance = new web3.eth.Contract(abi, address);

  // Get the initial value of myUint and store it in a variable
  let initialValue = await contractInstance.methods.myUint().call();
  console.log("Initial myUint value:", initialValue);

  // Get the user's Ethereum accounts
  let accounts = await web3.eth.getAccounts();

  // Update myUint with a new value (e.g., 4)
  await contractInstance.methods.setMyUint(10).send({ from: accounts[0] });

  // Get the updated value of myUint and store it in a variable
  let updatedValue = await contractInstance.methods.myUint().call();
  console.log("Updated myUint value:", updatedValue);
}

// Call the function to update and print the values
updateMyUint();

})()
