import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
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
      const response = await axios.post("http://localhost:8080/api/users/login", { username, password });
      // console.log('Login successful:', response.data);

      // Save user data to localStorage
      localStorage.setItem('currentUser', JSON.stringify(response.data));

      console.log('currentUser in localStorage:', localStorage.getItem('currentUser'));

      // Redirect to dashboard
      navigate("/dashboard");
      navigate("/products");
      
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password. Please try again.');
      } else {
        setErrorMessage('An error occurred during login. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <br />
  
      <p>
        <Link to="/register">Register New Vendor</Link>
      </p>

      <p>
        <Link to="/vendor-login">Vendor User Login</Link> {/* Link to the vendor login page */}
      </p>

    </div>
  );
}

export default Login;



