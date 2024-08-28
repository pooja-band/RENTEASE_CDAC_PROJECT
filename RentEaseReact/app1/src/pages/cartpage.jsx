import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Image, Button } from 'react-bootstrap';
import { getCartIdByLesseeId, getCartItems, removeProductFromCart } from '../services/cart'; // Adjust the path if necessary
import { getProductImage } from '../services/productService'; // Import the function for fetching product images
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // For loading state
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCartDetails = async () => {
            const lesseeId = sessionStorage.getItem('id'); // Retrieve lesseeId from session storage or any other method

            if (!lesseeId) {
                setError('Lessee ID is not found in session storage');
                setLoading(false);
                return;
            }

            try {
                const cartId = await getCartIdByLesseeId(lesseeId);
                const data = await getCartItems(cartId);
                
                const itemsWithImages = await Promise.all(
                    data.cartItems.map(async (item) => ({
                        ...item,
                        productImage: await getProductImage(item.product.id) // Fetch image for each product
                    }))
                );

                setCartItems(itemsWithImages);
                setTotalCartPrice(data.totalCartPrice);
            } catch (err) {
                setError('Error fetching cart items');
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchCartDetails();
    }, []);

    const handleRemoveItem = async (productId) => {
        const lesseeId = sessionStorage.getItem('id');
        if (!lesseeId) {
            setError('Lessee ID is not found in session storage');
            return;
        }

        try {
            await removeProductFromCart(lesseeId, productId);
            // Remove the item from the cartItems state
            setCartItems(cartItems.filter(item => item.product.id !== productId));
            // Recalculate the total price
            setTotalCartPrice(cartItems.reduce((acc, item) => acc + (item.product.id !== productId ? item.totalPrice : 0), 0));
            toast.success('Item removed from cart');
        } catch (err) {
            setError('Error removing item from cart');
        }
    };

    const handleCheckout = () => {
        // Navigate to the /order page
        navigate('/order');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container className="mt-4">
            <Row>
                <Col md={10} className="mx-auto">
                    <h1 className="text-center mb-4">Shopping Cart</h1>
                    {error && <div className="text-danger text-center">{error}</div>}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Actions</th> {/* Added Actions column */}
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.product.id}>
                                    <td>
                                        <Image
                                            src={item.productImage}
                                            rounded
                                            width="50"
                                            height="50"
                                            alt={item.product.name}
                                        />{' '}
                                        {item.product.name}
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>${item.product.productPrice.toFixed(2)}</td>
                                    <td>${item.totalPrice.toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleRemoveItem(item.product.id)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h3 className="text-right">Total: ${totalCartPrice.toFixed(2)}</h3>
                    <Button variant="success" onClick={handleCheckout} className="float-right mt-3">
                        Proceed to Checkout
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;


// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Table, Image, Button } from 'react-bootstrap';
// import { getCartIdByLesseeId, getCartItems, removeProductFromCart } from '../services/cart'; // Adjust the path if necessary
// import { getProductImage } from '../services/productService'; // Import the function for fetching product images
// import { toast } from 'react-toastify';

// const CartPage = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [totalCartPrice, setTotalCartPrice] = useState(0);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true); // For loading state

//     useEffect(() => {
//         const fetchCartDetails = async () => {
//             const lesseeId = sessionStorage.getItem('id'); // Retrieve lesseeId from session storage or any other method

//             if (!lesseeId) {
//                 setError('Lessee ID is not found in session storage');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const cartId = await getCartIdByLesseeId(lesseeId);
//                 const data = await getCartItems(cartId);
                
//                 const itemsWithImages = await Promise.all(
//                     data.cartItems.map(async (item) => ({
//                         ...item,
//                         productImage: await getProductImage(item.product.id) // Fetch image for each product
//                     }))
//                 );

//                 setCartItems(itemsWithImages);
//                 setTotalCartPrice(data.totalCartPrice);
//             } catch (err) {
//                 setError('Error fetching cart items');
//             } finally {
//                 setLoading(false); // Stop loading
//             }
//         };

//         fetchCartDetails();
//     }, []);

//     const handleRemoveItem = async (productId) => {
//         const lesseeId = sessionStorage.getItem('id');
//         if (!lesseeId) {
//             setError('Lessee ID is not found in session storage');
//             return;
//         }

//         try {
//             await removeProductFromCart(lesseeId, productId);
//             // Remove the item from the cartItems state
//             setCartItems(cartItems.filter(item => item.product.id !== productId));
//             // Recalculate the total price
//             setTotalCartPrice(cartItems.reduce((acc, item) => acc + (item.product.id !== productId ? item.totalPrice : 0), 0));
//             toast.success('Item removed from cart');
//         } catch (err) {
//             setError('Error removing item from cart');
//         }
//     };

//     const handleCheckout = () => {
//         // Implement checkout logic
//         toast.success('Proceeding to checkout');
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <Container className="mt-4">
//             <Row>
//                 <Col md={10} className="mx-auto">
//                     <h1 className="text-center mb-4">Shopping Cart</h1>
//                     {error && <div className="text-danger text-center">{error}</div>}
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Quantity</th>
//                                 <th>Price</th>
//                                 <th>Total</th>
//                                 <th>Actions</th> {/* Added Actions column */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cartItems.map((item) => (
//                                 <tr key={item.id}>
//                                     <td>
//                                         <Image
//                                             src={item.productImage}
//                                             rounded
//                                             width="50"
//                                             height="50"
//                                             alt={item.product.name}
//                                         />{' '}
//                                         {item.product.name}
//                                     </td>
//                                     <td>{item.quantity}</td>
//                                     <td>${item.product.productPrice.toFixed(2)}</td>
//                                     <td>${item.totalPrice.toFixed(2)}</td>
//                                     <td>
//                                         <Button variant="danger" onClick={() => handleRemoveItem(item.product.id)}>
//                                             Remove
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                     <h3 className="text-right">Total: ${totalCartPrice.toFixed(2)}</h3>
//                     <Button variant="success" onClick={handleCheckout} className="float-right mt-3">
//                         Proceed to Checkout
//                     </Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default CartPage;


