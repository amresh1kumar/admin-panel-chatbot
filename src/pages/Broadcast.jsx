import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import { getBroadcastHistory, sendBulkMessage } from "../services/broadcastService";
import { Modal, Form, Input, message, Button, Select } from "antd";
import { PlusOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import "../styles/Broadcast.css"
import { getContacts } from "../services/contactService";
import { getTemplates } from "../services/templateService";
import { Upload } from "antd";
import { uploadFile } from "../services/uploadService";

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
   const [form] = Form.useForm();



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


   const handleTemplateChange = (value) => {

      const template = templates.find(
         t => t.name === value
      );

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
   const handleCreateBroadcast = async (values) => {

      try {

         // let filteredLeads = leads;

         let recipients = [];

         if (values.audienceType === "contact") {
            recipients = contacts;
         } else {
            recipients = leads;
         }

         // if (values.audience !== "all") {
         //    filteredLeads = leads.filter(
         //       lead => lead.status === values.audience
         //    );
         // }

         // const ids = filteredLeads.map(lead => lead._id);
         const ids = recipients.map(item => item._id);

         if (ids.length === 0) {
            return message.warning("No leads found");
         }

         const res = await sendBulkMessage({
            ids,
            name: values.name,
            audienceType: values.audienceType,

            type: values.type,

            message: values.message,

            templateName: values.templateName,

            params,

            mediaUrl
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
         title: "Status",
         dataIndex: "status",
         key: "status",
         render: (status) => (
            <Tag
               color={
                  status === "completed"
                     ? "green"
                     : status === "processing"
                        ? "blue"
                        : "red"
               }
            >
               {status.toUpperCase()}
            </Tag>
         )
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
            <Button
               icon={<EyeOutlined />}
               size="small"
               onClick={() => openDetailsModal(record)}
            >
               View
            </Button>
         )
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

            <Button
               type="primary"
               icon={<PlusOutlined />}
               onClick={() => setOpenModal(true)}
            >
               Create Broadcast
            </Button>


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
               value={statusFilter}
               onChange={(value) => setStatusFilter(value)}
               allowClear
               options={[
                  {
                     value: "completed",
                     label: "Completed"
                  },
                  {
                     value: "processing",
                     label: "Processing"
                  },
                  {
                     value: "failed",
                     label: "Failed"
                  }
               ]}
            />

         </div>

         <Table
            columns={columns}
            dataSource={broadcasts}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 5 }}
         />
         <Modal
            title="Create Broadcast"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
         >
            <Form
               layout="vertical"
               form={form}
               onFinish={handleCreateBroadcast}
            >

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
                  label="Message Type"
                  name="type"
                  initialValue="text"
               >
                  <Select
                     options={[
                        {
                           label: "Text",
                           value: "text"
                        },
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

                           <Form.Item label="Upload Media">
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

                        </>

                     )

                  }


               </Form.Item>


               <Button
                  type="primary"
                  block
                  htmlType="submit"
               >
                  Send Broadcast
               </Button>

            </Form>
         </Modal>

         <Modal
            title="Broadcast Details"
            open={detailsModal}
            onCancel={() => setDetailsModal(false)}
            footer={null}
         >
            {selectedBroadcast && (

               <div className="broadcast-details">

                  <div className="broadcast-detail-item">
                     <strong>Campaign:</strong>
                     <p>{selectedBroadcast.name}</p>
                  </div>

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
         </Modal>
      </div>
   );
}