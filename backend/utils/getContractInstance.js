const { ethers } = require("ethers");
require("dotenv").config();

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address
const contractData = require("D:/gemledger/diamond-contract/artifacts/contracts/DiamondTracking.sol/DiamondTracker.json");

// ✅ Extract only the ABI field
const ABI = contractData.abi; 

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_URL = process.env.INFURA_URL; // or any RPC provider (Alchemy, QuickNode, etc.)

const provider = new ethers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

function getContractInstance() {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
}

module.exports = getContractInstance;
