import "../stylesheets/Dash.css";
import React, {useState,useEffect} from "react";

function GetDiagnosis() {

    const [symptoms,setSymptoms] = useState('');

return(<div className="backgnd">
<div className="prof">
  <p style={{ fontSize: '20px', color: '#333',fontWeight:'700',textAlign:'center',marginTop:'-20vh' }}>
    Upload an image file of your symptoms
  </p>
</div>

<div className="detaildisp">
<div className="disp1">
  <label htmlFor="symptomsInput" style={{ fontWeight: '700', fontSize: 'large' }}>Enter your symptoms:</label>
  <input
    type="text"
    id="symptomsInput"
    name="symptomsInput"
    placeholder="Describe your symptoms..."
    onChange={(e)=>{setSymptoms(e.target.value)}}
    style={{
      width: '100%',
      padding: '10px',
      wordWrap:'break-word',
      height:'70%',
      marginTop: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontSize: 'medium',
    }}
  />
</div>

    <div className="disp2" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
  <p style={{ fontWeight: '700', textAlign: 'center', fontSize: 'large' }}>Discover your path to better health. Take the first step with DermAI's precise and empowering diagnosis platform.</p>
  <button
    style={{
      width: '12vw',
      height: '7vh',
      backgroundColor: '#068FFF',
      color: 'aliceblue',
      border: 'none',
      outline: 'none',
      borderRadius: '2vh',
      fontWeight:'700',
      fontSize:'large',
      
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer', // Optional: Add pointer cursor for better UX
    }}
  >
    View Results✨
  </button>
</div>

</div>
</div>)
    
}

export default GetDiagnosis;