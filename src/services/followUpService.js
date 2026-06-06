import API from "../api/api";

export const createFollowUp = async (data) => {
   try {
      const res = await API.post("/followups", data);
      return res.data;
   } catch (err) {
      console.error("Create Follow Up Error:", err.response?.data || err.message);
      throw err;
   }
};

export const getLeadFollowUps = async (leadId) => {
   try {
      const res = await API.get(`/followups/${leadId}`);
      return res.data;
   } catch (err) {
      console.error("Get Follow Ups Error:", err.response?.data || err.message);
      throw err;
   }
};

export const completeFollowUp = async (id) => {
   try {
      const res = await API.put(`/followups/${id}/complete`);
      return res.data;
   } catch (err) {
      console.error(
         "Complete Follow Up Error:",
         err.response?.data || err.message,
      );
      throw err;
   }
};

export const deleteFollowUp = async (id) => {
   try {
      const res = await API.delete(`/followups/${id}`);
      return res.data;
   } catch (err) {
      console.error("Delete Follow Up Error:", err.response?.data || err.message);
      throw err;
   }
};

export const getFollowUpStats = async () => {
   try {
      const res = await API.get("/followups/stats");

      return res.data;
   } catch (err) {
      console.error(
         "Get Follow Up Stats Error:",
         err.response?.data || err.message,
      );

      throw err;
   }
};

export const getDueFollowUps = async () => {
   try {

      const res = await API.get(
         "/followups/due"
      );

      return res.data;

   } catch (err) {

      console.error(
         "Get Due FollowUps Error:",
         err.response?.data || err.message
      );

      throw err;
   }
};

export const rescheduleFollowUp = async (
   id,
   followUpDate
) => {
   try {

      const res = await API.put(
         `/followups/${id}/reschedule`,
         { followUpDate }
      );

      return res.data;

   } catch (err) {

      console.error(
         "Reschedule Follow Up Error:",
         err.response?.data || err.message
      );

      throw err;
   }
};

