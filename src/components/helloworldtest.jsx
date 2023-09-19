import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import HelloWorldABI from "../ABI/HelloWorldABI.json"

const contractAddress = '0xcA76FF50dbC8B9B00b131fC0Ef73059FA555e52c';

function HelloWorld (){

    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const web3 = new Web3(window.ethereum);
                    setWeb3(web3);

                    const accounts = await web3.eth.getAccounts();
                    setAccounts(accounts);

                    const contract = new web3.eth.Contract(HelloWorldABI, contractAddress);
                    setContract(contract);

                    // Get the current message from the contract when initialized
                    const currentMessage = await contract.methods.getMessage().call();
                    setMessage(currentMessage);

                } catch (error) {
                    console.error('Error initializing Web3:', error);
                    alert('An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.');
                }
            } else {
                console.log('Please install MetaMask!');
            }
        };

        initialize();
    }, []);

    const setMessageOnContract = async () => {
        if (!contract || !web3 || !accounts) {
            return;
        }

        setLoading(true);

        try {
            // Send a transaction to set the new message
            await contract.methods.setMessage(newMessage).send({ from: accounts[0] });

            // Update the local state with the new message
            setMessage(newMessage);
            setNewMessage('');
        } catch (error) {
            console.error('Error setting message:', error);
            alert(`Error setting message: ${error.message}`);
        }
        
        finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Hello, World! Smart Contract</h1>
            <p>Current Message: {message}</p>
            <input
                type="text"
                placeholder="New Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={setMessageOnContract} disabled={loading}>
                {loading ? 'Setting...' : 'Set Message'}
            </button>
        </div>
    );
}

export default HelloWorld;
