import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xe59E23bBb7dC0Ce7d5f3B7c2e8DA4a19eacDD9d6';
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pricePerShare",
				"type": "uint256"
			}
		],
		"name": "buyback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "claimRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "emergencyPause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "emergencyUnpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "invest",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_goal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_equity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_milestones",
				"type": "uint256"
			}
		],
		"name": "registerStartup",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "enum MicroInvestmentPlatform.Role",
				"name": "_role",
				"type": "uint8"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "releaseFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "verifyStartup",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "verifyUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "investments",
		"outputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "equityShare",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "refunded",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "boughtBack",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
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
		"name": "startupCount",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "startups",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "fundingGoal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "equityOffered",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountRaised",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isFunded",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "milestonesCompleted",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalMilestones",
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
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "enum MicroInvestmentPlatform.Role",
				"name": "role",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


let provider;
let signer;
let contract;

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Metamask not found");

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const address = await signer.getAddress();
  return address;
};

export const registerUser = async (name, role) => {
  const tx = await contract.registerUser(name, role);
  await tx.wait();
  return tx;
};

export const verifyUser = async (address) => {
  const tx = await contract.verifyUser(address);
  await tx.wait();
  return tx;
};

export const registerStartup = async (name, description, goal, equity, milestones) => {
  const tx = await contract.registerStartup(name, description, goal, equity, milestones);
  await tx.wait();
  return tx;
};

export const invest = async (id, amountInEDU) => {
  const tx = await contract.invest(id, { value: ethers.utils.parseEther(amountInEDU) });
  await tx.wait();
  return tx;
};

export const releaseFunds = async (id) => {
  const tx = await contract.releaseFunds(id);
  await tx.wait();
  return tx;
};

export const claimRefund = async (id) => {
  const tx = await contract.claimRefund(id);
  await tx.wait();
  return tx;
};

export const buyback = async (id, pricePerShare) => {
  const tx = await contract.buyback(id, pricePerShare);
  await tx.wait();
  return tx;
};

export const emergencyPause = async () => {
  const tx = await contract.emergencyPause();
  await tx.wait();
  return tx;
};

export const getUser = async (address) => {
  const user = await contract.users(address);
  return user;
};

export const getStartup = async (id) => {
  const startup = await contract.startups(id);
  return startup;
};

export const getAllStartups = async () => {
  const startupCount = await contract.startupCounter();
  const startups = [];

  for (let i = 0; i < startupCount; i++) {
    const startup = await contract.startups(i);
    startups.push(startup);
  }

  return startups;
};
