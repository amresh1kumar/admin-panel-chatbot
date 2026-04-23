import API from "../api/api";

// 🔹 GET TEMPLATES
export const getTemplates = async () => {
   try {
      const res = await API.get("/templates");
      return res.data.data;
   } catch (err) {
      console.error("Get Templates Error:", err.response?.data || err.message);
      throw err;
   }
};

export const sendTemplateMessage = async (
   to,
   templateName,
   params = [],
   mediaUrl = ""
) => {
   try {
      const res = await API.post("/templates/send", {
         to,
         templateName,
         languageCode: "en_US",
         params,
         mediaUrl // 🔥 NEW
      });

      return res.data;
   } catch (err) {
      console.error("Template Error:", err.response?.data || err.message);
      throw err;
   }
};

// 🔹 CREATE TEMPLATE (optional admin use)
export const createTemplate = async (data) => {
   try {
      const res = await API.post("/templates", data);
      return res.data;
   } catch (err) {
      console.error("Create Template Error:", err.response?.data || err.message);
      throw err;
   }
};

export const syncTemplates = async () => {
   try {
      const res = await API.get("/templates/sync");
      return res.data;
   } catch (err) {
      console.error("Sync Error:", err.response?.data || err.message);
      throw err;
   }
};