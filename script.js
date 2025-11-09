const contractAddress = "0x1ac002c622876a67d9942982329087ef54b67917";

const contractABI = [
	{
		"inputs": [],
		"name": "incrementCounter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_msg",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
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
		"name": "getCounter",
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
		"name": "getMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider, signer, contract;

async function connectMetaMask() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    alert("MetaMask connected!");
  } else {
    alert("MetaMask not found! Please install MetaMask extension.");
  }
}

async function setMessage() {
  const msg = document.getElementById("messageInput").value;
  const tx = await contract.setMessage(msg);
  await tx.wait();
  alert("Message stored successfully!");
}

async function getMessage() {
  const msg = await contract.getMessage();
  document.getElementById("displayMessage").innerText = "Stored Message: " + msg;
}

async function incrementCounter() {
  const tx = await contract.incrementCounter();
  await tx.wait();
  alert("Counter incremented!");
}

async function getCounter() {
  const count = await contract.getCounter();
  document.getElementById("displayCounter").innerText = "Counter Value: " + count;
}

async function resetContract() {
  const tx = await contract.reset();
  await tx.wait();
  alert("Contract reset!");
}

document.getElementById("connectButton").onclick = connectMetaMask;
document.getElementById("setMessageButton").onclick = setMessage;
document.getElementById("getMessageButton").onclick = getMessage;
document.getElementById("incrementButton").onclick = incrementCounter;
document.getElementById("getCounterButton").onclick = getCounter;
document.getElementById("resetButton").onclick = resetContract;
