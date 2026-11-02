import API from "../api/api";

export const sendBulkMessage = async ({ ids, message, name, audienceType, batchId, type, templateName, params, mediaUrl, sendMode, scheduledAt, }) => {
   try {
      const res = await API.post("/bulk-message", {
         ids, message, name, audienceType, batchId, type,
         templateName, params, mediaUrl, sendMode, scheduledAt,
      });

      return res.data;
   } catch (err) {
      console.error("Bulk Message Error:", err.response?.data || err.message);

      throw err;
   }
};

export const getBroadcastHistory = async ({ search = "", status = "", } = {}) => {
   try {
      const res = await API.get("/history", {
         params: {
            search,
            status,
         },
      });

      return res.data;
   } catch (err) {
      console.error(
         "Broadcast History Error:",
         err.response?.data || err.message,
      );

      throw err;
   }
};

export const deleteBroadcast = async (id) => {
   try {
      const res = await API.delete(`/broadcast/${id}`);
      return res.data;
   } catch (err) {
      console.error(
         "Delete Broadcast Error:",
         err.response?.data || err.message
      );

      throw err;
   }
};