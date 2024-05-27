import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VendorUserLogin() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const navigate = useNavigate();

 const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/vendor-users/vendorlogin", {
        username,
        password,
      });

      localStorage.setItem('currentUser', JSON.stringify(response.data));
      navigate("/vendor-dashboard");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Assuming a 404 status code is returned when the user is not found or deactivated
        setErrorMessage('User not found or account is deactivated. Please try again.');
        
      } else {
        setErrorMessage('User Deactivated');
      }
    }
    // navigate("/");
};

 return (
    <div className="login-container">
      <h2>Vendor User Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
 );
}

export default VendorUserLogin;
