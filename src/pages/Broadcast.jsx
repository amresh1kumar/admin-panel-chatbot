import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import { getBroadcastHistory, sendBulkMessage, deleteBroadcast } from "../services/broadcastService";
import { Modal, Form, Input, message, Button, Select, DatePicker, Radio, Popconfirm } from "antd";
import dayjs from "dayjs"
import { PlusOutlined, SearchOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import "../styles/Broadcast.css"
import { getContacts } from "../services/contactService";
import { getTemplates } from "../services/templateService";
import { Upload } from "antd";
import { uploadFile } from "../services/uploadService";
import { getImportBatches } from "../services/contactService";
import { syncTemplates } from "../services/templateService";

export default function Broadcast() {

   const [broadcasts, setBroadcasts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [leads, setLeads] = useState([]);
   const [detailsModal, setDetailsModal] = useState(false);
   const [selectedBroadcast, setSelectedBroadcast] = useState(null);
   const [search, setSearch] = useState("");
   const [statusFilter, setStatusFilter] = useState("");
   const [contacts, setContacts] = useState([]);
   const [templates, setTemplates] = useState([]);
   const [selectedTemplate, setSelectedTemplate] = useState(null);
   const [params, setParams] = useState([]);
   const [mediaUrl, setMediaUrl] = useState("");
   const [filePreview, setFilePreview] = useState(null);
   const [batches, setBatches] = useState([]);
   const [syncLoading, setSyncLoading] = useState(false);
   const [sending, setSending] = useState(false);
   const [sendMode, setSendMode] = useState("now");
   const [selectedDate, setSelectedDate] = useState(null);
   const [form] = Form.useForm();


   const loadBatches = async () => {
      const data = await getImportBatches();
      setBatches(data);
   };


   useEffect(() => {

      setLoading(true);
      getLeads()
         .then(data => setLeads(data || []))
         .catch(err => console.error(err));

      getContacts()
         .then(data => setContacts(data || []))
         .catch(err => console.error(err));

      getTemplates()
         .then(data => setTemplates(data || []))
         .catch(err => console.error(err));

      getBroadcastHistory({
         search,
         status: statusFilter
      })
         .then(data => setBroadcasts(data || []))
         .catch(err => console.error(err))
         .finally(() => setLoading(false));

   }, [search, statusFilter]);

   useEffect(() => {
      loadBatches();
   }, [])

   const handleTemplateChange = (value) => {

      console.log("Selected Value:", value);
      console.log("Templates:", templates);

      const template = templates.find(t => t.name === value);

      console.log("Found Template:", template);

      setSelectedTemplate(template || null);

      if (template) {
         setParams(Array(template.params).fill(""));
      } else {
         setParams([]);
      }

   };

   const handleParamChange = (value, index) => {
      const updated = [...params];
      updated[index] = value;
      setParams(updated);
   };

   const openDetailsModal = (record) => {
      setSelectedBroadcast(record);
      setDetailsModal(true);
   };

   const handleDeleteBroadcast = async (id) => {
      try {
         await deleteBroadcast(id);

         message.success("Broadcast deleted successfully");

         setBroadcasts((prev) =>
            prev.filter((item) => item._id !== id)
         );

         if (selectedBroadcast?._id === id) {
            setDetailsModal(false);
            setSelectedBroadcast(null);
         }
      } catch (err) {
         console.error("Delete Broadcast Error:", err);

         message.error(
            err.response?.data?.message || "Failed to delete broadcast"
         );
      }
   };

   const handleSyncTemplates = async () => {

      try {

         setSyncLoading(true);

         const res = await syncTemplates();
         const data = await getTemplates();

         setTemplates(data || []);
         message.success(
            `Successfully synced ${res.total} WhatsApp templates.`
         );
      } catch (err) {

         message.error("Failed to sync templates");

      } finally {

         setSyncLoading(false);

      }

   };
   const handleCreateBroadcast = async (values) => {
      if (sendMode === "schedule") {
         if (!selectedDate) {
            message.error("Please select a schedule date and time");
            return;
         }

         if (!selectedDate.isAfter(dayjs())) {
            message.error("Schedule time must be in the future");
            return;
         }
      }

      setSending(true);

      try {

         let recipients = [];

         if (values.audienceType === "contact") {
            recipients = contacts.filter(
               (contact) =>
                  String(contact.batchId) === String(values.batchId)
            );
         } else {
            recipients = leads;
         }

         const ids = recipients.map((item) => item._id);

         console.log("Selected Batch:", values.batchId);
         console.log("Filtered Recipients:", recipients);
         console.log("Recipient IDs:", ids);

         if (ids.length === 0) {

            return message.warning(
               values.audienceType === "contact"
                  ? "No contacts found"
                  : "No leads found"
            );

         }

         const res = await sendBulkMessage({
            ids,
            name: values.name,
            audienceType: values.audienceType,
            type: values.type,
            batchId: values.batchId,
            message: values.message,
            templateName: values.templateName,
            params,
            mediaUrl,

            sendMode,
            scheduledAt:
               sendMode === "schedule" && selectedDate
                  ? selectedDate.format("YYYY-MM-DDTHH:mm:ss")
                  : null,
         });

         message.success("Broadcast sent successfully");
         setSelectedTemplate(null);
         setParams([]);
         setMediaUrl("");
         setFilePreview(null);
         setOpenModal(false);

         form.resetFields();

         // 🔹 refresh history
         const updated = await getBroadcastHistory();

         setBroadcasts(updated);

      } catch (err) {
         console.error(err);

         message.error("Failed to send broadcast");
      } finally {

         setSending(false);

      }
   };


   const handleCustomUpload = async (file) => {
      try {

         const url = await uploadFile(file);

         setMediaUrl(url);
         setFilePreview(url);

         message.success("File uploaded");

      } catch (err) {

         message.error("Upload failed");

      }
   };


   const handleRemove = () => {
      setMediaUrl("");
      setFilePreview(null);
   };


   const validateFile = (file) => {

      const isValidType =
         file.type.includes("image") ||
         file.type.includes("pdf") ||
         file.type.includes("video");

      if (!isValidType) {
         message.error("Only image, PDF or video allowed");
         return Upload.LIST_IGNORE;
      }

      const isLessThan5MB = file.size / 1024 / 1024 < 5;

      if (!isLessThan5MB) {
         message.error("File must be less than 5MB");
         return Upload.LIST_IGNORE;
      }

      return true;
   };





   const columns = [
      {
         title: "Campaign",
         dataIndex: "name",
         key: "name"
      },
      {
         title: "Audience",
         dataIndex: "audienceType",
         render: (value) => (
            <Tag color="blue">
               {value === "lead" ? "Lead" : "Contact"}
            </Tag>
         )
      },
      {
         title: "Type",
         dataIndex: "type",
         render: (value) => (
            <Tag color={value === "template" ? "purple" : "green"}>
               {value === "template" ? "Template" : "Text"}
            </Tag>
         )
      },

      {
         title: "Status",
         dataIndex: "status",
         key: "status",
         render: (status) => {
            const statusConfig = {
               completed: { color: "green", label: "Completed" },
               processing: { color: "blue", label: "Processing" },
               scheduled: { color: "orange", label: "Scheduled" },
               failed: { color: "red", label: "Failed" },
               pending: { color: "default", label: "Pending" },
            };

            const config = statusConfig[status?.toLowerCase()] || {
               color: "default",
               label: status || "Unknown",
            };

            return <Tag color={config.color}>{config.label}</Tag>;
         },
      },

      {
         title: "Processed",
         dataIndex: "total",
         key: "total"
      },

      {
         title: "Sent",
         dataIndex: "sent",
         key: "sent"
      },

      {
         title: "Failed",
         dataIndex: "failed",
         key: "failed"
      },

      {
         title: "Created",
         dataIndex: "createdAt",
         key: "createdAt",
         render: (date) =>
            new Date(date).toLocaleDateString("en-GB")
      },


      {
         title: "Action",
         key: "action",
         render: (_, record) => (
            <div style={{ display: "flex", gap: 8 }}>
               <Button
                  icon={<EyeOutlined />}
                  size="small"
                  onClick={() => openDetailsModal(record)}
               >
                  View
               </Button>

               <Popconfirm
                  title="Delete Broadcast?"
                  description={`Are you sure you want to delete "${record.name}"?`}
                  onConfirm={() => handleDeleteBroadcast(record._id)}
                  okText="Yes, Delete"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
               >
                  <Button
                     danger
                     icon={<DeleteOutlined />}
                     size="small"
                     disabled={record.status === "processing"}
                  >
                     Delete
                  </Button>
               </Popconfirm>
            </div>
         ),
      }

   ];
   return (
      <div className="broadcast-page">

         {/* Header */}
         <div className="broadcast-header">

            <div>
               <h1 className="broadcast-page-title">
                  Broadcast Campaigns
               </h1>

               <p className="broadcast-page-subtitle">
                  Manage your WhatsApp broadcast campaigns
               </p>
            </div>

            <div
               style={{
                  display: "flex",
                  gap: 10
               }}
            >

               <Button
                  onClick={handleSyncTemplates}
               >
                  Sync Templates
               </Button>

               <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenModal(true)}
               >
                  Create Broadcast
               </Button>

            </div>


         </div>

         {/* Filters */}
         <div className="broadcast-filters">

            <Input
               placeholder="Search campaigns..."
               prefix={<SearchOutlined />}
               className="broadcast-search"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />

            <Select
               placeholder="Filter by status"
               style={{ width: 200 }}
               value={statusFilter || undefined}
               onChange={(value) => setStatusFilter(value)}
               allowClear
               options={[
                  { value: "scheduled", label: "Scheduled" },
                  { value: "processing", label: "Processing" },
                  { value: "completed", label: "Completed" },
                  { value: "failed", label: "Failed" },
                  { value: "pending", label: "Pending" },
               ]}
            />

         </div>

         <Table
            columns={columns}
            dataSource={broadcasts}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 8 }}
            size="small"
         />
         <Modal
            title="Create Broadcast"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            styles={{
               body: {
                  maxHeight: "70vh",
                  overflowY: "auto",
                  paddingRight: 8,
               },
            }}
         >
            <Form
               layout="vertical"
               form={form}
               onFinish={handleCreateBroadcast}
            >

               <Form.Item label="Send When">
                  <Radio.Group
                     value={sendMode}
                     onChange={(e) => {
                        setSendMode(e.target.value);
                        setSelectedDate(null);
                     }}
                     options={[
                        { label: "Send Now", value: "now" },
                        { label: "Schedule for Later", value: "schedule" },
                     ]}
                  />
               </Form.Item>

               {sendMode === "schedule" && (
                  <Form.Item
                     label="Schedule Date & Time"
                     required
                     validateStatus={
                        !selectedDate ? "error" : ""
                     }
                     help={
                        !selectedDate
                           ? "Please select a schedule date and time"
                           : null
                     }
                  >
                     <DatePicker
                        showTime
                        style={{ width: "100%" }}
                        format="DD-MM-YYYY HH:mm"
                        value={selectedDate}
                        onChange={setSelectedDate}
                        disabledDate={(current) =>
                           current && current.endOf("day").valueOf() < Date.now()
                        }
                        placeholder="Select future date and time"
                     />
                  </Form.Item>
               )}

               <Form.Item
                  label="Campaign Name"
                  name="name"
                  rules={[
                     { required: true, message: "Enter campaign name" }
                  ]}
               >
                  <Input placeholder="Festival Offer" />
               </Form.Item>

               <Form.Item
                  label="Audience Type"
                  name="audienceType"
                  initialValue="lead"
                  rules={[
                     {
                        required: true,
                        message: "Select audience type",
                     },
                  ]}
               >
                  <Select
                     options={[
                        {
                           value: "lead",
                           label: "Leads",
                        },
                        {
                           value: "contact",
                           label: "Contacts",
                        },
                     ]}
                  />
               </Form.Item>

               <Form.Item
                  noStyle
                  shouldUpdate
               >
                  {({ getFieldValue }) =>

                     getFieldValue("audienceType") === "contact" && (

                        <Form.Item
                           label="Import Batch"
                           name="batchId"
                           rules={[
                              {
                                 required: true,
                                 message: "Select Import Batch"
                              }
                           ]}
                        >

                           <Select placeholder="Select Import Batch">

                              {batches.map(batch => (

                                 <Select.Option
                                    key={batch._id}
                                    value={batch._id}
                                 >
                                    {batch.fileName} ({batch.imported})
                                 </Select.Option>

                              ))}

                           </Select>

                        </Form.Item>

                     )

                  }
               </Form.Item>

               <Form.Item
                  label="Message Type"
                  name="type"
                  initialValue="template"
               >
                  <Select
                     options={[
                        // {
                        //    label: "Text",
                        //    value: "text"
                        // },
                        {
                           label: "Template",
                           value: "template"
                        }
                     ]}
                  />
               </Form.Item>
               {/* <Form.Item
                  label="Audience"
                  name="audience"
                  rules={[
                     {
                        required: true,
                        message: "Select audience"
                     }
                  ]}
               >
                  <Select
                     placeholder="Select audience"
                     options={[
                        {
                           value: "all",
                           label:
                              form.getFieldValue("audienceType") === "contact"
                                 ? `All Contacts (${contacts.length})`
                                 : `All Leads (${leads.length})`,
                        },
                     ]}
                  />
               </Form.Item> */}
               <Form.Item
                  noStyle
                  shouldUpdate
               >
                  {({ getFieldValue }) =>

                     getFieldValue("type") === "text" && (

                        <Form.Item
                           label="Message"
                           name="message"
                           rules={[
                              {
                                 required: true,
                                 message: "Enter message"
                              }
                           ]}
                        >
                           <Input.TextArea rows={5} />
                        </Form.Item>

                     )

                  }
               </Form.Item>

               <Form.Item
                  noStyle
                  shouldUpdate
               >
                  {({ getFieldValue }) =>

                     getFieldValue("type") === "template" && (

                        <>


                           {templates.length === 0 ? (

                              <div
                                 style={{
                                    padding: 16,
                                    background: "#fff7e6",
                                    border: "1px solid #ffd591",
                                    borderRadius: 8,
                                    marginBottom: 16,
                                 }}
                              >
                                 <p style={{ marginBottom: 12 }}>
                                    No templates found. Please sync your WhatsApp templates first.
                                 </p>

                                 <Button
                                    loading={syncLoading}
                                    onClick={handleSyncTemplates}
                                 >
                                    Sync Templates
                                 </Button>
                              </div>

                           ) : (

                              <Form.Item
                                 label="Template"
                                 name="templateName"
                                 rules={[
                                    {
                                       required: true,
                                       message: "Select Template"
                                    }
                                 ]}
                              >
                                 <Select
                                    placeholder="Select Template"
                                    onChange={handleTemplateChange}
                                 >
                                    {templates.map(t => (
                                       <Select.Option
                                          key={t.name}
                                          value={t.name}
                                       >
                                          {t.label}
                                       </Select.Option>
                                    ))}
                                 </Select>
                              </Form.Item>

                           )}
                           {/* <Form.Item
                              label="Template"
                              name="templateName"
                              rules={[
                                 {
                                    required: true,
                                    message: "Select Template"
                                 }
                              ]}
                           >

                              <Select
                                 placeholder="Select Template"
                                 onChange={handleTemplateChange}
                              >

                                 {templates.map(t => (

                                    <Select.Option
                                       key={t.name}
                                       value={t.name}
                                    >
                                       {t.label}
                                    </Select.Option>

                                 ))}

                              </Select>

                           </Form.Item> */}

                           <Form.Item label="Template Preview">
                              <Input.TextArea
                                 rows={5}
                                 value={selectedTemplate?.body || ""}
                                 disabled
                              />
                           </Form.Item>

                           {selectedTemplate &&


                              params.map((p, index) => (

                                 <Input
                                    key={index}
                                    placeholder={`Parameter ${index + 1}`}
                                    value={p}
                                    onChange={(e) =>
                                       handleParamChange(
                                          e.target.value,
                                          index
                                       )
                                    }
                                    style={{
                                       marginBottom: 10
                                    }}
                                 />

                              ))}
                           {selectedTemplate &&
                              ["image", "video", "document"].includes(selectedTemplate.headerType) && (
                                 <Form.Item label={`Upload ${selectedTemplate?.headerType || "Media"}`}>
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

                                    {filePreview?.match(/\.(jpg|jpeg|png|webp)$/i) && (
                                       <img
                                          src={filePreview}
                                          style={{
                                             width: 120,
                                             borderRadius: 8
                                          }}
                                       />
                                    )}

                                    {filePreview?.endsWith(".pdf") && (
                                       <div>📄 PDF Uploaded</div>
                                    )}

                                    {filePreview?.match(/\.(mp4|webm)$/i) && (
                                       <video
                                          width="150"
                                          controls
                                          src={filePreview}
                                       />
                                    )}

                                    <Button
                                       danger
                                       size="small"
                                       style={{
                                          marginTop: 8
                                       }}
                                       onClick={handleRemove}
                                    >
                                       Remove
                                    </Button>
                                 </Form.Item>

                              )}

                        </>

                     )

                  }


               </Form.Item>


               <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={sending}
                  disabled={sending}
               >
                  {sendMode === "schedule" ? "Schedule Broadcast" : "Send Broadcast"}
               </Button>

            </Form>
         </Modal>

         {/* <Modal
            title="Broadcast Details"
            open={detailsModal}
            onCancel={() => setDetailsModal(false)}
            footer={null}
            styles={{
               body: {
                  maxHeight: "70vh",
                  overflowY: "auto",
                  paddingRight: 8,
               },
            }}
         >
            {selectedBroadcast && (

               <div className="broadcast-details">

                  <div className="broadcast-detail-item">
                     <strong>Campaign:</strong>
                     <p>{selectedBroadcast.name}</p>
                  </div>

                  <div className="broadcast-detail-item">
                     <strong>Audience:</strong>

                     <p>
                        {selectedBroadcast.audienceType === "lead"
                           ? "Lead"
                           : "Contact"}
                     </p>
                  </div>

                  <div className="broadcast-detail-item">
                     <strong>Message Type:</strong>

                     <p>
                        {selectedBroadcast.type === "template"
                           ? "Template"
                           : "Text"}
                     </p>
                  </div>

                  {selectedBroadcast.type === "template" && (

                     <div className="broadcast-detail-item">

                        <strong>Template:</strong>

                        <p>
                           {selectedBroadcast.templateLabel || selectedBroadcast.templateName}
                        </p>

                     </div>

                  )}

                  {selectedBroadcast.templateBody && (

                     <div className="broadcast-detail-item">

                        <strong>Template Body:</strong>

                        <p>
                           {selectedBroadcast.templateBody}
                        </p>

                     </div>

                  )}

                  {selectedBroadcast.params?.length > 0 && (

                     <div className="broadcast-detail-item">

                        <strong>Parameters:</strong>

                        <p>
                           {selectedBroadcast.params.join(", ")}
                        </p>

                     </div>

                  )}

                  {selectedBroadcast.mediaUrl && (

                     <div className="broadcast-detail-item">

                        <strong>Media:</strong>

                        <div style={{ marginTop: 10 }}>

                           {selectedBroadcast.mediaUrl.match(/\.(jpg|jpeg|png|webp)$/i) && (

                              <img
                                 src={selectedBroadcast.mediaUrl}
                                 alt="media"
                                 style={{
                                    width: 180,
                                    borderRadius: 8
                                 }}
                              />

                           )}

                           {selectedBroadcast.mediaUrl.match(/\.(mp4|webm)$/i) && (

                              <video
                                 width="220"
                                 controls
                                 src={selectedBroadcast.mediaUrl}
                              />

                           )}

                           {selectedBroadcast.mediaUrl.endsWith(".pdf") && (

                              <a
                                 href={selectedBroadcast.mediaUrl}
                                 target="_blank"
                                 rel="noreferrer"
                              >
                                 📄 View PDF
                              </a>

                           )}

                        </div>

                     </div>

                  )}

                  <div className="broadcast-detail-item">
                     <strong>Status:</strong>
                     <p>{selectedBroadcast.status}</p>
                  </div>

                  <div className="broadcast-detail-item">
                     <strong>Message:</strong>
                     <p>{selectedBroadcast.message}</p>
                  </div>

                  <div className="broadcast-detail-item">
                     <strong>Total:</strong>
                     <p>{selectedBroadcast.total}</p>
                  </div>

                  <div className="broadcast-detail-item">
                     <strong>Sent:</strong>
                     <p>{selectedBroadcast.sent}</p>
                  </div>

                  <div className="broadcast-detail-item">
                     <strong>Failed:</strong>
                     <p>{selectedBroadcast.failed}</p>
                  </div>

                  <div className="broadcast-detail-item">
                     <strong>Created:</strong>
                     <p>
                        {new Date(
                           selectedBroadcast.createdAt
                        ).toLocaleString()}
                     </p>
                  </div>

               </div>
            )}
         </Modal> */}


         <Modal
            title="Broadcast Details"
            open={detailsModal}
            onCancel={() => setDetailsModal(false)}
            footer={null}
            styles={{
               body: {
                  maxHeight: "70vh",
                  overflowY: "auto",
                  paddingRight: 8,
               },
            }}
         >
            {selectedBroadcast && (() => {
               const broadcast = selectedBroadcast;

               const statusColors = {
                  completed: "#389e0d",
                  processing: "#1677ff",
                  scheduled: "#d48806",
                  failed: "#cf1322",
                  pending: "#8c8c8c",
               };

               const total = Number(broadcast.total || 0);
               const sent = Number(broadcast.sent || 0);
               const failed = Number(broadcast.failed || 0);
               const successRate =
                  total > 0 ? ((sent / total) * 100).toFixed(1) : "0.0";

               const formatDate = (date) => {
                  if (!date) return "—";

                  const parsedDate = new Date(date);

                  return Number.isNaN(parsedDate.getTime())
                     ? "—"
                     : parsedDate.toLocaleString("en-IN");
               };

               const Detail = ({ label, children }) => (
                  <div
                     className="broadcast-detail-item"
                     style={{ marginBottom: 16 }}
                  >
                     <strong>{label}:</strong>
                     <p style={{ margin: "4px 0 0", overflowWrap: "anywhere" }}>
                        {children ?? "—"}
                     </p>
                  </div>
               );

               return (
                  <div className="broadcast-details">
                     <h3>Campaign Information</h3>

                     <Detail label="Campaign">
                        {broadcast.name}
                     </Detail>

                     <Detail label="Broadcast ID">
                        {broadcast._id}
                     </Detail>

                     <Detail label="Audience">
                        {broadcast.audienceType === "lead" ? "Lead" : "Contact"}
                     </Detail>

                     <Detail label="Message Type">
                        {broadcast.type === "template" ? "Template" : "Text"}
                     </Detail>

                     {broadcast.batchId && (
                        <Detail label="Import Batch ID">
                           {String(broadcast.batchId)}
                        </Detail>
                     )}

                     <Detail label="Status">
                        <Tag color={statusColors[broadcast.status] || "default"}>
                           {broadcast.status?.toUpperCase() || "UNKNOWN"}
                        </Tag>
                     </Detail>

                     <Detail label="Created">
                        {formatDate(broadcast.createdAt)}
                     </Detail>

                     <Detail label="Last Updated">
                        {formatDate(broadcast.updatedAt)}
                     </Detail>

                     <Detail label="Scheduled At">
                        {formatDate(broadcast.scheduledAt)}
                     </Detail>

                     <h3>Message Details</h3>

                     {broadcast.type === "template" && (
                        <>
                           <Detail label="Template Name">
                              {broadcast.templateName}
                           </Detail>

                           <Detail label="Template Label">
                              {broadcast.templateLabel || broadcast.templateName}
                           </Detail>

                           <Detail label="Template Body">
                              {broadcast.templateBody || "Not available"}
                           </Detail>

                           <Detail label="Language">
                              {broadcast.templateLanguage || broadcast.language || "Not stored"}
                           </Detail>
                        </>
                     )}

                     {broadcast.message && (
                        <Detail label="Message">
                           {broadcast.message}
                        </Detail>
                     )}

                     {broadcast.params?.length > 0 && (
                        <Detail label="Parameters">
                           {broadcast.params.join(", ")}
                        </Detail>
                     )}

                     {broadcast.mediaUrl && (
                        <div className="broadcast-detail-item" style={{ marginBottom: 16 }}>
                           <strong>Media Attachment:</strong>

                           <div style={{ marginTop: 8 }}>
                              {/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(broadcast.mediaUrl) && (
                                 <img
                                    src={broadcast.mediaUrl}
                                    alt="Broadcast media"
                                    style={{
                                       maxWidth: "100%",
                                       width: 220,
                                       borderRadius: 8,
                                    }}
                                 />
                              )}

                              {/\.(mp4|webm)(\?.*)?$/i.test(broadcast.mediaUrl) && (
                                 <video
                                    width="100%"
                                    style={{ maxWidth: 320, borderRadius: 8 }}
                                    controls
                                    src={broadcast.mediaUrl}
                                 />
                              )}

                              {/\.pdf(\?.*)?$/i.test(broadcast.mediaUrl) && (
                                 <a
                                    href={broadcast.mediaUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                 >
                                    View PDF
                                 </a>
                              )}

                              <div style={{ marginTop: 8 }}>
                                 <a
                                    href={broadcast.mediaUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                 >
                                    Open media URL
                                 </a>
                              </div>
                           </div>
                        </div>
                     )}

                     <h3>Delivery Statistics</h3>

                     <Detail label="Total Recipients">
                        {total}
                     </Detail>

                     <Detail label="Sent Successfully">
                        {sent}
                     </Detail>

                     <Detail label="Failed">
                        {failed}
                     </Detail>

                     <Detail label="Success Rate">
                        {successRate}%
                     </Detail>

                     <Detail label="Recipient IDs Stored">
                        {broadcast.recipientIds?.length || 0}
                     </Detail>

                     {broadcast.recipientIds?.length > 0 && (
                        <Detail label="Recipient IDs">
                           {broadcast.recipientIds.map((id) => String(id)).join(", ")}
                        </Detail>
                     )}
                  </div>
               );
            })()}
         </Modal>

      </div>
   );
}