import { useEffect, useState, useRef } from "react";
import { Dropdown, Modal, message, Select, Input, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {
   getChats,
   sendChatMessage,
   markAsRead,
   clearChat,
   takeOverConversation,
   resumeBotConversation,
} from "../../services/chatService";
import {
   getTemplates,
   sendTemplateMessage,
   syncTemplates,
} from "../../services/templateService";
import {
   UserOutlined,
   SendOutlined,
   PaperClipOutlined,
   SmileOutlined,
} from "@ant-design/icons";
import socket from "../../socket";
import "../../styles/ChatWindow.css";

export default function ChatWindow({ user }) {
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);
   const [templates, setTemplates] = useState([]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedTemplate, setSelectedTemplate] = useState(null);
   const [params, setParams] = useState([]);
   const [mediaUrl, setMediaUrl] = useState("");
   const [conversation, setConversation] = useState({ name: "", mode: "bot", takenBy: null, });


   const bottomRef = useRef(null);

   const loadChat = async () => {
      if (!user) return;

      setLoading(true);

      try {
         const data = await getChats(user);

         setMessages(data.chats || []);
         setConversation(
            data.conversation || {
               name: "",
               mode: "bot",
               takenBy: null,
            }
         );

         // await markAsRead(user);
         // Fire & Forget
         markAsRead(user).catch(console.error);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   //JOIN ROOM (only when user changes)
   useEffect(() => {
      if (!user) return;

      socket.emit("join", String(user));
   }, [user]);

   // INITIAL FETCH (only once per user)
   // useEffect(() => {
   //    if (!user) return;

   //    setLoading(true);

   //    getChats(user)
   //       .then((data) => {
   //          setMessages(data.chats || []);
   //          setConversation(
   //             data.conversation || {
   //                mode: "bot",
   //                takenBy: null,
   //             }
   //          );
   //       })
   //       .catch((err) => console.error(err))
   //       .finally(() => setLoading(false));

   //    markAsRead(user);
   // }, [user]);

   useEffect(() => {
      loadChat();
   }, [user]);

   //SOCKET LISTENER (REALTIME)
   useEffect(() => {
      const handleMessage = (msg) => {
         console.log("SOCKET RECEIVED:", msg);

         setMessages((prev) => {
            const exists = prev.some((m) => m._id === msg._id);
            if (exists) return prev;

            return [...prev, { ...msg }]; //force re-render
         });
      };

      socket.on("newMessage", handleMessage);

      return () => {
         socket.off("newMessage", handleMessage);
      };
   }, []);

   //AUTO SCROLL
   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   //SEND MESSAGE
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

   const openTemplateModal = () => {
      setIsModalOpen(true);
   };
   const handleTemplateChange = (value) => {
      const template = templates.find((t) => t.name === value);
      setSelectedTemplate(template);
      setParams(Array(template.params).fill(""));
   };

   const handleParamChange = (value, index) => {
      const updated = [...params];
      updated[index] = value;
      setParams(updated);
   };

   const handleSendTemplate = async () => {
      try {
         await sendTemplateMessage(user, selectedTemplate.name, params, mediaUrl);
         setIsModalOpen(false);
         setSelectedTemplate(null);
         setParams([]);
         setMediaUrl("");
      } catch (err) {
         console.error(err);
      }
   };

   const generatePreview = () => {
      if (!selectedTemplate) return "";

      let text = selectedTemplate.body || "";

      params.forEach((p, index) => {
         text = text.replace(`{{${index + 1}}}`, p || `{{${index + 1}}}`);
      });

      return text;
   };

   useEffect(() => {
      const fetchTemplates = async () => {
         try {
            const data = await getTemplates();
            setTemplates(data);
         } catch (err) {
            console.error(err);
         }
      };

      fetchTemplates();
   }, []);

   const handleSyncTemplates = async () => {
      try {
         await syncTemplates();
         message.success("Templates Synced");

         // refresh templates
         const data = await getTemplates();
         setTemplates(data);
      } catch (err) {
         console.error(err);
         message.error("Sync failed");
      }
   };

   const handleTakeOver = async () => {
      try {
         await takeOverConversation(user);

         await loadChat();

         message.success("Conversation taken over");
      } catch (err) {
         message.error("Take Over failed");
      }
   };

   const handleResumeBot = async () => {
      try {
         await resumeBotConversation(user);

         await loadChat();

         message.success("Bot resumed");
      } catch (err) {
         message.error("Resume failed");
      }
   };

   const formatDateLabel = (date) => {
      const d = new Date(date);

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      if (d.toDateString() === today.toDateString()) return "Today";
      if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

      return d.toLocaleDateString("en-IN", {
         day: "numeric",
         month: "long",
         year:
            d.getFullYear() !== today.getFullYear()
               ? "numeric"
               : undefined,
      });
   };

   if (!user) {
      return (
         <div className="chat-empty-state">
            <div className="empty-content">
               <div className="empty-icon-wrapper">💬</div>
               <h3 className="empty-title">WhatsApp Web</h3>
               <p className="empty-text">Select a chat to start messaging</p>
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

                  <h3 className="chat-user-name">
                     {conversation?.name?.trim() ? conversation.name.trim() : "Unknown"}
                  </h3>

                  <span className="chat-user-phone">
                     {user}
                  </span>
               </div>
               <div >
                  {conversation.mode === "bot" ? (
                     <Button type="primary" onClick={handleTakeOver}>
                        Take Over
                     </Button>
                  ) : (
                     <Button danger onClick={handleResumeBot}>
                        Resume Bot
                     </Button>
                  )}
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

                        {
                           key: "template",
                           label: "Send Template",
                           onClick: openTemplateModal,
                        },
                        {
                           key: "sync",
                           label: "Sync Templates",
                           onClick: handleSyncTemplates,
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

            {/* {!loading &&
               (messages || []).map((msg) => (
                  <div
                     key={msg._id}
                     className={`message-wrapper ${msg.type === "user" ? "user" : "bot"}`}
                  >
                     <div
                        className={`message-bubble ${msg.type === "user" ? "user" : "bot"}`}
                     >
                        <div className="message-text">{msg.message}</div>

                        <div className="message-meta">
                           <span className="message-time">
                              {msg.createdAt
                                 ? new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
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
               ))} */}

            {!loading &&
               (messages || []).map((msg, index) => {
                  const currentDate = new Date(msg.createdAt).toDateString();

                  const prevDate =
                     index > 0
                        ? new Date(messages[index - 1].createdAt).toDateString()
                        : null;

                  const showDate = currentDate !== prevDate;

                  return (
                     <div key={msg._id}>
                        {showDate && (
                           <div className="chat-date-divider">
                              <span>{formatDateLabel(msg.createdAt)}</span>
                           </div>
                        )}

                        <div
                           className={`message-wrapper ${msg.type === "user" ? "user" : "bot"
                              }`}
                        >
                           <div
                              className={`message-bubble ${msg.type === "user" ? "user" : "bot"
                                 }`}
                           >
                              <div className="message-text">{msg.message}</div>

                              <div className="message-meta">
                                 <span className="message-time">
                                    {msg.createdAt
                                       ? new Date(msg.createdAt).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
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
                     </div>
                  );
               })}

            <div ref={bottomRef}></div>
         </div>

         {/* Input */}
         <div className="chat-input-area">
            <div className="chat-input-wrapper">
               {/* <button className="input-action-btn">
                  <SmileOutlined className="input-icon" />
               </button>

               <button className="input-action-btn">
                  <PaperClipOutlined className="input-icon" />
               </button> */}

               <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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
         <Modal
            title="Send Template"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
         >
            <Select
               placeholder="Select Template"
               style={{ width: "100%", marginBottom: 10 }}
               onChange={handleTemplateChange}
            >
               {templates.map((t) => (
                  <Select.Option key={t.name} value={t.name}>
                     {t.label}
                  </Select.Option>
               ))}
            </Select>

            {/* Dynamic Inputs */}
            {selectedTemplate &&
               params.map((p, index) => (
                  <Input
                     key={index}
                     placeholder={`Enter value ${index + 1}`}
                     style={{ marginBottom: 8 }}
                     value={p}
                     onChange={(e) => handleParamChange(e.target.value, index)}
                  />
               ))}

            {selectedTemplate && (
               <Input
                  placeholder="Enter media URL (image/pdf/video)"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  style={{ marginBottom: 10 }}
               />
            )}
            {selectedTemplate && (
               <div
                  style={{
                     background: "#f0f2f5",
                     padding: "10px",
                     borderRadius: "8px",
                     marginBottom: "10px",
                  }}
               >
                  <strong>Preview:</strong>
                  <div style={{ marginTop: "5px" }}>{generatePreview()}</div>
               </div>
            )}

            {mediaUrl && (
               <div style={{ marginBottom: 10 }}>
                  <strong>Media Preview:</strong>

                  {/* IMAGE */}
                  {mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) && (
                     <img
                        src={mediaUrl}
                        alt="preview"
                        style={{ width: "100%", marginTop: 8 }}
                     />
                  )}

                  {/* PDF */}
                  {mediaUrl.match(/\.pdf$/i) && (
                     <a href={mediaUrl} target="_blank" rel="noreferrer">
                        📄 Open PDF
                     </a>
                  )}

                  {/* VIDEO */}
                  {mediaUrl.match(/\.mp4$/i) && (
                     <video src={mediaUrl} controls style={{ width: "100%" }} />
                  )}
               </div>
            )}

            <Button
               type="primary"
               block
               onClick={handleSendTemplate}
               disabled={!selectedTemplate}
            >
               Send
            </Button>
         </Modal>
      </div>
   );
}
