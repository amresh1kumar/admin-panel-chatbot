// import { useEffect, useState } from "react";
// import { Card, Button, Modal, Form, Input, message } from "antd";
// import { updateUser } from "../services/authService";
// import API from "../api/api";

// export default function Profile() {
//    const [user, setUser] = useState(null);
//    const [open, setOpen] = useState(false);
//    const [form] = Form.useForm();

//    // 🔹 LOAD USER
//    const loadUser = async () => {
//       try {
//          const res = await API.get("/auth/user"); // ensure API exists
//          setUser(res.data);

//          form.setFieldsValue({
//             name: res.data.name,
//             countryCode: res.data.countryCode,
//             country: res.data.country,
//             whatsappNumber: res.data.whatsappNumber
//          });

//       } catch (err) {
//          message.error("Failed to load profile");
//       }
//    };

//    useEffect(() => {
//       loadUser();
//    }, []);

//    // 🔹 OPEN MODAL
//    const handleOpen = () => {
//       setOpen(true);

//       form.setFieldsValue({
//          name: user.name,
//          countryCode: user.countryCode,
//          country: user.country,
//          whatsappNumber: user.whatsappNumber,
//          email: user.email

//       });
//    };

//    // 🔹 UPDATE
//    const handleUpdate = async () => {
//       try {
//          const values = await form.validateFields();

//          if (!values.password) {
//             delete values.password;
//          }

//          const res = await updateUser(values);

//          message.success("Profile updated");

//          setUser(res.data); // 🔥 update UI
//          setOpen(false);
//          form.resetFields(["password"]);

//       } catch (err) {
//          message.error("Update failed");
//       }
//    };

//    if (!user) return null;
//    const end = new Date(user.trialEnd);
//    const now = new Date();

//    const diff =
//       end.getTime() - now.getTime();

//    const daysLeft =
//       Math.ceil(
//          diff / (1000 * 60 * 60 * 24)
//       );

//    const safeDays =
//       daysLeft > 0 ? daysLeft : 0;
//    return (
//       <div style={{ maxWidth: 500, margin: "40px auto" }}>

//          {/* 🔹 PROFILE VIEW */}
//          <Card title="👤 My Profile">

//             <p><b>Name:</b> {user.name}</p>
//             <p><b>Country:</b> {user.country}</p>
//             <p><b>Code:</b> {user.countryCode}</p>
//             <p><b>WhatsApp:</b> {user.whatsappNumber}</p>
//             <p><b>Email:</b> {user.email}</p>
//             <p>
//                <b>Plan:</b>{" "}
//                <span
//                   style={{
//                      color:
//                         user.plan === "premium"
//                            ? "green"
//                            : user.plan === "expired"
//                               ? "red"
//                               : "orange",
//                      fontWeight: "bold"
//                   }}
//                >
//                   {user.plan?.toUpperCase()}
//                </span>
//             </p>

//             <p>
//                <b>Status:</b>{" "}
//                {user.subscriptionStatus}
//             </p>

//             {
//                user.plan === "trial" && (
//                   <p>
//                      <b>Trial Days Left:</b>{" "}
//                      {safeDays} days
//                   </p>
//                )
//             }

//             {
//                user.plan === "expired" && (
//                   <p
//                      style={{
//                         color: "red",
//                         fontWeight: "bold"
//                      }}
//                   >
//                      Trial expired. Upgrade required.
//                   </p>
//                )
//             }

//             <Button type="primary" onClick={handleOpen}>
//                Update Profile
//             </Button>

//          </Card>

//          {/* 🔹 MODAL */}
//          <Modal
//             title="Update Profile"
//             open={open}
//             onCancel={() => setOpen(false)}
//             onOk={handleUpdate}
//             okText="Save"
//          >

//             <Form layout="vertical" form={form}>

//                <Form.Item
//                   label="Name"
//                   name="name"
//                   rules={[{ required: true }]}
//                >
//                   <Input />
//                </Form.Item>

//                <Form.Item label="Country Code" name="countryCode">
//                   <Input />
//                </Form.Item>

//                <Form.Item label="Country" name="country">
//                   <Input />
//                </Form.Item>

//                <Form.Item label="WhatsApp Number" name="whatsappNumber">
//                   <Input />
//                </Form.Item>
//                <Form.Item label="Email" name="email">
//                   <Input />
//                </Form.Item>

//                <Form.Item label="New Password" name="password">
//                   <Input.Password placeholder="Leave empty if no change" />
//                </Form.Item>

//             </Form>

//          </Modal>

//       </div>
//    );
// }

import { useEffect, useState } from "react";
import {
   Card,
   Button,
   Modal,
   Form,
   Input,
   message
} from "antd";
import { formatDate }
   from "../utils/formatDate";

import { updateUser, deleteAccount } from "../services/authService";
import API from "../api/api";

export default function Profile() {

   const [user, setUser] = useState(null);
   const [open, setOpen] = useState(false);

   const [form] = Form.useForm();

   // 🔹 LOAD USER
   const loadUser = async () => {
      try {

         const res =
            await API.get("/auth/user");

         setUser(res.data);

         form.setFieldsValue({
            name: res.data.name,
            countryCode:
               res.data.countryCode,
            country:
               res.data.country,
            whatsappNumber:
               res.data.whatsappNumber,
            email:
               res.data.email
         });

      } catch (err) {

         message.error(
            "Failed to load profile"
         );
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
         countryCode:
            user.countryCode,
         country:
            user.country,
         whatsappNumber:
            user.whatsappNumber,
         email:
            user.email
      });
   };

   // 🔹 UPDATE PROFILE
   const handleUpdate = async () => {

      try {

         const values =
            await form.validateFields();

         if (!values.password) {
            delete values.password;
         }

         const res =
            await updateUser(values);

         message.success(
            "Profile updated"
         );

         setUser(res.data);

         setOpen(false);

         form.resetFields([
            "password"
         ]);

      } catch (err) {

         message.error(
            "Update failed"
         );
      }
   };

   const handleDeleteAccount = () => {

      Modal.confirm({

         title: "Delete Account",

         content:
            "Are you sure? All chats, leads, templates and tenant data will be permanently deleted.",

         okText: "Yes, Delete",

         okType: "danger",

         cancelText: "Cancel",

         onOk: async () => {

            try {

               await deleteAccount();

               message.success(
                  "Account deleted successfully"
               );

               // LOGOUT
               localStorage.removeItem(
                  "token"
               );

               window.location.href =
                  "/login";

            } catch (err) {

               message.error(
                  "Delete failed"
               );
            }
         }
      });
   };

   const handleUpgrade = () => {

      const phone =
         "918085354646";

      const text =
         `Hi, I want to upgrade my chatbot account to premium.`;

      const url =
         `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

      window.open(
         url,
         "_blank"
      );
   };

   if (!user) return null;

   // 🔹 TRIAL DAYS CALCULATION
   const end =
      new Date(user.trialEnd);

   const now =
      new Date();

   const diff =
      end.getTime() -
      now.getTime();

   const daysLeft =
      Math.ceil(
         diff /
         (
            1000 *
            60 *
            60 *
            24
         )
      );

   const safeDays =
      daysLeft > 0
         ? daysLeft
         : 0;

   return (

      <div
         style={{
            maxWidth: 500,
            margin: "40px auto"
         }}
      >

         {/* 🔹 PROFILE CARD */}
         <Card title="👤 My Profile">

            <p>
               <b>Name:</b>{" "}
               {user.name}
            </p>

            <p>
               <b>Country:</b>{" "}
               {user.country}
            </p>

            <p>
               <b>Code:</b>{" "}
               {user.countryCode}
            </p>

            <p>
               <b>WhatsApp:</b>{" "}
               {user.whatsappNumber}
            </p>

            <p>
               <b>Email:</b>{" "}
               {user.email}
            </p>

            {/* 🔹 PLAN */}
            <p>
               <b>Plan:</b>{" "}

               <span
                  style={{
                     color:
                        user.plan ===
                           "premium"
                           ? "green"
                           : user.plan ===
                              "expired"
                              ? "red"
                              : "orange",

                     fontWeight:
                        "bold"
                  }}
               >
                  {
                     user.plan?.toUpperCase()
                  }
               </span>
            </p>

            {/* 🔹 STATUS */}
            <p>
               <b>Status:</b>{" "}

               <span
                  style={{
                     color:
                        user.subscriptionStatus ===
                           "active"
                           ? "green"
                           : "red",

                     fontWeight:
                        "bold"
                  }}
               >
                  {
                     user.subscriptionStatus
                  }
               </span>
            </p>

            {/* 🔹 TRIAL INFO */}
            {
               user.plan ===
               "trial" && (
                  <>
                     <p>
                        <b>
                           Trial Days Left:
                        </b>{" "}

                        {safeDays} days
                     </p>

                     <p>
                        <b>
                           Trial Ends:
                        </b>{" "}

                        {
                           formatDate(user.trialEnd)
                        }
                     </p>
                  </>
               )
            }

            {/* 🔹 PREMIUM INFO */}
            {
               user.plan ===
               "premium" &&
               user.premiumEnd && (
                  <p>
                     <b>
                        Premium Valid Till:
                     </b>{" "}

                     {
                        formatDate(user.premiumEnd)
                     }
                  </p>
               )
            }

            {/* 🔹 EXPIRED */}
            {
               user.plan ===
               "expired" && (
                  <p
                     style={{
                        color: "red",
                        fontWeight:
                           "bold"
                     }}fs
                  >
                     Trial expired.
                     Upgrade required.
                  </p>
               )
            }

            {/* 🔹 UPGRADE BUTTON */}
            {
               user.plan !==
               "premium" && (
                  <Button
                     type="primary"
                     style={{
                        marginBottom: 15
                     }}

                     onClick={handleUpgrade}
                  >
                     Upgrade to Premium
                  </Button>
               )
            }

            {/* 🔹 UPDATE BUTTON */}
            <div>
               <Button
                  type="default"
                  onClick={
                     handleOpen
                  }
               >
                  Update Profile
               </Button>
               <Button
                  danger
                  onClick={
                     handleDeleteAccount
                  }
               >
                  Delete Account
               </Button>
            </div>

         </Card>

         {/* 🔹 UPDATE MODAL */}
         <Modal
            title="Update Profile"
            open={open}
            onCancel={() =>
               setOpen(false)
            }
            onOk={handleUpdate}
            okText="Save"
         >

            <Form
               layout="vertical"
               form={form}
            >

               <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                     {
                        required: true
                     }
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="Country Code"
                  name="countryCode"
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="Country"
                  name="country"
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="WhatsApp Number"
                  name="whatsappNumber"
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="Email"
                  name="email"
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="New Password"
                  name="password"
               >
                  <Input.Password
                     placeholder="Leave empty if no change"
                  />
               </Form.Item>

            </Form>

         </Modal>

      </div>
   );
}