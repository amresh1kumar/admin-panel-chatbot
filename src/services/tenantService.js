import API from "../api/api";

export const createTenant = (data) => {
   return API.post("/tenant", data);
};

export const connectWhatsApp = (tenantId, data) => {
   return API.put(`/tenant/${tenantId}`, data);
};