import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../services/bookings';

const ThankYou = () => {
    const [bookingResponses, setBookingResponses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const processBookings = async () => {
            try {
                const lesseeId = sessionStorage.getItem('id');
                const localCartItems = [];

                // Iterate through localStorage keys to build cart items
                Object.keys(localStorage).forEach((key) => {
                    if (key.startsWith('productId-')) {
                        const id = localStorage.getItem(key);
                        const productName = localStorage.getItem(`productName-${id}`);
                        const startDate = localStorage.getItem(`startDate-${id}`);
                        const endDate = localStorage.getItem(`endDate-${id}`);
                        const quantity = localStorage.getItem(`quantity-${id}`);
                        const totalPrice = localStorage.getItem(`totalPrice-${id}`);

                        if (id && productName && startDate && endDate && quantity && totalPrice) {
                            localCartItems.push({
                                productId: id,
                                productName,
                                startDate,
                                endDate,
                                quantity,
                                totalPrice: parseFloat(totalPrice)
                            });
                        }
                    }
                });

                // Debug statements to check the values
                console.log("Lessee ID:", lesseeId);
                console.log("Cart Items Array:", localCartItems);

                // Check for required information
                if (!lesseeId || localCartItems.length === 0) {
                    setError('Required information is missing');
                    setLoading(false);
                    return;
                }

                const responses = await Promise.all(
                    localCartItems.map(async (item) => {
                        if (item && item.productId) { // Ensure item and productId are not null
                            const bookingDTO = {
                                productId: item.productId,
                                lesseeId,
                                startDate: item.startDate,
                                endDate: item.endDate,
                                totalPrice: item.totalPrice,
                            };
                            try {
                                const response = await createBooking(bookingDTO);
                                // Assuming response is valid if no exception is thrown
                                return { ...item, status: 'Booked Successfully' };
                            } catch (err) {
                                console.error('Error creating booking:', err);
                                return { ...item, status: 'Booking Failed' };
                            }
                        }
                        return null;
                    })
                );

                setBookingResponses(responses.filter(Boolean)); // Filter out null responses
            } catch (err) {
                console.error('Error processing bookings:', err);
                setError('Error processing bookings');
            } finally {
                setLoading(false);
                localStorage.clear();
            }
        };

        processBookings();
    }, []);

    const handleContinueRenting = () => {
        navigate('/home');
    };

    if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
    if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

    return (
        <Container className="mt-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <h1 className="text-center mb-4">Booking Confirmation</h1>
                    {bookingResponses.length > 0 ? (
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingResponses.map((response, index) => (
                                    <tr key={index}>
                                        <td>{response.productId}</td>
                                        <td>{response.productName}</td>
                                        <td>{new Date(response.startDate).toLocaleDateString()}</td>
                                        <td>{new Date(response.endDate).toLocaleDateString()}</td>
                                        <td>${response.totalPrice.toFixed(2)}</td>
                                        <td>{response.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <Alert variant="info" className="text-center">No booking responses to display.</Alert>
                    )}
                    <Button variant="primary" onClick={handleContinueRenting} className="float-right mt-3">
                        Continue Renting
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ThankYou;
