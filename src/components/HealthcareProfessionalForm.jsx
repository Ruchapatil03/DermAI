import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import DermAIABI from '../ABI/RevisedABI.json';
import { Web3Storage } from 'web3.storage';

const contractAddress = '0x002117753C9b143699e6094a5553DD9403087bC8';

function getAccessToken () {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTUxMjAxNDc5MjEsIm5hbWUiOiJ1c2VyUHJvZmlsZVNJSCJ9.vVWHthR6rySB1W48_oO_vjHBF36_3Pm9ljHRIpZviDE"
}

const HealthcareProfessionalForm = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  const location = useLocation();
  const commonInformation = location.state ? location.state.formData : null;

  const [formData, setFormData] = useState({
    licenseNumber: '',
    degree: '', // Default to MD, but you can change it to 'MS' if needed
    specialization: '',
    systemOfMedicine: '',
  });

  const systemsOfMedicine = ['Homeopathy', 'Ayurveda', 'Allopathy'];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
  }

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleSubmit = async () => {
    try {
      // You can access the selected degree and specialization in formData
      const formattedDate = formatDate(new Date());
      const healthcareProfessionalInformation = {
        ...commonInformation,
        ...formData,
        dateOfJoining: formattedDate,
      };
      const blob = new Blob([JSON.stringify(healthcareProfessionalInformation)], { type: 'application/json' })
      const files = [new File([blob], 'healthcareProfessionalInformation.json')]
      const client = makeStorageClient()      
      // Try to upload to web3.storage
      const cid = await client.put(files)
      console.log('Stored files with CID:', cid)
      const txObject = {
        from: accounts[0],
        to: contractAddress,
        data: contract.methods.createProfessional('', cid).encodeABI(),        
        gas: 2000000, // Specify your desired gas limit
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      console.log(txHash);
      alert('Professional Successfully Registered!');
      // Try to call the contract function
      // await contract.methods.createProfessional('', cid).send({ from: accounts[0] });
      // alert('Contract function called successfully')
    } catch (error) {
      console.error('Error:', error)
      // Handle the error as needed (e.g., display an error message)
    }
  };
  

  return (
    <div>
      {/* Your form */}
      <div>
        <h5 style={{ marginLeft: '3%', fontWeight: '700', marginTop: '10%' }}>
          Professional Credentials
        </h5>
        <label>Medical License Number:</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <h5 style={{ marginLeft: '2%', fontWeight: '700', marginTop: '1%' }}>
          Education
        </h5>
        <div>
          <label>Degree:</label>
          <select
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
          >
            <option value='Select'>Select..</option>
            <option value="MD (Doctor of Medicine)">MD (Doctor of Medicine)</option>
            <option value="MS (Master of Surgery)">MS (Master of Surgery)</option>
          </select>
        </div>
        <div>
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h5 style={{ marginLeft: '2%', fontWeight: '700', marginTop: '1%' }}>
        System of Medicine
      </h5>
      <div>
        <select
          name="systemOfMedicine"
          value={formData.systemOfMedicine}
          onChange={handleInputChange}
        >
          <option value="">Select System of Medicine</option>
          {systemsOfMedicine.map((system) => (
            <option key={system} value={system}>
              {system}
            </option>
          ))}
        </select>
      </div>

      <button
        style={{
          cursor: 'pointer',
          width: '15vw',
          height: '7vh',
          border: 'none',
          borderRadius: '3vh',
          backgroundColor: '#0f4a91',
          color: '#f9feff',
          marginTop: '0vh',
          fontSize: '2.5vh',
          letterSpacing: '0.1vw',
        }}
        onClick={handleSubmit}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default HealthcareProfessionalForm;
