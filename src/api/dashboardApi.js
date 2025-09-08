
import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard";

export const getMetrics = async () => {
  try {
    const response = await axios.get(`${API_URL}/metrics`);
    return response; 
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    throw error;
  }
};
