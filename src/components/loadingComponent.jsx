import React from 'react';
import '../stylesheets/LoadingComponent.css'; // Import your CSS file for styling

function LoadingComponent() {
  return (

    <div className="loading-spinner-container-unmani">
      <div className="loading-spinner-unmani"></div>
      <p style={{fontWeight:'700',fontSize:'x-large',color:'white',textAlign:'center',marginTop:'3vh'}}>Awaiting MetaMask Connection</p>
    </div>
  );
}

export default LoadingComponent;
