import { useEffect, useState } from "react";
import { getLeads, deleteLead, updateLead, deleteMultipleLeads } from "../services/leadService";
import dayjs from "dayjs";
import {
   Table,
   Tag,
   Input,
   Button,
   Space,
   Popconfirm,
   Modal,
   Descriptions,
   Form,
   message,
   Tooltip,
   DatePicker,
} from "antd";
import {
   SearchOutlined,
   WhatsAppOutlined,
   MailOutlined,
   CalendarOutlined,
   DownloadOutlined,
   EyeOutlined,
   EditOutlined,
   DeleteOutlined,
} from "@ant-design/icons";
import "../styles/Leads.css";
import { exportLeads, exportLeadContacts } from "../services/leadService";

export default function Leads() {
   const [leads, setLeads] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchText, setSearchText] = useState("");
   const [detailsOpen, setDetailsOpen] = useState(false);
   const [fromDate, setFromDate] = useState("");
   const [toDate, setToDate] = useState("");
   const [selectedLead, setSelectedLead] = useState(null);
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [editOpen, setEditOpen] = useState(false);

   const [form] = Form.useForm();

   // useEffect(() => {
   //    setLoading(true);

   //    getLeads()
   //       .then((data) => setLeads(data || []))
   //       .catch((err) => console.error(err))
   //       .finally(() => setLoading(false));
   // }, []);

   useEffect(() => {
      setLoading(true);

      const params = {};

      if (fromDate) {
         params.fromDate = `${fromDate}T00:00:00+05:30`;
      }

      if (toDate) {
         params.toDate = `${toDate}T23:59:59.999+05:30`;
      }

      getLeads(params)
         .then((data) => setLeads(data || []))
         .catch((err) => console.error(err))
         .finally(() => setLoading(false));
   }, [fromDate, toDate]);


   const filteredLeads = leads.filter((lead) => {
      const search = searchText.toLowerCase();

      return (
         lead.name?.toLowerCase().includes(search) ||
         lead.profileName?.toLowerCase().includes(search) ||
         lead.phone?.includes(search) ||
         lead.business?.toLowerCase().includes(search)
      );
   });

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
         const params = {};
         if (fromDate) {
            params.fromDate = `${fromDate}T00:00:00+05:30`;
         }
         if (toDate) {
            params.toDate = `${toDate}T23:59:59.999+05:30`;
         }
         const blob = await exportLeads(params);
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = "leads-details.xlsx";
         document.body.appendChild(link);
         link.click();
         link.remove();
         window.URL.revokeObjectURL(url);
      } catch (err) {
         console.error(err);
      }
   };


   const handleContactExport = async () => {
      try {
         const params = {};

         if (fromDate) {
            params.fromDate = `${fromDate}T00:00:00+05:30`;
         }

         if (toDate) {
            params.toDate = `${toDate}T23:59:59.999+05:30`;
         }

         const blob = await exportLeadContacts(params);

         const url = window.URL.createObjectURL(blob);

         const link = document.createElement("a");

         link.href = url;
         link.download = "leads-contact.xlsx";

         document.body.appendChild(link);

         link.click();

         link.remove();

         window.URL.revokeObjectURL(url);

      } catch (err) {
         console.error(err);
      }
   };


   const handleUpdateLead = async (values) => {
      try {
         const payload = {
            name: values.name,
            business: values.business,
            requirement: values.requirement,
            extraData: {
               ...(selectedLead?.extraData || {}),
            },
         };

         // Dynamic Fields
         Object.keys(values).forEach((key) => {
            if (!["name", "profileName", "business", "requirement"].includes(key)) {
               payload.extraData[key] = values[key];
            }
         });

         const res = await updateLead(selectedLead._id, payload);

         setLeads((prev) =>
            prev.map((lead) => (lead._id === selectedLead._id ? res.lead : lead)),
         );

         setSelectedLead(res.lead);

         message.success("Lead updated successfully");

         setEditOpen(false);
         form.resetFields();
         setSelectedLead(null);
      } catch (err) {
         console.error(err);
         message.error("Failed to update lead");
      }
   };
   const handleMultipleDelete = async () => {
      if (selectedRowKeys.length === 0) {
         message.warning("Please select at least one lead");
         return;
      }

      try {
         await deleteMultipleLeads(selectedRowKeys);

         setLeads((prev) =>
            prev.filter((lead) => !selectedRowKeys.includes(lead._id))
         );

         setSelectedRowKeys([]);

         message.success("Selected leads deleted successfully");
      } catch (err) {
         console.error("Multiple Delete Error:", err);
         message.error("Failed to delete selected leads");
      }
   };

   const columns = [
      {
         title: "Customer Name",
         dataIndex: "name",
         key: "name",
         width: 180,
         render: (text) => (
            <span
               title={text || "Unknown"}
               style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
               }}
            >
               {text || "Unknown"}
            </span>
         ),
      },
      {
         title: "WhatsApp Name",
         dataIndex: "profileName",
         key: "profileName",
         width: 180,
         render: (text) => (
            <span
               title={text || "Unknown"}
               style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
               }}
            >
               {text || "Unknown"}
            </span>
         ),
      },
      {
         title: "WhatsApp Number",
         dataIndex: "phone",
         key: "phone",
         width: 170,
         render: (phone, record) => (
            <div className="contact-cell">
               <div className="contact-item">
                  <WhatsAppOutlined
                     className="contact-icon"
                     style={{ fontSize: "14px" }}
                  />
                  <span>{phone || "-"}</span>
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
         title: "Requirement",
         dataIndex: "requirement",
         key: "requirement",
         width: 180,
         render: (text) => (
            <Tag
               color="blue"
               title={text || "-"}
               style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  verticalAlign: "middle",
               }}
            >
               {text || "-"}
            </Tag>
         ),
      },
      {
         title: "Date",
         dataIndex: "createdAt",
         key: "createdAt",
         width: 130,
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
                     : "-"}
               </span>
            </div>
         ),
      },
      {
         title: "Action",
         key: "action",
         width: 150,
         render: (_, record) => (
            <Space size="small">
               <Tooltip title="Details">
                  <Button
                     type="text"
                     icon={<EyeOutlined />}
                     title="View Details"
                     onClick={() => {
                        setSelectedLead(record);
                        setDetailsOpen(true);
                     }}
                  />
               </Tooltip>
               <Tooltip title="Edit">
                  <Button
                     type="text"
                     icon={<EditOutlined />}
                     title="Edit Lead"
                     onClick={() => {
                        setSelectedLead(record);

                        form.setFieldsValue({
                           name: record.name,
                           profileName: record.profileName,
                           business: record.business,
                           requirement: record.requirement,
                           ...(record.extraData || {}),
                        });

                        setEditOpen(true);
                     }}
                  />
               </Tooltip>

               <Popconfirm
                  title="Are you sure delete this lead?"
                  onConfirm={() => handleDelete(record._id)}
               >
                  <Tooltip title="Delete">
                     <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        title="Delete Lead"
                     />
                  </Tooltip>
               </Popconfirm>
            </Space>
         ),
      },
   ];

   return (
      <div className="leads-container">

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
               placeholder="Search by customer, WhatsApp name or phone..."
               prefix={<SearchOutlined />}
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               className="search-input-lead"
               allowClear
            />

            <DatePicker
               format="DD/MM/YYYY"
               placeholder="From Date"
               value={fromDate ? dayjs(fromDate) : null}
               onChange={(date) => {
                  setFromDate(date ? date.format("YYYY-MM-DD") : "");
               }}
            />

            <DatePicker
               format="DD/MM/YYYY"
               placeholder="To Date"
               value={toDate ? dayjs(toDate) : null}
               onChange={(date) => {
                  setToDate(date ? date.format("YYYY-MM-DD") : "");
               }}
            />

            <Button
               type="primary"
               icon={<DownloadOutlined />}
               onClick={handleExport}
            >
               Export All Details
            </Button>
            <Button
               type="primary"
               icon={<DownloadOutlined />}
               onClick={handleContactExport}
            >
               Export Contacts
            </Button>

            {selectedRowKeys.length > 0 && (
               <Popconfirm
                  title={`Delete ${selectedRowKeys.length} selected lead(s)?`}
                  description="This action cannot be undone."
                  onConfirm={handleMultipleDelete}
                  okText="Yes"
                  cancelText="No"
               >
                  <Button danger icon={<DeleteOutlined />}>
                     Delete Selected ({selectedRowKeys.length})
                  </Button>
               </Popconfirm>
            )}
         </div>



         {/* Table */}
         <div className="leads-table-container">
            <Table
               rowSelection={{
                  selectedRowKeys,
                  onChange: (selectedKeys) => {
                     setSelectedRowKeys(selectedKeys);
                  },
               }}
               columns={columns}
               dataSource={filteredLeads}
               rowKey="_id"
               loading={loading}
               tableLayout="fixed"
               scroll={{ x: 1000 }}
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
            onCancel={() => {
               setDetailsOpen(false);
               setSelectedLead(null);
            }}
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
                  <Descriptions.Item label="Customer Name">
                     {selectedLead.name || "Unknown"}
                  </Descriptions.Item>
                  <Descriptions.Item label="WhatsApp Name">
                     {selectedLead.profileName || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="WhatsApp Number">
                     {selectedLead.phone || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Business">
                     {selectedLead.business || "-"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Requirement">
                     {selectedLead.requirement || "-"}
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

         <Modal
            title="Edit Lead"
            open={editOpen}
            onCancel={() => {
               setEditOpen(false);
               form.resetFields();
               setSelectedLead(null);
            }}
            onOk={() => form.submit()}
            okText="Save"
         >
            <Form form={form} layout="vertical" onFinish={handleUpdateLead}>
               <Form.Item label="Customer Name" name="name">
                  <Input />
               </Form.Item>

               <Form.Item label="WhatsApp Name" name="profileName">
                  <Input value={selectedLead?.profileName} disabled />
               </Form.Item>

               <Form.Item label="Business" name="business">
                  <Input />
               </Form.Item>

               <Form.Item label="Requirement" name="requirement">
                  <Input />
               </Form.Item>

               <Form.Item label="WhatsApp Number">
                  <Input value={selectedLead?.phone} disabled />
               </Form.Item>

               {selectedLead?.extraData &&
                  Object.entries(selectedLead.extraData).map(([key, value]) => (
                     <Form.Item
                        key={key}
                        label={key
                           .replace(/([A-Z])/g, " $1")
                           .replace(/^./, (s) => s.toUpperCase())}
                        name={key}
                     >
                        <Input />
                     </Form.Item>
                  ))}
            </Form>
         </Modal>
      </div>
   );
}
