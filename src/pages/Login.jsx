import React, { useState } from "react";
import { Form, Input, Button, message, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useTenant } from "../context/TenantContext";
import styles from "./Auth.module.css";

export default function Login() {
   const navigate = useNavigate();
   const { login } = useAuth();
   const { saveTenant } = useTenant();
   const [loading, setLoading] = useState(false);

   const onFinish = async (values) => {
      setLoading(true);
      try {
         const res = await API.post("/auth/login", values);
         login(res.data);
         saveTenant(res.data.tenantId);

         message.success("Login Successful");
         navigate("/dashboard");
      } catch (err) {
         message.error(err.response?.data?.error || "Login failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <ConfigProvider theme={{ token: { fontFamily: "'Inter', sans-serif" } }}>
         <div className={styles.container}>
            <div className={styles.glow} />
            <div className={styles.perspective}>
               <div className={styles.loginCard}>
                  <div className={styles.logoContainer}>
                     <img src="/splogo.jpeg" alt="Logo" className={styles.logoImage} />
                  </div>

                  <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                     <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                           { required: true, message: "Email required" },
                           { type: "email", message: "Enter a valid email address" }
                        ]}
                     >
                        <Input className={styles.formInput} placeholder="Enter email" />
                     </Form.Item>

                     <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                           { required: true, message: "Password required" },
                           { min: 6, message: "Minimum 6 characters" }
                        ]}
                     >
                        <Input.Password className={styles.formInput} placeholder="Enter password" />
                     </Form.Item>

                     <Button type="primary" htmlType="submit" block loading={loading} className={styles.formButton}>
                        Login
                     </Button>
                  </Form>

                  <p className={styles.bottomLink}>
                     Don't have an account?{" "}
                     <span
                        onClick={() => navigate("/register")}
                        className={styles.link}
                     >
                        Register
                     </span>
                  </p>
               </div>
            </div>
         </div>
      </ConfigProvider>
   );
}