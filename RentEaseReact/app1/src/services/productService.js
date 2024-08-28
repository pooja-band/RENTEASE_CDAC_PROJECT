import axiosInstance from './axiosInstance';







// Check product availability
export async function checkAvailability(availabilityCheckDTO) {
    try {
        console.log('token', sessionStorage.getItem('token')); 
        const response = await axiosInstance.post('/bookings/lessee/check-availability', availabilityCheckDTO);
        return response.data;
    } catch (error) {
        console.error('Error checking availability:', error);
        throw error;
    }
}

// Fetch product details by ID
export async function getProductDetails(productId) {
    try {
        console.log('token', sessionStorage.getItem('token')); 
        const response = await axiosInstance.get(`/products/lessee/byProductId/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
}
// Fetch all products with pagination and sorting
export async function getAllProducts(page = 0, size = 20, sortBy = 'name', order = 'asc') {
    try {
        const response = await axiosInstance.get('/products/lessee', {
            params: { page, size, sortBy, order },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
}

// Fetch products by category
export async function getProductsByCategory(categoryName) {
    try {
        const response = await axiosInstance.get(`/products/lessee/category/${categoryName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
}

// Fetch products by brand
export async function getProductsByBrand(brandName) {
    try {
        const response = await axiosInstance.get(`/products/lessee/brand/${brandName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by brand:', error);
        throw error;
    }
}

// Fetch products by price
export async function getProductsByPrice(price) {
    try {
        const response = await axiosInstance.get(`/products/lessee/price/${price}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by price:', error);
        throw error;
    }
}


export async function getProductImage(prodId) {
    try {
        const response = await axiosInstance.get(`/products/images/${prodId}`, {
            responseType: 'arraybuffer',
        });
        
        // Convert the image to a base64 string
        const base64 = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        // Extract or default to a common image content type
        const contentType = response.headers['content-type'] || 'image/png';

        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        console.error(`Error fetching product image for product ID ${prodId}:`, error.message);
        throw new Error('Failed to load the product image. Please try again later.');
    }
}

// Add product to cart
export async function addToCart(productId, quantity) {
    try {
        const token = sessionStorage.getItem('token');
        const lesseeId = sessionStorage.getItem('id');

        const response = await axiosInstance.post(
            '/carts/lessee/addProduct', // Corrected endpoint
            { productId, quantity }, // Request body with DTO
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Correct Authorization header
                    'Content-Type': 'application/json',
                },
                params: {
                    lesseeId // Query parameter
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
        throw error;
    }
}