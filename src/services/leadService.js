import API from "../api/api";

// ✅ GET LEADS (SECURE)
export const getLeads = async () => {
   try {
      const res = await API.get("/leads"); // 🔥 no tenantId
      return res.data;
   } catch (err) {
      console.error("Get Leads Error:", err.response?.data || err.message);
      throw err;
   }
};