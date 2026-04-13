import { Menu } from "antd";
import { Link } from "react-router-dom";

const Sidebar = () => {
   return (
      <Menu mode="inline" style={{ height: "100vh" }}>
         <Menu.Item key="1">
            <Link to="/">Dashboard</Link>
         </Menu.Item>
         <Menu.Item key="2">
            <Link to="/chats">Chats</Link>
         </Menu.Item>
         <Menu.Item key="3">
            <Link to="/leads">Leads</Link>
         </Menu.Item>
      </Menu>
   );
};

export default Sidebar;