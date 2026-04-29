// import { useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../../api/api";
// import { useTenant } from "../../context/TenantContext";
// import "../../styles/Sidebar.css";
// import {
//    DashboardOutlined,
//    MessageOutlined,
//    WhatsAppOutlined,
//    RobotOutlined,
//    TeamOutlined,
//    SendOutlined,
//    CommentOutlined,
//    ApiOutlined,
//    ShoppingCartOutlined,
//    FacebookFilled,
//    InstagramOutlined,
//    GlobalOutlined,
//    LinkOutlined,
//    DoubleLeftOutlined,
//    DoubleRightOutlined,
//    UserAddOutlined
// } from "@ant-design/icons";
// import { useAuth } from "../../context/AuthContext";

// export default function Sidebar() {
//    const navigate = useNavigate();
//    const location = useLocation();

//    const [openWhatsApp, setOpenWhatsApp] = useState(true);
//    const [collapsed, setCollapsed] = useState(false);
//    const { tenantId } = useTenant();
//    const [connected, setConnected] = useState(false);

//    const isActive = (path) => location.pathname === path;
//    const { logout } = useAuth();


//    useEffect(() => {
//       if (!tenantId) return;

//       API.get("/tenant")
//          .then(res => {
//             const t = res.data;

//             if (t.accessToken && t.phoneNumberId) {
//                setConnected(true);
//             } else {
//                setConnected(false);
//             }
//          })
//          .catch(() => setConnected(false));

//    }, [tenantId]);

//    const handleLogout = () => {
//       logout();
//       navigate("/login");
//    };
//    return (
//       <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//          {/* Header */}
//          {/* <div className="sidebar-header">
//             {!collapsed ? (
//                <h2 className="sidebar-title">SP Advertising</h2>
//             ) : (
//                <span className="sidebar-logo">SP</span>
//             )}
//          </div> */}

//          <div className="sidebar-header">
//             {!collapsed ? (
//                <div style={{ display: "flex", flexDirection: "column" }}>

//                   {/* EXISTING */}
//                   <h2 className="sidebar-title">SP Advertising</h2>

//                   <div className="connection-status">
//                      <span
//                         className={`status-dot ${connected ? "status-connected" : "status-disconnected"
//                            }`}
//                      ></span>

//                      <span className="status-text">
//                         {connected ? "Connected" : "Not Connected"}
//                      </span>
//                   </div>

//                </div>
//             ) : (
//                <span className="sidebar-logo">SP</span>
//             )}
//          </div>

//          {/* Menu Items */}
//          <div className="sidebar-menu">
//             {/* Dashboard */}
//             <div
//                onClick={() => navigate("/dashboard")}
//                className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
//                title={collapsed ? "Dashboard" : ""}
//             >
//                <DashboardOutlined className="menu-icon" />
//                {!collapsed && <span className="menu-text">Dashboard</span>}
//             </div>

//             {/* Shared Inbox */}
//             <div
//                onClick={() => navigate("/chat")}
//                className={`menu-item ${isActive("/chat") ? "active" : ""}`}
//                title={collapsed ? "Shared Inbox" : ""}
//             >
//                <MessageOutlined className="menu-icon" />
//                {!collapsed && <span className="menu-text">Shared Inbox</span>}
//             </div>

//             {/* Leads */}
//             <div
//                onClick={() => navigate("/leads")}
//                className={`menu-item ${isActive("/leads") ? "active" : ""}`}
//                title={collapsed ? "Leads" : ""}
//             >
//                <UserAddOutlined className="menu-icon" />
//                {!collapsed && <span className="menu-text">Leads</span>}
//             </div>



//             {/* WhatsApp Section */}
//             {!collapsed && (
//                <div className="menu-section">
//                   <div
//                      onClick={() => setOpenWhatsApp(!openWhatsApp)}
//                      className="section-header"
//                   >
//                      <div className="section-header-left">
//                         <WhatsAppOutlined className="menu-icon whatsapp-icon" />
//                         <span className="section-title">WhatsApp</span>
//                      </div>
//                      <span className="dropdown-arrow">
//                         {openWhatsApp ? "▾" : "▸"}
//                      </span>
//                   </div>

//                   <div className={`dropdown-menu ${openWhatsApp ? "open" : ""}`}>
//                      <div className="submenu-item">
//                         <LinkOutlined className="submenu-icon" />
//                         <span onClick={() => navigate("/create-account")} className="submenu-text">Connect Account</span>
//                      </div>
//                      <div className="submenu-item">
//                         <RobotOutlined className="submenu-icon" />
//                         <span onClick={() => navigate("/bot-messages")} className="submenu-text">Bot Message</span>
//                      </div>
//                      <div className="submenu-item">
//                         <RobotOutlined className="submenu-icon" />
//                         <span onClick={() => navigate("/bot-menus")} className="submenu-text">Bot Menus</span>
//                      </div>
//                      {/*
//                      <div className="submenu-item">
//                         <TeamOutlined className="submenu-icon" />
//                         <span className="submenu-text">Subscriber Manager</span>
//                      </div>
//                      <div className="submenu-item">
//                         <SendOutlined className="submenu-icon" />
//                         <span className="submenu-text">Broadcasting</span>
//                      </div>
//                      <div className="submenu-item">
//                         <CommentOutlined className="submenu-icon" />
//                         <span className="submenu-text">Live Chat</span>
//                      </div> */}
//                      {/* <div className="submenu-item">
//                         <ApiOutlined className="submenu-icon" />
//                         <span className="submenu-text">Webhook Workflow</span>
//                      </div> */}
//                      {/* <div className="submenu-item">
//                         <SendOutlined className="submenu-icon" />
//                         <span className="submenu-text">Click Ads</span>
//                      </div>
//                      <div className="submenu-item">
//                         <ShoppingCartOutlined className="submenu-icon" />
//                         <span className="submenu-text">eCommerce Catalog</span>
//                      </div> */}
//                   </div>
//                </div>
//             )}

//             {/* WhatsApp Icon Only (When Collapsed) */}
//             {collapsed && (
//                <div className="menu-item" title="WhatsApp">
//                   <WhatsAppOutlined className="menu-icon whatsapp-icon" />
//                </div>
//             )}

//             {/* Social Section */}
//             {/* <div className="menu-section">
//                {!collapsed && (
//                   <div className="section-label">SOCIAL</div>
//                )}
//                <div className="menu-item" title={collapsed ? "Facebook" : ""}>
//                   <FacebookFilled className="menu-icon facebook-icon" />
//                   {!collapsed && <span className="menu-text">Facebook</span>}
//                </div>
//                <div className="menu-item" title={collapsed ? "Instagram" : ""}>
//                   <InstagramOutlined className="menu-icon instagram-icon" />
//                   {!collapsed && <span className="menu-text">Instagram</span>}
//                </div>
//                <div className="menu-item" title={collapsed ? "Webchat" : ""}>
//                   <GlobalOutlined className="menu-icon" />
//                   {!collapsed && <span className="menu-text">Webchat</span>}
//                </div>
//             </div> */}

//             <div
//                onClick={() => navigate("/profile")}
//                className={`menu-item ${isActive("/profile") ? "active" : ""}`}
//                title={collapsed ? "Profile" : ""}
//             >
//                <UserAddOutlined className="menu-icon" />
//                {!collapsed && <span className="menu-text">Profile</span>}
//             </div>
//          </div>

//          {/* Toggle Button */}
//          <div className="sidebar-footer">

//             <div
//                onClick={handleLogout}
//                className="menu-item"
//                style={{ cursor: "pointer", color: "#ff4d4f" }}
//             >
//                <span className="menu-icon">🚪</span>
//                {!collapsed && <span className="menu-text">Logout</span>}
//             </div>

//             {/* EXISTING */}
//             <div
//                onClick={() => setCollapsed(!collapsed)}
//                className="toggle-btn"
//             >
//                {collapsed ? (
//                   <DoubleRightOutlined className="toggle-icon" />
//                ) : (
//                   <>
//                      <DoubleLeftOutlined className="toggle-icon" />
//                      <span className="toggle-text">Collapse</span>
//                   </>
//                )}
//             </div>

//          </div>
//       </div>
//    );
// }

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
   Menu,
   Button,
   Typography,
   Tag,
   Space,
   Tooltip
} from "antd";
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
   UserAddOutlined,
   LogoutOutlined,
   UserOutlined
} from "@ant-design/icons";
import API from "../../api/api";
import { useTenant } from "../../context/TenantContext";
import { useAuth } from "../../context/AuthContext";

const { Title } = Typography;

export default function Sidebar() {
   const navigate = useNavigate();
   const location = useLocation();

   const [collapsed, setCollapsed] = useState(false);
   const { tenantId } = useTenant();
   const [connected, setConnected] = useState(false);
   const { logout } = useAuth();

   useEffect(() => {
      if (!tenantId) return;

      API.get("/tenant")
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

   const handleLogout = () => {
      logout();
      navigate("/login");
   };

   const menuItems = [
      {
         key: '/dashboard',
         icon: <DashboardOutlined />,
         label: 'Dashboard',
         onClick: () => navigate('/dashboard')
      },
      {
         key: '/chat',
         icon: <MessageOutlined />,
         label: 'Shared Inbox',
         onClick: () => navigate('/chat')
      },
      {
         key: '/leads',
         icon: <UserAddOutlined />,
         label: 'Leads',
         onClick: () => navigate('/leads')
      },
      {
         key: 'whatsapp',
         icon: <WhatsAppOutlined style={{ color: '#25D366' }} />,
         label: 'WhatsApp',
         children: [
            {
               key: '/create-account',
               icon: <LinkOutlined />,
               label: 'Connect Account',
               onClick: () => navigate('/create-account')
            },
            {
               key: '/bot-messages',
               icon: <RobotOutlined />,
               label: 'Bot Message',
               onClick: () => navigate('/bot-messages')
            },
            {
               key: '/bot-menus',
               icon: <RobotOutlined />,
               label: 'Bot Menus',
               onClick: () => navigate('/bot-menus')
            }
         ]
      },
      {
         key: '/profile',
         icon: <UserOutlined />,
         label: 'Profile',
         onClick: () => navigate('/profile')
      }
   ];

   return (
      <div style={{
         width: collapsed ? '80px' : '280px',
         height: '100vh',
         background: '#001529',
         display: 'flex',
         flexDirection: 'column',
         transition: 'width 0.2s'
      }}>
         {/* Header */}
         <div style={{
            padding: '16px',
            borderBottom: '1px solid #303030',
            textAlign: 'center',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            {!collapsed ? (
               <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Title
                     level={4}
                     style={{
                        color: 'white',
                        margin: 0,
                        fontSize: '18px'
                     }}
                  >
                     SP Advertising
                  </Title>
                  <div>
                     <Tag
                        color={connected ? 'success' : 'error'}
                        style={{
                           borderRadius: '12px',
                           fontSize: '12px'
                        }}
                     >
                        {connected ? '● Connected' : '● Not Connected'}
                     </Tag>
                  </div>
               </Space>
            ) : (
               <Title
                  level={3}
                  style={{
                     color: 'white',
                     margin: 0
                  }}
               >
                  SP
               </Title>
            )}
         </div>

         {/* Menu */}
         <div style={{ flex: 1, overflow: 'hidden' }}>
            <Menu
               theme="dark"
               mode="inline"
               selectedKeys={[location.pathname]}
               defaultOpenKeys={['whatsapp']}
               items={menuItems}
               inlineCollapsed={collapsed}
               style={{
                  borderRight: 0,
                  height: '100%',
                  background: 'transparent'
               }}
            />
         </div>

         {/* Footer */}
         <div style={{
            padding: '16px',
            borderTop: '1px solid #303030'
         }}>
            {/* Logout Button */}
            <Tooltip title={collapsed ? "Logout" : ""} placement="right">
               <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  style={{
                     width: '100%',
                     color: '#ff4d4f',
                     textAlign: 'left',
                     marginBottom: '8px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: collapsed ? 'center' : 'flex-start'
                  }}
               >
                  {!collapsed && <span style={{ marginLeft: '8px' }}>Logout</span>}
               </Button>
            </Tooltip>

            {/* Collapse Toggle */}
            <Tooltip title={collapsed ? "Expand" : "Collapse"} placement="right">
               <Button
                  type="text"
                  icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     width: '100%',
                     color: 'white',
                     textAlign: 'left',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: collapsed ? 'center' : 'flex-start'
                  }}
               >
                  {!collapsed && <span style={{ marginLeft: '8px' }}>Collapse</span>}
               </Button>
            </Tooltip>
         </div>
      </div>
   );
}