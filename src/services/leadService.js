import API from "../api/api";

export const getLeads = async (params = {}) => {
   try {
      const res = await API.get("/leads", {
         params,
      });

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

export const exportLeads = async (params = {}) => {
   try {
      const res = await API.get("/leads/export", {
         params,
         responseType: "blob",
      });

      return res.data;
   } catch (err) {
      console.error("Export Leads Error:", err.response?.data || err.message);

      throw err;
   }
};

export const exportLeadContacts = async (params = {}) => {
   try {
      const res = await API.get("/leads/export-contacts", {
         params,
         responseType: "blob",
      });

      return res.data;
   } catch (err) {
      console.error(
         "Export Lead Contacts Error:",
         err.response?.data || err.message,
      );

      throw err;
   }
};

export const updateLead = async (id, data) => {
   try {
      const res = await API.put(`/leads/${id}`, data);
      return res.data;
   } catch (err) {
      console.error("Update Lead Error:", err.response?.data || err.message);
      throw err;
   }
};

export const deleteMultipleLeads = async (ids) => {
   try {
      const res = await API.post("/leads/delete-multiple", { ids });
      return res.data;
   } catch (err) {
      console.error(
         "Delete Multiple Leads Error:",
         err.response?.data || err.message,
      );
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

export const addLeadNote = async (id, text) => {
   try {
      const res = await API.post(`/leads/${id}/note`, { text });
      return res.data;
   } catch (err) {
      console.error("Add Note Error:", err.response?.data || err.message);
      throw err;
   }
};
