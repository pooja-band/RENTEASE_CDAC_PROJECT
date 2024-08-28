import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; // Adjust the path if necessary
import { getAllProducts, getProductsByCategory, getProductsByBrand, getProductsByPrice } from '../services/productService';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// Utility function to handle different data structures
const extractProducts = (data) => {
    if (Array.isArray(data)) {
        return data; // Simple response structure
    } else if (data && data.content) {
        return data.content; // Pageable response structure
    }
    return [];
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ category: '', brand: '', price: 1000 });
    const [filterApplied, setFilterApplied] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = filterApplied
                    ? await applyFilters(filters)
                    : await getAllProducts(0, 20, 'name', 'asc');

                setProducts(extractProducts(data)); // Use utility function to normalize data
                setLoading(false);
            } catch (err) {
                console.error('Error:', err); // Log the error
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, filterApplied]);

    const applyFilters = async (filters) => {
        try {
            if (filters.category) {
                return await getProductsByCategory(filters.category);
            } else if (filters.brand) {
                return await getProductsByBrand(filters.brand);
            } else if (filters.price) {
                return await getProductsByPrice(filters.price);
            } else {
                return await getAllProducts(0, 20, 'name', 'asc');
            }
        } catch (err) {
            console.error('Error applying filters:', err);
            setError('Error applying filters');
            return { content: [] }; // Return an empty array wrapped in an object for consistency
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleApplyFilters = () => {
        setFilterApplied(true);
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;

    console.log('Products:', products); // Log products to verify they are correct

    return (
        <Container className="mt-4">
            <Row>
                <Col md={3}>
                    <h3>Filters</h3>
                    <Form>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                name="brand"
                                value={filters.brand}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter max price"
                                name="price"
                                value={filters.price}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleApplyFilters}>
                            Apply Filters
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h1 className="text-center mb-4">All Products</h1>
                    <Row>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Col md={4} mb={4} key={product.id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))
                        ) : (
                            <div className="text-center">No products found</div>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
