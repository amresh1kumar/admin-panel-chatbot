import Sidebar from "./Sidebar";

export default function Layout({ children }) {
   return (
      <div style={{ display: "flex", height: "100vh" }}>

         <Sidebar />

         <div style={{ flex: 1 }}>
            {children}
         </div>

      </div>
   );
}