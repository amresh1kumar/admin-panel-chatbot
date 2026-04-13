import API from "../api/api";

export const getUsers = (tenantId) => {
   return API.get(`/users/${tenantId}`);
};