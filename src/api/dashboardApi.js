// src/api/dashboardApi.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard/metrics";

export const getMetrics = () => {
  return axios.get(API_URL);
};
