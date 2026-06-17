import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import { getBroadcastHistory, sendBulkMessage } from "../services/broadcastService";
import { Modal, Form, Input, message, Button, Select } from "antd";
import { PlusOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import "../styles/Broadcast.css"

export default function Broadcast() {

   const [broadcasts, setBroadcasts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [leads, setLeads] = useState([]);
   const [detailsModal, setDetailsModal] = useState(false);
   const [selectedBroadcast, setSelectedBroadcast] = useState(null);
   const [search, setSearch] = useState("");
   const [statusFilter, setStatusFilter] = useState("");
   const [form] = Form.useForm();


   useEffect(() => {

      setLoading(true);
      getLeads()
         .then(data => setLeads(data || []))
         .catch(err => console.error(err));

      getBroadcastHistory({
         search,
         status: statusFilter
      })
         .then(data => setBroadcasts(data || []))
         .catch(err => console.error(err))
         .finally(() => setLoading(false));

   }, [search, statusFilter]);


   const openDetailsModal = (record) => {
      setSelectedBroadcast(record);
      setDetailsModal(true);
   };
   const handleCreateBroadcast = async (values) => {

      try {

         let filteredLeads = leads;

         if (values.audience !== "all") {
            filteredLeads = leads.filter(
               lead => lead.status === values.audience
            );
         }

         const ids = filteredLeads.map(lead => lead._id);

         if (ids.length === 0) {
            return message.warning("No leads found");
         }

         const res = await sendBulkMessage({
            ids,
            message: values.message,
            name: values.name
         });

         message.success("Broadcast sent successfully");

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
                           label: `All Leads (${leads.length})`
                        },
                        // {
                        //    value: "new",
                        //    label: "New Leads"
                        // },
                        // {
                        //    value: "contacted",
                        //    label: "Contacted Leads"
                        // },
                        // {
                        //    value: "closed",
                        //    label: "Closed Leads"
                        // }
                     ]}
                  />
               </Form.Item>
               <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                     { required: true, message: "Enter message" }
                  ]}
               >
                  <Input.TextArea
                     rows={5}
                     placeholder="Enter broadcast message..."
                  />
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