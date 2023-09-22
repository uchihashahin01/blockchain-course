let web3;
let contract;

window.onload = async function () {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);

        // Replace 'contractABI' and 'contractAddress' with the actual contract ABI and address
        const contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_guardian",
                        "type": "address"
                    }
                ],
                "name": "addGuardian",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    }
                ],
                "name": "denySending",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address payable",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "proposeNewOwner",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "setAllowance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address payable",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "payload",
                        "type": "bytes"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "allowance",
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
                "inputs": [],
                "name": "confirmationsFromGuardiansForReset",
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
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "guardian",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "isAllowedToSend",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]; // Replace with the ABI array
        const contractAddress = '0xbad336f449883Db7c9a091C81E8F3153A920bbF0';

        contract = new web3.eth.Contract(contractABI, contractAddress);

        updateOwnerAddress();
    } else {
        console.log('Please install MetaMask to interact with this dApp');
    }
};

async function updateOwnerAddress() {
    const owner = await contract.methods.owner().call();
    document.getElementById('ownerAddress').textContent = owner;
}

async function addGuardian() {
    const guardianAddress = document.getElementById('guardianAddress').value;

    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];

        await contract.methods.addGuardian(guardianAddress).send({ from: fromAddress });
        updateOwnerAddress();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function proposeNewOwner() {
    const newOwnerAddress = document.getElementById('newOwnerAddress').value;

    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];

        await contract.methods.proposeNewOwner(newOwnerAddress).send({ from: fromAddress });
        updateOwnerAddress();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setAllowance() {
    const allowanceAddress = document.getElementById('allowanceAddress').value;
    const allowanceAmount = document.getElementById('allowanceAmount').value;

    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];

        await contract.methods.setAllowance(allowanceAddress, allowanceAmount).send({ from: fromAddress });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function denySending() {
    const denyAddress = document.getElementById('denyAddress').value;

    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];

        await contract.methods.denySending(denyAddress).send({ from: fromAddress });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function transferEther() {
    const recipientAddress = document.getElementById('recipientAddress').value;
    const transferAmount = document.getElementById('transferAmount').value;
    const transferPayload = document.getElementById('transferPayload').value;

    let payload = '0x';
    if (transferPayload) {
        payload = transferPayload.startsWith('0x') ? transferPayload : '0x' + transferPayload;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        const fromAddress = accounts[0];

        const result = await contract.methods.transfer(recipientAddress, transferAmount, payload).send({ from: fromAddress });
        document.getElementById('transactionMessage').textContent = `Transaction Successful - Tx Hash: ${result.transactionHash}`;
    } catch (error) {
        document.getElementById('transactionMessage').textContent = `Transaction Failed - Error: ${error.message}`;
    }
}
