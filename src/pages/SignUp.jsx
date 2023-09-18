// eslint-disable-next-line no-unused-vars
import React from 'react';
import "../stylesheets/Signup.css";
import ig from "../assets/Login/logimg.png";

const SignUp = () => {
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
                        <input name="Full Name" type="text" />
                    </div>
                    <div>
                        <label>Contact Number:</label>
                        <br />
                        <input name="Contact Number" type="text" />
                    </div>
                    <div>
                        <label>Email ID:</label>
                        <br />
                        <input name="Email-ID" type="text" />
                    </div>
                    <div>
                        <label>City:</label>
                        <br />
                        <input name="City" type="text" />
                    </div>
                    <div>
                        <label>State:</label>
                        <br />
                        <input name="State" type="text" />
                    </div>
                    <div>
                        <label>Account type:</label>
                        <br />
                        <select name="Account type" id="">
                            <option value="Patient">Patient</option>
                            <option value="Healthcare Professional">Healthcare Professional</option>
                        </select>
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

export default SignUp