import Layout from "../components/layout/Layout";
import { useState } from "react";
import UsersList from "../components/chat/UsersList";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatPage() {
   const [selectedUser, setSelectedUser] = useState(null);

   return (
         <div style={{ display: "flex", height: "100%" }}>

            <div style={{ width: "300px", borderRight: "1px solid #ddd" }}>
               <UsersList onSelectUser={setSelectedUser} />
            </div>

            <div style={{ flex: 1 }}>
               <ChatWindow user={selectedUser} />
            </div>

         </div>
   );
}