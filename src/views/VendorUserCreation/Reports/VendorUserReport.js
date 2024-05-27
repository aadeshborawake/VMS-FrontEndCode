import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VendorUserReport() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const vendorName = currentUser?.vendor?.vendorName;
        const response = await axios.get(`http://localhost:8080/api/vendor-users/vendorreports/${vendorName}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error); 
      }
    };

    fetchOrders();
  }, []);

  // Calculate total amount
  const totalAmount = orders.reduce((total, order) => total + order.orderAmount, 0);

  return (
    <div>
      <h2>Vendor Orders Report</h2>
      <Link to="/vendor-dashboard">Back</Link>
      <p>Total Orders: {orders.length}</p>
      <p>Total Amount: {totalAmount}</p>
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
              <td>{order.id}</td>
              <td>{order.vendor.vendorName}</td>
              <td>{order.user.username}</td>
              <td className="date">{new Date(order.orderDate).toISOString().split('T')[0]}</td>
              <td>{order.product.productName}</td>
              <td>{order.orderQuantity}</td>
              <td>{order.orderAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorUserReport;
