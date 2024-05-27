import React, { useState, useEffect } from 'react';
import Layout from '../Layout/index';

function VendorProfile() {
  // State to store the vendor data
  const [vendor, setVendor] = useState(null);

  // useEffect hook to fetch vendor data when the component mounts
  useEffect(() => {
    // Function to fetch vendor data
    const fetchVendorData = async () => {
      try {
        // Replace the URL with the actual endpoint to fetch vendor profile by user ID
        const response = await fetch('http://localhost:8080/api/vendors/profile/2');
        if (!response.ok) {
          throw new Error('Failed to fetch vendor profile');
        }
        const data = await response.json();
        setVendor(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchVendorData function when component mounts
    fetchVendorData();

  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Layout>
    <div className="vendor-profile">
      <h2>Vendor Profile</h2>
      {vendor ? (
        <div className="vendor-details">
          <p><strong>Vendor Name:</strong> {vendor.vendorName}</p>
          <p><strong>Contact Person:</strong> {vendor.contactPersonFirstName} {vendor.contactPersonLastName}</p>
          <p><strong>Email:</strong> {vendor.contactPersonEmail}</p>
          <p><strong>Phone:</strong> {vendor.contactPersonNumber}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </Layout>
  );
}

export default VendorProfile;
