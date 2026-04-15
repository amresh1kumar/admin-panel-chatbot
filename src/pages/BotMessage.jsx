// import { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";

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

//    // 🔥 fetch
//    const fetchData = async () => {
//       setLoading(true);
//       try {
//          const res = await getBotMessages(tenantId);
//          setData(res.data);
//       } catch {
//          message.error("Failed to load");
//       }
//       setLoading(false);
//    };

//    useEffect(() => {
//       if (tenantId) fetchData();
//    }, [tenantId]);

//    // ➕ Submit
//    const onFinish = async (values) => {
//       try {
//          if (editing) {
//             await updateBotMessage(editing._id, values);
//             message.success("Updated");
//          } else {
//             await createBotMessage({ ...values, tenantId });
//             message.success("Created");
//          }

//          setOpen(false);
//          form.resetFields();
//          setEditing(null);
//          fetchData();
//       } catch {
//          message.error("Error");
//       }
//    };

//    // ✏️ Edit
//    const handleEdit = (record) => {
//       setEditing(record);
//       setOpen(true);
//       form.setFieldsValue(record);
//    };

//    // ❌ Delete
//    const handleDelete = async (id) => {
//       try {
//          await deleteBotMessage(id);
//          message.success("Deleted");
//          fetchData();
//       } catch {
//          message.error("Delete failed");
//       }
//    };

//    // 📊 columns
//    const columns = [
//       {
//          title: "Keyword",
//          dataIndex: "keyword"
//       },
//       {
//          title: "Reply",
//          dataIndex: "reply"
//       },
//       {
//          title: "Actions",
//          render: (_, record) => (
//             <>
//                <Button onClick={() => handleEdit(record)} size="small">
//                   Edit
//                </Button>

//                <Popconfirm
//                   title="Delete?"
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
//          <h2>🤖 Bot Messages</h2>

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

//          {/* Modal */}
//          <Modal
//             open={open}
//             onCancel={() => setOpen(false)}
//             onOk={() => form.submit()}
//             title={editing ? "Edit Message" : "Add Message"}
//          >
//             <Form form={form} layout="vertical" onFinish={onFinish}>
//                {/* <Form.Item
//                   name="keyword"
//                   label="Keyword"
//                   rules={[{ required: true }]}
//                >
//                   <Input placeholder="hello / hi / pricing" />
//                </Form.Item> */}

//                <Form.Item
//                   name="keywords"
//                   label="Keywords (comma separated)"
//                   rules={[{ required: true }]}
//                >
//                   <Input placeholder="hi, hello, hey" />
//                </Form.Item>

//                <Form.Item
//                   name="reply"
//                   label="Reply"
//                   rules={[{ required: true }]}
//                >
//                   <Input.TextArea rows={4} placeholder="Enter reply..." />
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
   Popconfirm
} from "antd";

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

   // 🔥 Fetch Data
   const fetchData = async () => {
      setLoading(true);
      try {
         const res = await getBotMessages(tenantId);
         setData(res.data || []);
      } catch {
         message.error("Failed to load bot messages");
      }
      setLoading(false);
   };

   useEffect(() => {
      if (tenantId) fetchData();
   }, [tenantId]);

   // 🔥 Submit (Create / Update)
   const onFinish = async (values) => {
      try {
         const formatted = {
            ...values,
            keywords: values.keywords
               .split(",")
               .map(k => k.trim().toLowerCase())
         };

         if (editing) {
            await updateBotMessage(editing._id, formatted);
            message.success("Updated successfully");
         } else {
            await createBotMessage({
               ...formatted,
               tenantId
            });
            message.success("Created successfully");
         }

         setOpen(false);
         setEditing(null);
         form.resetFields();
         fetchData();

      } catch {
         message.error("Something went wrong");
      }
   };

   // 🔥 Edit
   const handleEdit = (record) => {
      setEditing(record);
      setOpen(true);

      form.setFieldsValue({
         ...record,
         keywords: record.keywords.join(", ")
      });
   };

   // 🔥 Delete
   const handleDelete = async (id) => {
      try {
         await deleteBotMessage(id);
         message.success("Deleted");
         fetchData();
      } catch {
         message.error("Delete failed");
      }
   };

   // 📊 Table Columns
   const columns = [
      {
         title: "Keywords",
         render: (_, record) => record.keywords?.join(", ")
      },
      {
         title: "Reply",
         dataIndex: "reply"
      },
      {
         title: "Actions",
         render: (_, record) => (
            <>
               <Button
                  size="small"
                  onClick={() => handleEdit(record)}
               >
                  Edit
               </Button>

               <Popconfirm
                  title="Delete this message?"
                  onConfirm={() => handleDelete(record._id)}
               >
                  <Button
                     danger
                     size="small"
                     style={{ marginLeft: 8 }}
                  >
                     Delete
                  </Button>
               </Popconfirm>
            </>
         )
      }
   ];

   return (
      <div style={{ padding: "20px" }}>
         <h2>🤖 Bot Messages</h2>

         <Button
            type="primary"
            style={{ marginBottom: 15 }}
            onClick={() => {
               setOpen(true);
               setEditing(null);
               form.resetFields();
            }}
         >
            + Add Message
         </Button>

         <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            loading={loading}
         />

         {/* 🔥 Modal */}
         <Modal
            open={open}
            title={editing ? "Edit Bot Message" : "Add Bot Message"}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
         >
            <Form layout="vertical" form={form} onFinish={onFinish}>

               <Form.Item
                  name="keywords"
                  label="Keywords (comma separated)"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="hi, hello, hey" />
               </Form.Item>

               <Form.Item
                  name="reply"
                  label="Reply"
                  rules={[{ required: true }]}
               >
                  <Input.TextArea rows={4} placeholder="Enter reply..." />
               </Form.Item>

            </Form>
         </Modal>
      </div>
   );
}