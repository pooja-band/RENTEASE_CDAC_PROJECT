import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { getUserDetails, updateUser } from '../services/user'; // Adjust the path if necessary
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            const userId = sessionStorage.getItem('id'); // Retrieve userId from session storage

            if (!userId) {
                setError('User ID is not found in session storage');
                return;
            }

            try {
                const data = await getUserDetails(userId);
                setUser(data);
                setFormData(data); // Initialize form data with fetched user data
            } catch (err) {
                setError('Error fetching user details');
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        const userId = sessionStorage.getItem('id'); // Retrieve userId from session storage

        if (!userId) {
            toast.error('User ID is not found in session storage');
            return;
        }

        try {
            await updateUser(userId, formData);
            toast.success('User updated successfully');
            setEditing(false);
        } catch (err) {
            toast.error('Error updating user');
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8} className="mx-auto">
                    <h1 className="text-center mb-4">User Profile</h1>
                    {error && <div className="text-danger text-center">{error}</div>}
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={formData.dob || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNo">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNo"
                                value={formData.phoneNo || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPostalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="number"
                                name="postalCode"
                                value={formData.postalCode || ''}
                                onChange={handleChange}
                                disabled={!editing}
                            />
                        </Form.Group>
                        <Button
                            variant={editing ? 'success' : 'primary'}
                            onClick={editing ? handleUpdate : () => setEditing(true)}
                        >
                            {editing ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
