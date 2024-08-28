import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCartIdByLesseeId, getTotalCartPrice, getTotalSecurityDeposit } from '../services/cart';

const Order = () => {
    const [cartId, setCartId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSecurityDeposit, setTotalSecurityDeposit] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const lesseeId = sessionStorage.getItem('id');

                if (!lesseeId) {
                    throw new Error('Lessee ID not found in session storage');
                }

                // Fetch cart ID
                const fetchedCartId = await getCartIdByLesseeId(lesseeId);
                setCartId(fetchedCartId);

                // Fetch totals using cart ID
                const price = await getTotalCartPrice(fetchedCartId);
                const securityDeposit = await getTotalSecurityDeposit(fetchedCartId);

                setTotalPrice(price);
                setTotalSecurityDeposit(securityDeposit);
            } catch (err) {
                setError(err.message || 'Error fetching cart details');
            } finally {
                setLoading(false);
            }
        };

        fetchCartDetails();
    }, []);

    const serviceTax = totalPrice * 0.05;
    const grandTotal = totalPrice + totalSecurityDeposit + serviceTax;

    const handleMakePayment = () => {
        navigate('/thankyou');
    };

    if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
    if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

    return (
        <Container className="mt-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <h1 className="text-center mb-4">Checkout</h1>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td>Total Price</td>
                                <td>${totalPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Total Security Deposit</td>
                                <td>${totalSecurityDeposit.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Service Tax (5%)</td>
                                <td>${serviceTax.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Grand Total</strong></td>
                                <td><strong>${grandTotal.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={handleMakePayment} className="float-right mt-3">
                        Make Payment
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Order;



// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Table, Button } from 'react-bootstrap';
// import { getCartIdByLesseeId, getTotalCartPrice, getTotalSecurityDeposit } from '../services/cart'; // Adjust the import path
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Order = () => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [totalSecurityDeposit, setTotalSecurityDeposit] = useState(0);
//     const [grandTotal, setGrandTotal] = useState(0);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCartDetails = async () => {
//             const lesseeId = sessionStorage.getItem('id'); // Retrieve lesseeId from session storage

//             if (!lesseeId) {
//                 setError('Lessee ID not found in session storage');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const cartId = await getCartIdByLesseeId(lesseeId);
//                 const price = await getTotalCartPrice(cartId);
//                 const deposit = await getTotalSecurityDeposit(cartId);

//                 const serviceTax = 0.05; // 5% service tax
//                 const total = price + deposit;
//                 const tax = total * serviceTax;
//                 const grandTotalAmount = total + tax;

//                 setTotalPrice(price);
//                 setTotalSecurityDeposit(deposit);
//                 setGrandTotal(grandTotalAmount);
//             } catch (err) {
//                 setError('Error fetching cart details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCartDetails();
//     }, []);

//     const handlePayment = () => {
//         // Storing data into localStorage
//         localStorage.setItem('grandTotal', grandTotal);
//         localStorage.setItem('startDate', new Date().toISOString()); // Assume current date for simplicity
//         localStorage.setItem('endDate', new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()); // 1 week from today
//         localStorage.setItem('cartItems', JSON.stringify([{ productId: 1 }, { productId: 2 }])); // Replace with actual cart items

//         toast.success('Payment process started');
        
//         // Navigate to the booking confirmation page
//         navigate('/thankyou');
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <Container className="mt-4">
//             <Row>
//                 <Col md={8} className="mx-auto">
//                     <h1 className="text-center mb-4">Checkout</h1>
//                     {error && <div className="text-danger text-center">{error}</div>}
//                     <Table bordered>
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>Total Price of Products</td>
//                                 <td>${totalPrice.toFixed(2)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Total Security Deposit</td>
//                                 <td>${totalSecurityDeposit.toFixed(2)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Service Tax (5%)</td>
//                                 <td>${((totalPrice + totalSecurityDeposit) * 0.05).toFixed(2)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Grand Total</td>
//                                 <td>${grandTotal.toFixed(2)}</td>
//                             </tr>
//                         </tbody>
//                     </Table>
//                     <Button variant="primary" onClick={handlePayment} className="float-right mt-3">
//                         Make Payment
//                     </Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Order;



// // components/CheckoutPage.js
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Table, Button } from 'react-bootstrap';
// import { getCartIdByLesseeId, getTotalCartPrice, getTotalSecurityDeposit } from '../services/cart'; // Adjust the import path
// import { toast } from 'react-toastify';

// const Order = () => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [totalSecurityDeposit, setTotalSecurityDeposit] = useState(0);
//     const [grandTotal, setGrandTotal] = useState(0);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCartDetails = async () => {
//             const lesseeId = sessionStorage.getItem('id'); // Retrieve lesseeId from session storage

//             if (!lesseeId) {
//                 setError('Lessee ID not found in session storage');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const cartId = await getCartIdByLesseeId(lesseeId);
//                 const price = await getTotalCartPrice(cartId);
//                 const deposit = await getTotalSecurityDeposit(cartId);

//                 const serviceTax = 0.05; // 5% service tax
//                 const total = price + deposit;
//                 const tax = total * serviceTax;
//                 const grandTotalAmount = total + tax;

//                 setTotalPrice(price);
//                 setTotalSecurityDeposit(deposit);
//                 setGrandTotal(grandTotalAmount);
//             } catch (err) {
//                 setError('Error fetching cart details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCartDetails();
//     }, []);

//     const handlePayment = () => {
//         toast.success('Payment process started');
//         // Implement payment logic here
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <Container className="mt-4">
//             <Row>
//                 <Col md={8} className="mx-auto">
//                     <h1 className="text-center mb-4">Checkout</h1>
//                     {error && <div className="text-danger text-center">{error}</div>}
//                     <Table bordered>
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>Total Price of Products</td>
//                                 <td>${totalPrice.toFixed(2)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Total Security Deposit</td>
//                                 <td>${totalSecurityDeposit.toFixed(2)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Service Tax (5%)</td>
//                                 <td>${(totalPrice + totalSecurityDeposit * 0.05).toFixed(2)}</td>
//                             </tr>
//                             <tr>
//                                 <td>Grand Total</td>
//                                 <td>${grandTotal.toFixed(2)}</td>
//                             </tr>
//                         </tbody>
//                     </Table>
//                     <Button variant="primary" onClick={handlePayment} className="float-right mt-3">
//                         Make Payment
//                     </Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Order
