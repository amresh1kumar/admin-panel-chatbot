import API from "../api/api";

export const getChats = (tenantId, phone) => {
   return API.get(`/chats/${tenantId}/${phone}`);
};


export const sendChatMessage = (tenantId, to, message) => {
   return API.post("/send-message", {
      tenantId,
      to,
      message
   });
};