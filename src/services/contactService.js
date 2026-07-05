import API from "../api/api";

export const getContacts = async (search = "") => {
   try {
      const res = await API.get("/contacts", {
         params: {
            search,
         },
      });

      return res.data;
   } catch (err) {
      console.error("Get Contacts Error:", err.response?.data || err.message);

      throw err;
   }
};

export const createContact = async ({ name, phone }) => {
   try {
      const res = await API.post("/contacts", {
         name,
         phone,
      });

      return res.data;
   } catch (err) {
      console.error("Create Contact Error:", err.response?.data || err.message);

      throw err;
   }
};

export const deleteContact = async (id) => {
   try {
      const res = await API.delete(`/contacts/${id}`);

      return res.data;
   } catch (err) {
      console.error("Delete Contact Error:", err.response?.data || err.message);

      throw err;
   }
};

export const importContacts = async (file) => {
   try {
      const formData = new FormData();

      formData.append("file", file);

      const res = await API.post("/contacts/import", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });

      return res.data;
   } catch (err) {
      console.error("Import Contacts Error:", err.response?.data || err.message);

      throw err;
   }
};

export const getContactStats = async () => {

   try {

      const res = await API.get("/contacts/stats");

      return res.data;

   } catch (err) {

      console.error(
         "Contact Stats Error:",
         err.response?.data || err.message
      );

      throw err;
   }

};