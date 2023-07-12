import { ContractRunner, ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from '../Context/constants';

export const checkIfWalletConnected = async () => {
    try {
        if (!window.ethereum) throw Error('Install MetaMask');

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const firstAccount = accounts[0];

        return firstAccount;
    } catch (error) {
        console.error(error);
    }
}

export const connectWallet = async () => {
    try {
        if (!window.ethereum) throw Error('Install MetaMask');

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];

        return firstAccount;
    } catch (error) {
        console.error(error);
    }
}

const fetchContract = (signerOrProvider: null | ContractRunner) =>
    new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        return contract;
    } catch (error) {
        console.error(error);
    }
}

export const convertTime = (time: string | number | Date) => {
    const newTime = new Date(Number(time));

    const realTime =
        newTime.getHours() + '/' +
        newTime.getMinutes() + '/' +
        newTime.getSeconds() +
        ' Date:' +
        newTime.getDate() + '/' +
        (newTime.getMonth() + 1) + '/' +
        newTime.getFullYear();

    return realTime;
}