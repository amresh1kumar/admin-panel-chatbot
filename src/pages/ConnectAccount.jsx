// import { Card, Row, Col, Button, Input, Form, message } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// import { connectWhatsApp } from "../services/tenantService";
// import "../styles/ConnectAccount.css";

// export default function ConnectAccount() {
//    const navigate = useNavigate();
//    const tenantId = localStorage.getItem("tenantId");

//    const [success, setSuccess] = useState(false);

//    const onFinish = async (values) => {
//       try {
//          await connectWhatsApp(tenantId, values);

//          message.success("WhatsApp Connected Successfully!");

//          // 🔥 show success screen
//          setSuccess(true);

//          // 🔥 auto redirect
//          setTimeout(() => {
//             navigate("/dashboard");
//          }, 2000);

//       } catch (err) {
//          message.error("Connection failed");
//       }
//    };

//    // ✅ SUCCESS SCREEN
//    if (success) {
//       return (
//          <div className="success-container">
//             <div className="success-card">
//                <div className="checkmark">✔</div>
//                <h2>WhatsApp Connected 🎉</h2>
//                <p>Your account is ready to use.</p>
//             </div>
//          </div>
//       );
//    }

//    return (
//       <div className="connect-container">

//          <h2 style={{ marginBottom: "20px" }}>
//             🔗 Connect WhatsApp Account
//          </h2>

//          <Row gutter={20}>

//             {/* LEFT */}
//             <Col xs={24} md={12}>
//                <Card style={{ height: "100%" }}>
//                   <h3>Connect WhatsApp Business</h3>

//                   <p>Use WhatsApp Cloud API to integrate your business account.</p>

//                   <ul>
//                      <li>Go to Meta Developer Dashboard</li>
//                      <li>Create WhatsApp App</li>
//                      <li>Copy Phone Number ID</li>
//                      <li>Generate Access Token</li>
//                   </ul>

//                   <Button
//                      type="primary"
//                      style={{ marginTop: "20px", background: "#25D366", border: "none" }}
//                   >
//                      🚀 One Click Connect (Coming Soon)
//                   </Button>
//                </Card>
//             </Col>

//             {/* RIGHT */}
//             <Col xs={24} md={12}>
//                <Card>
//                   <h3>Manual Setup</h3>

//                   <Form layout="vertical" onFinish={onFinish}>

//                      <Form.Item
//                         label="Phone Number ID"
//                         name="phoneNumberId"
//                         rules={[{ required: true }]}
//                      >
//                         <Input placeholder="Enter Phone Number ID" />
//                      </Form.Item>

//                      <Form.Item
//                         label="Access Token"
//                         name="accessToken"
//                         rules={[{ required: true }]}
//                      >
//                         <Input.TextArea placeholder="Paste Access Token" />
//                      </Form.Item>

//                      <Form.Item label="Webhook URL">
//                         <Input value="http://localhost:5000/webhook" disabled />
//                      </Form.Item>

//                      <Form.Item label="Verify Token">
//                         <Input value="mytoken1234567" disabled />
//                      </Form.Item>

//                      <Button type="primary" htmlType="submit" block>
//                         Connect Account
//                      </Button>

//                   </Form>
//                </Card>
//             </Col>

//          </Row>
//       </div>
//    );
// }

import { Card, Row, Col, Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { connectWhatsApp } from "../services/tenantService";
import "../styles/ConnectAccount.css";

export default function ConnectAccount() {
   const navigate = useNavigate();
   const [success, setSuccess] = useState(false);

   const onFinish = async (values) => {
      try {
         await connectWhatsApp(values); // 🔥 FIXED

         message.success("WhatsApp Connected Successfully!");

         setSuccess(true);

         setTimeout(() => {
            navigate("/dashboard");
         }, 2000);

      } catch (err) {
         console.error(err);
         message.error("Connection failed");
      }
   };

   // ✅ SUCCESS SCREEN
   if (success) {
      return (
         <div className="success-container">
            <div className="success-card">
               <div className="checkmark">✔</div>
               <h2>WhatsApp Connected 🎉</h2>
               <p>Your account is ready to use.</p>
            </div>
         </div>
      );
   }

   return (
      <div className="connect-container">

         <h2 style={{ marginBottom: "20px" }}>
            🔗 Connect WhatsApp Account
         </h2>

         <Row gutter={20}>

            {/* LEFT */}
            <Col xs={24} md={12}>
               <Card style={{ height: "100%" }}>
                  <h3>Connect WhatsApp Business</h3>

                  <p>Use WhatsApp Cloud API to integrate your business account.</p>

                  <ul>
                     <li>Go to Meta Developer Dashboard</li>
                     <li>Create WhatsApp App</li>
                     <li>Copy Phone Number ID</li>
                     <li>Generate Access Token</li>
                  </ul>

                  <Button
                     type="primary"
                     style={{ marginTop: "20px", background: "#25D366", border: "none" }}
                  >
                     🚀 One Click Connect (Coming Soon)
                  </Button>
               </Card>
            </Col>

            {/* RIGHT */}
            <Col xs={24} md={12}>
               <Card>
                  <h3>Manual Setup</h3>

                  <Form layout="vertical" onFinish={onFinish}>

                     <Form.Item
                        label="Phone Number ID"
                        name="phoneNumberId"
                        rules={[{ required: true }]}
                     >
                        <Input placeholder="Enter Phone Number ID" />
                     </Form.Item>

                     <Form.Item
                        label="Access Token"
                        name="accessToken"
                        rules={[{ required: true }]}
                     >
                        <Input.TextArea placeholder="Paste Access Token" />
                     </Form.Item>

                     <Form.Item label="Webhook URL">
                        <Input value="http://localhost:5000/webhook" disabled />
                     </Form.Item>

                     <Form.Item label="Verify Token">
                        <Input value="mytoken1234567" disabled />
                     </Form.Item>

                     <Button type="primary" htmlType="submit" block>
                        Connect Account
                     </Button>

                  </Form>
               </Card>
            </Col>

         </Row>
      </div>
   );
}