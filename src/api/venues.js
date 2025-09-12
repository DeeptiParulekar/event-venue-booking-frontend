import axios from "axios";

const API_URL = "http://localhost:8080/api/venues";

export const getAllVenues = () => {
  return axios.get(`${API_URL}/getAll`);
};

export const getVenueById = (id) => {
  return axios.get(`${API_URL}/getById`, { params: { venueId: id } });
};

export const createVenue = (venue) => {
  return axios.post(`${API_URL}/create`, venue);
};

export const updateVenue = (id, venue) => {
  return axios.put(`${API_URL}/update`, venue, { params: { venueId: id } });
};

export const deleteVenue = (id) => {
  return axios.delete(`${API_URL}/delete`, { params: { venueId: id } });
};
