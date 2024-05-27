import React from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function VendorUserDeactivationButton({ userId }) {
  // Function to handle deactivation
  const handleDeactivate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/vendor-users/${userId}/deactivate`);
      console.log('Vendor user deactivated:', response.data);
      // Optionally, you can display a success message or update the UI
    } catch (error) {
      console.error('Error deactivating vendor user:', error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <button onClick={handleDeactivate}>Deactivate</button>
  );
}

export default VendorUserDeactivationButton;