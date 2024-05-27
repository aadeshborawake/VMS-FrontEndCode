import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from "../../Layout";
import './ProductDetails.css';
import { getCurrentUserId, isCurrentUserAdmin } from '../../../helpers/user';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        // Calculate total price based on initial quantity
        setTotalPrice(response.data?.productPrice * quantity);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details');
      }
    };

    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vendors/all');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } 
    };
    
    fetchProductDetails();
    fetchVendors();
    setIsAdmin(isCurrentUserAdmin());
  }, [id, quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    // Log new quantity
    console.log("New Quantity:", newQuantity);
    setQuantity(newQuantity);
    // Update total price based on new quantity
    setTotalPrice(product ? product.productPrice * newQuantity : 0);
  };
  
  const handlePlaceOrderForAdmin = useCallback(async () => {
    try {
      console.log('Preparing order for admin:', product, quantity);
      if (!product || !quantity || !selectedVendor) {
        setError('Missing required data for placing order.');
        return;
      }
  
      // Get current user ID
      const currentUserId = getCurrentUserId();
  
      // Prepare order details including the current user ID
      const orderDetails = {
        productId: product.id,
        quantity: quantity, 
        orderAmount: totalPrice,
        vendorId: selectedVendor,
        userId: currentUserId, // Add the current user ID to the order details
      };
  
      // Make the API call to place the order
      console.log('Placing order with details:', orderDetails);
      const response = await axios.post('http://localhost:8080/api/orders/add/admin', orderDetails);
      console.log('Order placed successfully:', response.data);
      alert("Order Placed");
      navigate("/products");
      
    } catch (error) {
      console.error('Error placing order for admin:', error);
      setError('Error placing order');
    }
  }, [product, quantity, selectedVendor, totalPrice, navigate]);
  
  const handlePlaceOrderForUser = useCallback(async () => {
    try {
      console.log('Preparing order for user:', product, quantity);
      if (!product || !quantity) {
        setError('Missing required data for placing order.');
        return;
      }

      // Prepare order details
      const orderDetails = {
        productId: product.id,
        quantity: quantity,
        orderAmount: totalPrice,
        userId: getCurrentUserId(),
        vendorId: getCurrentUserId(),
      };

      // Make the API call to place the order
      console.log('Placing order with details:', orderDetails);
      const response = await axios.post('http://localhost:8080/api/orders/add/user', orderDetails);
      console.log('Order placed successfully:', response.data);
      alert("Order Placed");
      navigate("/products");
    } catch (error) {
      console.error('Error placing order for user:', error);
      setError('Error placing order');
    }
  }, [product, quantity, totalPrice, navigate]);

  // Memoize the handlePlaceOrderForAdmin and handlePlaceOrderForUser functions
  const memoizedHandlePlaceOrderForAdmin = useMemo(() => handlePlaceOrderForAdmin, [handlePlaceOrderForAdmin]);
  const memoizedHandlePlaceOrderForUser = useMemo(() => handlePlaceOrderForUser, [handlePlaceOrderForUser]);

  // Determine which handlePlaceOrder function to use based on user role
  const handlePlaceOrder = isAdmin ? memoizedHandlePlaceOrderForAdmin : memoizedHandlePlaceOrderForUser;

  return (
    <Layout>
      <div className="product-detail-container">
        <h2 style={{textAlign: 'center', color: '#4CAF50', fontWeight: 'bold'}}>Product Details</h2>
        {error && <div>Error: {error}</div>}
        {!product && <div>Loading product details...</div>}
        {product && (
          <>
            <div className="product-detail-item">
              <label>ID:</label>
              <p>{product.id}</p>
            </div>
            <div className="product-detail-item">
              <label>Name:</label>
              <p>{product.productName}</p>
            </div>
            <div className="product-detail-item">
              <label>Category:</label>
              <p>{product.productCategory}</p>
            </div>
            <div className="product-detail-item">
              <label>Price:</label>
              <p>${product.productPrice.toFixed(2)}</p>
            </div>
            <div className="product-detail-item">
              <label>Quantity:</label>
              <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
            </div>
            <div className="product-detail-item">
              <label>Total Price:</label>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className="product-detail-item">
              <label>Description:</label>
              <p>{product.productDescription}</p>
            </div>
            <div className="product-detail-item image">
              <label>Image:</label>
              <img src={product.productImageUrl} alt={product.productName} />
            </div>

            {isAdmin && (
              <div className="product-detail-item">
                <label>Select Vendor:</label>
                <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
                  <option value="">Select Vendor</option>
                  {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>{vendor.vendorName}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="place-order-button">
              <button onClick={handlePlaceOrder}>Place Order</button>
            </div>

            {isAdmin && (
              <div className="product-detail-buttons">
                <Link to={`/products/edit/${product.id}`} className="edit-button">Edit</Link>
                <Link to={`/products/delete/${product.id}`} className="delete-button">Delete</Link>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;