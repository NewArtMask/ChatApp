'use client'
import { ReactNode, createContext, useEffect, useState } from 'react';

import { checkIfWalletConnected, connectWallet, connectingWithContract, convertTime } from '../Utils/apiFeatures';
import { useRouter } from 'next/navigation';

const defaultRpcContext = {
    // async doRpcCall() {
    //     return new Promise(() => null); // never complete by default
    // },

    readMessage: (friendAddress: string) => { },
    createAccount: ({ name }: { name: string }) => { },
    addFriends: ({ name, accountAddress }: { name: string, accountAddress: string }) => { },
    sendMessage: ({ msg, address }: { msg: string, address: string }) => { },
    readUser: (userAddress: string) => { },
    checkIfWalletConnected: checkIfWalletConnected,
    connectWallet: connectWallet,
    account: '',
    userName: '',
    friendsList: [],
    friendMsg: [],
    loading: false,
    userList: [],
    error: '',
    currentUserName: '',
    currentUserAddress: ''
}
export const ChatAppContext = createContext(defaultRpcContext);
export const ChatAppProvider = ({ children }: { children: ReactNode }) => {
    const [account, setAccount] = useState('');
    const [userName, setUserName] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState('');

    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserAddress, setCurrentUserAddress] = useState('');

    const router = useRouter();

    const fetchData = async () => {
        try {
            const contract = await connectingWithContract();

            console.log("CONTRACT ", contract);

            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            const userName = await contract!.getUsername(connectAccount);
            setUserName(userName);
            const friendList = await contract!.getMyFriendList();

            console.log("FRIEND LIST ", friendList) // FRIEND LIST

            setFriendsList(friendList);
            const userList = await contract!.getAllAppUsers();
            setUserList(userList);
        } catch (error) {
            setError('Please install and connect your Wallet. ' + error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const readMessage = async (friendAddress: string) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract!.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError('Currently you have no message');
        }
    }

    const createAccount = async ({ name }: { name: string }) => {
        try {
            console.log(name, " works!")
            if (!name) {
                setError('Name cannot be empty');
                throw Error();
            }
            const contract = await connectingWithContract();
            const getCreatedUser = await contract!.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError('Error while creating your account, please reload browser');
        }
    }

    const addFriends = async ({ name, accountAddress }: { name: string, accountAddress: string }) => {
        try {
            if (!name || !accountAddress) {
                setError('Name and account address cannot be empty');
                throw Error();
            }

            const contract = await connectingWithContract();
            const addMyFriend = await contract!.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            setError('Something went wrong while adding friends, please try again');
        }
    }

    const sendMessage = async ({ msg, address }: { msg: string, address: string }) => {
        try {
            if (!msg || !address) {
                setError('Please type your message');
                throw Error();
            }

            const contract = await connectingWithContract();
            const addMessage = await contract!.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError('Please reload and try again');
        }
    }

    const readUser = async (userAddress: string) => {
        try {
            const contract = await connectingWithContract();
            const userName = await contract!.getUsername(userAddress);
            setCurrentUserName(userName);
            setCurrentUserAddress(userAddress);
        } catch (error) {
            setError('Please reload and try again');
        }
    }

    return (
        <ChatAppContext.Provider value={{
            readMessage,
            createAccount,
            addFriends,
            sendMessage,
            readUser,
            connectWallet,
            checkIfWalletConnected,
            account,
            userName,
            friendsList,
            friendMsg,
            loading,
            userList,
            error,
            currentUserName,
            currentUserAddress
        }}>
            {children}
        </ChatAppContext.Provider>
    );
}
