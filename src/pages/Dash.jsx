// eslint-disable-next-line no-unused-vars
import React from 'react';
import "../stylesheets/Dash.css";
import logo from "../assets/Dashboard/logo2.png";
import { RiLogoutCircleRLine } from "react-icons/ri";


const Dash = () => {
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
                    <RiLogoutCircleRLine style={{color: 'white', fontSize: '2.5vh', transform: 'scale(1.5)',marginRight:'4vw',marginLeft:'-0.9vw',marginBottom:'2vh'}}/>        
                </div>    
            </div>

            <div className="title">
            <h2>Welcome to your Personalised Dashboard!</h2>
            </div>
            
            <div className="backgnd">
                <div className="prof">
                    <div className="profphoto">
                        <img src={logo} alt="" />
                    </div>
                    <div className="profinfo">
                        <h2>Rucha Patil</h2>
                        <h5> <b>Email:</b>  ertyuioptyui@gmail.com</h5>
                        <h5> <b>Contact:</b>  +9134567899</h5>
                        <h5> <b>City:</b>  Mumbai</h5>
                        <h5> <b>State:</b>  Maharashtra</h5>
                        <center>
                            <button className='infoupdate'>
                                Update Personal Info
                            </button>
                        </center>
                    </div>
                </div>
                <div className="detaildisp">
                    <div className="disp1">
                        <h2>Account Details: </h2>
                        <h5>Metamask ID: 1234567890000</h5>
                        <h5>User ID: 345678</h5>
                        <h5>Member since: 13th Oct 2023</h5>
                        <h5>Reward points: 5x</h5>
                    </div>
                    <div className="disp2">
                        <h2>Account Details: </h2>
                        <h5>Metamask ID: 1234567890000</h5>
                        <h5>User ID: 345678</h5>
                        <h5>Member since: 13th Oct 2023</h5>
                        <h5>Reward points: 5x</h5>
                    </div>
                </div>
            </div>

            <div className="bottomdiv">
                
            </div>
        </div>
    </section>
    </>
  );
}

export default Dash