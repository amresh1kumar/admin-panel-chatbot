import { useEffect, useState } from "react";
import {
   Table,
   Button,
   Modal,
   Form,
   Input,
   message,
   Popconfirm
} from "antd";

import {
   getMenus,
   createMenu,
   updateMenu,
   deleteMenu
} from "../services/botMenuService";

import { useTenant } from "../context/TenantContext";

export default function BotMenu() {
   const { tenantId } = useTenant();

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [editing, setEditing] = useState(null);

   const [form] = Form.useForm();

   // ================= FETCH =================
   const fetchData = async () => {
      setLoading(true);
      try {
         const res = await getMenus(tenantId);
         setData(res.data || []);
      } catch {
         message.error("Failed to load menus");
      }
      setLoading(false);
   };

   useEffect(() => {
      if (tenantId) fetchData();
   }, [tenantId]);

   // ================= SUBMIT =================
   const onFinish = async (values) => {
      try {
         const formatted = {
            ...values,

            // 🔥 TRIGGER ARRAY
            trigger: values.trigger
               .split(",")
               .map(t => t.trim().toLowerCase())
               .filter(t => t !== ""),

            // 🔥 OPTIONS PARSE
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
            await createMenu({
               ...formatted,
               tenantId
            });
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
         trigger: record.trigger?.join(","), // 🔥 FIX
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
         dataIndex: "name"
      },
      {
         title: "Trigger",
         render: (_, record) => record.trigger?.join(", ")
      },
      {
         title: "Body",
         dataIndex: "body"
      },
      {
         title: "Options",
         render: (_, record) =>
            record.options?.map(o => o.title).join(", ")
      },
      {
         title: "Actions",
         render: (_, record) => (
            <>
               <Button size="small" onClick={() => handleEdit(record)}>
                  Edit
               </Button>

               <Popconfirm
                  title="Delete menu?"
                  onConfirm={() => handleDelete(record._id)}
               >
                  <Button danger size="small" style={{ marginLeft: 8 }}>
                     Delete
                  </Button>
               </Popconfirm>
            </>
         )
      }
   ];

   return (
      <div style={{ padding: "20px" }}>
         <h2>📋 Bot Menus</h2>

         <Button
            type="primary"
            onClick={() => {
               setOpen(true);
               setEditing(null);
               form.resetFields();
            }}
            style={{ marginBottom: 15 }}
         >
            + Add Menu
         </Button>

         <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            loading={loading}
         />

         {/* ================= MODAL ================= */}
         <Modal
            open={open}
            title={editing ? "Edit Menu" : "Add Menu"}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
         >
            <Form layout="vertical" form={form} onFinish={onFinish}>

               <Form.Item
                  name="name"
                  label="Menu Name"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="mainMenu / servicesMenu" />
               </Form.Item>

               <Form.Item
                  name="trigger"
                  label="Trigger (comma separated)"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="hi,hello,hey" />
               </Form.Item>

               <Form.Item
                  name="body"
                  label="Menu Text"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="Choose an option" />
               </Form.Item>

               <Form.Item
                  name="button"
                  label="Button Text"
                  rules={[{ required: true }]}
               >
                  <Input placeholder="Menu" />
               </Form.Item>

               <Form.Item
                  name="options"
                  label="Options (id,title per line)"
                  rules={[{ required: true }]}
               >
                  <Input.TextArea
                     rows={5}
                     placeholder={`services,Services\npricing,Pricing`}
                  />
               </Form.Item>

            </Form>
         </Modal>
      </div>
   );
}