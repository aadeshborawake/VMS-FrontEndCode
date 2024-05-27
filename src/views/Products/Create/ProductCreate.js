import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../productredux/productSlice';
import { useNavigate } from 'react-router-dom';
import Layout from "../../Layout";
import './ProductCreate.css';

function ProductCreate() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({
      productName: name,
      productCategory: category,
      productPrice: parseFloat(price),
      productQuantity: parseInt(quantity),
      productDescription: description,
      productImageUrl: image
    }));
    navigate("/products");
  };

  return (
    <Layout>
      <div className="container">
        <div className="form-container">
          <h2 style={{textAlign: 'center', color: '#4CAF50', fontWeight: 'bold'}}>Add Product</h2> 
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
               <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
               <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
               <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
               <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
               <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
              <button type="submit" disabled={loading}> {loading ? 'Adding...' : 'Add Product'}</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ProductCreate;

