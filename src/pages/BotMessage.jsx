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
               .filter(k => k !== "")
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
         keywords: record.keywords?.join(",") // 🔥 FIX
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
         render: (_, record) => record.keywords?.join(", ")
      },
      {
         title: "Reply",
         dataIndex: "reply"
      },
      {
         title: "Flow Action", // 🔥 CHANGE NAME
         dataIndex: "action"
      },
      {
         title: "Actions", // 🔥 BUTTON COLUMN
         render: (_, record) => (
            <>
               <Button size="small" onClick={() => handleEdit(record)}>
                  Edit
               </Button>

               <Popconfirm
                  title="Delete message?"
                  onConfirm={() => handleDelete(record._id)}
               >
                  <Button danger size="small" style={{ marginLeft: 8 }}>
                     Delete
                  </Button>
               </Popconfirm>
            </>
         )
      }
   ];

   return (
      <div style={{ padding: "20px" }}>
         <h2>💬 Bot Messages</h2>

         <Button
            type="primary"
            onClick={() => {
               setOpen(true);
               setEditing(null);
               form.resetFields();
            }}
            style={{ marginBottom: 15 }}
         >
            + Add Message
         </Button>

         <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            loading={loading}
         />

         {/* ================= MODAL ================= */}
         <Modal
            open={open}
            title={editing ? "Edit Message" : "Add Message"}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
         >
            <Form layout="vertical" form={form} onFinish={onFinish}>

               <Form.Item
                  name="keywords"
                  label="Keywords (comma separated)"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="hi,hello,hey" />
               </Form.Item>

               <Form.Item
                  name="reply"
                  label="Reply Message"
                  rules={[{ required: true }]}
               >
                  <Input.TextArea
                     rows={4}
                     placeholder="Enter reply text"
                  />
               </Form.Item>

               <Form.Item
                  name="action"
                  label="Action (optional)"
               >
                  <Input placeholder="menu / services / ask_name" />
               </Form.Item>

            </Form>
         </Modal>
      </div>
   );
}