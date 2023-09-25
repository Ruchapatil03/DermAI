import Dropzone from "react-dropzone";
import "../stylesheets/Dash.css";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Web3Storage } from 'web3.storage';
import DermAIABI from "../ABI/RevisedABI.json"
import Web3 from 'web3';
import { Form, useLocation } from "react-router-dom";
import axios from "axios";

const contractAddress = '0x002117753C9b143699e6094a5553DD9403087bC8';

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTUxMjAxNDc5MjEsIm5hbWUiOiJ1c2VyUHJvZmlsZVNJSCJ9.vVWHthR6rySB1W48_oO_vjHBF36_3Pm9ljHRIpZviDE";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}


function GetDiagnosis() {

  const location = useLocation();
  const [filename, setfilename] = useState(null)
  const file = useRef(null)


  const [web3, setWeb3] = useState(null);
  const [diag, setDiag] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [symptomsImageURL, setSymptomsImageURL] = useState('');

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


  const { userID, selectedRole } = location.state ? location.state : null;


  const getCurrentTimestamp = () => {
    const currentDate = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return currentDate.toLocaleString('en-US', options);
  };


  const handleSubmit = async () => {
    if (file.current) {
      const cloud = new FormData()
      cloud.append("file", file.current)
      cloud.append("upload_preset", "dermai")
      cloud.append("cloud_name", "dl0vgqzdf")

      const response1 = await fetch(
        "https://api.cloudinary.com/v1_1/dl0vgqzdf/image/upload",
        {
          method: "POST",
          body: cloud,
        }
      )

      const client = makeStorageClient();

      const data1 = await response1.json()
      setSymptomsImageURL(data1.url) // url of the image stored in cloudinary

      try {
        const form = new FormData()
        form.append("file", file.current)
        const response = await axios.post("http://localhost:5000/predict", form)
          .then((res) => {
            setDiag(res.data.class)
          })
      }
      catch (err) {
        console.log(err)
      }

      try {
        const blob = new Blob([JSON.stringify(symptomsImageURL)], {
          type: 'application/json',
        });
        const files_ = [new File([blob], 'SymptomsImageURL.json')];
        const cid_ = await client.put(files_);
        const currentTimestamp = getCurrentTimestamp();
        const input_symptoms = symptoms;
        const diagnosis = "Some Skin Disease";
        const txObject = {
          from: accounts[0],
          to: contractAddress,
          data: contract.methods.createDiagnosis(currentTimestamp, cid_, input_symptoms, diagnosis, userID).encodeABI(),
          gas: 2000000, // Specify your desired gas limit
        };
        const txHash = await web3.eth.sendTransaction(txObject);
        console.log(txHash);
        alert('Diagnosis Successfully Authenticated!');

      } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
      }
    }


  }

  const retrieveImage = async (_diagnosisID) => {

    const client = makeStorageClient();
    const diagnosis = await contract.methods.getDiagnosisDetails(_diagnosisID).call();
    const diagCID = diagnosis[2];
    const res = await client.get(diagCID);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
    }
    const files = await res.files()
    for (const file of files) {
      if (file.name === 'SymptomsImageURL.json') { // Assuming the JSON file has a specific name
        const jsonContent = await file.text(); // Read the JSON file content as text
        const jsonObject = JSON.parse(jsonContent); // Parse the JSON content
        console.log(jsonObject);
      }
    }
  }

  const handlefiles = async (param) => {
    if (param[0]) {
      const type = param[0].type
      const splitted = type.split("/")

      let temp1 = "jpeg"
      let temp2 = "png"

      if (splitted[1] === temp1 || splitted[1] === temp2) {
        file.current = param[0]
        setfilename(file.current.name)
        // setError(null)
      } else {
        // setError("Please upload supported files only")
        setfilename(null)
        file.current = null
      }
    } else {
      // setError("Please upload single file only")
      setfilename(null)
      file.current = null
    }

    // setTimeout(() => {
    //   setError(null)
    // }, 4000)
  }

  const [symptoms, setSymptoms] = useState('');

  return (<div className="backgnd">
    <div className="prof" style={{ display: 'flex', flexDirection: 'column' }}>

      <Dropzone
        className='dropzone'
        onDrop={(acceptedFiles) => handlefiles(acceptedFiles)}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* <img src={imguploadsvg} alt="Image upload svg" /> */}
                <p style={{ textAlign: 'center' }}>
                  Drag and drop your image here, or click to select a
                  file
                </p>
                <p style={{ textAlign: 'center' }}>
                  Accepts JPEG and PNG formats, limited to one image at
                  a time.
                </p>
                <AiOutlineCloudUpload
                  style={{
                    transform: 'scale(3)',
                    marginTop: '3vh',
                    cursor: 'pointer',
                    alignSelf: 'center',
                  }}
                />
              </div>
            </div>



          </section>
        )}
      </Dropzone>

    </div>

    <div className="detaildisp">
      <div className="disp1">
        <label htmlFor="symptomsInput" style={{ fontWeight: '700', fontSize: 'large' }}>Enter your symptoms:</label>
        <input
          type="text"
          id="symptomsInput"
          name="symptomsInput"
          placeholder="Describe your symptoms..."
          onChange={(e) => { setSymptoms(e.target.value) }}
          style={{
            width: '98%',
            padding: '10px',
            wordWrap: 'break-word',
            height: '70%',
            marginTop: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: 'medium',
          }}
        />
      </div>

      <div className="disp2" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        {!diag ? (<div>
          <p style={{ fontWeight: '700', textAlign: 'center', fontSize: 'large' }}>Discover your path to better health. Take the first step with DermAI's precise and empowering diagnosis platform.</p>
          <button
            style={{
              width: '12vw',
              height: '7vh',
              backgroundColor: '#068FFF',
              color: 'aliceblue',
              border: 'none',
              outline: 'none',
              borderRadius: '2vh',
              fontWeight: '700',
              fontSize: 'large',

              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer', // Optional: Add pointer cursor for better UX
            }}

            onClick={handleSubmit}
          >
            View Results✨
          </button>
        </div>)
        : (
          diag
        )}
        {/* <button
          style={{
            width: '12vw',
            height: '7vh',
            backgroundColor: '#068FFF',
            color: 'aliceblue',
            border: 'none',
            outline: 'none',
            borderRadius: '2vh',
            fontWeight: '700',
            fontSize: 'large',

            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer', // Optional: Add pointer cursor for better UX
          }}

          onClick={()=>{retrieveImage(1);}}
        >
          Retrieve Result
        </button> */}
      </div>

    </div>
  </div>)

}

export default GetDiagnosis;