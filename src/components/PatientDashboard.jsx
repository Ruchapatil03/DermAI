import React, { useState, useEffect } from "react";
import "../stylesheets/Dash.css";
import { useLocation } from "react-router-dom";
import DermAIABI from '../ABI/RevisedABI.json';
const contractAddress = '0x6E6FD340FD7BE37e06888824f9F13CC010A93D12';
import Web3 from "web3";
import { Web3Storage } from "web3.storage";
import { IoOpenOutline } from "react-icons/io5";
import { result } from "lodash";



function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTUxMjAxNDc5MjEsIm5hbWUiOiJ1c2VyUHJvZmlsZVNJSCJ9.vVWHthR6rySB1W48_oO_vjHBF36_3Pm9ljHRIpZviDE";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

const headings = ["Previous Diagnosis", "DermAI Diagnosis"];
  const emptyDescriptions = [
    `A comprehensive history of your past medical diagnoses.`,
    `A record of your past experiences with our platform's quick and precise AI-powered diagnosis.`,
  ];



function DiagnosisHistory({_userID,_selectedRole}) {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [walletAddress,setWalletAddress] = useState('');
  const [CID,setCID] = useState('');

  const getVehicleURL = async () =>{
    
    const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
    const [cid, fileName] = CID.split(';');

    const URL = `${baseWeb3StorageUrl}${cid}/${fileName}`; 
    return URL;

  }


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
        const result = await contract.methods.getPatientDetails(_userID).call();
        setCID(result[4]); 


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


  return (
    <div>
      {/* <h1>User ID: {_userID}</h1>
      <br></br>
      <h1>Selected Role: {_selectedRole}</h1> */}
      <button
  onClick={(event) => {
    event.preventDefault();
    getVehicleURL()
      .then((vehicleURL) => {
        window.open(vehicleURL, "_blank");
      })
      .catch((error) => {
        console.error("Error retrieving vehicle URL:", error);
      });
  }} style={{cursor:'pointer',transform:'scale(1.5)',backgroundColor:'transparent',border:'none',fontWeight:'700',color:'white'}}>
  OPEN<IoOpenOutline style={{marginTop:'-0.5vh',marginLeft:'0.5vw',fontWeight:'700'}}/>
</button>
    </div>
  );
}

function DermAIDiagnosis({_userID,_selectedRole}){

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [walletAddress,setWalletAddress] = useState('');
  const [CID,setCID] = useState('');
  const [diagHist,setDiagHist] = useState([]);
  const [showMsg,setShowMsg] = useState(false);
  const [diagnosisDetails, setDiagnosisDetails] = useState([]);
  const [isLoading,setIsLoading] = useState(false);


  const getVehicleURL = async () =>{
    
    const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
    const [cid, fileName] = CID.split(';');

    const URL = `${baseWeb3StorageUrl}${cid}/${fileName}`; 
    return URL;

  }


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
        setIsLoading(true);
        const result = await contract.methods.getPatientDetails(_userID).call();
        setDiagHist(result[5]);
      
        if(result[5].length>0){
          let details = [];
          let temp = result[5]
          for (let index = 0; index < result[5].length; index++) {
            const result = await contract.methods.getDiagnosisDetails(temp[index]).call();
            details.push(result); 
          }
          console.log(details);
          setDiagnosisDetails(details);
          setTimeout(() => {
            setIsLoading(false);
            console.log(details);            
          }, 1000);
          
        }
        else{
          setShowMsg(true);
          setIsLoading(false);
        }
        //setIsLoading(false);


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


  return (
    <div>
      {/* <h1>User ID: {_userID}</h1>
      <br></br>
      <h1>Selected Role: {_selectedRole}</h1> */}
      {/* <button
  onClick={(event) => {
    event.preventDefault();
    getVehicleURL()
      .then((vehicleURL) => {
        window.open(vehicleURL, "_blank");
      })
      .catch((error) => {
        console.error("Error retrieving vehicle URL:", error);
      });
  }} style={{cursor:'pointer',transform:'scale(1.5)',backgroundColor:'transparent',border:'none',fontWeight:'700',color:'white'}}>
  OPEN<IoOpenOutline style={{marginTop:'-0.5vh',marginLeft:'0.5vw',fontWeight:'700'}}/>
</button> */}

{/* return (
            diag.diagnosisID,
            diag.timestamp,
            diag.inputDiagnosisImage,
            diag.inputSymptoms,
            diag.diagnosis
        ); */}

      {!isLoading && !showMsg && (
      <div className='scrollla' >
        <table style={{zIndex:'6'}}>
        <thead>
          <tr style={{ backgroundColor: '#0076BE', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Diagnosis ID:</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>On:</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {diagnosisDetails.map((details, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #0076BE' }}>
              <td style={{ padding: '10px' }}>diag_{parseInt(details[0]).toString()}@dermAI</td>
              <td style={{ padding: '10px' }}>{details[1]}</td>
              <td style={{ padding: '10px' }}>
                <button
                  style={{
                    backgroundColor: '#0076BE',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      
    
    )}
      {isLoading && (<div className="loading-spinner" style={{marginTop:"-40vh"}}>
      <div className="spinner"></div>
    </div>)}

      {showMsg && (<div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              textAlign: "center",
              fontSize: "larger",
            }}
          >
            Click on the Test button to get your first Diagnosis!
          </div>)}
    </div>
  );

}

function PatientDashboard() {
  
  

  const location = useLocation();
  const { userID, selectedRole } = location.state ? location.state : {};

  const components = [<DiagnosisHistory _userID={userID} _selectedRole={selectedRole} />, <DermAIDiagnosis _userID={userID} _selectedRole={selectedRole} />];

  return (
    <div className="backgnd">
      {headings.map((heading, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center horizontally

            width: "45%",
            height: "80%",
            borderRadius: "10px",
            marginTop: "-9vh",
            marginLeft: index === 1 ? "1vw" : "-0.5vw",
            border: "solid 1px white",
            // Apply a transparent border for glassmorphism effect
            backdropFilter: "blur(10px)", // Apply a blur filter for glassmorphism effect
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Apply a transparent background color for glassmorphism effect
            padding: "16px", // Add some padding to see the effect clearly
          }}
        >
          <div
            style={{
              zIndex: 6,
              borderRadius: "10px",
              width: "45%",
              marginTop: "-4vh",
              backgroundColor: "#1A5CA0",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontWeight: "700",
                paddingTop: "1vh",
              }}
            >
              {heading}
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              // marginTop:index==1?"0vh":'0',
              justifyContent: index==0?"center":'normal',
              textAlign: "center",
              fontSize: "larger",
            }}
          >
            {emptyDescriptions[index]}
          </div>
          {components[index]}
        </div>
      ))}
    </div>
  );
}

export default PatientDashboard;
