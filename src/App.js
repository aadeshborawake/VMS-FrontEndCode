import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import VendorRegistrationForm from './RegisterVendor';
import Dashboard from './views/Home/Dashboard';
import ProductRoutes from './views/Products/ProductRoutes';
import OrderList from "./views/Orders/List/OrderList";
import ReportComponent from './views/Reports/ReportList';
import DailyOrdersComponent from './views/Reports/DailyReport';
import MonthlyOrdersComponent from './views/Reports/MonthlyReport';
import VendorList  from './views/Vendors/VendorList';
import LogoutPage from './LogoutPage';
import VendorOrderList from '../src/views/Orders/List/VendorOrderList';
import VendorReportList from '../src/views/Reports/VendorReportList';
import VendorUserCreationForm from './views/VendorUserCreation/CreationForm/VendorUserCreationForm.js';
import VendorUserLogin from './views/VendorUserCreation/Login/VendorUserLogin.js';
import VendorUserDashboard from './VendorUserDashboard';
import VendorUserOrdersList from './views/VendorUserCreation/Order/VendorUserOrdersList.js';
import VendorUserReport from './views/VendorUserCreation/Reports/VendorUserReport.js';
import UserList from './views/VendorUserCreation/VendorUserList/UserList';
import ChangePassword from '../src/views/ChangePassword/ChangePassword';
import VendorProfile from '../src/views/VendorProfile/VendorProfile';



function App() {
  // Assume userId is obtained from authentication
  const [userId] = useState('2');

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<VendorRegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products/*" element={<ProductRoutes />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/reports" element={<ReportComponent />} />
          <Route path="/daily-orders" element={<DailyOrdersComponent />} />
          <Route path="/monthly-orders" element={<MonthlyOrdersComponent />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/my-orders" element={<VendorOrderList />} />
          <Route path="/my-reports" element={<VendorReportList />} />
          <Route path='add-vendor-user' element={<VendorUserCreationForm />} />
          <Route path="/vendor-login" element={<VendorUserLogin />} />
          <Route path="/vendor-dashboard" element={<VendorUserDashboard />} />
          <Route path='/userlist' element={<UserList />} />

          {/* Pass userId prop to VendorUserOrdersList */}
          <Route path="/vendor-orders" element={<VendorUserOrdersList userId={userId} />} />
          <Route path="/vendor-reports" element={<VendorUserReport userId={userId} />} />
    
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
       
        </Routes>
      </Router>
    </div>
  );  
}


export default App;
