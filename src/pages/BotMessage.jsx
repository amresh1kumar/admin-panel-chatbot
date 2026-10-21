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
   const [mediaItems, setMediaItems] = useState([]);
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
   // const onFinish = async (values) => {
   //    try {
   //       const formatted = {
   //          ...values,

   //          keywords: values.keywords
   //             .split(",")
   //             .map(k => k.trim().toLowerCase())
   //             .filter(k => k !== ""),

   //          action: values.action?.trim() || null,
   //          params: values.params || []
   //       };

   //       if (editing) {
   //          await updateBotMessage(editing._id, formatted);
   //          message.success("Updated");
   //       } else {
   //          await createBotMessage(formatted);
   //          message.success("Created");
   //       }

   //       setOpen(false);
   //       setEditing(null);
   //       form.resetFields();
   //       fetchData();

   //    } catch (err) {
   //       console.error(err);
   //       message.error(err.message || "Error saving message");
   //    }
   // };


   const onFinish = async (values) => {
      try {
         const formatted = {
            ...values,

            keywords: values.keywords
               .split(",")
               .map((k) => k.trim().toLowerCase())
               .filter((k) => k !== ""),

            action: values.action?.trim() || null,
            // params: values.params || [],

            mediaItems: mediaItems.map((item) => ({
               url: item.url,
               type: item.type,
               caption: item.caption?.trim() || "",
            })),
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
         setMediaItems([]);
         setFilePreview(null);
         form.resetFields();
         fetchData();
      } catch (err) {
         console.error(err);
         message.error(err.message || "Error saving message");
      }
   };


   // ================= EDIT =================
   // const handleEdit = (record) => {
   //    setEditing(record);
   //    setOpen(true);
   //    setFilePreview(record.mediaUrl || null);
   //    setParamCount(record.params?.length || 0);

   //    form.setFieldsValue({
   //       ...record,
   //       keywords: record.keywords?.join(","),
   //       params: record.params || []
   //    });
   // };



   const handleEdit = (record) => {
      setEditing(record);
      setOpen(true);

      setFilePreview(record.mediaUrl || null);
      setMediaItems(
         (record.mediaItems || []).map((item) => ({
            url: item.url,
            type: item.type,
            caption: item.caption || "",
         }))
      );

      setParamCount(record.params?.length || 0);

      form.setFieldsValue({
         ...record,
         keywords: record.keywords?.join(","),
         params: record.params || [],
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

   const handleMultipleMediaUpload = async (file) => {
      try {
         const url = await uploadFile(file);

         let type = "image";

         if (file.type === "application/pdf") {
            type = "document";
         } else if (file.type.startsWith("video/")) {
            type = "video";
         }

         setMediaItems((prev) => [
            ...prev,
            {
               url,
               type,
               caption: ""
            }
         ]);

         message.success(`${file.name} uploaded successfully`);
      } catch (err) {
         console.error(err);
         message.error(`Upload failed: ${file.name}`);
      }
   };

   const handleMediaCaptionChange = (index, caption) => {
      setMediaItems((prev) =>
         prev.map((item, i) =>
            i === index ? { ...item, caption } : item
         )
      );
   };

   const handleRemoveMedia = (index) => {
      setMediaItems((prev) =>
         prev.filter((_, i) => i !== index)
      );
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
         key: "media",
         width: 240,
         render: (_, record) => {
            const items =
               Array.isArray(record.mediaItems) && record.mediaItems.length
                  ? record.mediaItems
                  : record.mediaUrl
                     ? [{
                        url: record.mediaUrl,
                        type: null,
                     }]
                     : [];

            if (!items.length) return "-";

            return (
               <div
                  style={{
                     display: "flex",
                     gap: 8,
                     flexWrap: "wrap",
                     alignItems: "center",
                  }}
               >
                  {items.map((item, index) => {
                     const url = item.url;
                     if (!url) return null;

                     const type =
                        item.type ||
                        (url.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i)
                           ? "image"
                           : url.match(/\.pdf(\?|$)/i)
                              ? "document"
                              : url.match(/\.(mp4|webm|mov)(\?|$)/i)
                                 ? "video"
                                 : "document");

                     if (type === "image") {
                        return (
                           <a
                              key={`${url}-${index}`}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              title="Open full image"
                           >
                              <img
                                 src={url}
                                 alt={`Media ${index + 1}`}
                                 onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                 }}
                                 style={{
                                    width: 20,
                                    height: 20,
                                    objectFit: "cover",
                                    borderRadius: 6,
                                    border: "1px solid #ddd",
                                    display: "block",
                                 }}
                              />
                           </a>
                        );
                     }

                     if (type === "video") {
                        return (
                           <a
                              key={`${url}-${index}`}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                           >
                              🎥 Video {index + 1}
                           </a>
                        );
                     }

                     return (
                        <a
                           key={`${url}-${index}`}
                           href={url}
                           target="_blank"
                           rel="noreferrer"
                        >
                           📄 PDF {index + 1}
                        </a>
                     );
                  })}
               </div>
            );
         },
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
                     setEditing(null);
                     form.resetFields();
                     setParamCount(0);
                     setFilePreview(null);
                     setMediaItems([]);
                     setOpen(true);
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
            // onCancel={() => {
            //    setOpen(false);
            //    setEditing(null);
            //    form.resetFields();
            // }}


            onCancel={() => {
               setOpen(false);
               setEditing(null);
               form.resetFields();
               setMediaItems([]);
               setFilePreview(null);
               setParamCount(0);
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
               


               <Form.Item label="Upload Images / Videos / PDFs">
                  <Upload
                     showUploadList={false}
                     multiple
                     beforeUpload={(file) => {
                        const valid = validateFile(file);

                        if (!valid) return false;

                        handleMultipleMediaUpload(file);
                        return false;
                     }}
                  >
                     <Button>Upload Media</Button>
                  </Upload>

                  {mediaItems.map((item, index) => (
                     <div
                        key={`${item.url}-${index}`}
                        style={{
                           marginTop: 12,
                           padding: 12,
                           border: "1px solid #ddd",
                           borderRadius: 8,
                        }}
                     >
                        

                        {item.type === "image" && (
                           <img
                              src={item.url}
                              alt={`Media ${index + 1}`}
                              onError={(e) => {
                                 e.currentTarget.style.display = "none";
                              }}
                              style={{
                                 width: "100%",
                                 maxWidth: 200,
                                 maxHeight: 200,
                                 objectFit: "contain",
                                 display: "block",
                                 borderRadius: 8,
                                 marginBottom: 12,
                                 background: "#f5f5f5",
                              }}
                           />
                        )}

                        {item.type === "video" && (
                           <video
                              width="180"
                              controls
                              src={item.url}
                              style={{ display: "block", marginBottom: 8 }}
                           />
                        )}

                        {item.type === "document" && (
                           <div style={{ marginBottom: 8 }}>
                              📄 PDF Document {index + 1}
                           </div>
                        )}

                        <Input
                           placeholder="Enter caption for this media"
                           value={item.caption}
                           onChange={(e) =>
                              handleMediaCaptionChange(index, e.target.value)
                           }
                           style={{ marginBottom: 8 }}
                        />

                        <Button
                           danger
                           size="small"
                           onClick={() => handleRemoveMedia(index)}
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
               </Form.Item>

            </Form>
         </Modal>
      </div>
   );
}