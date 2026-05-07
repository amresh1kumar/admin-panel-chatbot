import API from "../api/api";

export const sendBulkMessage = async ({ ids, message, name }) => {
   try {
      const res = await API.post("/bulk-message", {
         ids,
         message,
         name
      });

      return res.data;

   } catch (err) {
      console.error(
         "Bulk Message Error:",
         err.response?.data || err.message
      );
      throw err;
   }
};


export const getBroadcastHistory = async ({
   search = "",
   status = ""
} = {}) => {
   try {

      const res = await API.get("/history", {
         params: {
            search,
            status
         }
      });

      return res.data;

   } catch (err) {
      console.error(
         "Broadcast History Error:",
         err.response?.data || err.message
      );

      throw err;
   }
};