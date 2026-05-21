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


export const getSubscriptions =
   async () => {

      try {

         const res =
            await API.get(
               "/admin/subscriptions"
            );

         return res.data;

      } catch (err) {

         console.error(
            "Subscription Error:",
            err.response?.data ||
            err.message
         );

         throw err;
      }
   };


export const getAllTenants =
   async (
      search = ""
   ) => {

      try {

         const res =
            await API.get(
               `/admin/tenants?search=${search}`
            );

         return res.data;

      } catch (err) {

         console.error(
            "Tenant Error:",
            err.response?.data ||
            err.message
         );

         throw err;
      }
   };



export const getRecentUsers =
   async () => {

      try {

         const res =
            await API.get(
               "/admin/recent-users"
            );

         return res.data;

      } catch (err) {

         console.error(
            "Recent Users Error:",
            err.response?.data ||
            err.message
         );

         throw err;
      }
   };   