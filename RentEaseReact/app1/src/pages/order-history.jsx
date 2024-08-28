import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Card } from 'react-bootstrap';
import { getBookingsForLessee } from '../services/bookings'; // Adjust the path if necessary
import { toast } from 'react-toastify';

const OrderHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    // Fetch bookings when the component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            const lesseeId = sessionStorage.getItem('id'); // Retrieve lesseeId from session storage

            if (!lesseeId) {
                setError('Lessee ID is not found in session storage');
                return;
            }

            try {
                const data = await getBookingsForLessee(lesseeId);
                setBookings(data);
            } catch (err) {
                setError('Error fetching booking details');
            }
        };

        fetchBookings();
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                <Col md={10} lg={8} className="mx-auto">
                    <Card>
                        <Card.Header className="text-center">
                            <h2>Order History</h2>
                        </Card.Header>
                        <Card.Body>
                            {error && <div className="text-danger text-center mb-3">{error}</div>}
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.startDate}</td>
                                            <td>{booking.endDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderHistory;


// import { useNavigate } from "react-router-dom";

// function OrderHistory() {
//     const navigate = useNavigate();
//     const onProduct = () => {
//        navigate('/productdetailpage')

//     }
//     return (
//         <div className="container mt-5">
//       <header className="bg-dark text-white p-4">
//         <div className="container">
//           <h4 className="display-4">Order History </h4>
      
//         </div>
//         </header>
//       <div className="card">
//         <div className="card-header">
//           <h4>Your Past Orders</h4>
//         </div>
//         <ul className="list-group list-group-flush">
//           {/* Example order item */}
//           <li className="list-group-item">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h5>Order #12345</h5>
//                 <p><strong>Date:</strong> 01/01/2023</p>
//                 <p><strong>Total:</strong> $150</p>
//                 <p><strong>Items:</strong></p>
//                 <ul>
//                   <li>Gadget 1 - $50/day</li>
//                   <li>Gadget 2 - $100/day</li>
//                 </ul>
//               </div>
//               <button  onClick={onProduct}  className="btn btn-info">View Details</button>
//             </div>
//           </li>
//           {/* Repeat the above block for more orders */}
//         </ul>
//       </div>
//     </div>
//     )
// }

// export default OrderHistory