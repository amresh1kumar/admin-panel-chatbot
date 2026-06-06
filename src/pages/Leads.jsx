import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useTenant } from "../context/TenantContext";
import { getLeads, deleteLead } from "../services/leadService";
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
   DatePicker,
   message,
} from "antd";
import {
   SearchOutlined,
   WhatsAppOutlined,
   MailOutlined,
   CalendarOutlined,
   FilterOutlined,
   DownloadOutlined,
   PlusOutlined,
} from "@ant-design/icons";
import "../styles/Leads.css";

import {
   createFollowUp,
   getLeadFollowUps,
   completeFollowUp,
   deleteFollowUp,
   getFollowUpStats,
   rescheduleFollowUp
} from "../services/followUpService";

export default function Leads() {
   const { tenantId } = useTenant();
   const [leads, setLeads] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchText, setSearchText] = useState("");
   const [detailsOpen, setDetailsOpen] = useState(false);
   const [selectedLead, setSelectedLead] = useState(null);
   const [followUpOpen, setFollowUpOpen] = useState(false);
   const [followUps, setFollowUps] = useState([]);
   const [stats, setStats] = useState({ today: 0, overdue: 0, completed: 0, });
   const [rescheduleOpen, setRescheduleOpen] =
      useState(false);

   const [selectedFollowUp, setSelectedFollowUp] =
      useState(null);

   const [rescheduleForm] = Form.useForm();
   const [followUpForm] = Form.useForm();

   useEffect(() => {
      setLoading(true);

      getLeads()
         .then((data) => setLeads(data || []))
         .catch((err) => console.error(err))
         .finally(() => setLoading(false));

      getFollowUpStats()
         .then(setStats)
         .catch(console.error);
   }, []);

   const filteredLeads = leads.filter(
      (lead) =>
         lead.name?.toLowerCase().includes(searchText.toLowerCase()) ||
         lead.phone?.includes(searchText) ||
         lead.business?.toLowerCase().includes(searchText.toLowerCase()),
   );

   const loadFollowUps = async (leadId) => {
      try {
         const data = await getLeadFollowUps(leadId);

         setFollowUps(data || []);
      } catch (err) {
         console.error(err);
      }
   };

   const handleDelete = async (id) => {
      try {
         await deleteLead(id);

         // 🔥 UI update
         setLeads((prev) => prev.filter((l) => l._id !== id));
      } catch (err) {
         console.error(err);
      }
   };

   const handleCreateFollowUp = async (values) => {
      try {
         await createFollowUp({
            leadId: selectedLead._id,
            note: values.note,
            followUpDate: values.followUpDate.toISOString(),
         });
         await loadFollowUps(selectedLead._id);
         message.success("Follow-up added");
         followUpForm.resetFields();
         setFollowUpOpen(false);
      } catch (err) {
         console.error(err);
         message.error("Failed to create follow-up");
      }
   };


   const handleReschedule =
      async (values) => {

         try {

            await rescheduleFollowUp(
               selectedFollowUp._id,
               values.followUpDate.toISOString()
            );

            message.success(
               "Follow-up rescheduled"
            );

            setRescheduleOpen(false);

            loadFollowUps(
               selectedLead._id
            );

         } catch (err) {

            console.error(err);

            message.error(
               "Failed to reschedule"
            );
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
      // {
      //    title: "Business",
      //    dataIndex: "business",
      //    key: "business",
      //    render: (text) => (
      //       <span className="business-text">{text || "N/A"}</span>
      //    ),
      // },
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
            // <Space>

            //    <Button
            //       size="small"
            //       type="primary"
            //       onClick={() => {
            //          setSelectedLead(record);
            //          setDetailsOpen(true);
            //       }}
            //    >
            //       Details
            //    </Button>
            //    <Popconfirm
            //       title="Are you sure delete this lead?"
            //       onConfirm={() => handleDelete(record._id)}
            //    >
            //       <Button danger size="small">Delete</Button>
            //    </Popconfirm>

            // </Space>
            <Space>
               <Button
                  size="small"
                  type="primary"
                  // onClick={() => {
                  //    setSelectedLead(record);
                  //    setDetailsOpen(true);
                  // }}
                  onClick={() => {
                     setSelectedLead(record);
                     setDetailsOpen(true);
                     loadFollowUps(record._id);
                  }}
               >
                  Details
               </Button>

               <Button
                  size="small"
                  onClick={() => {
                     setSelectedLead(record);
                     setFollowUpOpen(true);
                  }}
               >
                  Follow Up
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
         <div className="leads-header">
            <div className="leads-header-left">
               <h1 className="leads-title">Leads</h1>
               <p className="leads-subtitle">Manage and track your leads</p>
            </div>
         </div>

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

            <div className="stat-card">
               <div className="stat-value">
                  {stats.today}
               </div>
               <div className="stat-label">
                  Today's Follow-Ups
               </div>
            </div>

            <div className="stat-card">
               <div className="stat-value">
                  {stats.overdue}
               </div>
               <div className="stat-label">
                  Overdue Follow-Ups
               </div>
            </div>

            <div className="stat-card">
               <div className="stat-value">
                  {stats.completed}
               </div>
               <div className="stat-label">
                  Completed Follow-Ups
               </div>
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

            <div style={{ marginTop: 20 }}>
               <h3>Follow Ups</h3>

               {followUps.length === 0 ? (
                  <p>No follow-ups found</p>
               ) : (
                  followUps.map((item) => (
                     <div
                        key={item._id}
                        style={{
                           border: "1px solid #eee",
                           borderRadius: 8,
                           padding: 10,
                           marginBottom: 10,
                        }}
                     >
                        <div>
                           <strong>
                              {new Date(item.followUpDate).toLocaleString()}
                           </strong>
                        </div>

                        <div>{item.note}</div>

                        <div
                           style={{
                              marginTop: 8,
                              display: "flex",
                              gap: 8,
                           }}
                        >
                           <Tag color={item.status === "completed" ? "green" : "orange"}>
                              {item.status}
                           </Tag>

                           {item.status === "pending" && (
                              <Popconfirm
                                 title="Mark this follow-up as completed?"
                                 onConfirm={async () => {
                                    await completeFollowUp(item._id);

                                    loadFollowUps(selectedLead._id);

                                    message.success("Follow-up completed");
                                 }}
                              >
                                 <Button size="small">Complete</Button>
                              </Popconfirm>
                           )}
                           <Button
                              size="small"
                              onClick={() => {

                                 setSelectedFollowUp(item);

                                 rescheduleForm.setFieldsValue({
                                    followUpDate:
                                       dayjs(item.followUpDate)
                                 });

                                 setRescheduleOpen(true);

                              }}
                           >
                              Reschedule
                           </Button>
                           <Popconfirm
                              title="Delete this follow-up?"
                              onConfirm={async () => {
                                 await deleteFollowUp(item._id);

                                 loadFollowUps(selectedLead._id);

                                 message.success("Follow-up deleted");
                              }}
                           >
                              <Button danger size="small">
                                 Delete
                              </Button>
                           </Popconfirm>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </Modal>

         <Modal
            open={followUpOpen}
            title="Add Follow Up"
            onCancel={() => {
               setFollowUpOpen(false);
               followUpForm.resetFields();
            }}
            onOk={() => followUpForm.submit()}
         >
            <Form
               layout="vertical"
               form={followUpForm}
               onFinish={handleCreateFollowUp}
            >
               <Form.Item label="Lead">
                  <Input disabled value={selectedLead?.name || selectedLead?.phone} />
               </Form.Item>

               <Form.Item
                  name="note"
                  label="Follow Up Note"
                  rules={[
                     {
                        required: true,
                        message: "Enter note",
                     },
                  ]}
               >
                  <Input.TextArea
                     rows={3}
                     placeholder="Call customer and discuss pricing"
                  />
               </Form.Item>

               <Form.Item
                  name="followUpDate"
                  label="Follow Up Date & Time"
                  rules={[
                     {
                        required: true,
                        message: "Select follow-up date",
                     },
                  ]}
               >
                  <DatePicker style={{ width: "100%" }} />
               </Form.Item>
            </Form>
         </Modal>

         <Modal
            open={rescheduleOpen}
            title="Reschedule Follow-Up"
            onCancel={() => {
               setRescheduleOpen(false);
               rescheduleForm.resetFields();
            }}
            onOk={() => rescheduleForm.submit()}
         >

            <Form
               form={rescheduleForm}
               layout="vertical"
               onFinish={handleReschedule}
            >

               <Form.Item
                  name="followUpDate"
                  label="New Date"
                  rules={[
                     {
                        required: true,
                        message:
                           "Select date"
                     }
                  ]}
               >
                  <DatePicker
                     style={{
                        width: "100%"
                     }}
                  />
               </Form.Item>

            </Form>

         </Modal>
      </div>
   );
}
