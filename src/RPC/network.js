import Web3 from 'web3';
import { Magic } from "magic-sdk";
import ContractABI from '../ABI/RevisedABI.json';

export const magicProvider = new Magic('pk_live_458EA07ABE8ADAEA', {
    network: {
      rpcUrl: 'https://sepolia.infura.io/v3/cc5bd360c5e7491888fe47af0fdc1584',
      chainId: 11155111,
    }, // or your own custom node url
  });

const provider = await magicProvider.wallet.getProvider();
export const contractAddress = '0x6E6FD340FD7BE37e06888824f9F13CC010A93D12';
export const web3 = new Web3(provider);
export const contractInstance = new web3.eth.Contract(ContractABI, contractAddress);

