// import { useEffect, useState } from "react";
// import {
//    Table,
//    Button,
//    Modal,
//    Form,
//    Input,
//    message,
//    Popconfirm
// } from "antd";

// import {
//    getBotMessages,
//    createBotMessage,
//    updateBotMessage,
//    deleteBotMessage
// } from "../services/botMessageService";

// import { useTenant } from "../context/TenantContext";

// export default function BotMessage() {
//    const { tenantId } = useTenant();

//    const [data, setData] = useState([]);
//    const [loading, setLoading] = useState(false);
//    const [open, setOpen] = useState(false);
//    const [editing, setEditing] = useState(null);

//    const [form] = Form.useForm();

//    // ================= FETCH =================
//    const fetchData = async () => {
//       setLoading(true);
//       try {
//          const res = await getBotMessages(tenantId);
//          setData(res.data || []);
//       } catch {
//          message.error("Failed to load messages");
//       }
//       setLoading(false);
//    };

//    useEffect(() => {
//       if (tenantId) fetchData();
//    }, [tenantId]);

//    // ================= SUBMIT =================
//    const onFinish = async (values) => {
//       try {
//          const formatted = {
//             ...values,

//             // 🔥 MULTIPLE KEYWORDS
//             keywords: values.keywords
//                .split(",")
//                .map(k => k.trim().toLowerCase())
//                .filter(k => k !== "")
//          };

//          if (editing) {
//             await updateBotMessage(editing._id, formatted);
//             message.success("Updated");
//          } else {
//             await createBotMessage({
//                ...formatted,
//                tenantId
//             });
//             message.success("Created");
//          }

//          setOpen(false);
//          setEditing(null);
//          form.resetFields();
//          fetchData();

//       } catch (err) {
//          message.error(err.message || "Error saving message");
//       }
//    };

//    // ================= EDIT =================
//    const handleEdit = (record) => {
//       setEditing(record);
//       setOpen(true);

//       form.setFieldsValue({
//          ...record,
//          keywords: record.keywords?.join(",") // 🔥 FIX
//       });
//    };

//    // ================= DELETE =================
//    const handleDelete = async (id) => {
//       try {
//          await deleteBotMessage(id);
//          message.success("Deleted");
//          fetchData();
//       } catch {
//          message.error("Delete failed");
//       }
//    };

//    // ================= TABLE =================
//    const columns = [
//       {
//          title: "Keywords",
//          render: (_, record) => record.keywords?.join(", ")
//       },
//       {
//          title: "Reply",
//          dataIndex: "reply"
//       },
//       {
//          title: "Flow Action", // 🔥 CHANGE NAME
//          dataIndex: "action"
//       },
//       {
//          title: "Actions", // 🔥 BUTTON COLUMN
//          render: (_, record) => (
//             <>
//                <Button size="small" onClick={() => handleEdit(record)}>
//                   Edit
//                </Button>

//                <Popconfirm
//                   title="Delete message?"
//                   onConfirm={() => handleDelete(record._id)}
//                >
//                   <Button danger size="small" style={{ marginLeft: 8 }}>
//                      Delete
//                   </Button>
//                </Popconfirm>
//             </>
//          )
//       }
//    ];

//    return (
//       <div style={{ padding: "20px" }}>
//          <h2>💬 Bot Messages</h2>

//          <Button
//             type="primary"
//             onClick={() => {
//                setOpen(true);
//                setEditing(null);
//                form.resetFields();
//             }}
//             style={{ marginBottom: 15 }}
//          >
//             + Add Message
//          </Button>

//          <Table
//             columns={columns}
//             dataSource={data}
//             rowKey="_id"
//             loading={loading}
//          />

//          {/* ================= MODAL ================= */}
//          <Modal
//             open={open}
//             title={editing ? "Edit Message" : "Add Message"}
//             onCancel={() => setOpen(false)}
//             onOk={() => form.submit()}
//          >
//             <Form layout="vertical" form={form} onFinish={onFinish}>

//                <Form.Item
//                   name="keywords"
//                   label="Keywords (comma separated)"
//                   rules={[{ required: true }]}
//                >
//                   <Input placeholder="hi,hello,hey" />
//                </Form.Item>

//                <Form.Item
//                   name="reply"
//                   label="Reply Message"
//                   rules={[{ required: true }]}
//                >
//                   <Input.TextArea
//                      rows={4}
//                      placeholder="Enter reply text"
//                   />
//                </Form.Item>

//                <Form.Item
//                   name="action"
//                   label="Action (optional)"
//                >
//                   <Input placeholder="menu / services / ask_name" />
//                </Form.Item>

//             </Form>
//          </Modal>
//       </div>
//    );
// }

import { useEffect, useState } from "react";
import {
   Table,
   Button,
   Modal,
   Form,
   Input,
   message,
   Popconfirm,
   Card,
   Space,
   Empty
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import {
   getBotMessages,
   createBotMessage,
   updateBotMessage,
   deleteBotMessage
} from "../services/botMessageService";

import { useTenant } from "../context/TenantContext";

export default function BotMessage() {
   const { tenantId } = useTenant();

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [editing, setEditing] = useState(null);

   const [form] = Form.useForm();

   // ================= FETCH =================
   const fetchData = async () => {
      setLoading(true);
      try {
         const res = await getBotMessages(tenantId);
         setData(res.data || []);
      } catch {
         message.error("Failed to load messages");
      }
      setLoading(false);
   };

   useEffect(() => {
      if (tenantId) fetchData();
   }, [tenantId]);

   // ================= SUBMIT =================
   const onFinish = async (values) => {
      try {
         const formatted = {
            ...values,

            // 🔥 MULTIPLE KEYWORDS
            keywords: values.keywords
               .split(",")
               .map(k => k.trim().toLowerCase())
               .filter(k => k !== ""),

               action: values.action?.trim() ? values.action.trim() : null
         };

         if (editing) {
            await updateBotMessage(editing._id, formatted);
            message.success("Updated");
         } else {
            await createBotMessage({
               ...formatted,
               tenantId
            });
            message.success("Created");
         }

         setOpen(false);
         setEditing(null);
         form.resetFields();
         fetchData();

      } catch (err) {
         message.error(err.message || "Error saving message");
      }
   };

   // ================= EDIT =================
   const handleEdit = (record) => {
      setEditing(record);
      setOpen(true);

      form.setFieldsValue({
         ...record,
         keywords: record.keywords?.join(",")
      });
   };

   // ================= DELETE =================
   const handleDelete = async (id) => {
      try {
         await deleteBotMessage(id);
         message.success("Deleted");
         fetchData();
      } catch {
         message.error("Delete failed");
      }
   };

   // ================= TABLE =================
   const columns = [
      {
         title: "Keywords",
         dataIndex: "keywords",
         key: "keywords",
         width: "20%",
         render: (keywords) => (
            <span>{keywords?.join(", ")}</span>
         )
      },
      {
         title: "Reply",
         dataIndex: "reply",
         key: "reply",
         width: "35%",
         ellipsis: true
      },
      {
         title: "Flow Action",
         dataIndex: "action",
         key: "action",
         width: "20%"
      },
      {
         title: "Actions",
         key: "actions",
         width: "25%",
         align: "center",
         render: (_, record) => (
            <Space size="small">
               <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
               >
                  Edit
               </Button>

               <Popconfirm
                  title="Delete"
                  description="Are you sure to delete this message?"
                  onConfirm={() => handleDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
               >
                  <Button
                     danger
                     size="small"
                     icon={<DeleteOutlined />}
                  >
                     Delete
                  </Button>
               </Popconfirm>
            </Space>
         )
      }
   ];

   return (
      <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
         <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
               <h2 style={{ margin: 0 }}>💬 Bot Messages</h2>
               <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                     setOpen(true);
                     setEditing(null);
                     form.resetFields();
                  }}
               >
                  Add Message
               </Button>
            </div>

            <Table
               columns={columns}
               dataSource={data}
               rowKey="_id"
               loading={loading}
               locale={{ emptyText: <Empty description="No messages found" /> }}
               pagination={{ pageSize: 10 }}
               bordered
               scroll={{ x: 1200 }}
            />
         </Card>

         {/* ================= MODAL ================= */}
         <Modal
            open={open}
            title={editing ? "Edit Message" : "Add Message"}
            onCancel={() => {
               setOpen(false);
               setEditing(null);
               form.resetFields();
            }}
            onOk={() => form.submit()}
            width={600}
            okText={editing ? "Update" : "Create"}
         >
            <Form layout="vertical" form={form} onFinish={onFinish}>

               <Form.Item
                  name="keywords"
                  label="Keywords (comma separated)"
                  rules={[
                     { required: true, message: "Keywords are required" }
                  ]}
               >
                  <Input placeholder="e.g., hi, hello, hey" />
               </Form.Item>

               <Form.Item
                  name="reply"
                  label="Reply Message"
                  rules={[
                     { required: true, message: "Reply message is required" }
                  ]}
               >
                  <Input.TextArea
                     rows={4}
                     placeholder="e.g., Hello! How can I help you today?"
                  />
               </Form.Item>

               <Form.Item
                  name="action"
                  label="Action (optional)"
               >
                  <Input placeholder="e.g., menu, services, ask_name" />
               </Form.Item>

            </Form>
         </Modal>
      </div>
   );
}