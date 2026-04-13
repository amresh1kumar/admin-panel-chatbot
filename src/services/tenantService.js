import API from "../api/api";

export const createTenant = (data) => {
   return API.post("/tenant", data);
};