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
import { useParams,useLocation } from 'react-router-dom';



const Dash = () => {

    const [activeButton, setActiveButton] = useState(0);
    const nav = useNavigate();
    const { currentPath } = useParams();

    const location = useLocation();
    const { userID, selectedRole } = location.state?location.state:null;  

    const buttons = [
        { icon: <AiFillHome />, label: 'Home',route:'/'  },
        { icon: <CgPill />, label: 'Profile', route:'profile' },
        { icon: <FaUserDoctor />, label: 'Profile',route:'profile'  },
        { icon: <TbReportAnalytics />, label: 'Test',route:'getdiagnosis' },
      ];
    
      //const match = useMatch(); // This will give you the current matched route

      // Function to navigate to the parent/nested route
      const navigateToParentNestedRoute = (index) => {
        // console.log(`${currentPath}/${buttons[index].route}`);
          nav(`${currentPath}/${buttons[index].route}`,{ state: { userID, selectedRole } });
        
      };

      const handleLogout = async () => {
        if (window.ethereum && window.ethereum.selectedAddress) {
          try {
            // Step 1: Sign a logout message
            const message = 'Logout from DermAI'; // Replace with your own message
            const signature = await window.ethereum.request({
              method: 'personal_sign',
              params: [message, window.ethereum.selectedAddress],
            });
            // Step 2: Display an alert
            alert('You have been logged out.');
            // Redirect to the home page or login page
            window.location.href = '/'; // Change the URL to your home or login page
          } catch (error) {
            console.error('Error logging out:', error);
          }
        } else {
          // If MetaMask is not available or not connected
          alert('You are logged out.');
        }
      };
    



  return (
    <div className='meow'>
    <section className="section1">

        <div className="mainprofile">
            <div className="heading">
                <img src={logo} alt="LOGO" />
                <div className="logout">
                    <button className='button' onClick={handleLogout}>Logout
                      
                        
                    </button>
                    <RiLogoutCircleRLine className="logoutlogo"/>        
                </div>    
            </div>

            <div className="title">
            <h2>Welcome to your Personalised Dashboard!</h2>
            </div>
            <Outlet/>

            
            

            <div className="bottomdiv" >
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
  style={{
    borderRadius: '50%', // Makes the button circular
    marginTop: activeButton === index ? '-3vh' : '0',
    backgroundColor: index === activeButton ? 'aliceblue' : 'transparent',
    color:index===activeButton?'black':'aliceblue',
    width: '40px', // Set the desired width for the circular button
    height: '40px', // Set the desired height for the circular button
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Center the icon vertically within the circular button
  }}
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
    </div>
  );
}

export default Dash