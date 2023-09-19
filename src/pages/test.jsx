import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Test() {
  const [role, setRole] = useState('');
  const nav = useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setRole(value);
  };

  const goToDash = () => {
    if (role === 'Select') {
      alert('Please select a role.');
    } else {
      nav(`/dash/${role}/${role}`);
    }
  };

  return (
    <div>
      <label>Role:</label>
      <select name="role" value={role} onChange={handleInputChange}>
        <option value="Select">Select..</option>
        <option value="patient">Patient</option>
        <option value="professional">Healthcare Professional</option>
      </select>
      <button onClick={goToDash}>GO</button>
    </div>
  );
}

export default Test;
