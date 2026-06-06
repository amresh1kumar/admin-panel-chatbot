import API from "../api/api";

export const getFollowUpSetting = async () => {
   try {
      const res = await API.get("/followup-settings");
      return res.data;
   } catch (err) {
      console.error(
         "Get FollowUp Setting Error:",
         err.response?.data || err.message,
      );
      throw err;
   }
};

export const updateFollowUpSetting = async (data) => {
   try {
      const res = await API.put("/followup-settings", data);
      return res.data;
   } catch (err) {
      console.error(
         "Update FollowUp Setting Error:",
         err.response?.data || err.message,
      );
      throw err;
   }
};
