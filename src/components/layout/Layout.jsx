import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
   return (
      <div
         style={{
            display: "flex",
            width: "100%",
            height: "100vh",
            margin: 0,
            padding: 0,
         }}
      >
         <Sidebar />

         <main
            style={{
               flex: 1,
               minWidth: 0,
               height: "100vh",
               overflowY: "auto",
               background: "#f5f7fb",
               padding: "10px",
            }}
         >
            <Outlet />
         </main>
      </div>
   );
}