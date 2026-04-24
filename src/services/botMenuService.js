import API from "../api/api";

export const getMenus = async () => {
   try {
      const res = await API.get("/bot-menus");
      return res.data;
   } catch (err) {
      console.error("Get Menus Error:", err.response?.data || err.message);
      throw err;
   }
};


export const createMenu = async (data) => {
   try {
      const res = await API.post("/bot-menus", data);
      return res.data;
   } catch (err) {
      console.error("Create Menu Error:", err.response?.data || err.message);
      throw err;
   }
};


export const updateMenu = async (id, data) => {
   try {
      const res = await API.put(`/bot-menus/${id}`, data);
      return res.data;
   } catch (err) {
      console.error("Update Menu Error:", err.response?.data || err.message);
      throw err;
   }
};


export const deleteMenu = async (id) => {
   try {
      const res = await API.delete(`/bot-menus/${id}`);
      return res.data;
   } catch (err) {
      console.error("Delete Menu Error:", err.response?.data || err.message);
      throw err;
   }
};