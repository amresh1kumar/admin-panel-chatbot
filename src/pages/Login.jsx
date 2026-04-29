import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useTenant } from "../context/TenantContext";

export default function Login() {
   const navigate = useNavigate();
   const { login } = useAuth();
   const { saveTenant } = useTenant();

   const onFinish = async (values) => {
      try {
         const res = await API.post("/auth/login", values);
         login(res.data.token);
         saveTenant(res.data.tenantId);

         message.success("Login Successful");

         navigate("/dashboard");
      } catch (err) {
         message.error(err.response?.data?.error || "Login failed");
      }
   };

   return (
      <div style={container}>
         <Card style={card}>
            <h2 style={{ textAlign: "center" }}>🔐 Login</h2>

            <Form layout="vertical" onFinish={onFinish}>
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

               <Form.Item
                  name="password"
                  label="Password"
               rules={[
                  { required: true, message: "Password required" },
                  { min: 6, message: "Minimum 6 characters" }
               ]}
               >
                  <Input.Password placeholder="Enter password" />
               </Form.Item>

               <Button type="primary" htmlType="submit" block>
                  Login
               </Button>
            </Form>

            <p style={{ textAlign: "center", marginTop: "15px" }}>
               Don't have an account?{" "}
               <span
                  onClick={() => navigate("/register")}
                  style={{ color: "#1677ff", cursor: "pointer", fontWeight: "500" }}
               >
                  Register
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
   width: 380,
   borderRadius: "10px"
};