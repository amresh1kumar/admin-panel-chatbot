// import { useState } from "react";
// import UsersList from "../components/chat/UsersList";
// import ChatWindow from "../components/chat/ChatWindow";

// export default function ChatPage() {
//    const [selectedUser, setSelectedUser] = useState(null);

//    return (
//       <div style={{
//          display: "flex",
//          height: "100vh",
//          background: "#f0f2f5"
//       }}>

//          {/* Sidebar */}
//          <div style={{
//             width: "320px",
//             borderRight: "1px solid #ddd",
//             background: "#fff",
//             display: "flex",
//             flexDirection: "column"
//          }}>
//             <div style={{
//                padding: "12px",
//                borderBottom: "1px solid #eee",
//                fontWeight: "600"
//             }}>
//                💬 Chats
//             </div>

//             <UsersList onSelectUser={setSelectedUser} />
//          </div>

//          {/* Chat Area */}
//          <div style={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             background: "#e5ddd5"
//          }}>
//             {selectedUser ? (
//                <ChatWindow user={selectedUser} />
//             ) : (
//                <div style={{
//                   flex: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "#666",
//                   fontSize: "18px"
//                }}>
//                   Select a chat to start messaging
//                </div>
//             )}
//          </div>
//       </div>
//    );
// }

import Layout from "../components/layout/Layout";
import { useState } from "react";
import UsersList from "../components/chat/UsersList";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatPage() {
   const [selectedUser, setSelectedUser] = useState(null);

   return (
      <Layout>
         <div style={{ display: "flex", height: "100%" }}>

            <div style={{ width: "300px", borderRight: "1px solid #ddd" }}>
               <UsersList onSelectUser={setSelectedUser} />
            </div>

            <div style={{ flex: 1 }}>
               <ChatWindow user={selectedUser} />
            </div>

         </div>
      </Layout>
   );
}