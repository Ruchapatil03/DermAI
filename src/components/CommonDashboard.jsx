import "../stylesheets/Dash.css";
import React, {useState,useEffect} from "react";
import Web3 from 'web3';
import DermAIABI from '../ABI/RevisedABI.json';
import { Web3Storage } from 'web3.storage';
const contractAddress = '0x6E6FD340FD7BE37e06888824f9F13CC010A93D12';
import { useLocation } from "react-router-dom";
import { set } from "lodash";

function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTUxMjAxNDc5MjEsIm5hbWUiOiJ1c2VyUHJvZmlsZVNJSCJ9.vVWHthR6rySB1W48_oO_vjHBF36_3Pm9ljHRIpZviDE";
  }
  
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

function CommonDashboard() {
    

    const location = useLocation();
    const { userID, selectedRole } = location.state?location.state:null;

    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [fullName, setFullName] = useState('');
  const [emailID, setEmailID] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [counter,setCounter] = useState(-1);
  const [isLoading,setIsLoading] = useState(false)

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
              console.log(userID,selectedRole);
    
              // Get the contract instance
              const contract = new web3.eth.Contract(DermAIABI, contractAddress);
              setContract(contract);
              let result;
                setIsLoading(true);
              if(selectedRole=='patient'){result = await contract.methods.getPatientDetails(userID).call(); await retrieveJSONFile(result[3]);}
              else if(selectedRole=='professional'){result = await contract.methods.getProfessionalDetails(userID).call();await retrieveJSONFile(result[3]);}
              setCounter(result[5]);

              async function retrieveJSONFile(cid) {
                const client = makeStorageClient();
                const res = await client.get(cid);
                console.log(`Got a response! [${res.status}] ${res.statusText}`);
                if (!res.ok) {
                  throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
                }
                const files = await res.files()
        for (const file of files) {
            if ((selectedRole=='patient'&&file.name === 'PatientInformation.json')||(selectedRole=='professional'&&file.name === 'healthcareProfessionalInformation.json')) { // Assuming the JSON file has a specific name
                const jsonContent = await file.text(); // Read the JSON file content as text
                const jsonObject = JSON.parse(jsonContent); // Parse the JSON content
                setFullName(jsonObject.fullName);
                setEmailID(jsonObject.emailID);
                setContactNumber(jsonObject.contactNumber);
                setState(jsonObject.state);
                setCity(jsonObject.city);
                setDateOfJoining(jsonObject.dateOfJoining);
                setIsLoading(false);
            }
        }
              
                
              }
              

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

return(

<div className="backgnd">
{!isLoading && (<div className="prof">
    <div className="profphoto">
        {/* <img src={logo} alt="" /> */}
    </div>
    <div className="profinfo">
        <h2>{fullName}</h2>
        <p> <b>Email:</b>{emailID}</p>
        <h5> <b>Contact:</b>{contactNumber}</h5>
        <h5> <b>City:</b>{city}</h5>
        <h5> <b>State:</b>{state}</h5>
        <center>
            <button className='infoupdate'>
                Add/Update PFP
            </button>
        </center>
    </div>
</div>)}

{!isLoading && (<div className="detaildisp">
    <div className="disp1">
        <h2>Account Details: </h2>
        <h5><b>Metamask ID:</b> {accounts[0]}</h5>
        <h5><b>DermAI User ID:</b> {selectedRole=='patient'?'pat':'prof'}{userID ? userID : 'Not available'}_@dermAI</h5>
        <h5><b>Member Since:</b>{dateOfJoining}</h5>
        <h5><b>Reward Points:</b> To Be Specified..</h5>
    </div>
    <div className="disp2">
        <h2>Platform Details: </h2>
        <h5><b>Role:</b> {selectedRole=='patient'?'Medical Consultee':'Healthcare Professional'}</h5>
        <h5><b>{selectedRole=='patient'?'Diagnoses Count':'Patients Under Consultancy'}:</b>{counter}</h5>
    </div>
</div>)}

{isLoading && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}


</div>)
    
}

export default CommonDashboard;