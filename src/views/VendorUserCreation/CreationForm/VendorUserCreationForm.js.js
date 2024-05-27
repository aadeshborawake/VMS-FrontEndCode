import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../Layout/index';
import { useNavigate } from 'react-router-dom';
import './VendorUserCreationForm.css';

function VendorUserCreationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/vendor-users/create', {
        username,
        password,
        role: 'coordinator', // Hardcoded role as coordinator
        vendorName,
        active: isActive ? 1 : 0, // Convert boolean to integer
      });
      console.log('User created:', response.data);
      setUsername('');
      setPassword('');
      setVendorName('');
      setIsActive(true); // Reset the checkbox to its default state
      navigate("/dashboard");
    } catch (error) {
      console.error('Error creating user:', error);
    }
};



  return (
  <Layout>
    <div>
      <h2>Create Coordinator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Vendor Name:</label>
          <input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active
          </label>
        </div>
        <button type="submit">Create Coordinator</button>
      </form>
    </div>
    </Layout>
  );
}

export default VendorUserCreationForm;
