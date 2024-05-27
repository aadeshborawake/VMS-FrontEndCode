import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../../Layout";
import { isCurrentUserAdmin } from '../../../helpers/user';
import './ProductEdit.css';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching product:', error);
        setErrorMessage('Failed to fetch product details.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating product:', id, product);
      const response = await axios.put(`http://localhost:8080/api/products/update/${id}`, product, {
        headers: {
          'user-role': isCurrentUserAdmin() ? 'admin' : 'user' // Check if the current user is admin or user
        }
      });
      console.log('Product updated successfully:', response.data);
      alert('Product updated successfully');
      navigate("/products");
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Failed to update product.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="update-product-container">
        <h2 style={{textAlign: 'center', color: '#4CAF50', fontWeight: 'bold'}}>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="productName" value={product.productName} onChange={handleChange} placeholder="Product Name" required />
          <input type="text" name="productDescription" value={product.productDescription} onChange={handleChange} placeholder="Product Description" required />
          <input type="number" name="productPrice" value={product.productPrice} onChange={handleChange} placeholder="Product Price" required />
          <input type="number" name="productQuantity" value={product.productQuantity} onChange={handleChange} placeholder="Product Qty" required />
          <input type="text" name="productDescription" value={product.productDescription} onChange={handleChange} placeholder="Product Description" required />
          <input type="text" name="productImageUrl" value={product.productImageUrl} onChange={handleChange} placeholder="Product Image" required />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Update Product</button>
        </form>
      </div>
    </Layout>
  );
}

export default ProductEdit;
