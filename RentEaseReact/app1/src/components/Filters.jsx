// src/components/Filters.js

import React, { useState } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const Filters = ({ onFilter }) => {
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(1000);

    const handleFilter = () => {
        onFilter({ category, brand, price });
    };

    const handlePriceChange = (value) => {
        setPrice(value);
    };

    return (
        <div className="filters p-3">
            <h4>Filter By</h4>
            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Clothing">Clothing</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control as="select" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">Select Brand</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Apple">Apple</option>
                    <option value="Sony">Sony</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price (less than): ${price}</Form.Label>
                <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={price}
                    onChange={handlePriceChange}
                />
            </Form.Group>

            <Button variant="primary" onClick={handleFilter}>Apply Filters</Button>
        </div>
    );
};

export default Filters;
