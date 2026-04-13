import axios from "axios";

const API = axios.create({
   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
   timeout: 10000,
});

// 🔥 Optional: request interceptor
API.interceptors.request.use((config) => {
   // future: auth token, headers
   return config;
});

// 🔥 Optional: response interceptor
API.interceptors.response.use(
   (response) => response,
   (error) => {
      console.error("API Error:", error.response?.data || error.message);
      return Promise.reject(error);
   }
);

export default API;