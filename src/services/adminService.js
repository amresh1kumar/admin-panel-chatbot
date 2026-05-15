import API from "../api/api";

// export const getAllUsers =
//    async () => {

//       try {

//          const res =
//             await API.get(
//                "/admin/users"
//             );

//          return res.data;

//       } catch (err) {

//          console.error(
//             "Get Users Error:",
//             err.response?.data ||
//             err.message
//          );

//          throw err;
//       }
//    };

export const getAllUsers =
   async (
      search = "",
      plan = "all"
   ) => {

      try {

         const res =
            await API.get(
               `/admin/users?search=${search}&plan=${plan}`
            );

         return res.data;

      } catch (err) {

         console.error(
            "Get Users Error:",
            err.response?.data ||
            err.message
         );

         throw err;
      }
   };

export const activatePremium =
   async (data) => {

      try {

         const res =
            await API.post(
               "/admin/activate-premium",
               data
            );

         return res.data;

      } catch (err) {

         console.error(
            "Activate Premium Error:",
            err.response?.data ||
            err.message
         );

         throw err;
      }
   };



export const deleteUser =
   async (id) => {

      try {

         const res =
            await API.delete(
               `/admin/users/${id}`
            );

         return res.data;

      } catch (err) {

         console.error(
            "Delete User Error:",
            err.response?.data ||
            err.message
         );

         throw err;
      }
   };

export const getStats =
   async () => {

      try {

         const res =
            await API.get(
               "/admin/stats"
            );

         return res.data;

      } catch (err) {

         console.error(
            "Stats Error:",
            err.response?.data ||
            err.message
         );

         throw err;
      }
   };   