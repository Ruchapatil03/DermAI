// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from 'react';
import "../stylesheets/Login.css";
import ig from "../assets/Login/logimg.png";
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';


const Login = () => {

    const [selectedRole, setSelectedRole] = useState('');
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [walletAddress,setWalletAddress] = useState('');

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

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
    setSelectedRole(event.target.value);
  };
  return (
    <>
    <section className='sec1'>
        <div className="outer">
            <div className="formsection">
                <center>
                 <span>LOGIN</span>
                </center>
                
                <form  className="form">

                    <div>
                        <label>MetaMask ID:</label>
                        <br />
                        <input value={walletAddress} readOnly name="PFP/Metamask ID" type="text" />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select value={selectedRole} onChange={handleRoleChange}>
                            <option value="">Select a Role</option>
                            <option value="Patient">Patient</option>
                            <option value="HealthcareProfessional">Healthcare Professional</option>
                        </select>
                        
                        </div>
                    <div>
                        <label>User ID:</label>
                        <br />
                        <input name="User ID" type="text" />
                    </div>

                    <center>
                        <button >
                        SUBMIT
                        </button>
                        {/* <input type="submit" className='submit'/> */}
                    </center>
                </form>
            </div>
            <div className="imagecontent">
                <img src={ig} alt="" /> 
            </div>
            
        </div>
    </section>
        
    </>
  );
}

export default Login