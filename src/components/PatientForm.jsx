import React, { useState, useRef,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Web3Storage } from 'web3.storage';
import DermAIABI from "../ABI/RevisedABI.json"
import Web3 from 'web3';
import LoadingComponent from './loadingComponent';

const contractAddress = '0x002117753C9b143699e6094a5553DD9403087bC8';

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTUxMjAxNDc5MjEsIm5hbWUiOiJ1c2VyUHJvZmlsZVNJSCJ9.vVWHthR6rySB1W48_oO_vjHBF36_3Pm9ljHRIpZviDE";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function PatientForm() {
  const fileInputRef = useRef(null);
  const [vehicleDetailsHash, setVehicleDetailsHash] = useState('');
  const [isFileSubmitted, setIsFileSubmitted] = useState(false);
  const [loading,setLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [errorMessage,setErrorMessage] = useState('');
  const [web3Message, setWeb3Message] = useState('');

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
          setLoading(true);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
          setLoading(false);
          // Get the user's accounts
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);

          // Get the contract instance
          const contract = new web3.eth.Contract(DermAIABI, contractAddress);
          setContract(contract);
        } catch (error) {
          console.error('Error initializing Web3:', error);
          if (error.code === 4001) {
            setWeb3Message('Please refresh and connect to Metamask.');
            setLoading(false);
            }
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initialize();
  }, []);

  const location = useLocation();
  const commonInformation = location.state ? location.state.formData : null;

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleFileInputChange = () => {
    // Access the selected file(s) using fileInputRef.current.files
    const selectedFiles = fileInputRef.current.files;
  };

  const storeFiles = async () => {
    const files = getFiles();
  
    if (!files || files.length === 0) {
      console.log('No files selected.');
      return;
    }
  
    try {
      const client = makeStorageClient();
      const cid = await client.put(files);
      const fileName = files[0].name;
      const hash = `${cid};${fileName}`;

      alert("Diagnosis Received!");
  
      const formattedDate = formatDate(new Date());
      const PatientInformation = {
        ...commonInformation,
        dateOfJoining: formattedDate,
      };
      const blob = new Blob([JSON.stringify(PatientInformation)], {
        type: 'application/json',
      });
      const files_ = [new File([blob], 'PatientInformation.json')];
      
      const cid_ = await client.put(files_);
      console.log('Stored files with CID:', );
      
      const txObject = {
        from: accounts[0],
        to: contractAddress,
        data: contract.methods.createPatient('', cid_, hash).encodeABI(),        
        gas: 2000000, // Specify your desired gas limit
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      console.log(txHash);
      alert('Patient Successfully Registered!');
      
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
    }
  };
  

  const getFiles = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      return fileInputRef.current.files;
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await storeFiles();
   

  };

  return (
    <div>
      {!web3Message && !loading?(<form onSubmit={handleSubmit}>
      <div>
        <label>Upload your Diagnosis History:</label>
        <br />
        <input
          name="diagHistory"
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
           // Automatically trigger file upload on change
        />
      </div>
      <button style={{
  cursor: 'pointer',
  width: '15vw',
  height: '7vh',
  border: 'none',
  borderRadius: '3vh',
  backgroundColor: '#0f4a91',
  color: '#f9feff',
  marginTop: '3vh',
  fontSize: '2.5vh',
  letterSpacing: '0.1vw'
}}
onClick={handleSubmit}>SUBMIT</button>
    </form>):(<div>{!loading&&(<p style={{fontWeight:'700',fontSize:'x-large',color:'white',marginTop:'30vh',textAlign:'center'}}>{web3Message}</p>)}</div>)}
      {loading && (<LoadingComponent/>)}
        
    


    </div>
    

  );
}

export default PatientForm;
