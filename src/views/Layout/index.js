import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isCurrentUserAdmin, getCurrentUserName } from '../../helpers/user';
import './index.css'; // Import CSS file


function Dashboard({ children }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Added state for profile dropdown
  const [showChangePassword, setShowChangePassword] = useState(false); // Added state for showing password change form
  const [showVendorProfile, setShowVendorProfile] = useState(false); 
  const isAdmin = isCurrentUserAdmin();
  const username = getCurrentUserName();
  
  
  // Function to toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Function to toggle password change form
  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const toggleVendorProfile = () => {
    setShowVendorProfile(!showVendorProfile); // Toggle the state to show/hide vendor profile
  };

  return (
    <div className="dashboard-container">
      <div className="nav-links">
        {/* Always visible links */}
        <Link to="/products" className="nav-link">Products</Link>

        {/* Conditional links based on user role */}
        {!isAdmin && (
          <>
            <Link to="/my-orders" className="nav-link">My Orders</Link>
            <Link to="/my-reports" className="nav-link">My Report</Link>
            <Link to="/add-vendor-user" className="nav-link">Add Vendor User</Link>
            <Link to="/userlist" className="nav-link">User List</Link>
          </>
        )}

        {isAdmin && (
          <>
            <Link to="/vendors" className="nav-link">Vendors</Link>
            <Link to="/reports" className="nav-link">Reports</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
          </>
        )}

        {/* Logout link */}
        <Link to="/logout" className="nav-link">Logout</Link>

        {/* Display current user name and icon */}
        <div className="current-user" onClick={toggleProfileDropdown}>
          <span className="username">{username}</span>
          <img src="profile-icon.png" alt='' className="profile-icon" />
          <span className="dropdown-arrow">&#9660;</span>
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <ul>
                {!isAdmin && (
                  <li onClick={toggleVendorProfile}><Link to="/vendor-profile">View Vendor Profile</Link></li>
                )}
                <li onClick={toggleChangePassword}><Link to="/change-password">Change Password</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
  <div>{children}</div>
</div>
  );
}

export default Dashboard;








//Most upto Date
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { isCurrentUserAdmin, getCurrentUserName } from '../../helpers/user';
// import './index.css'; // Import CSS file
// import ChangePassword from '../ChangePassword/ChangePassword';

// function Dashboard({ children }) {
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Added state for profile dropdown
//   const [showChangePassword, setShowChangePassword] = useState(false); // Added state for showing password change form
//   const isAdmin = isCurrentUserAdmin();
  
//   // Function to toggle profile dropdown
//   const toggleProfileDropdown = () => {
//     setShowProfileDropdown(!showProfileDropdown);
//   };

//   // Function to toggle password change form
//   const toggleChangePassword = () => {
//     setShowChangePassword(!showChangePassword);
//   };

//   const username = getCurrentUserName();
//   // console.log(username); // Log the retrieved username for debugging

//   return (
//     <div className="dashboard-container">
//       <div className="nav-links">
//         {/* Always visible links */}
//         <Link to="/products" className="nav-link">Products</Link>

//         {/* Conditional links based on user role */}
//         {!isAdmin && (
//           <>
//             <Link to="/my-orders" className="nav-link">My Orders</Link>
//             <Link to="/my-reports" className="nav-link">My Report</Link>
//             <Link to="/userlist" className="nav-link">User List</Link>
//           </>
//         )}

//         {isAdmin && (
//           <>
//             <Link to="/vendors" className="nav-link">Vendors</Link>
//             <Link to="/reports" className="nav-link">Reports</Link>
//             <Link to="/orders" className="nav-link">Orders</Link>
//           </>
//         )}

//         {/* Logout link */}
//         <Link to="/logout" className="nav-link">Logout</Link>

//         {/* Display current user name and icon */}
//         <div className="current-user" onClick={toggleProfileDropdown}>
//           <span className="username">{username}</span>
//           <img src="profile-icon.png" alt='' className="profile-icon" />
//           <span className="dropdown-arrow">&#9660;</span>
//           {showProfileDropdown && (
//             <div className="profile-dropdown">
//               <ul>
//                 <li onClick={toggleChangePassword}>Change Password</li>
//               </ul>
//             </div>
//           )}
//         </div>
//         {/* End of current user display */}
//       </div>
//       <div>{children}</div>

//       {/* Render ChangePassword component if showChangePassword is true */}
//       {showChangePassword && <ChangePassword />}
//     </div>
//   );
// }


// export default Dashboard;





