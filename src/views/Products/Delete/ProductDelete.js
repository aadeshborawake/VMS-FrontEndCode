import React from 'react';
import axios from 'axios';
import Layout from "../../Layout";
import { useParams, useNavigate } from 'react-router-dom';
import { isCurrentUserAdmin } from '../../../helpers/user';
import './ProductDelete.css'; // Import the CSS file

const ProductDelete = ({ onDeleteSuccess }) => {
  const { id } = useParams(); // Get productId from route parameters
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8080/api/products/delete/${id}`, {
          headers: {
            'user-role': isCurrentUserAdmin() ? 'admin' : '' // Included the user-role header
          }
        });
        // Check if onDeleteSuccess is a function before calling it
        if (typeof onDeleteSuccess === 'function') {
          onDeleteSuccess(id);
        }
        navigate("/products");
      } catch (error) {
        console.error('Error deleting product:', error);
        // Handle the error, maybe show an error message to the user
      }
    }
  };

  return (
    <Layout>
      <div className="delete-container">
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
    </Layout>
  );
};

export default ProductDelete;
