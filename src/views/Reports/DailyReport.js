import React, { useState } from 'react';
import axios from 'axios';
import './DailyReport.css';

const DailyOrdersComponent = () => {
  const [date, setDate] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleFetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/daily?date=${date}`);
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="order-component">
      <h2>Daily Orders Report</h2>
      <input type="date" value={date} onChange={handleDateChange} />
      <button onClick={handleFetchOrders}>Fetch Orders</button>
      {error && <div>Error: {error}</div>}
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
              <td>{order.vendor.vendorName}</td> {/* Include vendor name */}
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
  );
};

export default DailyOrdersComponent;