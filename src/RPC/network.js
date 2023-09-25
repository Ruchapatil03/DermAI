import Web3 from 'web3';
import { Magic } from "magic-sdk";
import ContractABI from '../ABI/RevisedABI.json';

export const magicProvider = new Magic('YOUR_PUBLIC_KEY', {
    network: {
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
      chainId: 11155111,
    }, // or your own custom node url
  });

const provider = await magicProvider.wallet.getProvider();
export const contractAddress = '0x002117753C9b143699e6094a5553DD9403087bC8';
export const web3 = new Web3(provider);
export const contractInstance = new web3.eth.Contract(ContractABI, contractAddress);
