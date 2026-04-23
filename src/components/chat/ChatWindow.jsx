
// import { useEffect, useState, useRef } from "react";
// import { getChats, sendChatMessage, markAsRead } from "../../services/chatService";
// import {
//    UserOutlined,
//    SendOutlined,
//    PaperClipOutlined,
//    SmileOutlined
// } from "@ant-design/icons";
// import socket from "../../socket";
// import "../../styles/ChatWindow.css";

// export default function ChatWindow({ user }) {

//    const [messages, setMessages] = useState([]);
//    const [input, setInput] = useState("");
//    const [loading, setLoading] = useState(false);

//    const bottomRef = useRef(null);

//    useEffect(() => {
//       if (!user) return;

//       // const interval = setInterval(() => {
//       //    getChats(user).then(setMessages);
//       // }, 3000);

//       // return () => clearInterval(interval);
//    }, [user]);


//    // 🔥 INITIAL FETCH
//    useEffect(() => {
//       if (!user) return;

//       setLoading(true);

//       getChats(user)
//          .then(data => setMessages(data))
//          .catch(err => console.error(err))
//          .finally(() => setLoading(false));

//       // 🔥 ADD THIS
//       markAsRead(user);

//    }, [user]);
//    // 🔥 AUTO SCROLL
//    useEffect(() => {
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//    }, [messages]);

//    // 🔥 SEND MESSAGE
//    const handleSend = async () => {
//       if (!input.trim()) return;

//       const newMsg = {
//          _id: Date.now(),
//          message: input,
//          type: "bot",
//          status: "sent",
//          createdAt: new Date()
//       };

//       setMessages(prev => [...prev, newMsg]);
//       setInput("");

//       try {
//          await sendChatMessage(user, input);
//       } catch (err) {
//          console.error("Send Error:", err);
//       }
//    };

//    if (!user) {
//       return (
//          <div className="chat-empty-state">
//             <div className="empty-content">
//                <div className="empty-icon-wrapper">💬</div>
//                <h3 className="empty-title">WhatsApp Web</h3>
//                <p className="empty-text">
//                   Select a chat to start messaging
//                </p>
//             </div>
//          </div>
//       );
//    }

//    return (
//       <div className="chat-window">

//          {/* Header */}
//          <div className="chat-header">
//             <div className="chat-header-left">
//                <div className="chat-avatar">
//                   <UserOutlined className="avatar-icon" />
//                </div>
//                <div className="chat-user-info">
//                   <h3 className="chat-user-name">{user}</h3>
//                </div>
//             </div>
//          </div>

//          {/* Messages */}
//          <div className="chat-messages">
//             {loading && (
//                <div className="chat-loading">
//                   <div className="loading-spinner"></div>
//                   <p>Loading messages...</p>
//                </div>
//             )}

//             {!loading && (messages || []).map((msg, index) => (
//                <div
//                   key={msg._id}
//                   className={`message-wrapper ${msg.type === "user" ? "user" : "bot"}`}
//                >
//                   <div className={`message-bubble ${msg.type === "user" ? "user" : "bot"}`}>
//                      <div className="message-text">{msg.message}</div>

//                      <div className="message-meta">
//                         <span className="message-time">
//                            {msg.createdAt
//                               ? new Date(msg.createdAt).toLocaleTimeString([], {
//                                  hour: "2-digit",
//                                  minute: "2-digit"
//                               })
//                               : "--"}
//                         </span>
//                         {msg.type === "bot" && (
//                            <span className="message-status">
//                               {msg.status === "sent" && "✓"}
//                               {msg.status === "delivered" && "✓✓"}
//                               {msg.status === "read" && "✓✓"}
//                            </span>
//                         )}
//                      </div>
//                   </div>
//                </div>
//             ))}

//             <div ref={bottomRef}></div>
//          </div>

//          {/* Input */}
//          <div className="chat-input-area">
//             <div className="chat-input-wrapper">

//                <button className="input-action-btn">
//                   <SmileOutlined className="input-icon" />
//                </button>

//                <button className="input-action-btn">
//                   <PaperClipOutlined className="input-icon" />
//                </button>

//                <input
//                   value={input}
//                   onChange={e => setInput(e.target.value)}
//                   placeholder="Type a message"
//                   onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                   className="chat-input"
//                />

//                <button
//                   onClick={handleSend}
//                   className="send-btn"
//                   disabled={!input.trim()}
//                >
//                   <SendOutlined className="send-icon" />
//                </button>

//             </div>
//          </div>

//       </div>
//    );
// }

import { useEffect, useState, useRef } from "react";
import { Dropdown, Menu, Modal, message, message as antdMessage } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { getChats, sendChatMessage, markAsRead, clearChat } from "../../services/chatService";
import {
   UserOutlined,
   SendOutlined,
   PaperClipOutlined,
   SmileOutlined
} from "@ant-design/icons";
import socket from "../../socket";
import "../../styles/ChatWindow.css";

export default function ChatWindow({ user }) {

   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);

   const bottomRef = useRef(null);

   // 🔥 JOIN ROOM (only when user changes)
   useEffect(() => {
      if (!user) return;

      socket.emit("join", String(user));

   }, [user]);

   // 🔥 INITIAL FETCH (only once per user)
   useEffect(() => {
      if (!user) return;

      setLoading(true);

      getChats(user)
         .then(data => {
            setMessages(data); // only initial load
         })
         .catch(err => console.error(err))
         .finally(() => setLoading(false));

      markAsRead(user);

   }, [user]);

   // 🔥 SOCKET LISTENER (REALTIME)
   useEffect(() => {
      const handleMessage = (msg) => {
         console.log("SOCKET RECEIVED:", msg);

         setMessages(prev => {
            const exists = prev.some(m => m._id === msg._id);
            if (exists) return prev;

            return [...prev, { ...msg }]; // 🔥 force re-render
         });
      };

      socket.on("newMessage", handleMessage);

      return () => {
         socket.off("newMessage", handleMessage);
      };
   }, []);

   // 🔥 AUTO SCROLL
   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   // 🔥 SEND MESSAGE
   const handleSend = async () => {
      if (!input.trim()) return;

      try {
         await sendChatMessage(user, input);
         setInput("");
      } catch (err) {
         console.error("Send Error:", err);
      }
   };

   const handleClearChat = () => {
      Modal.confirm({
         title: "Clear this chat?",
         okText: "Clear Chat",
         cancelText: "Cancel",
         okButtonProps: {
            danger: true,
         },

         onOk: async () => {
            try {
               await clearChat(user);
               message.success("Chat cleared");
               setMessages([]);
            } catch (err) {
               console.error("Clear chat error:", err);
            }
         },
      });
   };


   if (!user) {
      return (
         <div className="chat-empty-state">
            <div className="empty-content">
               <div className="empty-icon-wrapper">💬</div>
               <h3 className="empty-title">WhatsApp Web</h3>
               <p className="empty-text">
                  Select a chat to start messaging
               </p>
            </div>
         </div>
      );
   }

   const menu = (
      <Menu
         items={[
            {
               key: "clear",
               label: "Clear Chat",
               onClick: handleClearChat,
            },
         ]}
      />
   );

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
               </div>
            </div>

            <div className="chat-header-right">
               <Dropdown
                  menu={{
                     items: [
                        {
                           key: "clear",
                           label: "Clear Chat",
                           onClick: handleClearChat,
                        },
                     ],
                  }}
                  trigger={["click"]}
               >
                  <span>
                     <MoreOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
                  </span>
               </Dropdown>
            </div>
         </div>

         {/* Messages */}
         <div className="chat-messages">
            {loading && (
               <div className="chat-loading">
                  <div className="loading-spinner"></div>
                  <p>Loading messages...</p>
               </div>
            )}

            {!loading && (messages || []).map((msg) => (
               <div
                  key={msg._id}
                  className={`message-wrapper ${msg.type === "user" ? "user" : "bot"}`}
               >
                  <div className={`message-bubble ${msg.type === "user" ? "user" : "bot"}`}>
                     <div className="message-text">{msg.message}</div>

                     <div className="message-meta">
                        <span className="message-time">
                           {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleTimeString([], {
                                 hour: "2-digit",
                                 minute: "2-digit"
                              })
                              : "--"}
                        </span>

                        {msg.type === "bot" && (
                           <span className="message-status">
                              {msg.status === "sent" && "✓"}
                              {msg.status === "delivered" && "✓✓"}
                              {msg.status === "read" && "✓✓"}
                           </span>
                        )}
                     </div>
                  </div>
               </div>
            ))}

            <div ref={bottomRef}></div>
         </div>

         {/* Input */}
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