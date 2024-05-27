import React, { useState } from 'react';
import axios from 'axios';
import { getCurrentUserName } from '../../helpers/user';
import Layout from '../Layout/index';
import './ChangePassword.css';

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const username = getCurrentUserName();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password must match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/change-password', {
        username: username,
        currentPassword: currentPassword,
        newPassword: newPassword
      });
      console.log('Password change successful:', response.data);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrorMessage('');
    } catch (error) {
      console.error('Password change error:', error);
      setErrorMessage(error.response.data.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <Layout>
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input type={showPassword ? "text" : "password"} name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="password-input" placeholder="Current Password" required />
        <input type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange} className="password-input" placeholder="New Password" required />
        <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="password-input" placeholder="Confirm New Password" required />
        <button type="button" className="password-button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"} Password</button><br/>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="password-button">Change Password</button>
      </form>
    </div>
    </Layout>
  );
}

export default ChangePassword;
