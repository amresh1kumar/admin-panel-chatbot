import { useEffect, useState, useRef } from "react";
import { useTenant } from "../../context/TenantContext";
import { getChats, sendChatMessage } from "../../services/chatService";

export default function ChatWindow({ user }) {
   const { tenantId } = useTenant();

   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);

   const bottomRef = useRef(null);

   // 🔥 Fetch chats
   useEffect(() => {
      if (!user || !tenantId) return;

      setLoading(true);

      getChats(tenantId, user)
         .then(res => setMessages(res.data))
         .catch(err => console.error(err))
         .finally(() => setLoading(false));
   }, [user, tenantId]);

   // 🔥 Auto scroll
   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   // 🔥 Send message
   const handleSend = async () => {
      if (!input.trim()) return;

      const newMsg = {
         _id: Date.now(),
         message: input,
         type: "bot",
         createdAt: new Date()
      };

      // Optimistic UI
      setMessages(prev => [...prev, newMsg]);
      setInput("");

      try {
         await sendChatMessage(tenantId, user, input);
      } catch (err) {
         console.error("Send Error:", err);
      }
   };

   if (!user) {
      return (
         <div style={{ padding: "20px", color: "#888" }}>
            Select a user to start chatting
         </div>
      );
   }

   return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

         {/* Header */}
         <div style={{
            padding: "12px",
            borderBottom: "1px solid #ddd",
            background: "#fafafa"
         }}>
            <h3 style={{ margin: 0 }}>Chat: {user}</h3>
         </div>

         {/* Messages */}
         <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            background: "#f5f7fb"
         }}>
            {loading && <p>Loading...</p>}

            {messages.map(msg => (
               <div
                  key={msg._id}
                  style={{
                     display: "flex",
                     justifyContent:
                        msg.type === "user" ? "flex-end" : "flex-start",
                     marginBottom: "10px"
                  }}
               >
                  <div
                     style={{
                        background: msg.type === "user" ? "#DCF8C6" : "#fff",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        maxWidth: "60%",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                     }}
                  >
                     {msg.message}

                     <div style={{
                        fontSize: "10px",
                        textAlign: "right",
                        marginTop: "4px",
                        color: "#888"
                     }}>
                        {msg.createdAt &&
                           new Date(msg.createdAt).toLocaleTimeString()}
                     </div>
                  </div>
               </div>
            ))}

            <div ref={bottomRef}></div>
         </div>

         {/* Input */}
         <div style={{
            padding: "10px",
            borderTop: "1px solid #ddd",
            display: "flex",
            gap: "10px",
            background: "#fff"
         }}>
            <input
               value={input}
               onChange={e => setInput(e.target.value)}
               placeholder="Type message..."
               onKeyDown={(e) => e.key === "Enter" && handleSend()}
               style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc"
               }}
            />

            <button
               onClick={handleSend}
               style={{
                  padding: "10px 16px",
                  background: "#1677ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
               }}
            >
               Send
            </button>
         </div>
      </div>
   );
}