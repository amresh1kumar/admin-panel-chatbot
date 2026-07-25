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
   Empty,
   Select,
   Upload,
   Checkbox
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
   getBotMessages,
   createBotMessage,
   updateBotMessage,
   deleteBotMessage
} from "../services/botMessageService";
import { getTemplates } from "../services/templateService";
import { uploadFile } from "../services/uploadService";

export default function BotMessage() {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [editing, setEditing] = useState(null);
   const [templates, setTemplates] = useState([]);
   const [filePreview, setFilePreview] = useState(null);
   const [paramCount, setParamCount] = useState(0);
   const [form] = Form.useForm();

   const fetchData = async () => {
      setLoading(true);
      try {
         const res = await getBotMessages();
         setData(res?.data || res || []);
      } catch (err) {
         console.error(err);
         message.error("Failed to load messages");
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchData();

      const loadTemplates = async () => {
         try {
            const res = await getTemplates();
            setTemplates(res?.data || res || []);
         } catch (err) {
            console.error(err);
         }
      };

      loadTemplates();

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

            action: values.action?.trim() || null,
            params: values.params || []
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
      setFilePreview(record.mediaUrl || null);
      setParamCount(record.params?.length || 0);

      form.setFieldsValue({
         ...record,
         keywords: record.keywords?.join(","),
         params: record.params || []
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
   const handleCustomUpload = async (file) => {
      try {
         const url = await uploadFile(file);

         form.setFieldsValue({
            mediaUrl: url
         });
         setFilePreview(url);
         message.success("File uploaded");

      } catch (err) {
         message.error("Upload failed");
      }
   };

   const handleRemove = () => {
      setFilePreview(null);

      form.setFieldsValue({
         mediaUrl: ""
      });
   };

   const validateFile = (file) => {
      const isValidType =
         file.type.includes("image") ||
         file.type.includes("pdf") ||
         file.type.includes("video");

      if (!isValidType) {
         message.error("Only image, PDF, or video allowed");
         return Upload.LIST_IGNORE;
      }

      const isLessThan5MB = file.size / 1024 / 1024 < 5;

      if (!isLessThan5MB) {
         message.error("File must be less than 5MB");
         return Upload.LIST_IGNORE;
      }

      return true;
   };

   const handleTemplateChange = (value) => {
      const selected = templates.find(t => t.name === value);

      if (!selected) {
         setParamCount(0);
         return;
      }

      setParamCount(selected.params || 0);
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
         title: "Template",
         dataIndex: "templateName",
         key: "templateName",
         width: 150,
         render: (t) => t || "-"
      },
      {
         title: "Media",
         dataIndex: "mediaUrl",
         key: "mediaUrl",
         width: 200,
         render: (url) => {
            if (!url) return "-";

            if (url.match(/\.(jpeg|jpg|png|webp)$/)) {
               return <img src={url} style={{ width: 40 }} />;
            }

            if (url.endsWith(".pdf")) {
               return "📄 PDF";
            }

            if (url.match(/\.(mp4|webm)$/)) {
               return "🎥 Video";
            }

            return "Media";
         }
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
                     setParamCount(0);
                     setFilePreview(null);
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
                  rules={[{ required: false }]}
               >
                  <Input.TextArea rows={4} />
               </Form.Item>

               <Form.Item
                  name="action"
                  label="Action (optional)"
               >
                  <Input placeholder="e.g., menu, services" />
               </Form.Item>
               <Form.Item
                  name="isFlowEnd"
                  valuePropName="checked"
               >
                  <Checkbox>
                     Mark as Flow End
                  </Checkbox>
               </Form.Item>
               <Form.Item name="templateName" label="Template (optional)">
                  <Select placeholder="Select template" allowClear onChange={handleTemplateChange}>
                     {templates
                        .map(t => (
                           <Select.Option key={t.name} value={t.name}>
                              {t.name}
                           </Select.Option>
                        ))}
                  </Select>

               </Form.Item>

               {paramCount > 0 && (
                  <Form.Item label="Template Parameters">
                     {Array.from({ length: paramCount }).map((_, i) => (
                        <Form.Item
                           key={i}
                           name={["params", i]}
                           rules={[{ required: true, message: "Required" }]}
                        >
                           <Input placeholder={`Enter value for {{${i + 1}}}`} />
                        </Form.Item>
                     ))}
                  </Form.Item>
               )}


               <Form.Item label="Upload File">
                  <Upload
                     showUploadList={false}
                     beforeUpload={(file) => {
                        const valid = validateFile(file);
                        if (!valid) return false;

                        handleCustomUpload(file);
                        return false;
                     }}
                  >
                     <Button>Upload File</Button>
                  </Upload>
                  {filePreview && (
                     <div style={{ marginTop: 10 }}>

                        {/* IMAGE PREVIEW */}
                        {filePreview.match(/\.(jpeg|jpg|png|webp)$/) && (
                           <img
                              src={filePreview}
                              alt="preview"
                              style={{ width: 120, borderRadius: 8 }}
                           />
                        )}

                        {/* PDF PREVIEW */}
                        {filePreview.endsWith(".pdf") && (
                           <div>
                              📄 PDF Uploaded
                           </div>
                        )}

                        {/* VIDEO PREVIEW */}
                        {filePreview.match(/\.(mp4|webm)$/) && (
                           <video width="150" controls src={filePreview} />
                        )}

                        {/* REMOVE BUTTON */}
                        <Button
                           danger
                           size="small"
                           style={{ marginTop: 5 }}
                           onClick={handleRemove}
                        >
                           Remove
                        </Button>

                     </div>
                  )}
               </Form.Item>



               <Form.Item name="mediaUrl" label="Media URL (PDF/Image/Video)">
                  <Input placeholder="https://example.com/file.pdf" />
               </Form.Item>
            </Form>
         </Modal>
      </div>
   );
}