import API from "../api/api";

export const getCallingSetting = async () => {
   try {
      const res = await API.get("/calling-settings");

      return res.data;
   } catch (err) {
      console.error(
         "Get Calling Setting Error:",
         err.response?.data || err.message,
      );

      throw err;
   }
};

export const updateCallingSetting = async (data) => {
   try {
      const res = await API.put("/calling-settings", data);

      return res.data;
   } catch (err) {
      console.error(
         "Update Calling Setting Error:",
         err.response?.data || err.message,
      );

      throw err;
   }
};
