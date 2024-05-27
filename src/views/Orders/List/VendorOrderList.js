import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Layout/index';
import { getCurrentUserId } from '../../../helpers/user';
import './VendorOrderList.css'; // Import CSS file

const VendorOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = getCurrentUserId();
        const response = await axios.get(`http://localhost:8080/api/orders/orderlist`, {
          headers: {
            'user-id': userId
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    return (
      (selectedDate === '' || new Date(order.orderDate).toISOString().split('T')[0] === selectedDate) &&
      (selectedProduct === '' || order.product.productName === selectedProduct)
    );
  });

  // Calculate total order quantity and amount based on filtered orders
  const totalQuantity = filteredOrders.reduce((total, order) => total + order.orderQuantity, 0);
  const totalAmount = filteredOrders.reduce((total, order) => total + order.orderAmount, 0);

  return (
    <Layout>
      <div>
        <h1 style={{textAlign: 'center', color: '#4CAF50', fontWeight: 'bold'}}>My Orders</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Vendor Name</th>
                <th>
                  <label>Order Date:</label>
                  <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    <option value="">All</option>
                    {Array.from(new Set(orders.map(order => new Date(order.orderDate).toISOString().split('T')[0]))).map((date, index) => (
                      <option key={index} value={date}>{date}</option>
                    ))}
                  </select>
                </th>
                <th>
                  <label>Product Name:</label>
                  <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                    <option value="">All</option>
                    {Array.from(new Set(orders.map(order => order.product.productName))).map((product, index) => (
                      <option key={index} value={product}>{product}</option>
                    ))}
                  </select>
                </th>
                <th>Order Qty</th>
                <th>Order Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.vendor.vendorName}</td>
                  <td className="date">{new Date(order.orderDate).toISOString().split('T')[0]}</td>
                  <td>{order.product.productName}</td>
                  <td>{order.orderQuantity}</td>
                  <td>{order.orderAmount}</td>
                </tr>
              ))}
              {/* Total row */}
              <tr>
                <td colSpan="4" style={{textAlign: 'right', fontWeight: 'bold'}}>Total:</td>
                <td>{totalQuantity}</td>
                <td>{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default VendorOrderList;