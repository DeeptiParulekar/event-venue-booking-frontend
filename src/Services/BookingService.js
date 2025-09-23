// // bookingService.js
// import axios from "axios";
// // Base URL of your backend API
// const BASE_URL = "http://localhost:8080/api/booking";

// /**
//  * Create a new booking
//  * @param {Object} bookingData - { venueName, bookingDate, totalAmount }
//  * @returns {Promise<Object>} - Response data from backend
//  */
// export const createBooking = async (bookingData) => {
//   try {
//     const token = localStorage.getItem("token"); // JWT token
//     const response = await axios.post(BASE_URL, bookingData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // Throw error so frontend component can catch it
//     throw error;
//   }
// };

// /**
//  * Fetch all bookings for logged-in user
//  * @returns {Promise<Array>} - List of bookings
//  */
// export const getBookings = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(BASE_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Delete a booking by ID
//  * @param {number} bookingId
//  */
// export const deleteBooking = async (bookingId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.delete(`${BASE_URL}/${bookingId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Update an existing booking
//  * @param {Object} bookingData - { bookingId, venueName, bookingDate, totalAmount, status }
//  * @returns {Promise<Object>}
//  */
// export const updateBooking = async (bookingData) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.put(BASE_URL, bookingData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


import axios from "axios";

// Base URL of your backend API
const BASE_URL = "http://localhost:8080/api/booking";

/**
 * Create a new booking
 * @param {Object} bookingData - { venueName, bookingDate, totalAmount }
 * @returns {Promise<Object>} - Response data from backend
 */
export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token"); // JWT token
    const response = await axios.post(`${BASE_URL}/createBooking`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error; // frontend will catch this
  }
};

/**
 * Fetch all bookings for logged-in user
 * @returns {Promise<Array>} - List of bookings
 */
export const getBookings = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/getAllBookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a booking by ID
 * @param {number} bookingId
 */
export const deleteBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/deleteBooking?bookingId=${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update an existing booking
 * @param {Object} bookingData - { bookingId, venueName, bookingDate, totalAmount, status }
 * @returns {Promise<Object>}
 */
export const updateBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/updateBooking?bookingId=${bookingData.bookingId}`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
