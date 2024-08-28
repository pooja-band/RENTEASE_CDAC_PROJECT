import axiosInstance from './axiosInstance';

// Fetch category details
export const getCategoryDetails = async (id) => {
    const response = await axiosInstance.get(`/category/${id}`);
    return response.data;
};

// Update category
export const updateCategory = async (id, data) => {
    const response = await axiosInstance.put(`/category/admin/update/${sessionStorage.id}`, data);
    return response.data;
};

// Fetch category types
export const getCategoryTypes = async () => {
    const response = await axiosInstance.get('/category/types'); // Ensure this endpoint matches your backend
    return response.data;
};
