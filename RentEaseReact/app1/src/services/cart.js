// services/cart.js
import axiosInstance from './axiosInstance'; // Adjust the path if necessary

export const getCartItems = async (cartId) => {
    try {
        const response = await axiosInstance.get(`/carts/lessee/${cartId}/items`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Fetch the cart ID by lessee ID
export const getCartIdByLesseeId = async (lesseeId) => {
    try {
        const response = await axiosInstance.get(`/carts/lessee-cart/${lesseeId}`);
        return response.data; // The response should contain the cart ID
    } catch (error) {
        throw new Error('Error fetching cart ID');
    }
};

// Fetch the Total cart price by cartid
export const getTotalCartPrice = async (cartId) => {
    try {
        const response = await axiosInstance.get(`/carts/lessee/${cartId}/total-price`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching total cart price');
    }
};

// Fetch the total security deposite by cartid
export const getTotalSecurityDeposit = async (cartId) => {
    try {
        const response = await axiosInstance.get(`/carts/lessee/${cartId}/total-security-deposit`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching total security deposit');
    }
};

//To remove product from cart

export const removeProductFromCart = async (lesseeId, productId) => {
    try {
        const response = await axiosInstance.delete('/carts/lessee/removeProduct', {
            params: {
                lesseeId,
                productId,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to remove product from cart');
    }
};