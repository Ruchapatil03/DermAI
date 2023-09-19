import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CommonForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailID: '',
    city: '',
    state: '',
    role: '',
  });

  const navigate = useNavigate();

  

  const handleSubmit = () => {
    // You can access the entire formData object here and submit it as needed.
    
    

    if (formData.role === 'Patient') {
      console.log('Navigating to Patient Form');
      navigate('/signup/patient',{ state: { formData } });
    } else if (formData.role === 'Healthcare Professional') {
      console.log('Navigating to Healthcare Professional Form');
      navigate('/signup/healthcare-professional',{ state: { formData } });
    }

    

  };

  return (
    <>
      <form className="form">
        <div>
          <label>Full Name:</label>
          <br />
          <input
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <br />
          <input
            name="contactNumber"
            type="text"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          />
        </div>
        <div>
          <label>Email ID:</label>
          <br />
          <input
            name="emailID"
            type="text"
            value={formData.emailID}
            onChange={(e) => setFormData({ ...formData, emailID: e.target.value })}
          />
        </div>
        <div>
          <label>City:</label>
          <br />
          <input
            name="city"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div>
          <label>State:</label>
          <br />
          <input
            name="state"
            type="text"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>
        <div>
          <label>Account type:</label>
          <br />
          <select
            name="role"
            id="account-type"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="Select">Select</option>
            <option value="Patient">Patient</option>
            <option value="Healthcare Professional">Healthcare Professional</option>
          </select>
        </div>
        <center>
          <button style={{ marginTop: '0.5vh' }} onClick={handleSubmit}>
            NEXT
          </button>
        </center>

        {/* Pass the setDataToParent function and formData to the nested component */}
        
      </form>
    </>
  );
}

export default CommonForm;
