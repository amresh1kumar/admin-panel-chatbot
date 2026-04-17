import { Form, Input, Button, Card, Checkbox, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
   const navigate = useNavigate();

   const onFinish = async (values) => {
      if (values.password !== values.confirmPassword) {
         return message.error("Passwords do not match");
      }

      if (!values.agree) {
         return message.error("Please accept Terms & Privacy Policy");
      }

      try {
         const { confirmPassword, agree, ...registerData } = values;

         await API.post("/auth/register", registerData);
         message.success("Account created successfully!");
         navigate("/login");
      } catch (err) {
         message.error(err.response?.data?.error || "Register failed");
      }
   };

   return (
      <div style={container}>
         <Card style={card}>
            <h2 style={{ textAlign: "center" }}>🚀 Create Account</h2>

            <Form layout="vertical" onFinish={onFinish}>

               <Row gutter={12}>
                  <Col span={12}>
                     <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                           { required: true, message: "Name required" },
                           { min: 2, message: "Minimum 2 characters" }
                        ]}
                     >
                        <Input placeholder="Enter name" />
                     </Form.Item>
                  </Col>

                  <Col span={12}>
                     <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                           { required: true, message: "Email required" },
                           { type: "email", message: "Valid email enter karo" }
                        ]}
                     >
                        <Input placeholder="Enter email" />
                     </Form.Item>
                  </Col>
               </Row>

               <Row gutter={12}>
                  <Col span={8}>
                     <Form.Item
                        name="countryCode"
                        label="Code"
                        initialValue="+91"
                     >
                        <Input />
                     </Form.Item>
                  </Col>

                  <Col span={16}>
                     <Form.Item
                        name="whatsappNumber"
                        label="WhatsApp Number"
                        rules={[
                           { required: true, message: "Number required" },
                           { pattern: /^[0-9]{10}$/, message: "10 digit number enter karo" }
                        ]}
                     >
                        <Input placeholder="Enter number" />
                     </Form.Item>
                  </Col>
               </Row>

               <Form.Item name="country" label="Country" initialValue="India">
                  <Input />
               </Form.Item>

               <Row gutter={12}>
                  <Col span={12}>
                     <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                           { required: true, message: "Password required" },
                           { min: 6, message: "Minimum 6 characters" }
                        ]}
                     >
                        <Input.Password />
                     </Form.Item>
                  </Col>

                  <Col span={12}>
                     <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[
                           { required: true, message: "Confirm password required" }
                        ]}
                     >
                        <Input.Password />
                     </Form.Item>
                  </Col>
               </Row>

               <Form.Item name="agree" valuePropName="checked">
                  <Checkbox>I agree to Terms & Privacy Policy</Checkbox>
               </Form.Item>

               <Button type="primary" htmlType="submit" block>
                  Register
               </Button>
            </Form>

            {/* Navigation */}
            <p style={{ textAlign: "center", marginTop: "15px" }}>
               Already have an account?{" "}
               <span
                  onClick={() => navigate("/login")}
                  style={{ color: "#1677ff", cursor: "pointer", fontWeight: "500" }}
               >
                  Login
               </span>
            </p>
         </Card>
      </div>
   );
}

const container = {
   height: "100vh",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   background: "#f0f2f5"
};

const card = {
   width: 500,
   borderRadius: "10px"
};