import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to store authentication status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = async (username, password) => {
    try {
      // Make API call to authenticate user
      const response = await axios.post("http://localhost:8080/api/auth/login", { username, password });
      setUser(response.data);
      setIsLoggedIn(true);
      return true; // Return true for successful login
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggedIn(false);
      return false; // Return false for failed login
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the authentication context
export const useAuth = () => useContext(AuthContext);
