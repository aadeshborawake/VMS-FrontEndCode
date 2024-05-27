import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './List';
import ProductCreate from './Create/ProductCreate';
import ProductEdit from './Edit/ProductEdit';
import ProductDetails from './Show/ProductDetails';
import ProductDelete from './Delete/ProductDelete';

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/create" element={<ProductCreate />} />
      <Route path="/show/:id" element={<ProductDetails />} />
      <Route path="/edit/:id" element={<ProductEdit />} />
      <Route path="/delete/:id" element={<ProductDelete />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ProductRoutes;
