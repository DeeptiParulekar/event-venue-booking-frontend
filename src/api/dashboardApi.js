// // src/api/dashboardApi.js
// import axios from "axios";

// const API_URL = "http://localhost:8080/api/dashboard/metrics";

// export const getMetrics = () => {
//   return axios.get(API_URL);
// };


// src/api/dashboardApi.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard";

export const getMetrics = async () => {
  try {
    const response = await axios.get(`${API_URL}/metrics`);
    return response; // send full response so Dashboard.js can use response.data
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    throw error;
  }
};
