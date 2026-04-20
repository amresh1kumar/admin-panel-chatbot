import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useTenant } from "../context/TenantContext";
import { getLeads } from "../services/leadService";
import { Table, Tag, Input, Button, Space } from "antd";
import {
   SearchOutlined,
   PhoneOutlined,
   MailOutlined,
   CalendarOutlined,
   FilterOutlined,
   DownloadOutlined,
   PlusOutlined
} from "@ant-design/icons";
import "../styles/Leads.css";

export default function Leads() {
   const { tenantId } = useTenant();
   const [leads, setLeads] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchText, setSearchText] = useState("");

   useEffect(() => {
      if (!tenantId) return;

      setLoading(true);

      getLeads(tenantId)
         .then(res => setLeads(res.data))
         .catch(err => console.error(err))
         .finally(() => setLoading(false));

   }, [tenantId]);

   // 🔥 Filter leads based on search
   const filteredLeads = leads.filter(lead =>
      lead.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.phone?.includes(searchText) ||
      lead.business?.toLowerCase().includes(searchText.toLowerCase())
   );

   // 🔥 Table Columns
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
         title: "Business",
         dataIndex: "business",
         key: "business",
         render: (text) => (
            <span className="business-text">{text || "N/A"}</span>
         ),
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
                  {date ? new Date(date).toLocaleDateString("en-US", {
                     day: "numeric",
                     month: "short",
                     year: "numeric"
                  }) : "N/A"}
               </span>
            </div>
         ),
      },
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
            {/* <Button
                  icon={<FilterOutlined />}
                  className="filter-btn"
               >
                  Filters
               </Button> */}
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
            />
         </div>
      </div>
   );
}