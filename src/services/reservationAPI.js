
import axios from "axios";

const API = "http://localhost:3001/reservations";

export async function getReservations() {
  const response = await axios.get(API);
  console.log("GET reservations:", response.data);
  return response.data;
}

export async function createReservation(data) {
  const response = await axios.post(API, data);
  console.log("POST reservation:", response.data);
  return response.data;
}

export async function updateReservationAPI(id, data) {
  const response = await axios.put(`${API}/${id}`, data);
  console.log("PUT reservation:", response.data);
  return response.data;
}

export async function deleteReservationAPI(id) {
  const response = await axios.delete(`${API}/${id}`);
  console.log("DELETE reservation:", id);
  return response.data;
}
