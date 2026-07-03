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
import "../../styles/Sidebar.css"

const { Title } = Typography;

export default function Sidebar() {
   const navigate = useNavigate();
   const location = useLocation();

   const [collapsed, setCollapsed] = useState(false);
   const { tenantId } = useTenant();
   const [connected, setConnected] = useState(false);
   const { logout } = useAuth();
   const [isSuperAdmin,
      setIsSuperAdmin] =
      useState(false);

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

   useEffect(() => {

      const user =
         JSON.parse(
            localStorage.getItem(
               "user"
            )
         );

      if (user?.isSuperAdmin) {
         setIsSuperAdmin(true);
      }

   }, []);

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
         label: 'Inbox',
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
               label: 'Link WhatsApp',
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
            },
            {
               key: '/broadcast',
               icon: <RobotOutlined />,
               label: 'Broadcast',
               onClick: () => navigate('/broadcast')
            }
         ]
      },
      {
         key: '/profile',
         icon: <UserOutlined />,
         label: 'Profile',
         onClick: () => navigate('/profile')
      },
      {
         key: 'settings',
         icon: <ApiOutlined />,
         label: 'Settings',
         children: [
            {
               key: '/followup-settings',
               icon: <CommentOutlined />,
               label: 'Follow-Up Settings',
               onClick: () =>
                  navigate('/followup-settings')
            },
            {
               key: "/calling-settings",
               label: "AI Calling Settings",
               onClick: () =>
                  navigate("/calling-settings")
            }
         ]
      },

      ...(isSuperAdmin
         ? [
            {
               key: 'admin',
               icon: <ApiOutlined />,
               label: 'Super Admin',
               children: [
                  {
                     key: '/admin',
                     icon: <DashboardOutlined />,
                     label: 'Admin Dashboard',
                     onClick: () =>
                        navigate('/admin')
                  },
                  {
                     key: '/admin/users',
                     icon: <TeamOutlined />,
                     label: 'Users',
                     onClick: () =>
                        navigate('/admin/users')
                  },
                  {
                     key: '/admin/tenants',
                     icon: <GlobalOutlined />,
                     label: 'Tenants',
                     onClick: () =>
                        navigate('/admin/tenants')
                  },
                  {
                     key: '/admin/subscriptions',
                     icon: <ShoppingCartOutlined />,
                     label: 'Subscriptions',
                     onClick: () =>
                        navigate('/admin/subscriptions')
                  }
               ]
            }
         ]
         : [])
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
         <div
            className="sidebar-scroll"
            style={{
               flex: 1, overflowY: 'auto',
               overflowX: 'hidden'
            }}>
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