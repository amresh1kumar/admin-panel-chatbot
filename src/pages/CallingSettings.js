// import { useEffect, useState } from "react";

// import { Card, Form, Input, Button, Switch, message } from "antd";

// import {
//    getCallingSetting,
//    updateCallingSetting,
// } from "../services/callingSettingService";

// export default function CallingSettings() {
//    const [form] = Form.useForm();

//    const [loading, setLoading] = useState(false);

//    useEffect(() => {
//       loadSettings();
//    }, []);

//    const loadSettings = async () => {
//       try {
//          const data = await getCallingSetting();

//          form.setFieldsValue(data);
//       } catch (err) {
//          console.error(err);

//          message.error("Failed to load settings");
//       }
//    };

//    const handleSubmit = async (values) => {
//       try {
//          setLoading(true);

//          await updateCallingSetting(values);

//          message.success("Settings saved successfully");
//       } catch (err) {
//          console.error(err);

//          message.error("Failed to save settings");
//       } finally {
//          setLoading(false);
//       }
//    };

//    return (
//       <Card title="AI Calling Settings">
//          <Form form={form} layout="vertical" onFinish={handleSubmit}>
//             <Form.Item label="Twilio SID" name="twilioSid">
//                <Input />
//             </Form.Item>

//             <Form.Item label="Twilio Auth Token" name="twilioAuthToken">
//                <Input.Password />
//             </Form.Item>

//             <Form.Item label="Twilio Phone Number" name="twilioPhoneNumber">
//                <Input />
//             </Form.Item>

//             <Form.Item label="ElevenLabs API Key" name="elevenLabsApiKey">
//                <Input.Password />
//             </Form.Item>

//             <Form.Item label="ElevenLabs Agent ID" name="elevenLabsAgentId">
//                <Input />
//             </Form.Item>

//             <Form.Item label="Agent Phone Number ID" name="agentPhoneNumberId">
//                <Input />
//             </Form.Item>

//             <Form.Item
//                label="Enable Calling"
//                name="enabled"
//                valuePropName="checked"
//             >
//                <Switch />
//             </Form.Item>

//             <Button type="primary" htmlType="submit" loading={loading}>
//                Save
//             </Button>
//          </Form>
//       </Card>
//    );
// }

import { useEffect, useState } from "react";

import {
   Card,
   Form,
   Input,
   Button,
   Switch,
   Select,
   message,
} from "antd";

import {
   getCallingSetting,
   updateCallingSetting,
} from "../services/callingSettingService";

export default function CallingSettings() {
   const [form] = Form.useForm();

   const [loading, setLoading] = useState(false);

   const provider = Form.useWatch("provider", form);

   useEffect(() => {
      loadSettings();
   }, []);

   const loadSettings = async () => {
      try {
         const data = await getCallingSetting();

         form.setFieldsValue(data);
      } catch (err) {
         console.error(err);
         message.error("Failed to load settings");
      }
   };

   const handleSubmit = async (values) => {
      try {
         setLoading(true);

         await updateCallingSetting(values);

         message.success("Settings saved successfully");
      } catch (err) {
         console.error(err);
         message.error("Failed to save settings");
      } finally {
         setLoading(false);
      }
   };

   return (
      <Card title="AI Calling Settings">
         <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
         >
            <Form.Item
               label="Provider"
               name="provider"
               rules={[
                  {
                     required: true,
                     message: "Please select provider",
                  },
               ]}
            >
               <Select
                  placeholder="Select Provider"
                  options={[
                     {
                        label: "Vapi",
                        value: "vapi",
                     },
                     {
                        label: "ElevenLabs",
                        value: "elevenlabs",
                     },
                  ]}
               />
            </Form.Item>

            {provider === "vapi" && (
               <>
                  <Form.Item
                     label="Vapi API Key"
                     name={[
                        "credentials",
                        "apiKey",
                     ]}
                     rules={[
                        {
                           required: true,
                           message: "API Key is required",
                        },
                     ]}
                  >
                     <Input.Password />
                  </Form.Item>

                  <Form.Item
                     label="Assistant ID"
                     name={[
                        "credentials",
                        "assistantId",
                     ]}
                     rules={[
                        {
                           required: true,
                           message: "Assistant ID is required",
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>

                  <Form.Item
                     label="Phone Number ID"
                     name={[
                        "credentials",
                        "phoneNumberId",
                     ]}
                  >
                     <Input />
                  </Form.Item>
               </>
            )}

            {provider === "elevenlabs" && (
               <>
                  <Form.Item
                     label="ElevenLabs API Key"
                     name={[
                        "credentials",
                        "apiKey",
                     ]}
                     rules={[
                        {
                           required: true,
                           message: "API Key is required",
                        },
                     ]}
                  >
                     <Input.Password />
                  </Form.Item>

                  <Form.Item
                     label="Agent ID"
                     name={[
                        "credentials",
                        "agentId",
                     ]}
                     rules={[
                        {
                           required: true,
                           message: "Agent ID is required",
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>

                  <Form.Item
                     label="Agent Phone Number ID"
                     name={[
                        "credentials",
                        "agentPhoneNumberId",
                     ]}
                     rules={[
                        {
                           required: true,
                           message: "Agent Phone Number ID is required",
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>
               </>
            )}

            <Form.Item
               label="Enable Calling"
               name="enabled"
               valuePropName="checked"
            >
               <Switch />
            </Form.Item>

            <Button
               type="primary"
               htmlType="submit"
               loading={loading}
            >
               Save Settings
            </Button>
         </Form>
      </Card>
   );
}