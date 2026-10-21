
import API from "../api/api";

export const getWelcomeMessageSettings = async () => {
   try {
      const res = await API.get("/welcome-message-settings");
      return res.data;
   } catch (err) {
      console.error(
         "Get Welcome Message Settings Error:",
         err.response?.data || err.message
      );
      throw err;
   }
};

export const updateWelcomeMessageSettings = async (data) => {
   try {
      const res = await API.put("/welcome-message-settings", data);
      return res.data;
   } catch (err) {
      console.error(
         "Update Welcome Message Settings Error:",
         err.response?.data || err.message
      );
      throw err;
   }
};
