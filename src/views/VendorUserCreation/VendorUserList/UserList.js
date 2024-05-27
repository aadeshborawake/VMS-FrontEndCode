import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Layout/index';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersForLoggedInUser();
  }, []);

  const fetchUsersForLoggedInUser = async () => {
    try {
       const currentUser = JSON.parse(localStorage.getItem('currentUser'));
       const vendorId = currentUser ? currentUser.id : null;
       if (!vendorId) {
         console.error('Vendor ID not found');
         return;
       }
       const response = await axios.get(`http://localhost:8080/api/vendor-users/vendor/${vendorId}`, {
         withCredentials: true // Include credentials for authentication
       });
       setUsers(response.data);
    } catch (error) {
       console.error('Error fetching users:', error);
    }
   };

   const activateVendorUser = async (userId) => {
    try {
        await axios.put(`http://localhost:8080/api/vendor-users/${userId}/activate`, {}, {
            withCredentials: true
        });
        // Update user status in local state
        setUsers(users.map(user => {
            if (user.id === userId) {
                return { ...user, active: true };
            }
            return user;
        }));
    } catch (error) {
        console.error('Error activating user:', error);
    }
};

const deactivateVendorUser = async (userId) => {
    try {
        await axios.put(`http://localhost:8080/api/vendor-users/${userId}/deactivate`, {}, {
            withCredentials: true
        });
        // Update user status in local state
        setUsers(users.map(user => {
            if (user.id === userId) {
                return { ...user, active: false };
            }
            return user;
        }));
    } catch (error) {
        console.error('Error deactivating user:', error);
    }
};

  return (
    <Layout>
      <div>
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.active ? 'Active' : 'Inactive'}</td>
                <td>
                <button onClick={() => deactivateVendorUser(user.id)} disabled={!user.active}>Deactivate</button>
                <button onClick={() => activateVendorUser(user.id)} disabled={user.active}>Activate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default UserList;
