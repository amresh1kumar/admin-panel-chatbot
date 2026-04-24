
import API from "../api/api";

export const getUsers = async () => {
   try {
      const res = await API.get("/users"); 
      return res.data;
   } catch (err) {
      console.error("Get Users Error:", err.response?.data || err.message);
      throw err;
   }
};