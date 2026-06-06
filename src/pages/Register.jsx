import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, message, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";
import styles from "./Auth.module.css";

export default function Register() {
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [isFlipped, setIsFlipped] = useState(false);

   const onRegisterFinish = async (values) => {
      if (values.password !== values.confirmPassword) {
         return message.error("Passwords do not match");
      }

      if (!values.agree) {
         return message.error("Please accept Terms & Privacy Policy");
      }

      setLoading(true);
      try {
         const { confirmPassword, agree, ...registerData } = values;

         await API.post("/auth/register", registerData);
         
         setIsSuccess(true);
         
         // Trigger flip animation
         setTimeout(() => {
            setIsFlipped(true);
         }, 1500);

         // Navigate after flip finishes
         setTimeout(() => {
            navigate("/login");
         }, 2100);

      } catch (err) {
         message.error(err.response?.data?.error || "Register failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <ConfigProvider theme={{ token: { fontFamily: "'Inter', sans-serif" } }}>
         <div className={styles.container}>
            <div className={styles.glow} />
            <div className={styles.perspective}>
               <motion.div
                  className={styles.flipper}
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 20 }}
               >
                  {/* FRONT SIDE */}
                  <div className={styles.cardFront}>
                     <AnimatePresence>
                        {isSuccess && (
                           <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={styles.successOverlay}
                           >
                              <motion.div
                                 initial={{ scale: 0.5, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
                                 className={styles.checkmark}
                              >
                                 <CheckOutlined />
                              </motion.div>
                              <h2 className={styles.successTitle}>Account Created</h2>
                              <p className={styles.successText}>Welcome to our platform</p>
                           </motion.div>
                        )}
                     </AnimatePresence>

                     <div className={styles.logoContainer}>
                        <div className={styles.logoCircle}>
                           <UserOutlined />
                        </div>
                     </div>

                     <div className={styles.headerText}>
                        <h1>Create Your Account</h1>
                        <p>Start your journey with us</p>
                     </div>

                     <Form layout="vertical" onFinish={onRegisterFinish} requiredMark={false}>
                        <Row gutter={[8, 8]}>
                           <Col xs={24} sm={12}>
                              <Form.Item name="name" label="Name" rules={[{ required: true, message: "Required" }, { min: 2, message: "Min 2 chars" }]}>
                                 <Input className={styles.formInput} placeholder="Enter name" />
                              </Form.Item>
                           </Col>
                           <Col xs={24} sm={12}>
                              <Form.Item name="email" label="Email" rules={[{ required: true, message: "Required" }, { type: "email", message: "Invalid email" }]}>
                                 <Input className={styles.formInput} placeholder="Enter email" />
                              </Form.Item>
                           </Col>
                        </Row>

                        <Row gutter={[8, 8]}>
                           <Col xs={8} sm={8}>
                              <Form.Item name="countryCode" label="Code" initialValue="+91">
                                 <Input className={styles.formInput} />
                              </Form.Item>
                           </Col>
                           <Col xs={16} sm={16}>
                              <Form.Item name="whatsappNumber" label="WhatsApp Number" rules={[{ required: true, message: "Required" }, { pattern: /^[0-9]{10}$/, message: "10 digits req" }]}>
                                 <Input className={styles.formInput} placeholder="Enter number" />
                              </Form.Item>
                           </Col>
                        </Row>

                        <Form.Item name="country" label="Country" initialValue="India">
                           <Input className={styles.formInput} />
                        </Form.Item>

                        <Row gutter={[8, 8]}>
                           <Col xs={24} sm={12}>
                              <Form.Item name="password" label="Password" rules={[{ required: true, message: "Required" }, { min: 6, message: "Min 6 chars" }]}>
                                 <Input.Password className={styles.formInput} placeholder="••••••••" />
                              </Form.Item>
                           </Col>
                           <Col xs={24} sm={12}>
                              <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: "Required" }]}>
                                 <Input.Password className={styles.formInput} placeholder="••••••••" />
                              </Form.Item>
                           </Col>
                        </Row>

                        <Form.Item name="agree" valuePropName="checked">
                           <Checkbox>I agree to Terms & Privacy Policy</Checkbox>
                        </Form.Item>

                        <Button type="primary" htmlType="submit" block loading={loading} className={styles.formButton}>
                           Register
                        </Button>
                     </Form>

                     <p className={styles.bottomLink}>
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className={styles.link}>
                           Login
                        </span>
                     </p>
                  </div>

                  {/* BACK SIDE */}
                  <div className={styles.cardBack}>
                     <div className={styles.logoContainer}>
                        <div className={styles.logoCircle}>
                           <LockOutlined />
                        </div>
                     </div>
                     <div className={styles.headerText}>
                        <h1>Secure Login</h1>
                        <p>Redirecting to login...</p>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </ConfigProvider>
   );
}