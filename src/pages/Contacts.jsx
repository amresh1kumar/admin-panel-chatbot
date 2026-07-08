import { useEffect, useState } from "react";
import {
   Table,
   Button,
   Modal,
   Form,
   Input,
   message,
   Popconfirm,
   Upload,
   Card,
   Row,
   Col,
} from "antd";

import {
   PlusOutlined,
   SearchOutlined,
   DeleteOutlined,
   UploadOutlined,
} from "@ant-design/icons";

import {
   getContacts,
   createContact,
   deleteContact,
   importContacts,
   getContactStats,
   getImportBatches,
   deleteImportBatch,
} from "../services/contactService";

import "../styles/Contact.css";

export default function Contacts() {
   const [contacts, setContacts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [search, setSearch] = useState("");
   const [openModal, setOpenModal] = useState(false);
   const [batches, setBatches] = useState([]);

   const [stats, setStats] = useState({
      total: 0,
      manual: 0,
      excel: 0,
   });

   const [form] = Form.useForm();

   // ==========================
   // Load Contacts
   // ==========================

   const loadContacts = async () => {
      try {
         setLoading(true);

         const data = await getContacts(search);

         setContacts(data || []);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   // ==========================
   // Load Stats
   // ==========================

   const loadStats = async () => {
      try {
         const data = await getContactStats();

         setStats(data);
      } catch (err) {
         console.error(err);
      }
   };

   const loadBatches = async () => {
      try {

         const data = await getImportBatches();

         setBatches(data || []);

      } catch (err) {

         console.error(err);

      }
   };

   // ==========================
   // Refresh
   // ==========================

   const refreshData = () => {
      loadContacts();
      loadStats();
      loadBatches();
   };

   useEffect(() => {
      refreshData();
   }, [search]);

   // ==========================
   // Add Contact
   // ==========================

   const handleCreate = async (values) => {
      try {
         await createContact(values);

         message.success("Contact added successfully");

         form.resetFields();

         setOpenModal(false);

         refreshData();
      } catch (err) {
         message.error(
            err.response?.data?.message ||
            "Failed to add contact"
         );
      }
   };

   // ==========================
   // Delete Contact
   // ==========================

   const handleDelete = async (id) => {
      try {
         await deleteContact(id);

         message.success("Contact deleted");

         refreshData();
      } catch (err) {
         message.error("Delete failed");
      }
   };

   // ==========================
   // Import Contacts
   // ==========================

   const handleImport = async (file) => {
      try {
         const res = await importContacts(file);

         message.success(
            `Imported: ${res.imported}, Duplicate: ${res.duplicates}, Invalid: ${res.invalid}`
         );

         refreshData();
      } catch (err) {
         message.error(
            err.response?.data?.message ||
            "Import failed"
         );
      }

      return false;
   };

   const handleDeleteBatch = async (id) => {

      try {

         await deleteImportBatch(id);

         message.success("Batch deleted");

         refreshData();

      } catch (err) {

         message.error("Delete failed");

      }

   };

   // ==========================
   // Table Columns
   // ==========================

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
      },
      {
         title: "Phone",
         dataIndex: "phone",
      },
      {
         title: "Source",
         dataIndex: "source",
         render: (source) =>
            source.charAt(0).toUpperCase() + source.slice(1),
      },
      {
         title: "Created",
         dataIndex: "createdAt",
         render: (date) =>
            new Date(date).toLocaleDateString("en-GB"),
      },
      {
         title: "Action",
         render: (_, record) => (
            <Popconfirm
               title="Delete Contact?"
               okText="Delete"
               cancelText="Cancel"
               onConfirm={() => handleDelete(record._id)}
            >
               <Button
                  danger
                  icon={<DeleteOutlined />}
               >
                  Delete
               </Button>
            </Popconfirm>
         ),
      },
   ];

   return (
      <div className="contact-page">

         {/* Header */}

         <div className="contact-header">

            <div>

               <h1 className="contact-page-title">
                  Contacts
               </h1>

               <p className="contact-page-subtitle">
                  Manage your marketing contacts
               </p>

            </div>

            <div
               style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
               }}
            >

               <Upload
                  beforeUpload={handleImport}
                  showUploadList={false}
                  accept=".xlsx,.xls,.csv"
               >
                  <Button icon={<UploadOutlined />}>
                     Import Excel
                  </Button>
               </Upload>

               <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenModal(true)}
               >
                  Add Contact
               </Button>

            </div>

         </div>

         {/* Stats */}

         <Row
            gutter={16}
            style={{
               marginBottom: 24,
            }}
         >

            <Col xs={24} md={8}>
               <Card>
                  <h3>Total Contacts</h3>
                  <h1>{stats.total}</h1>
               </Card>
            </Col>

            <Col xs={24} md={8}>
               <Card>
                  <h3>Manual Contacts</h3>
                  <h1>{stats.manual}</h1>
               </Card>
            </Col>

            <Col xs={24} md={8}>
               <Card>
                  <h3>Excel Contacts</h3>
                  <h1>{stats.excel}</h1>
               </Card>
            </Col>

         </Row>

         <Card
            title="Imported Excel Files"
            style={{ marginBottom: 24 }}
         >

            <Table
               rowKey="_id"
               dataSource={batches}
               pagination={false}
               size="small"
               columns={[
                  {
                     title: "File",
                     dataIndex: "fileName"
                  },
                  {
                     title: "Imported",
                     dataIndex: "imported"
                  },
                  {
                     title: "Duplicate",
                     dataIndex: "duplicates"
                  },
                  {
                     title: "Date",
                     dataIndex: "createdAt",
                     render: (date) =>
                        new Date(date).toLocaleDateString("en-GB")
                  },
                  {
                     title: "Action",
                     render: (_, record) => (
                        <Popconfirm
                           title="Delete this batch?"
                           onConfirm={() =>
                              handleDeleteBatch(record._id)
                           }
                        >
                           <Button
                              danger
                              size="small"
                           >
                              Delete Batch
                           </Button>
                        </Popconfirm>
                     )
                  }
               ]}
            />

         </Card>

         {/* Search */}

         <div className="contact-filters">

            <Input
               placeholder="Search contacts..."
               prefix={<SearchOutlined />}
               className="contact-search"
               value={search}
               onChange={(e) =>
                  setSearch(e.target.value)
               }
            />

         </div>

         {/* Table */}

         <Table
            rowKey="_id"
            columns={columns}
            dataSource={contacts}
            loading={loading}
            pagination={{
               pageSize: 10,
            }}
         />

         {/* Add Contact Modal */}

         <Modal
            title="Add Contact"
            open={openModal}
            footer={null}
            onCancel={() => setOpenModal(false)}
         >

            <Form
               layout="vertical"
               form={form}
               onFinish={handleCreate}
            >

               <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                     {
                        required: true,
                        message: "Enter name",
                     },
                  ]}
               >
                  <Input placeholder="Rahul Sharma" />
               </Form.Item>

               <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                     {
                        required: true,
                        message: "Enter phone number",
                     },
                  ]}
               >
                  <Input placeholder="9876543210" />
               </Form.Item>

               <Button
                  block
                  type="primary"
                  htmlType="submit"
               >
                  Save Contact
               </Button>

            </Form>

         </Modal>

      </div>
   );
}