import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useTenant } from "../context/TenantContext";
import { getLeads, deleteLead, updateLeadStatus, addLeadNote } from "../services/leadService";
import { Table, Tag, Button, Space, Popconfirm, Select, Modal, Input } from "antd";
import {
   SearchOutlined,
   PhoneOutlined,
   MailOutlined,
   CalendarOutlined,
   FilterOutlined,
   DownloadOutlined,
   PlusOutlined,
   EyeOutlined
} from "@ant-design/icons";
import "../styles/Leads.css";
import { message as antdMessage } from "antd";
import { sendBulkMessage } from "../services/leadService";

export default function Leads() {
   const { tenantId } = useTenant();
   const [leads, setLeads] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchText, setSearchText] = useState("");
   const [noteModalVisible, setNoteModalVisible] = useState(false);
   const [selectedLeadId, setSelectedLeadId] = useState(null);
   const [noteText, setNoteText] = useState("");
   const [viewNoteModal, setViewNoteModal] = useState(false);
   const [selectedNotes, setSelectedNotes] = useState([]);
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [bulkModalVisible, setBulkModalVisible] = useState(false);
   const [bulkText, setBulkText] = useState("");

   useEffect(() => {
      setLoading(true);

      getLeads()
         .then(data => setLeads(data || []))
         .catch(err => console.error(err))
         .finally(() => setLoading(false));

   }, []);

   const filteredLeads = leads.filter(lead =>
      lead.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.phone?.includes(searchText) ||
      lead.business?.toLowerCase().includes(searchText.toLowerCase())
   );


   const handleDelete = async (id) => {
      try {
         await deleteLead(id);

         // 🔥 UI update
         setLeads(prev => prev.filter(l => l._id !== id));

      } catch (err) {
         console.error(err);
      }
   };


   const handleStatusChange = async (id, value) => {
      try {
         await updateLeadStatus(id, value);

         setLeads(prev =>
            prev.map(l =>
               l._id === id ? { ...l, status: value } : l
            )
         );

      } catch (err) {
         console.error(err);
      }
   };

   const openNoteModal = (id) => {
      setSelectedLeadId(id);
      setNoteModalVisible(true);
   };

   const handleSaveNote = async () => {
      if (!noteText) return;

      try {
         await addLeadNote(selectedLeadId, noteText);

         setNoteModalVisible(false);
         setNoteText("");

      } catch (err) {
         console.error(err);
      }
   };

   const handleViewNotes = (notes) => {
      setSelectedNotes(notes || []);
      setViewNoteModal(true);
   };


   const handleBulkSend = async () => {
      if (!bulkText) return;

      try {
         const res = await sendBulkMessage({
            ids: selectedRowKeys,
            message: bulkText
         });

         antdMessage.success(`Sent to ${res.sent} users`);

         setBulkModalVisible(false);
         setBulkText("");
         setSelectedRowKeys([]);

      } catch (err) {
         console.error(err);
         antdMessage.error("Failed to send bulk message");
      }
   };
   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
         render: (text) => (
            <div className="lead-name-cell">
               <div className="lead-avatar">
                  {text?.charAt(0).toUpperCase() || "?"}
               </div>
               <span className="lead-name">{text || "N/A"}</span>
            </div>
         ),
      },
      {
         title: "Contact",
         dataIndex: "phone",
         key: "phone",
         render: (phone, record) => (
            <div className="contact-cell">
               <div className="contact-item">
                  <PhoneOutlined className="contact-icon" />
                  <span>{phone || "N/A"}</span>
               </div>
               {record.email && (
                  <div className="contact-item">
                     <MailOutlined className="contact-icon" />
                     <span>{record.email}</span>
                  </div>
               )}
            </div>
         ),
      },

      {
         title: "Form Contact",
         dataIndex: "userPhone",
         key: "userPhone",
         render: (text) => (
            <span className="business-text">{text || "N/A"}</span>
         ),
      },
      // {
      //    title: "Business",
      //    dataIndex: "business",
      //    key: "business",
      //    render: (text) => (
      //       <span className="business-text">{text || "N/A"}</span>
      //    ),
      // },
      // {
      //    title: "Requirement",
      //    dataIndex: "requirement",
      //    key: "requirement",
      //    render: (text) => (
      //       <Tag color="blue" className="requirement-tag">
      //          {text || "N/A"}
      //       </Tag>
      //    ),
      // },

      {
         title: "Status",
         dataIndex: "status",
         key: "status",
         render: (status, record) => (
            <Select
               value={status || "new"}
               size="small"
               style={{ width: 120 }}
               onChange={(value) => handleStatusChange(record._id, value)}
               options={[
                  { value: "new", label: "New" },
                  { value: "contacted", label: "Contacted" },
                  { value: "closed", label: "Closed" }
               ]}
            />
         )
      },

      {
         title: "Date",
         dataIndex: "createdAt",
         key: "createdAt",
         render: (date) => (
            <div className="date-cell">
               <CalendarOutlined className="date-icon" />
               <span>
                  {date ? new Date(date).toLocaleDateString("en-US", {
                     day: "numeric",
                     month: "short",
                     year: "numeric"
                  }) : "N/A"}
               </span>
            </div>
         ),
      },
      {
         title: "Notes",
         key: "notes",
         render: (_, record) => (
            <Button
               icon={<EyeOutlined />}
               size="small"
               onClick={() => handleViewNotes(record.notes)}
            />
         )
      },
      {
         title: "Action",
         key: "action",
         render: (_, record) => (
            <Space>
               <Button size="small" onClick={() => openNoteModal(record._id)}>
                  Add Note
               </Button>

               <Popconfirm
                  title="Are you sure delete this lead?"
                  onConfirm={() => handleDelete(record._id)}
               >
                  <Button danger size="small">Delete</Button>
               </Popconfirm>
            </Space>
         ),
      }
   ];

   return (
      <div className="leads-container">
         {/* Header */}
         <div className="leads-header">
            <div className="leads-header-left">
               <h1 className="leads-title">Leads</h1>
               <p className="leads-subtitle">
                  Manage and track your leads
               </p>
            </div>

         </div>

         {/* Stats Cards */}
         <div className="leads-stats">
            <div className="stat-card">
               <div className="stat-value">{leads.length}</div>
               <div className="stat-label">Total Leads</div>
            </div>
            <div className="stat-card">
               <div className="stat-value">
                  {leads.filter(l => {
                     const date = new Date(l.createdAt);
                     const today = new Date();
                     return date.toDateString() === today.toDateString();
                  }).length}
               </div>
               <div className="stat-label">Today</div>
            </div>
            <div className="stat-card">
               <div className="stat-value">
                  {leads.filter(l => {
                     const date = new Date(l.createdAt);
                     const weekAgo = new Date();
                     weekAgo.setDate(weekAgo.getDate() - 7);
                     return date >= weekAgo;
                  }).length}
               </div>
               <div className="stat-label">This Week</div>
            </div>
         </div>

         {/* Filters */}
         <div className="leads-filters">
            <Input
               placeholder="Search by name, phone, or business..."
               prefix={<SearchOutlined />}
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               className="search-input"
               allowClear
            />
            <Button
               type="primary"
               disabled={selectedRowKeys.length === 0}
               onClick={() => setBulkModalVisible(true)}
            >
               Send Bulk Message
            </Button>
         </div>

         {/* Table */}
         <div className="leads-table-container">
            <Table
               columns={columns}
               dataSource={filteredLeads}
               rowKey="_id"
               loading={loading}
               pagination={{
                  pageSize: 10,
                  showTotal: (total) => `Total ${total} leads`,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100']
               }}
               size="small"
               className="leads-table"
               rowSelection={{
                  selectedRowKeys,
                  onChange: (keys) => setSelectedRowKeys(keys)
               }}
            />
         </div>

         <Modal
            title="Add Note"
            open={noteModalVisible}
            onOk={handleSaveNote}
            onCancel={() => {
               setNoteModalVisible(false);
               setNoteText("");
            }}
         >
            <Input.TextArea
               rows={4}
               placeholder="Enter note..."
               value={noteText}
               onChange={(e) => setNoteText(e.target.value)}
            />
         </Modal>
         <Modal
            title="Notes"
            open={viewNoteModal}
            onCancel={() => setViewNoteModal(false)}
            footer={null}
         >
            {selectedNotes.length > 0 ? (
               selectedNotes.map((note, index) => (
                  <div key={index} style={{ marginBottom: 10 }}>
                     <div style={{ fontSize: 12, color: "#888" }}>
                        {new Date(note.createdAt).toLocaleString()}
                     </div>
                     <div>{note.text}</div>
                  </div>
               ))
            ) : (
               <div style={{ color: "#999" }}>No notes available</div>
            )}
         </Modal>
         <Modal
            title="Send Bulk Message"
            open={bulkModalVisible}
            onOk={handleBulkSend}
            onCancel={() => setBulkModalVisible(false)}
         >
            <Input.TextArea
               rows={4}
               placeholder="Enter message..."
               value={bulkText}
               onChange={(e) => setBulkText(e.target.value)}
            />
         </Modal>
      </div>
   );
}