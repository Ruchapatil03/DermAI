import React, { useState, useRef,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Web3Storage } from 'web3.storage';
import DermAIABI from "../ABI/RevisedABI.json"
import Web3 from 'web3';

const contractAddress = '0x47DD92CcBa70120AC0B8fF5d75d61a7E441D6F8c';

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

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

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

          // Get the contract instance
          const contract = new web3.eth.Contract(DermAIABI, contractAddress);
          setContract(contract);
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

  const location = useLocation();
  const commonInformation = location.state ? location.state.formData : null;

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleFileChange = async () => {
    const files = getFiles();
  
    if (!files || files.length === 0) {
      console.log('No files selected.');
      return;
    }
  
    try {
      const client = makeStorageClient();
      const cid = await client.put(files);
      const fileName = files[0].name;
      alert("Your paperwork has been successfully added to our system!");
  
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
      console.log('Stored files with CID:', cid_);
  
      // Try to call the contract function
      await contract.methods.createPatient('', cid_, cid).send({ from: accounts[0] });
      alert('Contract function called successfully');
    } catch (error) {
      console.error('Error:', error);
      alert("Paperwork upload failed! Please try again later.");
    }
  };
  

  const getFiles = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      return fileInputRef.current.files;
    }
    return null;
  };

  return (
    <form>
      <div>
        <label>Upload your Diagnosis History:</label>
        <br />
        <input
          name="diagHistory"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange} // Automatically trigger file upload on change
        />
      </div>
    </form>
  );
}

export default PatientForm;
