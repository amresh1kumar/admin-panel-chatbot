import { useEffect, useState, useRef } from "react";
import { useTenant } from "../../context/TenantContext";
import { getChats, sendChatMessage } from "../../services/chatService";
import {
   UserOutlined,
   SendOutlined,
   PaperClipOutlined,
   SmileOutlined,
   MoreOutlined,
   PhoneOutlined,
   VideoCameraOutlined
} from "@ant-design/icons";
import "../../styles/ChatWindow.css";

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
         <div className="chat-empty-state">
            <div className="empty-content">
               <div className="empty-icon-wrapper">
                  💬
               </div>
               <h3 className="empty-title">WhatsApp Web</h3>
               <p className="empty-text">
                  Select a chat to start messaging
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="chat-window">
         {/* Header */}
         <div className="chat-header">
            <div className="chat-header-left">
               <div className="chat-avatar">
                  <UserOutlined className="avatar-icon" />
               </div>
               <div className="chat-user-info">
                  <h3 className="chat-user-name">{user}</h3>
                  {/* <p className="chat-user-status">online</p> */}
               </div>
            </div>

            {/* <div className="chat-header-actions">
               <VideoCameraOutlined className="header-action-icon" />
               <PhoneOutlined className="header-action-icon" />
               <MoreOutlined className="header-action-icon" />
            </div> */}
         </div>

         {/* Messages Area */}
         <div className="chat-messages">
            {loading && (
               <div className="chat-loading">
                  <div className="loading-spinner"></div>
                  <p>Loading messages...</p>
               </div>
            )}

            {!loading && messages.map((msg, index) => (
               <div
                  key={msg._id}
                  className={`message-wrapper ${msg.type === "user" ? "user" : "bot"}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
               >
                  <div className={`message-bubble ${msg.type === "user" ? "user" : "bot"}`}>
                     <div className="message-text">{msg.message}</div>
                     <div className="message-meta">
                        <span className="message-time">
                           {msg.createdAt &&
                              new Date(msg.createdAt).toLocaleTimeString([], {
                                 hour: '2-digit',
                                 minute: '2-digit'
                              })}
                        </span>
                        {msg.type === "bot" && (
                           <span className="message-status">✓✓</span>
                        )}
                     </div>
                  </div>
               </div>
            ))}

            <div ref={bottomRef}></div>
         </div>

         {/* Input Area */}
         <div className="chat-input-area">
            <div className="chat-input-wrapper">
               <button className="input-action-btn">
                  <SmileOutlined className="input-icon" />
               </button>

               <button className="input-action-btn">
                  <PaperClipOutlined className="input-icon" />
               </button>

               <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="chat-input"
               />

               <button
                  onClick={handleSend}
                  className="send-btn"
                  disabled={!input.trim()}
               >
                  <SendOutlined className="send-icon" />
               </button>
            </div>
         </div>
      </div>
   );
}