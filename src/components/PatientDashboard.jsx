import React, {useState,useEffect} from "react";
import "../stylesheets/Dash.css";

import Upload from "../pages/Upload";

function PatientDashboard() {

    const headings = ["Previous Diagnosis","DermAI Diagonosis"];
    const emptyDescriptions = [`A comprehensive history of your past medical diagnoses.`,`A record of your past experiences with our platform's quick and precise AI-powered diagnosis. Click on the Test button to get your first Diagnosis!`]

    return(
        <div className="backgnd">
  {headings.map((heading, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        
        width: '45%',
        height: '80%',
        borderRadius: '10px',
        marginTop: '-9vh',
        marginLeft: index === 1 ? '1vw' : '-0.5vw',
        border:'solid 1px white',
        // Apply a transparent border for glassmorphism effect
        backdropFilter: 'blur(10px)', // Apply a blur filter for glassmorphism effect
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Apply a transparent background color for glassmorphism effect
        padding: '16px', // Add some padding to see the effect clearly
      }}
    >
      <div style={{ zIndex: 6,borderRadius:'10px',width: '45%',marginTop:'-4vh',backgroundColor:'#1A5CA0',color:'white',boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  }}>
        <h4 style={{ textAlign: 'center', fontWeight: '700', paddingTop: '1vh' }}>
          {heading}
        </h4>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1,justifyContent:'center',textAlign:'center',fontSize:'larger'}}>
        {emptyDescriptions[index]}
      </div>
    </div>
  ))}

</div>

      )
    
}

export default PatientDashboard;