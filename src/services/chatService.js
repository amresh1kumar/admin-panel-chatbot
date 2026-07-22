import API from "../api/api";

export const getChats = async (phone) => {
   try {
      const res = await API.get(`/chats/${phone}`);
      return res.data;
   } catch (err) {
      console.error("Get Chats Error:", err.response?.data || err.message);
      throw err;
   }
};

export const sendChatMessage = async (to, message) => {
   try {
      const res = await API.post("/chats/send", {
         to,
         message
      });

      return res.data;
   } catch (err) {
      console.error("Send Message Error:", err.response?.data || err.message);
      throw err;
   }
};

export const markAsRead = async (phone) => {
   try {
      await API.put(`/chats/read/${phone}`);
   } catch (err) {
      console.error("Mark Read Error:", err);
   }
};

export const clearChat = async (phone) => {
   try {
      const res = await API.delete(`/chats/clear/${phone}`);
      return res.data;
   } catch (err) {
      console.error("Clear Chat Error:", err.response?.data || err.message);
      throw err;
   }
};

export const sendTemplateMessage = async (
   to,
   templateName,
   params = []
) => {
   try {
      const res = await API.post("/chats/template", {
         to,
         templateName,
         languageCode: "en_US",
         params
      });

      return res.data;
   } catch (err) {
      console.error("Template Error:", err.response?.data || err.message);
      throw err;
   }
};

export const takeOverConversation = async (phone) => {
   try {
      const res = await API.put(`/conversations/takeover/${phone}`);
      return res.data;
   } catch (error) {
      console.error("Take Over Error:", error);
      throw error;
   }
};

export const resumeBotConversation = async (phone) => {
   try {
      const res = await API.put(`/conversations/resume/${phone}`);
      return res.data;
   } catch (error) {
      console.error("Resume Bot Error:", error);
      throw error;
   }
};