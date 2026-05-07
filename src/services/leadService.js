import API from "../api/api";

export const getLeads = async () => {
   try {
      const res = await API.get("/leads");
      return res.data;
   } catch (err) {
      console.error("Get Leads Error:", err.response?.data || err.message);
      throw err;
   }
};

export const deleteLead = async (id) => {
   try {
      const res = await API.delete(`/leads/${id}`);
      return res.data;
   } catch (err) {
      console.error("Delete Lead Error:", err.response?.data || err.message);
      throw err;
   }
};

export const deleteMultipleLeads = async (ids) => {
   try {
      const res = await API.post("/leads/delete-multiple", { ids });
      return res.data;
   } catch (err) {
      console.error("Delete Multiple Leads Error:", err.response?.data || err.message);
      throw err;
   }
};

export const updateLeadStatus = async (id, status) => {
   try {
      const res = await API.put(`/leads/${id}/status`, { status });
      return res.data;
   } catch (err) {
      console.error("Update Status Error:", err.response?.data || err.message);
      throw err;
   }
};

// 🔹 ADD NOTE
export const addLeadNote = async (id, text) => {
   try {
      const res = await API.post(`/leads/${id}/note`, { text });
      return res.data;
   } catch (err) {
      console.error("Add Note Error:", err.response?.data || err.message);
      throw err;
   }
};


export const sendBulkMessage = async ({ ids, message }) => {
   try {
      const res = await API.post("/bulk-message", {
         ids,
         message
      });

      return res.data;

   } catch (err) {
      console.error(
         "Bulk Message Error:",
         err.response?.data || err.message
      );
      throw err;
   }
};


export const getBroadcastHistory = async () => {
   try {

      const res = await API.get("/history");

      return res.data;

   } catch (err) {
      console.error(
         "Broadcast History Error:",
         err.response?.data || err.message
      );

      throw err;
   }
};