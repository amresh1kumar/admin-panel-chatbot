import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { useTenant } from "../../context/TenantContext";
import { clearSelectedChats } from "../../services/chatService";
import { Popconfirm } from "antd";

import {
   UserOutlined,
   SearchOutlined,
   DeleteOutlined,
   CloseOutlined,
} from "@ant-design/icons";

import "../../styles/UsersList.css";

export default function UsersList({ onSelectUser }) {
   const { tenantId } = useTenant();

   const [users, setUsers] = useState([]);
   const [activeUser, setActiveUser] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedPhones, setSelectedPhones] = useState([]);
   const [selectMode, setSelectMode] = useState(false);

   useEffect(() => {
      if (!tenantId) return;

      getUsers(tenantId)
         .then((data) => setUsers(data))
         .catch((err) => console.error(err));
   }, [tenantId]);

   const filteredUsers = (users || []).filter(
      (user) =>
         (user.name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         (user._id || "").includes(searchQuery)
   );

   // Select / Unselect single chat
   const toggleSelectUser = (phone) => {
      setSelectedPhones((prev) =>
         prev.includes(phone)
            ? prev.filter((item) => item !== phone)
            : [...prev, phone]
      );
   };

   // Select / Unselect all visible chats
   const toggleSelectAll = () => {
      const filteredPhones = filteredUsers.map(
         (user) => user._id
      );

      const allSelected =
         filteredPhones.length > 0 &&
         filteredPhones.every((phone) =>
            selectedPhones.includes(phone)
         );

      if (allSelected) {
         setSelectedPhones((prev) =>
            prev.filter(
               (phone) => !filteredPhones.includes(phone)
            )
         );
      } else {
         setSelectedPhones((prev) => [
            ...new Set([
               ...prev,
               ...filteredPhones,
            ]),
         ]);
      }
   };

   // Clear selected chats
   const handleClearSelected = async () => {
      if (selectedPhones.length === 0) return;

      try {
         await clearSelectedChats(selectedPhones);

         // Selection clear
         setSelectedPhones([]);

         // Chat list fresh API se reload
         const data = await getUsers(tenantId);
         setUsers(data);

      } catch (err) {
         console.error("Clear Selected Chats Error:", err);
      }
   };

   // Exit select mode
   const handleCancelSelect = () => {
      setSelectMode(false);
      setSelectedPhones([]);
   };

   const formatChatTime = (date) => {
      if (!date) return "--";

      const msgDate = new Date(date);

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
         (now.setHours(0, 0, 0, 0) -
            new Date(msgDate).setHours(
               0,
               0,
               0,
               0
            )) /
         (1000 * 60 * 60 * 24)
      );

      // Yesterday
      if (diffDays === 1) {
         return "Yesterday";
      }

      // Within last 7 days
      if (diffDays < 7) {
         return msgDate.toLocaleDateString(
            "en-US",
            {
               weekday: "short",
            }
         );
      }

      // Older than 7 days
      return msgDate.toLocaleDateString(
         "en-GB",
         {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
         }
      );
   };

   const allFilteredSelected =
      filteredUsers.length > 0 &&
      filteredUsers.every((user) =>
         selectedPhones.includes(user._id)
      );

   return (
      <div className="users-list-container">

         {/* Header */}
         <div className="users-list-header">

            <h3 className="users-list-title">
               {selectMode
                  ? `${selectedPhones.length} Selected`
                  : "Chats"}
            </h3>

            {!selectMode ? (
               <button
                  type="button"
                  className="select-button"
                  onClick={() => setSelectMode(true)}
               >
                  Select
               </button>
            ) : (
               <div className="select-mode-actions">

                  {/* Select All */}
                  <label className="select-all-button">
                     <input
                        type="checkbox"
                        checked={allFilteredSelected}
                        onChange={toggleSelectAll}
                     />

                     Select All
                  </label>

                  {/* Delete */}
                  {selectedPhones.length > 0 && (
                     <Popconfirm
                        title="Clear selected chats?"
                        description={`Are you sure you want to clear ${selectedPhones.length} selected chat${selectedPhones.length > 1 ? "s" : ""}?`}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                        onConfirm={handleClearSelected}
                     >
                        <button
                           type="button"
                           title="Clear selected chats"
                           style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: "18px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                           }}
                        >
                           <DeleteOutlined />
                        </button>
                     </Popconfirm>
                  )}
                  {/* Close */}
                  <button
                     type="button"
                     className="cancel-select-button"
                     onClick={handleCancelSelect}
                     title="Cancel"
                  >
                     <CloseOutlined />
                  </button>

               </div>
            )}
         </div>

         {/* Search */}
         <div className="search-bar-container">
            <div className="search-input-wrapper">

               <SearchOutlined className="search-icon" />

               <input
                  type="text"
                  placeholder="Search or start new chat"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) =>
                     setSearchQuery(e.target.value)
                  }
               />

            </div>
         </div>

         {/* Users List */}
         <div className="users-list-scroll">

            {filteredUsers.map((user, index) => (
               <div
                  key={user._id}
                  onClick={() => {

                     if (selectMode) {
                        toggleSelectUser(user._id);
                        return;
                     }

                     setActiveUser(user._id);
                     onSelectUser(user._id);
                  }}
                  className={`user-item ${activeUser === user._id
                     ? "active"
                     : ""
                     }`}
                  style={{
                     animationDelay: `${index * 0.05}s`,
                  }}
               >

                  {/* Checkbox */}
                  {selectMode && (
                     <input
                        type="checkbox"
                        className="chat-select-checkbox"
                        checked={selectedPhones.includes(
                           user._id
                        )}
                        onChange={() =>
                           toggleSelectUser(
                              user._id
                           )
                        }
                        onClick={(e) =>
                           e.stopPropagation()
                        }
                     />
                  )}

                  {/* Avatar */}
                  <div className="user-avatar">
                     <UserOutlined className="avatar-icon" />
                  </div>

                  {/* User Info */}
                  <div className="user-info">

                     <div className="user-info-top">

                        <div className="user-details">

                           <div className="user-name">
                              {user.name?.trim() ||
                                 "Unknown"}
                           </div>

                           <div className="user-phone">
                              {user._id}
                           </div>

                        </div>

                        <div className="user-timestamp">
                           {formatChatTime(
                              user.lastMessageTime ||
                              user.updatedAt ||
                              user.createdAt
                           )}
                        </div>

                     </div>

                     <div className="user-info-bottom">

                        <div className="user-last-message">
                           {user.lastMessage ||
                              "No messages yet"}
                        </div>

                     </div>

                  </div>

               </div>
            ))}

            {/* Empty State */}
            {filteredUsers.length === 0 && (
               <div className="empty-state">

                  <UserOutlined className="empty-icon" />

                  <p className="empty-text">
                     {searchQuery
                        ? "No chats found"
                        : "No chats yet"}
                  </p>

               </div>
            )}

         </div>
      </div>
   );
}