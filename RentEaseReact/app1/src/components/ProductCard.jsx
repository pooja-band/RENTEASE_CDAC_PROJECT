import React, { useState, useEffect } from 'react';
import { getProductImage } from '../services/productService';
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    const {name, description, productPrice } = product;
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        async function fetchImage() {
            try {
                const imageData = await getProductImage(product.id);
                setProductImage(imageData);
            } catch (error) {
                console.error('Error fetching product image:', error);
                // Optionally, set a placeholder image or handle error accordingly
            }
        }

        fetchImage();
    }, [product.id]);

    return (
        <div className="card h-100">
            <img
                src={productImage || 'path/to/placeholder/image.png'}
                className="card-img-top"
                alt={name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><strong>${productPrice.toFixed(2)}</strong></p>
                <Link to={`/productdetail/${product.id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
};

export default ProductCard;

