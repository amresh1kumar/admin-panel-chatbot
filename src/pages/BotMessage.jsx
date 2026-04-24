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

export default function BotMessage() {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [editing, setEditing] = useState(null);
   const [form] = Form.useForm();

   const fetchData = async () => {
      setLoading(true);
      try {
         const res = await getBotMessages();
         setData(res || []);
      } catch (err) {
         console.error(err);
         message.error("Failed to load messages");
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
   }, []);

   // ================= SUBMIT =================
   const onFinish = async (values) => {
      try {
         const formatted = {
            ...values,

            keywords: values.keywords
               .split(",")
               .map(k => k.trim().toLowerCase())
               .filter(k => k !== ""),

            action: values.action?.trim() || null
         };

         if (editing) {
            await updateBotMessage(editing._id, formatted);
            message.success("Updated");
         } else {
            await createBotMessage(formatted);
            message.success("Created");
         }

         setOpen(false);
         setEditing(null);
         form.resetFields();
         fetchData();

      } catch (err) {
         console.error(err);
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
      } catch (err) {
         console.error(err);
         message.error("Delete failed");
      }
   };

   // ================= TABLE =================
   const columns = [
      {
         title: "Keywords",
         dataIndex: "keywords",
         key: "keywords",
         width: 200,
         render: (keywords) => (
            <span>{keywords?.join(", ")}</span>
         )
      },
      {
         title: "Reply",
         dataIndex: "reply",
         key: "reply",
         width: 350,
         ellipsis: true
      },
      {
         title: "Flow Action",
         dataIndex: "action",
         key: "action",
         width: 200
      },
      {
         title: "Actions",
         key: "actions",
         width: 100,
         align: "center",
         fixed: "right",
         render: (_, record) => (
            <Space size="small">
               <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
               />
               <Popconfirm
                  title="Delete"
                  description="Are you sure to delete this message?"
                  onConfirm={() => handleDelete(record._id)}
               >
                  <Button
                     danger
                     size="small"
                     icon={<DeleteOutlined />}
                  />
               </Popconfirm>
            </Space>
         )
      }
   ];

   return (
      <div style={{ background: "#f5f5f5", minHeight: "80vh" }}>
         <Card>
            <div style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               marginBottom: "10px"
            }}>
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
               sticky
               scroll={{
                  x: 1000,
                  y: "65vh"
               }}
               size="small"
            />
         </Card>

         {/* MODAL */}
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
                  rules={[{ required: true }]}
               >
                  <Input placeholder="e.g., hi, hello, hey" />
               </Form.Item>

               <Form.Item
                  name="reply"
                  label="Reply Message"
                  rules={[{ required: true }]}
               >
                  <Input.TextArea rows={4} />
               </Form.Item>

               <Form.Item
                  name="action"
                  label="Action (optional)"
               >
                  <Input placeholder="e.g., menu, services" />
               </Form.Item>

            </Form>
         </Modal>
      </div>
   );
}