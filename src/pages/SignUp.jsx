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
            <center>
              <span>SIGNUP</span>
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
