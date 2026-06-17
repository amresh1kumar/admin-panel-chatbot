import { useEffect, useState } from "react";

import { Card, Form, Input, Button, Switch, message } from "antd";

import {
   getCallingSetting,
   updateCallingSetting,
} from "../services/callingSettingService";

export default function CallingSettings() {
   const [form] = Form.useForm();

   const [loading, setLoading] = useState(false);

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
         <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Twilio SID" name="twilioSid">
               <Input />
            </Form.Item>

            <Form.Item label="Twilio Auth Token" name="twilioAuthToken">
               <Input.Password />
            </Form.Item>

            <Form.Item label="Twilio Phone Number" name="twilioPhoneNumber">
               <Input />
            </Form.Item>

            <Form.Item label="ElevenLabs API Key" name="elevenLabsApiKey">
               <Input.Password />
            </Form.Item>

            <Form.Item label="ElevenLabs Agent ID" name="elevenLabsAgentId">
               <Input />
            </Form.Item>

            <Form.Item label="Agent Phone Number ID" name="agentPhoneNumberId">
               <Input />
            </Form.Item>

            <Form.Item
               label="Enable Calling"
               name="enabled"
               valuePropName="checked"
            >
               <Switch />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
               Save
            </Button>
         </Form>
      </Card>
   );
}
