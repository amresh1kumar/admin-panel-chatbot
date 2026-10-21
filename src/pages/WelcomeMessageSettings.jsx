
import { useEffect, useState } from "react";
import {
   Card,
   Form,
   Input,
   InputNumber,
   Button,
   message,
   Spin,
   Switch,
   Alert,
} from "antd";

import {
   getWelcomeMessageSettings,
   updateWelcomeMessageSettings,
} from "../services/welcomeMessageSettingService";

const { TextArea } = Input;

export default function WelcomeMessageSettings() {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [saving, setSaving] = useState(false);

   const enabled = Form.useWatch("enabled", form);

   useEffect(() => {
      loadSettings();
   }, []);

   const loadSettings = async () => {
      try {
         setLoading(true);

         const res = await getWelcomeMessageSettings();
         const data = res?.data;

         form.setFieldsValue({
            enabled: data?.enabled ?? true,
            firstWelcomeMessage: data?.firstWelcomeMessage ?? "",
            welcomeBackMessage: data?.welcomeBackMessage ?? "",
            welcomeBackAfterHours: data?.welcomeBackAfterHours ?? 24,
         });
      } catch (err) {
         console.error(err);
         message.error("Failed to load welcome message settings");
      } finally {
         setLoading(false);
      }
   };

   const handleSubmit = async (values) => {
      try {
         setSaving(true);

         await updateWelcomeMessageSettings(values);

         message.success("Welcome message settings saved successfully");
      } catch (err) {
         console.error(err);
         message.error("Failed to save welcome message settings");
      } finally {
         setSaving(false);
      }
   };

   return (
      <div style={{ padding: 20 }}>
         <Card title="Welcome Message Settings">
            <Spin spinning={loading}>
               <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
               >
                  <Form.Item
                     label="Enable Welcome Messages"
                     name="enabled"
                     valuePropName="checked"
                  >
                     <Switch
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                     />
                  </Form.Item>

                  <Alert
                     type="info"
                     showIcon
                     style={{ marginBottom: 20 }}
                     message="Personalize messages with {{name}}"
                     description="The customer's WhatsApp profile name will replace {{name}} automatically."
                  />

                  <Form.Item
                     label="First-Time Welcome Message"
                     name="firstWelcomeMessage"
                     rules={[
                        {
                           required: true,
                           message: "Please enter the first welcome message",
                        },
                     ]}
                  >
                     <TextArea
                        rows={4}
                        disabled={!enabled}
                        placeholder="👋 Welcome, {{name}}!"
                     />
                  </Form.Item>

                  <Form.Item
                     label="Welcome Back Message"
                     name="welcomeBackMessage"
                     rules={[
                        {
                           required: true,
                           message: "Please enter the welcome back message",
                        },
                     ]}
                  >
                     <TextArea
                        rows={4}
                        disabled={!enabled}
                        placeholder="👋 Welcome back, {{name}}!"
                     />
                  </Form.Item>

                  <Form.Item
                     label="Welcome Back After (Hours)"
                     name="welcomeBackAfterHours"
                     rules={[
                        {
                           required: true,
                           message: "Please enter the number of hours",
                        },
                     ]}
                  >
                     <InputNumber
                        min={1}
                        precision={0}
                        disabled={!enabled}
                        style={{ width: "100%" }}
                     />
                  </Form.Item>

                  <Form.Item>
                     <Button
                        type="primary"
                        htmlType="submit"
                        loading={saving}
                     >
                        Save Settings
                     </Button>
                  </Form.Item>
               </Form>
            </Spin>
         </Card>
      </div>
   );
}
