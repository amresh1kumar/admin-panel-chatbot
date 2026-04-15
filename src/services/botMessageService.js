import API from "../api/api";

export const getBotMessages = (tenantId) =>
   API.get(`/bot-messages/${tenantId}`);

export const createBotMessage = (data) =>
   API.post(`/bot-messages`, data);

export const updateBotMessage = (id, data) =>
   API.put(`/bot-messages/${id}`, data);

export const deleteBotMessage = (id) =>
   API.delete(`/bot-messages/${id}`);