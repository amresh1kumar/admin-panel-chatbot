// import { useEffect, useState } from "react";
// import {
//    Table,
//    Button,
//    Modal,
//    Form,
//    Input,
//    message,
//    Popconfirm,
//    Card,
//    Space,
//    Empty
// } from "antd";
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// import {
//    getMenus,
//    createMenu,
//    updateMenu,
//    deleteMenu
// } from "../services/botMenuService";

// import { useTenant } from "../context/TenantContext";

// export default function BotMenu() {
//    const { tenantId } = useTenant();

//    const [data, setData] = useState([]);
//    const [loading, setLoading] = useState(false);
//    const [open, setOpen] = useState(false);
//    const [editing, setEditing] = useState(null);

//    const [form] = Form.useForm();

//    // ================= FETCH =================
//    const fetchData = async () => {
//       setLoading(true);
//       try {
//          const res = await getMenus(tenantId);
//          setData(res.data || []);
//       } catch {
//          message.error("Failed to load menus");
//       }
//       setLoading(false);
//    };

//    useEffect(() => {
//       if (tenantId) fetchData();
//    }, [tenantId]);

//    // ================= SUBMIT =================
//    const onFinish = async (values) => {
//       try {
//          const formatted = {
//             ...values,

//             // 🔥 TRIGGER ARRAY
//             trigger: values.trigger
//                .split(",")
//                .map(t => t.trim().toLowerCase())
//                .filter(t => t !== ""),

//             // 🔥 OPTIONS PARSE
//             options: values.options
//                .split("\n")
//                .filter(line => line.trim() !== "")
//                .map(line => {
//                   const parts = line.split(",");

//                   if (parts.length < 2) {
//                      throw new Error("Invalid option format");
//                   }

//                   return {
//                      id: parts[0].trim().toLowerCase(),
//                      title: parts[1].trim()
//                   };
//                })
//          };

//          if (editing) {
//             await updateMenu(editing._id, formatted);
//             message.success("Updated");
//          } else {
//             await createMenu({
//                ...formatted,
//                tenantId
//             });
//             message.success("Created");
//          }

//          setOpen(false);
//          setEditing(null);
//          form.resetFields();
//          fetchData();

//       } catch (err) {
//          message.error(err.message || "Error saving menu");
//       }
//    };

//    // ================= EDIT =================
//    const handleEdit = (record) => {
//       setEditing(record);
//       setOpen(true);

//       form.setFieldsValue({
//          ...record,
//          trigger: record.trigger?.join(","),
//          options: record.options
//             ?.map(o => `${o.id},${o.title}`)
//             .join("\n")
//       });
//    };

//    // ================= DELETE =================
//    const handleDelete = async (id) => {
//       try {
//          await deleteMenu(id);
//          message.success("Deleted");
//          fetchData();
//       } catch {
//          message.error("Delete failed");
//       }
//    };

//    // ================= TABLE =================
//    const columns = [
//       {
//          title: "Menu Name",
//          dataIndex: "name",
//          key: "name",
//          width: 200,
//          render: (text) => (
//             <span>{text}</span>
//          )
//       },
//       {
//          title: "Trigger",
//          key: "trigger",
//          width: 180,
//          render: (_, record) => (
//             <span>{record.trigger?.join(", ")}</span>
//          )
//       },
//       {
//          title: "Body",
//          dataIndex: "body",
//          key: "body",
//          width: 300,
//          ellipsis: true
//       },
//       {
//          title: "Options",
//          key: "options",
//          width: 250,
//          ellipsis: true,
//          render: (_, record) => (
//             <span>{record.options?.map(o => o.title).join(", ")}</span>
//          )
//       },
//       {
//          title: "Actions",
//          key: "actions",
//          width: 100,
//          align: "center",
//          fixed: "right", // 🔥 RIGHT ME STICKY
//          render: (_, record) => (
//             <Space size="small">
//                <Button
//                   type="primary"
//                   size="small"
//                   icon={<EditOutlined />}
//                   onClick={() => handleEdit(record)}
//                >

//                </Button>

//                <Popconfirm
//                   title="Delete"
//                   description="Are you sure to delete this menu?"
//                   onConfirm={() => handleDelete(record._id)}
//                   okText="Yes"
//                   cancelText="No"
//                >
//                   <Button
//                      danger
//                      size="small"
//                      icon={<DeleteOutlined />}
//                   >

//                   </Button>
//                </Popconfirm>
//             </Space>
//          )
//       }
//    ];

//    return (
//       <div style={{ background: "#f5f5f5", minHeight: "80vh" }}>
//          <Card>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//                <h2 style={{ margin: 0 }}>📋 Bot Menus</h2>
//                <Button
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   onClick={() => {
//                      setOpen(true);
//                      setEditing(null);
//                      form.resetFields();
//                   }}
//                >
//                   Add Menu
//                </Button>
//             </div>

//             <Table
//                columns={columns}
//                dataSource={data}
//                rowKey="_id"
//                loading={loading}
//                locale={{ emptyText: <Empty description="No menus found" /> }}
//                pagination={{ pageSize: 10 }}
//                bordered
//                sticky // 🔥 HEADER KO STICKY BANATA HAI
//                scroll={{
//                   x: 1200, // Horizontal scroll
//                   y: '65vh' // Vertical scroll with sticky header
//                }}
//                size="small"
//             />
//          </Card>

//          {/* ================= MODAL ================= */}
//          <Modal
//             open={open}
//             title={editing ? "Edit Menu" : "Add Menu"}
//             onCancel={() => {
//                setOpen(false);
//                setEditing(null);
//                form.resetFields();
//             }}
//             onOk={() => form.submit()}
//             width={600}
//             okText={editing ? "Update" : "Create"}
//          >
//             <Form layout="vertical" form={form} onFinish={onFinish}>

//                <Form.Item
//                   name="name"
//                   label="Menu Name"
//                   rules={[
//                      { required: true, message: "Menu name is required" }
//                   ]}
//                >
//                   <Input placeholder="e.g., mainMenu, servicesMenu" />
//                </Form.Item>

//                <Form.Item
//                   name="trigger"
//                   label="Trigger Words (comma separated)"
//                   rules={[
//                      { required: true, message: "Trigger words are required" }
//                   ]}
//                >
//                   <Input placeholder="e.g., hi, hello, hey" />
//                </Form.Item>

//                <Form.Item
//                   name="body"
//                   label="Menu Text"
//                   rules={[
//                      { required: true, message: "Menu text is required" }
//                   ]}
//                >
//                   <Input.TextArea rows={3} placeholder="e.g., Choose an option below" />
//                </Form.Item>

//                <Form.Item
//                   name="button"
//                   label="Button Text"
//                   rules={[
//                      { required: true, message: "Button text is required" }
//                   ]}
//                >
//                   <Input placeholder="e.g., Menu" />
//                </Form.Item>

//                <Form.Item
//                   name="options"
//                   label="Options (id,title per line)"
//                   rules={[
//                      { required: true, message: "At least one option is required" }
//                   ]}
//                >
//                   <Input.TextArea
//                      rows={5}
//                      placeholder={"services,Services\npricing,Pricing\ncontact,Contact Us"}
//                   />
//                </Form.Item>

//             </Form>
//          </Modal>
//       </div>
//    );
// }

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
   Empty
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import {
   getMenus,
   createMenu,
   updateMenu,
   deleteMenu
} from "../services/botMenuService";

export default function BotMenu() {

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [editing, setEditing] = useState(null);

   const [form] = Form.useForm();

   // ================= FETCH =================
   const fetchData = async () => {
      setLoading(true);
      try {
         const res = await getMenus(); // 🔥 FIXED
         setData(res || []);
      } catch {
         message.error("Failed to load menus");
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
   }, []);

   // ================= SUBMIT =================
   const onFinish = async (values) => {
      try {
         const formatted = {
            ...values,

            trigger: values.trigger
               .split(",")
               .map(t => t.trim().toLowerCase())
               .filter(t => t !== ""),

            options: values.options
               .split("\n")
               .filter(line => line.trim() !== "")
               .map(line => {
                  const parts = line.split(",");

                  if (parts.length < 2) {
                     throw new Error("Invalid option format");
                  }

                  return {
                     id: parts[0].trim().toLowerCase(),
                     title: parts[1].trim()
                  };
               })
         };

         if (editing) {
            await updateMenu(editing._id, formatted);
            message.success("Updated");
         } else {
            await createMenu(formatted); // 🔥 FIXED (no tenantId)
            message.success("Created");
         }

         setOpen(false);
         setEditing(null);
         form.resetFields();
         fetchData();

      } catch (err) {
         message.error(err.message || "Error saving menu");
      }
   };

   // ================= EDIT =================
   const handleEdit = (record) => {
      setEditing(record);
      setOpen(true);

      form.setFieldsValue({
         ...record,
         trigger: record.trigger?.join(","),
         options: record.options
            ?.map(o => `${o.id},${o.title}`)
            .join("\n")
      });
   };

   // ================= DELETE =================
   const handleDelete = async (id) => {
      try {
         await deleteMenu(id);
         message.success("Deleted");
         fetchData();
      } catch {
         message.error("Delete failed");
      }
   };

   // ================= TABLE =================
   const columns = [
      {
         title: "Menu Name",
         dataIndex: "name",
         key: "name",
         width: 200
      },
      {
         title: "Trigger",
         key: "trigger",
         width: 180,
         render: (_, record) => (
            <span>{record.trigger?.join(", ")}</span>
         )
      },
      {
         title: "Body",
         dataIndex: "body",
         key: "body",
         width: 300,
         ellipsis: true
      },
      {
         title: "Options",
         key: "options",
         width: 250,
         ellipsis: true,
         render: (_, record) => (
            <span>{record.options?.map(o => o.title).join(", ")}</span>
         )
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
                  description="Are you sure to delete this menu?"
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
               <h2 style={{ margin: 0 }}>📋 Bot Menus</h2>

               <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                     setOpen(true);
                     setEditing(null);
                     form.resetFields();
                  }}
               >
                  Add Menu
               </Button>
            </div>

            <Table
               columns={columns}
               dataSource={data}
               rowKey="_id"
               loading={loading}
               locale={{ emptyText: <Empty description="No menus found" /> }}
               pagination={{ pageSize: 10 }}
               bordered
               sticky
               scroll={{ x: 1200, y: "65vh" }}
               size="small"
            />
         </Card>

         {/* MODAL */}
         <Modal
            open={open}
            title={editing ? "Edit Menu" : "Add Menu"}
            onCancel={() => {
               setOpen(false);
               setEditing(null);
               form.resetFields();
            }}
            onOk={() => form.submit()}
            width={600}
            okText={editing ? "Update" : "Create"}
         >
            <Form layout="vertical" form={form} onFinish={onFinish}>

               <Form.Item
                  name="name"
                  label="Menu Name"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="mainMenu" />
               </Form.Item>

               <Form.Item
                  name="trigger"
                  label="Trigger Words"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="hi, hello" />
               </Form.Item>

               <Form.Item
                  name="body"
                  label="Menu Text"
                  rules={[{ required: true }]}
               >
                  <Input.TextArea rows={3} />
               </Form.Item>

               <Form.Item
                  name="button"
                  label="Button Text"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="options"
                  label="Options (id,title)"
                  rules={[{ required: true }]}
               >
                  <Input.TextArea rows={5} />
               </Form.Item>

            </Form>
         </Modal>
      </div>
   );
}