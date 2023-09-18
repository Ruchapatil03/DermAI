import React, {useState,useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi";
import { AiFillHome,AiFillMedicineBox } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { MdDocumentScanner } from "react-icons/md";
import { Tooltip,Overlay } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import logo from "../assets/Dashboard/logo2.png";

function Dashboard() {

    const [activeIndex,setActiveIndex] = useState(-1);

    

    const bottomNavigationButtons = ["Home","Professional Profile","Patient Profile","Request Diagnosis"];
    const bottomIcons = [<AiFillHome/>,<AiFillMedicineBox/>,<FaUserDoctor/>,<MdDocumentScanner/>]
  return (
    <Container
      fluid
      style={{
        marginLeft: '1vw',
        marginTop: '1vh',
        height: '94vh',
        width: '97.5vw',
        borderRadius: '10px',
        backgroundColor: '#c3e9fb',
        display: 'flex',
        flexDirection: 'column', // Use column layout
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Add shadow
        background: 'linear-gradient(145deg, #90e0ef, #0076BE)', // Add gradient
        border: '1px solid #ccc',
        overflowY:'hidden'
      }}
    >
      <Row
        style={{
          
        //   padding: '1rem',
          backgroundColor: 'transparent', // Top section background color
          height: '10%', // Set the height of the top section
        }}
      >
        <Col md={4} xs={12} sm={6}  >
          <img src={logo} alt="" style={{
            height:'9vh',width:'12vw',marginTop:'1.5vh',marginLeft:'1.3vw',borderRadius:'2vh'
          }}/>
        </Col>
        <Col
  md={6}
  style={{
    color: 'white',
    textAlign: 'right',
    paddingRight: '3vw',
    marginTop: '3vh',
    display: 'flex',
    justifyContent: 'flex-end', // Align everything to the right
    alignItems: 'center',
  }}
>
  <button
    style={{
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <h4 style={{ fontWeight: '700', marginTop: '-2vh',color:'white' }}>Logout<RiLogoutCircleRLine style={{ paddingLeft: '0.5vw', transform: 'scale(1.5)',marginTop:'-0.5vh' }} /></h4>
    
  </button>
</Col>


      </Row>
      <Row style={{
        //   flex: 1, // Grow to fill remaining space
        //   overflow: 'auto', // Add scroll if needed
        //   padding: '1rem',
          backgroundColor: 'transparent', // Middle section background color
          height: '10%', // Set the height of the middle section
        }}>
            <Col md={12}><h2 style={{textAlign:'center',fontWeight:'700'}}>Welcome to your Personalised Dashboard!</h2></Col>
        </Row>
        <Outlet/>
        <Row style={{
        //   flex: 1, // Grow to fill remaining space
        //   overflow: 'auto', // Add scroll if needed
        //   padding: '1rem',
          backgroundColor: 'transparent', // Middle section background color
          height: '65%', // Set the height of the middle section
        }}>
  <Col md={6} style={{height:'100%',marginLeft:'-1vw' }}>
  <Container style={{ width: '100%', height: '100%' }}>
      <Row
        style={{
          justifyContent: 'center', // Center content horizontally
          height: '100vh',
          
        }}
      >
        {/* User information */}
        <Col md={12}>
          <div
            style={{
              backgroundColor: ' rgba(255, 255, 255, 0.9) ', // Background color for user information
              padding: '20px',
              marginTop:'7vh',
              
              borderRadius: '10px',
              width: '99%',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Box shadow
              display: 'flex',
              flexDirection:'row',
              marginLeft:'1vw'
              
              
            }}
          >
            {/* Circular profile picture */}
            <div
              style={{
                width: '30vh',
                height: '30vh',
                borderRadius: '50%',
                border:'solid 1px black',
                backgroundColor: '#f7f7f7', // Background color for the profile picture
                display: 'flex',
                justifyContent: 'center', // Center content horizontally
                marginRight:'-2vw',
                marginTop:'3vh'
              }}
            >
              {/* You can add an image or an icon for the profile picture */}
              <img
                src="profile-image.jpg" // Replace with your image URL
                alt="Profile"
                
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Ensure the image covers the entire circle
                  borderRadius: '50%',
                }}
              />
            </div>
            <div style={{marginLeft:'3vw',width:'27vw'}}>
            <h2 style={{fontWeight:'700',padding:'0.5vw'}}>Unmani Shinde</h2>
            <h5 style={{paddingLeft:'0.5vw',wordBreak:'break-all'}} ><b>EMail-ID:</b><u>usShinde_b21@el.vjti.ac.in</u></h5>
            <h5 style={{paddingLeft:'0.5vw'}} ><b>Contact Number: </b>+9167792964</h5>
            <h5 style={{paddingLeft:'0.5vw'}} ><b>City: </b>Mumbai</h5>
            <h5 style={{paddingLeft:'0.5vw'}} ><b>State: </b>Maharashtra</h5>
            <Container>
            <button
                
                style={{
                  alignSelf: 'flex-end',
                  marginTop: '1vh',
                  backgroundColor: '#007bff', // button background color
                  color: '#fff', // Text color
                  border: 'none', // Remove border
                  fontWeight: 'bold', // Text boldness
                  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', // Button shadow
                  height:'5vh',
                  width:'14vw',
                  borderRadius:'2vh',
                  marginLeft:'1vw',
                  marginBottom:'0.7vh'
                }}
              >
                Update Personal Info
              </button>
            </Container>
            
            </div>
          </div>
          
        </Col>
      </Row>
    </Container>
  
  </Col>
  <Col md={6} style={{height:'100%'}}>
    <Container style={{width:'100%',height:'100%'}}>
        <Row style={{height:'48%',marginTop:'-1vh'}}>
        <Col
  md={12}
  style={{
    height: '100%',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
    backdropFilter: 'blur(0px)', // Apply blur effect
    border: '1px solid rgba(255, 255, 255, 0.3)', // Semi-transparent white border
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Box shadow
  }}
>
    {/* //EEEEEE */}
    <h2 style={{fontWeight:'400',color:'black',padding:'0.5vw',marginBottom:'-2vh'}}>Account Details</h2>
    <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh',marginTop:'3vh'}} >Metamask Wallet Address: 0xAbCdEfGh123456...</h5>
      <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh'}} >DermAI UserID: pat_01@dermAI</h5>
      <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh'}} >Community Member Since: 18th September,2023</h5>
      <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh'}} >Reward Points: X2</h5>

</Col>


        </Row>
        <Row style={{height:'48%',marginTop:'2%'}}>
        <Col
  md={12}
  style={{
    height: '100%',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
    backdropFilter: 'blur(0px)', // Apply blur effect
    border: '1px solid rgba(255, 255, 255, 0.3)', // Semi-transparent white border
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Box shadow
  }}
>
<h2 style={{fontWeight:'400',color:'black',padding:'0.5vw',marginBottom:'-2vh'}}>Account Details</h2>
    <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh',marginTop:'3vh'}} >Metamask Wallet Address: 0xAbCdEfGh123456...</h5>
            <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh'}} >DermAI UserID: pat_01@dermAI</h5>
            <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh'}} >Community Member Since: 18th September,2023</h5>
            <h5 style={{paddingLeft:'0.5vw',color:'black',marginBottom:'1vh'}} >Reward Points: X2</h5>
</Col>
        </Row>
    </Container>
   
  </Col>
</Row>



        

        


      
      <Row
        style={{
        //   padding: '1rem',
          backgroundColor: 'transparent', // Bottom section background color
          height: '15%', // Set the height of the bottom section
        }}
      >
        <Col md={3}></Col>
        <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
  {/* Content in the column */}
  {/* ... */}
  
  {/* Div aligned to the bottom */}
  <div style={{ marginTop: 'auto', justifyContent: 'center', display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#1c3f62', borderRadius: '20px 20px 0px 0px',height:'75%' }}>
    {bottomNavigationButtons.map((btn, index) => (
      <button
        key={index}
        onClick={()=>{setActiveIndex(index)}}
        style={{
            backgroundColor:'#1c3f62',
            //backgroundColor:index==activeIndex?'#1976D2':'transparent', // Blue background color
            color: 'white', // White text color
            border:'none',
            // border: index==activeIndex?'none':'solid 1px white', // Remove the border
            borderRadius: '50%', // Make the button circular
            padding: '10px', // Add padding to the button
            marginRight: '7vh', // Add margin between buttons
            cursor: 'pointer', // Show pointer cursor on hover
            display: 'flex',
            alignItems: 'center',
            marginTop:index==activeIndex?'-2vh':'2vh',
            justifyContent: 'center',
            transform:'scale(1.5)',
            height:'6vh',
            fontSize: '20px', // Adjust the font size for larger icons
          }}
      >
        {bottomIcons[index]}
      </button>
      
    ))}
  </div>
</Col>

        <Col md={3}></Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
