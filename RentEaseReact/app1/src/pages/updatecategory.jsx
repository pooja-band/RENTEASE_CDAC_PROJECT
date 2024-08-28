import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { getCategoryDetails, updateCategory, getCategoryTypes } from '../services/categoryService'; // Ensure getCategoryTypes is imported
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateCategory = () => {
    const [category, setCategory] = useState(null);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [categoryTypes, setCategoryTypes] = useState([]); // New state for category types
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchCategory = async () => {
            if (!id) {
                setError('Category ID is missing');
                return;
            }

            try {
                const data = await getCategoryDetails(id);
                setCategory(data);
                setFormData(data); 
            } catch (err) {
                setError('Error fetching category details');
            }
        };

        fetchCategory();
    }, [id]);

    useEffect(() => {
        const fetchCategoryTypes = async () => {
            try {
                const types = await getCategoryTypes(); // Fetch category types from the server
                setCategoryTypes(types);
            } catch (err) {
                setError('Error fetching category types');
            }
        };

        fetchCategoryTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        if (!id) {
            toast.error('Category ID is missing');
            return;
        }

        try {
            await updateCategory(id, formData);
            toast.success('Category updated successfully');
            navigate('/adminDashboard');
        } catch (err) {
            toast.error('Error updating category');
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8} className="mx-auto">
                    <h1 className="text-center mb-4">Update Category</h1>
                    {error && <div className="text-danger text-center">{error}</div>}
                    <Form>
                        <Form.Group controlId="formCategoryType">
                            <Form.Label>Category Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="typeOfCategory"
                                value={formData.typeOfCategory || ''}
                                onChange={handleChange}
                            >
                                <option value="">Select Category Type</option>
                                {categoryTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formCategoryDescription">
                            <Form.Label>Category Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                        <br />
                        <Button variant="success" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateCategory;
