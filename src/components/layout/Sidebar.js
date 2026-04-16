import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/api";
import { useTenant } from "../../context/TenantContext";
import "../../styles/Sidebar.css";
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
   LinkOutlined,
   DoubleLeftOutlined,
   DoubleRightOutlined,
   UserAddOutlined
} from "@ant-design/icons";

export default function Sidebar() {
   const navigate = useNavigate();
   const location = useLocation();

   const [openWhatsApp, setOpenWhatsApp] = useState(true);
   const [collapsed, setCollapsed] = useState(false);
   const { tenantId } = useTenant();
   const [connected, setConnected] = useState(false);

   const isActive = (path) => location.pathname === path;


   useEffect(() => {
      if (!tenantId) return;

      API.get(`/tenant/${tenantId}`)
         .then(res => {
            const t = res.data;

            if (t.accessToken && t.phoneNumberId) {
               setConnected(true);
            } else {
               setConnected(false);
            }
         })
         .catch(() => setConnected(false));

   }, [tenantId]);
   return (
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
         {/* Header */}
         {/* <div className="sidebar-header">
            {!collapsed ? (
               <h2 className="sidebar-title">SP Advertising</h2>
            ) : (
               <span className="sidebar-logo">SP</span>
            )}
         </div> */}

         <div className="sidebar-header">
            {!collapsed ? (
               <div style={{ display: "flex", flexDirection: "column" }}>

                  {/* EXISTING */}
                  <h2 className="sidebar-title">SP Advertising</h2>

                  {/* 🔥 NEW ADD */}
                  <div className="connection-status">
                     <span
                        className={`status-dot ${connected ? "status-connected" : "status-disconnected"
                           }`}
                     ></span>

                     <span className="status-text">
                        {connected ? "Connected" : "Not Connected"}
                     </span>
                  </div>

               </div>
            ) : (
               <span className="sidebar-logo">SP</span>
            )}
         </div>

         {/* Menu Items */}
         <div className="sidebar-menu">
            {/* Dashboard */}
            <div
               onClick={() => navigate("/dashboard")}
               className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
               title={collapsed ? "Dashboard" : ""}
            >
               <DashboardOutlined className="menu-icon" />
               {!collapsed && <span className="menu-text">Dashboard</span>}
            </div>

            {/* Shared Inbox */}
            <div
               onClick={() => navigate("/chat")}
               className={`menu-item ${isActive("/chat") ? "active" : ""}`}
               title={collapsed ? "Shared Inbox" : ""}
            >
               <MessageOutlined className="menu-icon" />
               {!collapsed && <span className="menu-text">Shared Inbox</span>}
            </div>

            {/* Leads */}
            <div
               onClick={() => navigate("/leads")}
               className={`menu-item ${isActive("/leads") ? "active" : ""}`}
               title={collapsed ? "Leads" : ""}
            >
               <UserAddOutlined className="menu-icon" />
               {!collapsed && <span className="menu-text">Leads</span>}
            </div>



            {/* WhatsApp Section */}
            {!collapsed && (
               <div className="menu-section">
                  <div
                     onClick={() => setOpenWhatsApp(!openWhatsApp)}
                     className="section-header"
                  >
                     <div className="section-header-left">
                        <WhatsAppOutlined className="menu-icon whatsapp-icon" />
                        <span className="section-title">WhatsApp</span>
                     </div>
                     <span className="dropdown-arrow">
                        {openWhatsApp ? "▾" : "▸"}
                     </span>
                  </div>

                  <div className={`dropdown-menu ${openWhatsApp ? "open" : ""}`}>
                     <div className="submenu-item">
                        <LinkOutlined className="submenu-icon" />
                        <span onClick={() => navigate("/create-account")} className="submenu-text">Connect Account</span>
                     </div>
                     <div className="submenu-item">
                        <RobotOutlined className="submenu-icon" />
                        <span onClick={() => navigate("/bot-messages")} className="submenu-text">Bot Manager</span>
                     </div>
                     <div className="submenu-item">
                        <RobotOutlined className="submenu-icon" />
                        <span onClick={() => navigate("/bot-menus")} className="submenu-text">Bot Menus</span>
                     </div>
                     {/*
                     <div className="submenu-item">
                        <TeamOutlined className="submenu-icon" />
                        <span className="submenu-text">Subscriber Manager</span>
                     </div>
                     <div className="submenu-item">
                        <SendOutlined className="submenu-icon" />
                        <span className="submenu-text">Broadcasting</span>
                     </div>
                     <div className="submenu-item">
                        <CommentOutlined className="submenu-icon" />
                        <span className="submenu-text">Live Chat</span>
                     </div> */}
                     <div className="submenu-item">
                        <ApiOutlined className="submenu-icon" />
                        <span className="submenu-text">Webhook Workflow</span>
                     </div>
                     {/* <div className="submenu-item">
                        <SendOutlined className="submenu-icon" />
                        <span className="submenu-text">Click Ads</span>
                     </div>
                     <div className="submenu-item">
                        <ShoppingCartOutlined className="submenu-icon" />
                        <span className="submenu-text">eCommerce Catalog</span>
                     </div> */}
                  </div>
               </div>
            )}

            {/* WhatsApp Icon Only (When Collapsed) */}
            {collapsed && (
               <div className="menu-item" title="WhatsApp">
                  <WhatsAppOutlined className="menu-icon whatsapp-icon" />
               </div>
            )}

            {/* Social Section */}
            {/* <div className="menu-section">
               {!collapsed && (
                  <div className="section-label">SOCIAL</div>
               )}
               <div className="menu-item" title={collapsed ? "Facebook" : ""}>
                  <FacebookFilled className="menu-icon facebook-icon" />
                  {!collapsed && <span className="menu-text">Facebook</span>}
               </div>
               <div className="menu-item" title={collapsed ? "Instagram" : ""}>
                  <InstagramOutlined className="menu-icon instagram-icon" />
                  {!collapsed && <span className="menu-text">Instagram</span>}
               </div>
               <div className="menu-item" title={collapsed ? "Webchat" : ""}>
                  <GlobalOutlined className="menu-icon" />
                  {!collapsed && <span className="menu-text">Webchat</span>}
               </div>
            </div> */}
         </div>

         {/* Toggle Button */}
         <div className="sidebar-footer">
            <div
               onClick={() => setCollapsed(!collapsed)}
               className="toggle-btn"
            >
               {collapsed ? (
                  <DoubleRightOutlined className="toggle-icon" />
               ) : (
                  <>
                     <DoubleLeftOutlined className="toggle-icon" />
                     <span className="toggle-text">Collapse</span>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}