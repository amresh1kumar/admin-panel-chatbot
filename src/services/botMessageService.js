import API from "../api/api";

// ✅ GET ALL MESSAGES
export const getBotMessages = async () => {
   try {
      const res = await API.get("/bot-messages"); // 🔥 no tenantId
      return res.data;
   } catch (err) {
      console.error("Get Bot Messages Error:", err.response?.data || err.message);
      throw err;
   }
};

// ✅ CREATE MESSAGE
export const createBotMessage = async (data) => {
   try {
      const res = await API.post("/bot-messages", data);
      return res.data;
   } catch (err) {
      console.error("Create Bot Message Error:", err.response?.data || err.message);
      throw err;
   }
};

// ✅ UPDATE MESSAGE
export const updateBotMessage = async (id, data) => {
   try {
      const res = await API.put(`/bot-messages/${id}`, data);
      return res.data;
   } catch (err) {
      console.error("Update Bot Message Error:", err.response?.data || err.message);
      throw err;
   }
};

// ✅ DELETE MESSAGE
export const deleteBotMessage = async (id) => {
   try {
      const res = await API.delete(`/bot-messages/${id}`);
      return res.data;
   } catch (err) {
      console.error("Delete Bot Message Error:", err.response?.data || err.message);
      throw err;
   }
};