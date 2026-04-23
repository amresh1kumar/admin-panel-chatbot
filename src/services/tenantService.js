import API from "../api/api";

// ✅ CREATE TENANT (register flow)
export const createTenant = async (data) => {
   try {
      const res = await API.post("/tenant", data);
      return res.data;
   } catch (err) {
      console.error("Create Tenant Error:", err.response?.data || err.message);
      throw err;
   }
};

// ✅ CONNECT WHATSAPP (SECURE)
export const connectWhatsApp = async (data) => {
   try {
      const res = await API.put("/tenant", data); // 🔥 no tenantId
      return res.data;
   } catch (err) {
      console.error("Connect WhatsApp Error:", err.response?.data || err.message);
      throw err;
   }
};