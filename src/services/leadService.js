import API from "../api/api";

export const getLeads = async () => {
   try {
      const res = await API.get("/leads"); // 🔥 no tenantId
      return res.data;
   } catch (err) {
      console.error("Get Leads Error:", err.response?.data || err.message);
      throw err;
   }
};

export const deleteLead = async (id) => {
   const res = await API.delete(`/leads/${id}`);
   return res.data;
};