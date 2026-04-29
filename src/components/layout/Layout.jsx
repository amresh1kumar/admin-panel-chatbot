// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//    return (
//       <div style={{ display: "flex", height: "100vh" }}>

//          <Sidebar />

//          <div style={{
//             flex: 1,
//             overflowY: "auto",
//             background: "#f5f7fb",
//             padding: "10px"
//          }}>
//             <Outlet /> 
//          </div>

//       </div>
//    );
// }

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
   return (
      <div style={{ display: "flex", height: "100vh" }}>
         <Sidebar />
         <div style={{
            flex: 1,
            overflowY: "auto",
            background: "#f5f7fb",
            padding: "10px"
         }}>
            <Outlet />
         </div>
      </div>
   );
}