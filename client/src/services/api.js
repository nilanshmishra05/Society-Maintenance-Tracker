import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getUploadsUrl = (filename) => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  // Strip trailing slash if present
  const cleanApiUrl = apiUrl.replace(/\/$/, "");
  const baseUrl = cleanApiUrl.endsWith("/api") ? cleanApiUrl.slice(0, -4) : cleanApiUrl;
  return `${baseUrl}/uploads/${filename}`;
};

export default API;