
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Sidebar() {
//    const navigate = useNavigate();
//    const location = useLocation();

//    const menu = [
//       { key: "/dashboard", label: "Dashboard" },
//       { key: "/chat", label: "Inbox" },
//       { key: "/leads", label: "Leads" }
//    ];

//    return (
//       <div style={{
//          width: "240px",
//          background: "#0f172a",
//          color: "#fff",
//          padding: "10px"
//       }}>
//          <h2 style={{ color: "#fff" }}>🚀 SaaS</h2>

//          {menu.map(item => (
//             <div
//                key={item.key}
//                onClick={() => navigate(item.key)}
//                style={{
//                   padding: "10px",
//                   marginTop: "10px",
//                   cursor: "pointer",
//                   borderRadius: "6px",
//                   background:
//                      location.pathname === item.key ? "#1e293b" : "transparent"
//                }}
//             >
//                {item.label}
//             </div>
//          ))}
//       </div>
//    );
// }

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import {
   DashboardOutlined,
   MessageOutlined,
   WhatsAppOutlined,
   RobotOutlined,
   TeamOutlined,
   SendOutlined,
   CommentOutlined,
   ApiOutlined,
   ShoppingCartOutlined,
   FacebookFilled,
   InstagramOutlined,
   GlobalOutlined,
   LinkOutlined
} from "@ant-design/icons";
import { SiGoogleads } from "react-icons/si";
export default function Sidebar() {
   const navigate = useNavigate();
   const location = useLocation();

   const [openWhatsApp, setOpenWhatsApp] = useState(true);

   const isActive = (path) => location.pathname === path;

   return (
      <div
         style={{
            width: "250px",
            background: "#fff",
            color: "#000",
            height: "90vh",
            padding: "15px",
         }}
      >
         <h2 style={{ marginBottom: "20px" }}>🚀 SaaS</h2>

         {/* Dashboard */}
         <div
            onClick={() => navigate("/dashboard")}
            style={menuStyle(isActive("/dashboard"))}
         >
            <DashboardOutlined /> <span style={{ marginLeft: 10 }}>Dashboard</span>
         </div>

         {/* Shared Inbox */}
         <div
            onClick={() => navigate("/chat")}
            style={menuStyle(isActive("/chat"))}
         >
            <MessageOutlined /> <span style={{ marginLeft: 10 }}>Shared Inbox</span>
         </div>
         <div
            onClick={() => navigate("/leads")}
            style={menuStyle(isActive("/leads"))}
         >
            <SiGoogleads /><span style={{ marginLeft: 10 }}>Leads</span>
         </div>

         {/* WhatsApp Section */}
         <div style={{ marginTop: "20px" }}>
            <div
               onClick={() => setOpenWhatsApp(!openWhatsApp)}
               style={{ ...menuStyle(false), fontWeight: "bold" }}
            >
               <WhatsAppOutlined />
               <span style={{ marginLeft: 10 }}>WhatsApp</span>
               <span style={{ float: "right" }}>
                  {openWhatsApp ? "▾" : "▸"}
               </span>
            </div>

            {openWhatsApp && (
               <div style={{ marginLeft: "15px" }}>
                  <div style={menuStyle(false)}>
                     <LinkOutlined /> <span style={{ marginLeft: 10 }}>Connect Account</span>
                  </div>
                  {/* <div style={menuStyle(false)}>
                     <RobotOutlined /> <span style={{ marginLeft: 10 }}>Bot Manager</span>
                  </div>
                  <div style={menuStyle(false)}>
                     <TeamOutlined /> <span style={{ marginLeft: 10 }}>Subscriber Manager</span>
                  </div>
                  <div style={menuStyle(false)}>
                     <SendOutlined /> <span style={{ marginLeft: 10 }}>Broadcasting</span>
                  </div>
                  <div style={menuStyle(false)}>
                     <CommentOutlined /> <span style={{ marginLeft: 10 }}>Live Chat</span>
                  </div>
                  <div style={menuStyle(false)}>
                     <ApiOutlined /> <span style={{ marginLeft: 10 }}>Webhook Workflow</span>
                  </div>
                  <div style={menuStyle(false)}>
                     <SendOutlined /> <span style={{ marginLeft: 10 }}>Click Ads</span>
                  </div>
                  <div style={menuStyle(false)}>
                     <ShoppingCartOutlined /> <span style={{ marginLeft: 10 }}>eCommerce Catalog</span>
                  </div> */}
               </div>
            )}
         </div>

         {/* Social Section */}
         {/* <div style={{ marginTop: "20px" }}>
            <div style={menuStyle(false)}>
               <FacebookFilled /> <span style={{ marginLeft: 10 }}>Facebook</span>
            </div>
            <div style={menuStyle(false)}>
               <InstagramOutlined /> <span style={{ marginLeft: 10 }}>Instagram</span>
            </div>

         </div> */}
      </div>
   );
}

// style
const menuStyle = (active) => ({
   padding: "10px",
   marginTop: "8px",
   cursor: "pointer",
   borderRadius: "6px",
   display: "flex",
   alignItems: "center",
   background: active ? "skyblue" : "transparent",
});