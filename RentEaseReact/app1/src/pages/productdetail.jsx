import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getProductDetails, getProductImage, checkAvailability, addToCart } from '../services/productService';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [city, setCity] = useState('');
    const [availabilityError, setAvailabilityError] = useState('');
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductDetails(id);
                const imageData = await getProductImage(id);
                setProductImage(imageData);
                setProduct(data);
            } catch (err) {
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleCheckAvailability = async () => {
        try {
            if (!startDate || !endDate || !city) {
                setAvailabilityError('Please fill out all fields.');
                return;
            }

            const response = await checkAvailability({
                productId: id,
                startDate,
                endDate,
                city,
            });
            setAvailabilityMessage(response.message);
            setAvailabilityError('');
            setIsAvailable(response.message === 'Product is available');
        } catch (err) {
            setAvailabilityError('Error checking availability');
            setAvailabilityMessage('');
            setIsAvailable(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(id, quantity);
            toast.success('Product added to cart!');

            // Save all fields separately in local storage
            localStorage.setItem(`productId-${id}`, id);
            localStorage.setItem(`productName-${id}`, product.name);
            localStorage.setItem(`startDate-${id}`, startDate);
            localStorage.setItem(`endDate-${id}`, endDate);
            localStorage.setItem(`quantity-${id}`, quantity);
            localStorage.setItem(`totalPrice-${id}`, product.productPrice * quantity);

        } catch (err) {
            toast.error('Error adding product to cart');
        }
    };

    if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
    if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

    return (
        <Container className="mt-5">
            {product && (
                <Card>
                    <Row className="no-gutters">
                        <Col md={6}>
                            <Card.Img variant="top" src={productImage} alt={product.name} />
                        </Col>
                        <Col md={6}>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text><strong>Brand:</strong> {product.brandName}</Card.Text>
                                <Card.Text><strong>Model:</strong> {product.modelName}</Card.Text>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text><strong>Components Included:</strong> {product.componentsIncluded}</Card.Text>
                                <Card.Text><strong>Manufacturing Date:</strong> {new Date(product.mfgDate).toLocaleDateString()}</Card.Text>
                                <Card.Text><strong>Price:</strong> ${product.productPrice.toFixed(2)}</Card.Text>
                                <Card.Text><strong>Security Deposit:</strong> ${product.securityDeposit.toFixed(2)}</Card.Text>
                                <Card.Text><strong>Available City:</strong> {product.availableCity}</Card.Text>

                                <Form>
                                    <Form.Group controlId="formCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formStartDate">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEndDate">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleCheckAvailability}>
                                        Check Availability
                                    </Button>
                                </Form>

                                {availabilityMessage && (
                                    <Alert variant={isAvailable ? 'success' : 'danger'} className="mt-3">
                                        {availabilityMessage}
                                    </Alert>
                                )}

                                {isAvailable && (
                                    <>
                                        <Form.Group controlId="formQuantity" className="mt-3">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Button variant="success" className="mt-3" onClick={handleAddToCart}>
                                            Add to Cart
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}
        </Container>
    );
};

export default ProductDetail;



// // Adjust the necessary imports
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Row, Col, Card, Spinner, Alert, Form, Button } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { getProductDetails, getProductImage, checkAvailability, addToCart } from '../services/productService';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [productImage, setProductImage] = useState(null);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [city, setCity] = useState('');
//     const [availabilityError, setAvailabilityError] = useState('');
//     const [availabilityMessage, setAvailabilityMessage] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [isAvailable, setIsAvailable] = useState(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const data = await getProductDetails(id);
//                 const imageData = await getProductImage(id);
//                 setProductImage(imageData);
//                 setProduct(data);
//             } catch (err) {
//                 setError('Error fetching product details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     const handleCheckAvailability = async () => {
//         try {
//             const response = await checkAvailability({
//                 productId: id,
//                 startDate,
//                 endDate,
//                 city,
//             });
//             setAvailabilityMessage(response.message);
//             setAvailabilityError('');
//             setIsAvailable(response.message === 'Product is available');
//         } catch (err) {
//             setAvailabilityError('Error checking availability');
//             setAvailabilityMessage('');
//             setIsAvailable(false);
//         }
//     };

//     const handleAddToCart = async () => {
//         try {
//             await addToCart(id, quantity);
//             toast.success('Product added to cart!');

//             const productEntry = {
//                 productId: id,
//                 productName: product.name,
//                 startDate,
//                 endDate,
//                 quantity,
//                 totalPrice: product.productPrice * quantity,
//             };
//             addToLocalCart(productEntry);
//         } catch (err) {
//             toast.error('Error adding product to cart');
//         }
//     };

//     const addToLocalCart = (productEntry) => {
//         const cart = JSON.parse(localStorage.getItem('localCart')) || [];
//         cart.push(productEntry);
//         localStorage.setItem('localCart', JSON.stringify(cart));
//     };

//     if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
//     if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

//     return (
//         <Container className="mt-5">
//             {product && (
//                 <Card>
//                     <Row className="no-gutters">
//                         <Col md={6}>
//                             <Card.Img variant="top" src={productImage} alt={product.name} />
//                         </Col>
//                         <Col md={6}>
//                             <Card.Body>
//                                 <Card.Title>{product.name}</Card.Title>
//                                 <Card.Text><strong>Brand:</strong> {product.brandName}</Card.Text>
//                                 <Card.Text><strong>Model:</strong> {product.modelName}</Card.Text>
//                                 <Card.Text>{product.description}</Card.Text>
//                                 <Card.Text><strong>Components Included:</strong> {product.componentsIncluded}</Card.Text>
//                                 <Card.Text><strong>Manufacturing Date:</strong> {new Date(product.mfgDate).toLocaleDateString()}</Card.Text>
//                                 <Card.Text><strong>Price:</strong> ${product.productPrice.toFixed(2)}</Card.Text>
//                                 <Card.Text><strong>Security Deposit:</strong> ${product.securityDeposit.toFixed(2)}</Card.Text>
//                                 <Card.Text><strong>Available City:</strong> {product.availableCity}</Card.Text>

//                                 <Form>
//                                     <Form.Group controlId="formCity">
//                                         <Form.Label>City</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter city"
//                                             value={city}
//                                             onChange={(e) => setCity(e.target.value)}
//                                         />
//                                     </Form.Group>
//                                     <Form.Group controlId="formStartDate">
//                                         <Form.Label>Start Date</Form.Label>
//                                         <Form.Control
//                                             type="date"
//                                             value={startDate}
//                                             onChange={(e) => setStartDate(e.target.value)}
//                                         />
//                                     </Form.Group>
//                                     <Form.Group controlId="formEndDate">
//                                         <Form.Label>End Date</Form.Label>
//                                         <Form.Control
//                                             type="date"
//                                             value={endDate}
//                                             onChange={(e) => setEndDate(e.target.value)}
//                                         />
//                                     </Form.Group>
//                                     <Button variant="primary" onClick={handleCheckAvailability}>
//                                         Check Availability
//                                     </Button>
//                                 </Form>

//                                 {availabilityMessage && (
//                                     <Alert variant={isAvailable ? 'success' : 'danger'} className="mt-3">
//                                         {availabilityMessage}
//                                     </Alert>
//                                 )}

//                                 {isAvailable && (
//                                     <>
//                                         <Form.Group controlId="formQuantity" className="mt-3">
//                                             <Form.Label>Quantity</Form.Label>
//                                             <Form.Control
//                                                 type="number"
//                                                 min="1"
//                                                 value={quantity}
//                                                 onChange={(e) => setQuantity(parseInt(e.target.value))}
//                                             />
//                                         </Form.Group>
//                                         <Button variant="success" className="mt-3" onClick={handleAddToCart}>
//                                             Add to Cart
//                                         </Button>
//                                     </>
//                                 )}
//                             </Card.Body>
//                         </Col>
//                     </Row>
//                 </Card>
//             )}
//         </Container>
//     );
// };

// export default ProductDetail;




// import { toast } from 'react-toastify';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Row, Col, Card, Spinner, Alert, Form, Button } from 'react-bootstrap';
// import { getProductDetails, getProductImage, checkAvailability, addToCart } from '../services/productService';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [productImage, setProductImage] = useState(null);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [city, setCity] = useState('');
//     const [availabilityError, setAvailabilityError] = useState('');
//     const [availabilityMessage, setAvailabilityMessage] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [isAvailable, setIsAvailable] = useState(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const data = await getProductDetails(id);
//                 const imageData = await getProductImage(id);
//                 setProductImage(imageData);
//                 setProduct(data);
//             } catch (err) {
//                 setError('Error fetching product details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     const handleCheckAvailability = async () => {
//         try {
//             const response = await checkAvailability({
//                 productId: id,
//                 startDate,
//                 endDate,
//                 city
//             });
//             setAvailabilityMessage(response.message);
//             setAvailabilityError('');
//             setIsAvailable(response.message === 'Product is available');
//         } catch (err) {
//             setAvailabilityError('Error checking availability');
//             setAvailabilityMessage('');
//             setIsAvailable(false);
//         }
//     };

//     const handleAddToCart = async () => {
//         try {
//             await addToCart(id, quantity);
//             toast.success('Product added to cart!');

//             // Store product details in localStorage
//             const productEntry = {
//                 productId: id,
//                 productName: product.name,
//                 startDate,
//                 endDate,
//                 quantity
//             };
//             addToLocalCart(productEntry);
//         } catch (err) {
//             toast.error('Error adding product to cart');
//         }
//     };

//     const addToLocalCart = (productEntry) => {
//         const cart = JSON.parse(localStorage.getItem('localCart')) || [];
//         cart.push(productEntry);
//         localStorage.setItem('localCart', JSON.stringify(cart));
//     };

//     if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
//     if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

//     return (
//         <Container className="mt-5">
//             {product && (
//                 <Card>
//                     <Row className="no-gutters">
//                         <Col md={6}>
//                             <Card.Img variant="top" src={productImage} alt={product.name} />
//                         </Col>
//                         <Col md={6}>
//                             <Card.Body>
//                                 <Card.Title>{product.name}</Card.Title>
//                                 <Card.Text><strong>Brand:</strong> {product.brandName}</Card.Text>
//                                 <Card.Text><strong>Model:</strong> {product.modelName}</Card.Text>
//                                 <Card.Text>{product.description}</Card.Text>
//                                 <Card.Text><strong>Components Included:</strong> {product.componentsIncluded}</Card.Text>
//                                 <Card.Text><strong>Manufacturing Date:</strong> {new Date(product.mfgDate).toLocaleDateString()}</Card.Text>
//                                 <Card.Text><strong>Price:</strong> ${product.productPrice.toFixed(2)}</Card.Text>
//                                 <Card.Text><strong>Security Deposit:</strong> ${product.securityDeposit.toFixed(2)}</Card.Text>
//                                 <Card.Text><strong>Available City:</strong> {product.availableCity}</Card.Text>
                                
//                                 {/* Availability Check Form */}
//                                 <Form>
//                                     <Form.Group controlId="formCity">
//                                         <Form.Label>City</Form.Label>
//                                         <Form.Control 
//                                             type="text" 
//                                             placeholder="Enter city" 
//                                             value={city} 
//                                             onChange={(e) => setCity(e.target.value)} 
//                                         />
//                                     </Form.Group>
//                                     <Form.Group controlId="formStartDate">
//                                         <Form.Label>Start Date</Form.Label>
//                                         <Form.Control 
//                                             type="date" 
//                                             value={startDate} 
//                                             onChange={(e) => setStartDate(e.target.value)} 
//                                         />
//                                     </Form.Group>
//                                     <Form.Group controlId="formEndDate">
//                                         <Form.Label>End Date</Form.Label>
//                                         <Form.Control 
//                                             type="date" 
//                                             value={endDate} 
//                                             onChange={(e) => setEndDate(e.target.value)} 
//                                         />
//                                     </Form.Group>
//                                     <Button variant="primary" onClick={handleCheckAvailability}>
//                                         Check Availability
//                                     </Button>
//                                 </Form>
                                
//                                 {availabilityError && <Alert variant="danger" className="mt-3">{availabilityError}</Alert>}
//                                 {availabilityMessage && <Alert variant="success" className="mt-3">{availabilityMessage}</Alert>}
                                
//                                 {/* Add to Cart Section */}
//                                 {isAvailable && (
//                                     <div className="mt-3">
//                                         <Form.Group controlId="formQuantity">
//                                             <Form.Label>Quantity</Form.Label>
//                                             <Form.Control 
//                                                 type="number" 
//                                                 value={quantity} 
//                                                 onChange={(e) => setQuantity(parseInt(e.target.value, 10))} 
//                                                 min={1}
//                                             />
//                                         </Form.Group>
//                                         <Button variant="success" onClick={handleAddToCart}>
//                                             Add to Cart
//                                         </Button>
//                                     </div>
//                                 )}
//                             </Card.Body>
//                         </Col>
//                     </Row>
//                 </Card>
//             )}
//         </Container>
//     );
// };

// export default ProductDetail;

// import { toast } from 'react-toastify';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Row, Col, Card, Spinner, Alert, Form, Button } from 'react-bootstrap';
// import { getProductDetails, getProductImage, checkAvailability, addToCart } from '../services/productService';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [productImage, setProductImage] = useState(null);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [city, setCity] = useState('');
//     const [availabilityError, setAvailabilityError] = useState('');
//     const [availabilityMessage, setAvailabilityMessage] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [isAvailable, setIsAvailable] = useState(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const data = await getProductDetails(id);
//                 const imageData = await getProductImage(id);
//                 setProductImage(imageData);
//                 setProduct(data);
//             } catch (err) {
//                 setError('Error fetching product details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     const handleCheckAvailability = async () => {
//         try {
//             const response = await checkAvailability({
//                 productId: id,
//                 startDate,
//                 endDate,
//                 city
//             });
//             setAvailabilityMessage(response.message);
//             setAvailabilityError('');
//             setIsAvailable(response.message === 'Product is available');
//         } catch (err) {
//             setAvailabilityError('Error checking availability');
//             setAvailabilityMessage('');
//             setIsAvailable(false);
//         }
//     };

//     const handleAddToCart = async () => {
//         try {
//            await addToCart(id, quantity);
//             toast.success('Product added to cart!');
//         } catch (err) {
//             toast.error('Error adding product to cart');
//         }
//     };

//     if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
//     if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

//     return (
//         <Container className="mt-5">
//             {product && (
//                 <Card>
//                     <Row className="no-gutters">
//                         <Col md={6}>
//                             <Card.Img variant="top" src={productImage} alt={product.name} />
//                         </Col>
//                         <Col md={6}>
//                             <Card.Body>
//                                 <Card.Title>{product.name}</Card.Title>
//                                 <Card.Text><strong>Brand:</strong> {product.brandName}</Card.Text>
//                                 <Card.Text><strong>Model:</strong> {product.modelName}</Card.Text>
//                                 <Card.Text>{product.description}</Card.Text>
//                                 <Card.Text><strong>Components Included:</strong> {product.componentsIncluded}</Card.Text>
//                                 <Card.Text><strong>Manufacturing Date:</strong> {new Date(product.mfgDate).toLocaleDateString()}</Card.Text>
//                                 <Card.Text><strong>Price:</strong> ${product.productPrice.toFixed(2)}</Card.Text>
//                                 <Card.Text><strong>Security Deposit:</strong> ${product.securityDeposit.toFixed(2)}</Card.Text>
//                                 <Card.Text><strong>Available City:</strong> {product.availableCity}</Card.Text>
                                
//                                 {/* Availability Check Form */}
//                                 <Form>
//                                     <Form.Group controlId="formCity">
//                                         <Form.Label>City</Form.Label>
//                                         <Form.Control 
//                                             type="text" 
//                                             placeholder="Enter city" 
//                                             value={city} 
//                                             onChange={(e) => setCity(e.target.value)} 
//                                         />
//                                     </Form.Group>
//                                     <Form.Group controlId="formStartDate">
//                                         <Form.Label>Start Date</Form.Label>
//                                         <Form.Control 
//                                             type="date" 
//                                             value={startDate} 
//                                             onChange={(e) => setStartDate(e.target.value)} 
//                                         />
//                                     </Form.Group>
//                                     <Form.Group controlId="formEndDate">
//                                         <Form.Label>End Date</Form.Label>
//                                         <Form.Control 
//                                             type="date" 
//                                             value={endDate} 
//                                             onChange={(e) => setEndDate(e.target.value)} 
//                                         />
//                                     </Form.Group>
//                                     <Button variant="primary" onClick={handleCheckAvailability}>
//                                         Check Availability
//                                     </Button>
//                                 </Form>
                                
//                                 {availabilityError && <Alert variant="danger" className="mt-3">{availabilityError}</Alert>}
//                                 {availabilityMessage && <Alert variant="success" className="mt-3">{availabilityMessage}</Alert>}
                                
//                                 {/* Add to Cart Section */}
//                                 {isAvailable && (
//                                     <div className="mt-3">
//                                         <Form.Group controlId="formQuantity">
//                                             <Form.Label>Quantity</Form.Label>
//                                             <Form.Control 
//                                                 type="number" 
//                                                 value={quantity} 
//                                                 onChange={(e) => setQuantity(parseInt(e.target.value, 10))} 
//                                                 min={1}
//                                             />
//                                         </Form.Group>
//                                         <Button variant="success" onClick={handleAddToCart}>
//                                             Add to Cart
//                                         </Button>
//                                     </div>
//                                 )}
//                             </Card.Body>
//                         </Col>
//                     </Row>
//                 </Card>
//             )}
//         </Container>
//     );
// };

// export default ProductDetail;

