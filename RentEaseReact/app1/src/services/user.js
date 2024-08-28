import axios from 'axios';
import config from '../config';
import axiosInstance from './axiosInstance';

// Fetch user details by ID
export async function getUserDetails(id) {
    try {
        const response = await axiosInstance.get(`/users/profile/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}



// Update user details
export async function updateUser(id, userData) {
    try {
        const response = await axiosInstance.put(`/users/update/profile/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user details:', error);
        throw error;
    }
}


export async function register(firstName, lastName, email, phoneNo, password, dob, photoId, address, city, state, country, postalCode, role) {
  // Body parameters
  const body = {
    firstName,
    lastName,
    email,
    phoneNo,
    password,
    dob,
    photoId,
    role,
    address,
    city,
    state,
    country,
    postalCode,
  };

  try {
    // Make API call
    const response = await axios.post(`${config.url}/users/signup`, body);

    // Return response data and status code
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // Handle errors
    console.error('Registration error:', error);
    return {
      data: error.response ? error.response.data : { message: 'An error occurred' },
      status: error.response ? error.response.status : 500,
    };
  }
}

export async function login(email, password) {
  // Body parameters
  const body = {
    email,
    password,
  };

  try {
    // Make API call
    const response = await axios.post(`${config.url}/users/signin`, body);
    console.log(response)
    // Return response data and status code
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // Handle errors
    console.error('Login error:', error);
    return {
      data: error.response ? error.response.data : { message: 'An error occurred' },
      status: error.response ? error.response.status : 500,
    };
  }
}


