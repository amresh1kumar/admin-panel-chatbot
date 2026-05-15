import {
   Navigate,
   Outlet
} from "react-router-dom";

export default function
   AdminProtectedRoute() {

   const user =
      JSON.parse(
         localStorage.getItem(
            "user"
         )
      );

   if (!user?.isSuperAdmin) {
      return (
         <Navigate
            to="/dashboard"
         />
      );
   }

   return <Outlet />;
}