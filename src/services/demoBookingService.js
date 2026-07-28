import API from "../api/api";

export const createDemoBooking = (data) => {
   return API.post("/demo-booking", data);
};