// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState,useEffect } from 'react';
import "../stylesheets/Dash.css";
import logo from "../assets/Dashboard/logo2.png";
import { RiLogoutCircleRLine } from "react-icons/ri";
import CommonDashboard from '../components/CommonDashboard';
import { Outlet } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai"; //dashboard home
import { CgPill } from "react-icons/cg"; //patient-profile
import { FaUserDoctor } from "react-icons/fa6"; //professional-profile
import { TbReportAnalytics } from "react-icons/tb"; //get-diagnosis
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


// Extract the parent route from the path






const Dash = () => {

    const [activeButton, setActiveButton] = useState(0);
    const nav = useNavigate();
    const { currentPath } = useParams();

    const buttons = [
        { icon: <AiFillHome />, label: 'Home',route:'/'  },
        { icon: <CgPill />, label: 'Profile', route:'profile' },
        { icon: <FaUserDoctor />, label: 'Profile',route:'profile'  },
        { icon: <TbReportAnalytics />, label: 'Test',route:'getdiagnosis' },
      ];
    
      //const match = useMatch(); // This will give you the current matched route

      // Function to navigate to the parent/nested route
      const navigateToParentNestedRoute = (index) => {
        
          nav(`${currentPath}/${buttons[index].route}`);
        
      };



  return (
    <>
    <section className="section1">

        <div className="mainprofile">
            <div className="heading">
                <img src={logo} alt="LOGO" />
                <div className="logout">
                    <button className='button'>
                        Logout
                    </button>
                    <RiLogoutCircleRLine className="logoutlogo"/>        
                </div>    
            </div>

            <div className="title">
            <h2>Welcome to your Personalised Dashboard!</h2>
            </div>
            <Outlet/>
            

            <div className="bottomdiv">
  {buttons.map((button, index) => (
    // Use conditional rendering to hide the button based on the current path
    (index === 1 && currentPath === 'professional') ||
    (index === 2 && currentPath === 'patient') ? null : (
      <div
        key={index}
        className={`button-container ${
          activeButton === button.label ? 'active' : ''
        }`}
       
        onClick={() => {
          setActiveButton(index);
          navigateToParentNestedRoute(index);
        }}
      >
        <button
          style={{ marginTop: activeButton === index ? '-3vh' : '0',backgroundColor:index==activeButton?"white":'transparent' }}
          
        >
          {button.icon}
        </button>
        {activeButton === index && (
          <span className="label" style={{ fontWeight: '700', color: 'white', fontSize: 'small' }}>
            {button.label}
          </span>
        )}
      </div>
    )
  ))}
</div>

        </div>
    </section>
    </>
  );
}

export default Dash