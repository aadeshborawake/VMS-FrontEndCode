import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VendorUserOrdersList({ userId }) {
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    const fetchOrders = async () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // Extracting vendorName directly from currentUser
      // const vendorName = currentUser?.vendor?.vendorName;
      const userId = currentUser?.id;
    
      
      try {
        const response = await axios.get(`http://localhost:8080/api/vendor-users/vendororders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>Vendor Orders</h2>
      <Link to="/vendor-dashboard">Back</Link>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Company</th>
            <th>Order Date</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.vendor.vendorName}</td>
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

export default VendorUserOrdersList;
