import API from "../api/api";

export const getDashboard = async (tenantId) => {
   try {
      const res = await API.get("/dashboard");
      return res.data;
   } catch (err) {
      console.error("Dashboard Error:", err.response?.data || err.message);
      throw err;
   }
};