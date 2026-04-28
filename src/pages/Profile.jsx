import { use, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Input, message } from "antd";
import { updateUser } from "../services/authService";
import API from "../api/api";

export default function Profile() {
   const [user, setUser] = useState(null);
   const [open, setOpen] = useState(false);
   const [form] = Form.useForm();

   // 🔹 LOAD USER
   const loadUser = async () => {
      try {
         const res = await API.get("/auth/user"); // ensure API exists
         setUser(res.data);

         form.setFieldsValue({
            name: res.data.name,
            countryCode: res.data.countryCode,
            country: res.data.country,
            whatsappNumber: res.data.whatsappNumber
         });

      } catch (err) {
         message.error("Failed to load profile");
      }
   };

   useEffect(() => {
      loadUser();
   }, []);

   // 🔹 OPEN MODAL
   const handleOpen = () => {
      setOpen(true);

      form.setFieldsValue({
         name: user.name,
         countryCode: user.countryCode,
         country: user.country,
         whatsappNumber: user.whatsappNumber,
         email:user.email

      });
   };

   // 🔹 UPDATE
   const handleUpdate = async () => {
      try {
         const values = await form.validateFields();

         if (!values.password) {
            delete values.password;
         }

         const res = await updateUser(values);

         message.success("Profile updated");

         setUser(res.data); // 🔥 update UI
         setOpen(false);
         form.resetFields(["password"]);

      } catch (err) {
         message.error("Update failed");
      }
   };

   if (!user) return null;

   return (
      <div style={{ maxWidth: 500, margin: "40px auto" }}>

         {/* 🔹 PROFILE VIEW */}
         <Card title="👤 My Profile">

            <p><b>Name:</b> {user.name}</p>
            <p><b>Country:</b> {user.country}</p>
            <p><b>Code:</b> {user.countryCode}</p>
            <p><b>WhatsApp:</b> {user.whatsappNumber}</p>
            <p><b>Email:</b> {user.email}</p>

            <Button type="primary" onClick={handleOpen}>
               Update Profile
            </Button>

         </Card>

         {/* 🔹 MODAL */}
         <Modal
            title="Update Profile"
            open={open}
            onCancel={() => setOpen(false)}
            onOk={handleUpdate}
            okText="Save"
         >

            <Form layout="vertical" form={form}>

               <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item label="Country Code" name="countryCode">
                  <Input />
               </Form.Item>

               <Form.Item label="Country" name="country">
                  <Input />
               </Form.Item>

               <Form.Item label="WhatsApp Number" name="whatsappNumber">
                  <Input />
               </Form.Item>
               <Form.Item label="Email" name="email">
                  <Input />
               </Form.Item>

               <Form.Item label="New Password" name="password">
                  <Input.Password placeholder="Leave empty if no change" />
               </Form.Item>

            </Form>

         </Modal>

      </div>
   );
}