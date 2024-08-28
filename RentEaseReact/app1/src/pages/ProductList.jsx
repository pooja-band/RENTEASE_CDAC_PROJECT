// src/components/ProductList.js

import React from 'react';
import './ProductList.css'; // Import your CSS file for styling
import products from '../data/products';

const ProductList = () => {
    return (
        <div className="product-list">
            <h2>Our Products</h2>
            <div className="products">
                {products.map((product) => (
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p className="price">${product.price}</p>
                            <p>{product.description}</p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
