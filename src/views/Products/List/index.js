import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Layout from "../../Layout";
import { Link } from 'react-router-dom';
import { isCurrentUserAdmin } from '../../../helpers/user';
import './index.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Define a memoized callback for fetching products
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/list');
      setProducts(response.data);
      setLoading(false);
      setError(null);
      setIsAdmin(isCurrentUserAdmin());
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      setError('Failed to fetch products. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchProducts(); // Call the memoized callback
  }, [fetchProducts]); // Include the callback in the dependencies array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div>
        <h2 style={{textAlign: 'center', color: '#4CAF50', fontWeight: 'bold'}}>Products</h2>

        {isAdmin && (
          <div className="button-container">
            <Link to="/products/create" className="add-product-button">Add Product</Link>
          </div>
        )}
        <table className="product-table" border="2px" align='center'>
          <thead align='center'>
            <tr align='center'>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} align='center'>
                <td>
                  <Link to={`/products/show/${product.id}`}>{product.productName}</Link>
                </td>
                <td>{product.productCategory}</td>
                <td>${product.productPrice.toFixed(2)}</td>
                <td>{product.productQuantity}</td>
                <td>{product.productDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProductList;