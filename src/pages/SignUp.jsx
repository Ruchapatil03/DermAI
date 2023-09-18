// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from 'react';
import "../stylesheets/Signup.css";
import ig from "../assets/Login/logimg.png";
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';

const SignUp = () => {

  const [fullName,setFullName] = useState('');
  const [contactNumber,setContactNumber] = useState('');
  const [emailID,setEmailID] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [role,setRole] = useState('');

  const logStateVariables = () => {
    event.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Contact Number:", contactNumber);
    console.log("Email ID:", emailID);
    console.log("City:", city);
    console.log("State:", state);
    console.log("Role:", role);
  };

  return (
    <>
    <section className='secmain'>
        <div className="outer">
            <div className="formsection">
                <center>
                 <span>SIGNUP</span>
                </center>
                
                <form  className="form">
                    <div>
                        <label>Full Name:</label>
                        <br />
                        <input name="Full Name" type="text" onChange={(e)=>setFullName(e.target.value)} />
                    </div>
                    <div>
                        <label>Contact Number:</label>
                        <br />
                        <input name="Contact Number" type="text" onChange={(e)=>setContactNumber(e.target.value)} />
                    </div>
                    <div>
                        <label>Email ID:</label>
                        <br />
                        <input name="Email-ID" type="text" onChange={(e)=>setEmailID(e.target.value)} />
                    </div>
                    <div>
                        <label>City:</label>
                        <br />
                        <input name="City" type="text" onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                    <div>
                        <label>State:</label>
                        <br />
                        <input name="State" type="text" onChange={(e)=>setState(e.target.value)}/>
                    </div>
                    <div>
                        <label>Account type:</label>
                        <br />
                        <select name="Account type" id="account-type" onChange={(e)=>{setRole(e.target.value)}}>
                            <option value="Patient">Patient</option>
                            <option value="Healthcare Professional">Healthcare Professional</option>
                        </select>
                    </div>
                    <center>
                        <button onClick={logStateVariables} >
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

export default SignUp
