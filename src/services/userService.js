
import API from "../api/api";

// ✅ GET USERS (SECURE)
export const getUsers = async () => {
   try {
      const res = await API.get("/users"); // 🔥 no tenantId
      return res.data;
   } catch (err) {
      console.error("Get Users Error:", err.response?.data || err.message);
      throw err;
   }
};