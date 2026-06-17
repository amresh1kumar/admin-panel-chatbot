import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { useTenant } from "../../context/TenantContext";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import "../../styles/UsersList.css";

export default function UsersList({ onSelectUser }) {
   const { tenantId } = useTenant();

   const [users, setUsers] = useState([]);
   const [activeUser, setActiveUser] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
      if (!tenantId) return;

      getUsers(tenantId)
         .then(data => setUsers(data))
         .catch(err => console.error(err));
   }, [tenantId]);

   const filteredUsers = (users || []).filter(user =>
      (user._id || "").toLowerCase().includes(searchQuery.toLowerCase())
   );

   const formatChatTime = (date) => {
      if (!date) return "--";

      const msgDate = new Date(date);

      // Invalid date check
      if (isNaN(msgDate.getTime())) return "--";

      const now = new Date();

      // Today
      if (msgDate.toDateString() === now.toDateString()) {
         return msgDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         });
      }

      // Difference in days
      const diffDays = Math.floor(
         (now.setHours(0, 0, 0, 0) - new Date(msgDate).setHours(0, 0, 0, 0)) /
         (1000 * 60 * 60 * 24)
      );

      // Yesterday
      if (diffDays === 1) {
         return "Yesterday";
      }

      // Within last 7 days
      if (diffDays < 7) {
         return msgDate.toLocaleDateString("en-US", {
            weekday: "short",
         });
      }

      // Older than 7 days
      return msgDate.toLocaleDateString("en-GB", {
         day: "2-digit",
         month: "2-digit",
         year: "2-digit",
      });
   };

   return (
      <div className="users-list-container">

         <div className="users-list-header">
            <h3 className="users-list-title">Chats</h3>
         </div>

         <div className="search-bar-container">
            <div className="search-input-wrapper">
               <SearchOutlined className="search-icon" />
               <input
                  type="text"
                  placeholder="Search or start new chat"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         <div className="users-list-scroll">
            {filteredUsers.map((user, index) => (
               <div
                  key={user._id}
                  onClick={() => {
                     setActiveUser(user._id);
                     onSelectUser(user._id);
                  }}
                  className={`user-item ${activeUser === user._id ? "active" : ""}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
               >
                  <div className="user-avatar">
                     <UserOutlined className="avatar-icon" />
                  </div>

                  <div className="user-info">
                     <div className="user-info-top">
                        <div className="user-name">
                           {user._id.slice(0, 12)}
                        </div>
                        <div className="user-timestamp">
                           {formatChatTime(user.lastMessageTime || user.updatedAt || user.createdAt)}
                        </div>
                     </div>

                     <div className="user-info-bottom">
                        <div className="user-last-message">
                           {user.lastMessage || "No messages yet"}
                        </div>
                     </div>
                  </div>
               </div>
            ))}

            {filteredUsers.length === 0 && (
               <div className="empty-state">
                  <UserOutlined className="empty-icon" />
                  <p className="empty-text">
                     {searchQuery ? "No chats found" : "No chats yet"}
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}