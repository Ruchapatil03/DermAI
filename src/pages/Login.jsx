// eslint-disable-next-line no-unused-vars
import React from 'react';
import "../stylesheets/Login.css";
import ig from "../assets/Login/logimg.png";

const Login = () => {
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
                        <input name="PFP/Metamask ID" type="text" />
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