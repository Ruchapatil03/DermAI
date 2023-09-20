/* eslint-disable no-unused-vars */

import React,{useState,useEffect} from 'react';
import "../stylesheets/Login.css";
import DermAIABI from '../ABI/RevisedABI.json';
import ig from "../assets/Login/logimg.png";
import Web3 from 'web3';

import { Web3Storage } from 'web3.storage';
import { useNavigate } from 'react-router-dom';

const contractAddress = '0x6E6FD340FD7BE37e06888824f9F13CC010A93D12';


const Login = () => {

    const nav = useNavigate();
    const [isLoading,setIsLoading] = useState(false);

    

    const goToDash = async (e) => {
        e.preventDefault();
        if (selectedRole === 'Select') {
          alert('Please select a role.');
        } else {
          if (selectedRole === 'patient') {
            try {
              const result = await contract.methods.getPatientDetails(userID).call();
              if(result[2]==walletAddress){
                const result = await web3.eth.personal.sign("User Logged In", walletAddress, '');
                if(result){nav(`/dash/${selectedRole}/${selectedRole}`, { state: { userID, selectedRole } });}}                
              else{alert("Incorrect access role or user ID. Please check again.")}
              
              setIsLoading(false)
            } catch (error) {
              console.error('Error fetching patient details:', error);
              // Handle the error appropriately (e.g., show an error message)
            }
          }
      
          // Navigate to the dashboard page with user ID and selected role in the state
          //nav(`/dash/${selectedRole}/${selectedRole}`, { state: { userID, selectedRole } });
        }
      };
      
      

    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [walletAddress,setWalletAddress] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [userID, setUserID] = useState('');

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
          const contract = new web3.eth.Contract(DermAIABI, contractAddress);
          setContract(contract);
          // Get the user's accounts
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);
          setWalletAddress(accounts[0])

          // Get the contract instance
        //   const contract = new web3.eth.Contract(DermAIABI, contractAddress);
        //   setContract(contract);
        } catch (error) {
          console.error('Error initializing Web3:', error);
          alert(
            'An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.'
          );
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initialize();
  }, []);


  // Handle role selection
  const handleRoleChange = (event) => {
    const { name,value } = event.target;
    setSelectedRole(value);
  };
  return (
    <>
    <section className='sec1'>
        <div className="outer1">
            <div className="formsection1">
                <center>
                 <span>LOGIN</span>
                </center>
                
                <form  className="form1">

                    <div>
                        <label>MetaMask ID:</label>
                        <br />
                        <input value={walletAddress} readOnly name="PFP/Metamask ID" type="text" />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select value={selectedRole} onChange={handleRoleChange}>
                            <option value="">Select a Role</option>
                            <option value="patient">Patient</option>
                            <option value="professional">Healthcare Professional</option>
                        </select>
                        
                        </div>
                    <div>
                        <label>User ID:</label>
                        <br />
                        <input name="User ID" type="text" onChange={(e)=>{setUserID(e.target.value)}}/>
                    </div>

                    <center>
                        <button onClick={goToDash} >
                        SUBMIT
                        </button>
                        {/* <input type="submit" className='submit'/> */}
                    </center>
                </form>
            </div>
            <div className="imagecontent1">
                <img src={ig} alt="" /> 
            </div>
            
        </div>
    </section>
        
    </>
  );
}

export default Login