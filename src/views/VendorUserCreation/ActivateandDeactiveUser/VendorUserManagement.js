import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VendorUserActivationButton from './VendorUserActivationButton';
import VendorUserDeactivationButton from './VendorUserDeactivationButton';

function VendorUserManagement() {
  const [vendorUsers, setVendorUsers] = useState([]);

  // Function to fetch vendor users from the backend
  useEffect(() => {
    const fetchVendorUsers = async () => {
      try {
        const response = await axios.get('/api/vendor-users');
        setVendorUsers(response.data);
      } catch (error) {
        console.error('Error fetching vendor users:', error);
      }
    };

    fetchVendorUsers();
  }, []);

  return (
    <div>
      <h2>Vendor User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vendorUsers.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.active ? 'Active' : 'Inactive'}</td>
              <td>
                {user.active ? (
                  <VendorUserDeactivationButton userId={user.id} />
                ) : (
                  <VendorUserActivationButton userId={user.id} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorUserManagement;
