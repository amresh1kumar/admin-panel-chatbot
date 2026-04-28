import API from "../api/api";

export const registerUser = async (data) => {
   try {
      const res = await API.post("/auth/register", data);
      return res.data;

   } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
      throw err;
   }
};

export const loginUser = async (data) => {
   try {
      const res = await API.post("/auth/login", data);
      return res.data;

   } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      throw err;
   }
};

export const updateUser = async (data) => {
   try {
      const res = await API.put("/auth/user", data);
      return res.data;

   } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      throw err;
   }
};