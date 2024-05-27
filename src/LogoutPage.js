// LogoutPage.js

import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }, []);

  return (
    <div>
      <p>Logging out...</p>
      {/* You can optionally display a message or spinner here */}
    </div>
  );
};

export default LogoutPage;
