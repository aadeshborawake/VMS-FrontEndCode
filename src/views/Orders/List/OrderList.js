import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, deleteOrder }  from '../../../orderredux/action';
import Layout from '../../Layout/index';
import { isCurrentUserAdmin } from '../../../helpers/user';

const OrderList = ({ 
  orders, 
  loading, 
  error, 
  fetchOrders, 
  deleteOrder 
}) => {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [vendorOptions, setVendorOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [orderDateOptions, setOrderDateOptions] = useState([]);
  const isAdmin = isCurrentUserAdmin();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Populate dropdown options based on orders data
  useEffect(() => {
    if (!loading && !error && orders.length > 0) {
      const vendors = Array.from(new Set(orders.map(order => order.vendor.vendorName)));
      const products = Array.from(new Set(orders.map(order => order.product.productName)));
      const orderDates = Array.from(new Set(orders.map(order => new Date(order.orderDate).toISOString().split('T')[0])));

      setVendorOptions(['', ...vendors]);
      setProductOptions(['', ...products]);
      setOrderDateOptions(['', ...orderDates]);
    }
  }, [orders, loading, error]);

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this Order?');
    if (!confirmed) return;
    deleteOrder(orderId, isAdmin); // Pass the isAdmin value here
  };

  const calculateTotals = (orders) => {
        let quantitySum = 0;
        let amountSum = 0;
        orders.forEach(order => {
          quantitySum += order.orderQuantity;
          amountSum += order.orderAmount;
        });
        return { totalQuantity: quantitySum, totalAmount: amountSum };
      };
    
  
   // Filter orders based on selected criteria
   const filteredOrders = orders.filter(order => {
    return (
      (selectedVendor === '' || order.vendor.vendorName === selectedVendor) &&
      (selectedProduct === '' || order.product.productName === selectedProduct) &&
      (selectedDate === '' || new Date(order.orderDate).toISOString().split('T')[0] === selectedDate)
    );
  });

  const { totalQuantity, totalAmount } = calculateTotals(filteredOrders);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
              <div>
        <h2>Order List</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <div>
           <div>Total Quantity: {totalQuantity}</div>
            <div>Total Amount: {totalAmount}</div>
            <table className="order-table" border="3px" align='center'>
              <thead>
                <tr align='center'>
                  <th>Order Number</th>
                  <th>
                    <label>Vendor Name:</label>
                    <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
                      <option value="">All</option>
                      {vendorOptions.map((vendor, index) => (
                        <option key={index} value={vendor}>{vendor}</option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <label>Order Date:</label>
                    <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                      <option value="">All</option>
                      {orderDateOptions.map((date, index) => (
                        <option key={index} value={date}>{date}</option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <label>Product Name:</label>
                    <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                      <option value="">All</option>
                      {productOptions.map((product, index) => (
                        <option key={index} value={product}>{product}</option>
                      ))}
                    </select>
                  </th>
                  <th>Order Qty</th>
                  <th>Order Amount</th>
                  {isAdmin && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} align='center'>
                    <td>{order.orderNumber}</td>
                    <td>{order.vendor.vendorName}</td>
                    <td className="date">{new Date(order.orderDate).toISOString().split('T')[0]}</td>
                    <td>{order.product.productName}</td>
                    <td>{order.orderQuantity}</td>
                    <td>{order.orderAmount}</td>
                    {isAdmin && (
                      <td>
                        <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                      </td>
                    )}
                  </tr>
                ))}
                <tr>
                <td colSpan="4" style={{textAlign: 'right', fontWeight: 'bold'}}>Total:</td>
                <td>{totalQuantity}</td>
                <td>{totalAmount}</td>
              </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
  error: state.orders.error
});

const mapDispatchToProps = {
  fetchOrders,
  deleteOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);


