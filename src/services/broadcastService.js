// import API from "../api/api";

// export const sendBulkMessage = async ({
//    ids,
//    message,
//    name,
//    audienceType
// }) => {
//    try {

//       const res = await API.post("/bulk-message", {
//          ids,
//          message,
//          name,
//          audienceType
//       });

//       return res.data;

//    } catch (err) {

//       console.error(
//          "Bulk Message Error:",
//          err.response?.data || err.message
//       );

//       throw err;
//    }
// };

// export const getBroadcastHistory = async ({
//    search = "",
//    status = ""
// } = {}) => {

//    try {

//       const res = await API.get("/history", {
//          params: {
//             search,
//             status
//          }
//       });

//       return res.data;

//    } catch (err) {

//       console.error(
//          "Broadcast History Error:",
//          err.response?.data || err.message
//       );

//       throw err;
//    }

// };


import API from "../api/api";

export const sendBulkMessage = async ({
   // ids,
   // name,
   // audienceType,

   // // Text
   // message,

   // // Template
   // type = "text",
   // templateName = "",
   // params = [],
   // mediaUrl = ""

   ids,
   message,
   name,
   audienceType,
   batchId,
   type,
   templateName,
   params,
   mediaUrl
}) => {
   try {

      const res = await API.post("/bulk-message", {
         // ids,
         // name,
         // audienceType,

         // message,

         // type,
         // templateName,
         // params,
         // mediaUrl

         ids,
         message,
         name,
         audienceType,
         batchId,
         type,
         templateName,
         params,
         mediaUrl
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