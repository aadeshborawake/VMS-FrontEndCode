// ParentComponent.js
import React from 'react';
import Dashboard from './Dashboard';

function ParentComponent() {

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout logic executed');
  };

  return <Dashboard onLogout={handleLogout} />;
}

export default ParentComponent;
