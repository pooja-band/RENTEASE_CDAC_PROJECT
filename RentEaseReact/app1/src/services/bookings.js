// services/booking.js

import axiosInstance from './axiosInstance';

export const getBookingsForLessee = async (lesseeId) => {
    try {
        const response = await axiosInstance.get(`/bookings/lessee/${lesseeId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booking details:", error);
        throw error;
    }
};

//To create booking
export const createBooking = async (bookingData) => {
    try {
        const response = await axiosInstance.post('/bookings/lessee/createBooking', bookingData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
};