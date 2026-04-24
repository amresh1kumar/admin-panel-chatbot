import API from "../api/api";

export const uploadFile = async (file) => {
   try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await API.post("/upload", formData, {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      });

      return res.data.url;

   } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
      throw err;
   }
};