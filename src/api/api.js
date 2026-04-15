// import axios from "axios";

// const API = axios.create({
//    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
//    timeout: 10000,
// });

// // 🔥 Optional: request interceptor
// API.interceptors.request.use((config) => {
//    // future: auth token, headers
//    return config;
// });

// // 🔥 Optional: response interceptor
// API.interceptors.response.use(
//    (response) => response,
//    (error) => {
//       console.error("API Error:", error.response?.data || error.message);
//       return Promise.reject(error);
//    }
// );

// export default API;

import axios from "axios";

const API = axios.create({
   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
   timeout: 10000,
});

// 🔥 AUTO TOKEN ADD
API.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

export default API;