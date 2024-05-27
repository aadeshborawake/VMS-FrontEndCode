// VendorUserDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';

function VendorUserDashboard() {
    // Check if the current user is a vendor coordinator

    return (
        <div className="dashboard-container">
            <div className="nav-links">
                <Link to="/vendor-orders" className="nav-link">Vendor Orders</Link>
                <Link to="/vendor-reports" className="nav-link">Vendor Reports</Link>
                {/* Other links */}

                <Link to="/logout" className="nav-link">Logout</Link>
            </div>
        </div>
    );
}

export default VendorUserDashboard;
