import React from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function VendorUserActivationButton({ userId }) {
  // Function to handle activation
  const handleActivate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/vendor-users/${userId}/activate`);
      console.log('Vendor user activated:', response.data);
      // Optionally, you can display a success message or update the UI
    } catch (error) {
      console.error('Error activating vendor user:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <button onClick={handleActivate}>Activate</button>
  );
}

export default VendorUserActivationButton;
