import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../views/Layout/index';
import { getCurrentUserId } from '../../helpers/user';
import './VendorReportList.css';

const VendorReportList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const userId = getCurrentUserId();
      let response;
      if (selectedDate) {
        response = await axios.get(`http://localhost:8080/api/orders/daily-report`, {
          headers: {
            'user-id': userId
          },
          params: {
            date: selectedDate
          }
        });
      } else if (selectedMonth) {
        const year = new Date().getFullYear(); // Get the current year
        response = await axios.get(`http://localhost:8080/api/orders/monthly-report`, {
          headers: {
            'user-id': userId
          },
          params: {
            year: year, // Pass the current year
            month: selectedMonth // Pass the selectedMonth directly
          }
        });
      } else {
        setLoading(false);
        return;
      }
      setOrders(response.data);
      setShowReport(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again later.');
      setLoading(false);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedMonth('');
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setSelectedDate('');
  };
  

  return (
    <Layout>
      <div className="container">
        <div className="filter-section">
          <label htmlFor="date">Select Date:</label>
          <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
          <button onClick={handleGenerateReport}>Generate Report</button>
          <label htmlFor="month">Select Month:</label>
          <input type="month" id="month" value={selectedMonth} onChange={handleMonthChange} />
          <button onClick={handleGenerateReport}>Generate Report</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : showReport ? (
          orders.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Vendor Name</th>
                    <th>User</th>
                    <th>Order Date</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.vendor.vendorName}</td>
                      <td>{order.user.username}</td>
                      <td>{new Date(order.orderDate).toISOString().split('T')[0]}</td>
                      <td>{order.product.productName}</td>
                      <td>{order.orderQuantity}</td>
                      <td>{order.orderAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No orders found for the selected date or month.</p>
          )
        ) : null}
      </div>
    </Layout>
  );
};

export default VendorReportList;
