import { useEffect, useState } from "react";

import { getLeads, deleteLead } from "../services/leadService";
// import dayjs from "dayjs";
import {
   Table,
   Tag,
   Input,
   Button,
   Space,
   Popconfirm,
   Modal,
   Descriptions,
} from "antd";
import {
   SearchOutlined,
   WhatsAppOutlined,
   MailOutlined,
   CalendarOutlined,
} from "@ant-design/icons";
import "../styles/Leads.css";
import { exportLeads } from "../services/leadService";
import { DownloadOutlined } from "@ant-design/icons";

export default function Leads() {
   const [leads, setLeads] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchText, setSearchText] = useState("");
   const [detailsOpen, setDetailsOpen] = useState(false);
   const [selectedLead, setSelectedLead] = useState(null);

   useEffect(() => {
      setLoading(true);

      getLeads()
         .then((data) => setLeads(data || []))
         .catch((err) => console.error(err))
         .finally(() => setLoading(false));
   }, []);

   const filteredLeads = leads.filter(
      (lead) =>
         lead.name?.toLowerCase().includes(searchText.toLowerCase()) ||
         lead.phone?.includes(searchText) ||
         lead.business?.toLowerCase().includes(searchText.toLowerCase()),
   );

   const handleDelete = async (id) => {
      try {
         await deleteLead(id);
         setLeads((prev) => prev.filter((l) => l._id !== id));
      } catch (err) {
         console.error(err);
      }
   };


   const handleExport = async () => {
      try {

         const blob = await exportLeads();

         const url = window.URL.createObjectURL(blob);

         const link = document.createElement("a");

         link.href = url;

         link.download = "leads.xlsx";

         document.body.appendChild(link);

         link.click();

         link.remove();

      } catch (err) {

         console.error(err);
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
         title: "Phone",
         dataIndex: "phone",
         key: "phone",
         render: (phone, record) => (
            <div className="contact-cell">
               <div className="contact-item">
                  <WhatsAppOutlined className="contact-icon" style={{ fontSize: '14px' }} />
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
         render: (text) => <span className="business-text">{text || "N/A"}</span>,
      },
      {
         title: "Requirement",
         dataIndex: "requirement",
         key: "requirement",
         render: (text) => (
            <Tag color="blue" className="requirement-tag">
               {text || "N/A"}
            </Tag>
         ),
      },
      {
         title: "Date",
         dataIndex: "createdAt",
         key: "createdAt",
         render: (date) => (
            <div className="date-cell">
               <CalendarOutlined className="date-icon" />
               <span>
                  {date
                     ? new Date(date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                     })
                     : "N/A"}
               </span>
            </div>
         ),
      },
      {
         title: "Action",
         key: "action",
         render: (_, record) => (
            <Space>
               <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                     setSelectedLead(record);
                     setDetailsOpen(true);
                  }}
               >
                  Details
               </Button>

               <Popconfirm
                  title="Are you sure delete this lead?"
                  onConfirm={() => handleDelete(record._id)}
               >
                  <Button danger size="small">
                     Delete
                  </Button>
               </Popconfirm>
            </Space>
         ),
      },
   ];

   return (
      <div className="leads-container">
         {/* <div className="leads-header">
            <div className="leads-header-left">
               <h1 className="leads-title">Leads</h1>
               <p className="leads-subtitle">Manage and track your leads</p>
            </div>
         </div> */}

         <div className="leads-stats">
            <div className="stat-card">
               <div className="stat-value">{leads.length}</div>
               <div className="stat-label">Total Leads</div>
            </div>
            <div className="stat-card">
               <div className="stat-value">
                  {
                     leads.filter((l) => {
                        const date = new Date(l.createdAt);
                        const today = new Date();
                        return date.toDateString() === today.toDateString();
                     }).length
                  }
               </div>
               <div className="stat-label">Today</div>
            </div>
            <div className="stat-card">
               <div className="stat-value">
                  {
                     leads.filter((l) => {
                        const date = new Date(l.createdAt);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return date >= weekAgo;
                     }).length
                  }
               </div>
               <div className="stat-label">This Week</div>
            </div>


         </div>

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
               icon={<DownloadOutlined />}
               onClick={handleExport}
            >
               Export
            </Button>

         </div>

         {/* Table */}
         <div className="leads-table-container">
            <Table
               columns={columns}
               dataSource={filteredLeads}
               rowKey="_id"
               scroll={{ x: 'max-content' }}
               loading={loading}
               pagination={{
                  pageSize: 10,
                  showTotal: (total) => `Total ${total} leads`,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
               }}
               size="small"
               className="leads-table"
            />
         </div>

         <Modal
            open={detailsOpen}
            footer={null}
            onCancel={() => setDetailsOpen(false)}
            title="Lead Details"
            width={700}
            styles={{
               body: {
                  maxHeight: "70vh",
                  overflowY: "auto",
               },
            }}
         >
            {selectedLead && (
               <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="WhatsApp Number">
                     {selectedLead.phone || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Form Contact">
                     {selectedLead.userPhone || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Name">
                     {selectedLead.name || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Business">
                     {selectedLead.business || "N/A"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Requirement">
                     {selectedLead.requirement || "N/A"}
                  </Descriptions.Item>

                  {selectedLead.extraData &&
                     Object.entries(selectedLead.extraData).map(([key, value]) => (
                        <Descriptions.Item
                           key={key}
                           label={key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                        >
                           {String(value)}
                        </Descriptions.Item>
                     ))}
               </Descriptions>
            )}


         </Modal>

      </div>
   );
}
