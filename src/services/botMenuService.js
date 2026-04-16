import API from "../api/api";

export const getMenus = (tenantId) =>
   API.get(`/bot-menus/${tenantId}`);

export const createMenu = (data) =>
   API.post(`/bot-menus`, data);

export const updateMenu = (id, data) =>
   API.put(`/bot-menus/${id}`, data);

export const deleteMenu = (id) =>
   API.delete(`/bot-menus/${id}`);