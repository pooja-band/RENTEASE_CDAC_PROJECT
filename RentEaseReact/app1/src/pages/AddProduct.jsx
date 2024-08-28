// src/components/AddProduct.js

import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
    // Reset form fields if needed
    setProduct({
      name: '',
      description: '',
      price: '',
      image: null
    });
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
