/* eslint-disable no-unused-vars */
import React from 'react';
import { useState,useEffect } from 'react';
import "../stylesheets/Signup.css";
import ig from "../assets/Login/logimg.png";
import { Outlet, useOutlet } from 'react-router-dom';

const SignUp = () => {
  const outletData = useOutlet();

  

  const handleOutletData = () => {
    console.log(outletData); // Remove the curly braces around outletData
  };

  return (
    <>
      <section className='secmain'>
        <div className="outer">
          <div className="formsection">
            <center style={{marginTop:"-3vh"}}>
              <span>SIGNUP</span>
            </center>
            <center style={{display:'flex',flexDirection:'row',marginTop:"-1vh"}}>
                  <p>Already a member?</p><a href="/login" style={{fontSize:'2.5vh',color:'#0E21A0',marginLeft:'0.5vw',fontWeight:'700'}}>LOGIN</a>
                </center>
            <Outlet/> {/* Render role-specific form content here */}
          </div>
          <div className="imagecontent">
            <img src={ig} alt="" />
          </div>
        </div>
        
      </section>
    </>
  );
};

export default SignUp;
