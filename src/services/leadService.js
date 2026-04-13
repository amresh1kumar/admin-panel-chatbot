import API from "../api/api";

export const getLeads = (tenantId) => {
   return API.get(`/leads/${tenantId}`);
};