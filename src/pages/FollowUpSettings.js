import { useEffect, useState } from "react";
import {
   Card,
   Form,
   Input,
   InputNumber,
   Button,
   message,
   Spin,
   Switch
} from "antd";

import {
   getFollowUpSetting,
   updateFollowUpSetting
} from "../services/followUpSettingService";

const { TextArea } = Input;

export default function FollowUpSettings() {

   const [form] = Form.useForm();

   const [loading, setLoading] =
      useState(false);

   const [saving, setSaving] =
      useState(false);

   useEffect(() => {
      loadSettings();
   }, []);

   const loadSettings = async () => {

      try {

         setLoading(true);

         const data =
            await getFollowUpSetting();

         form.setFieldsValue({
            message: data.message,
            initialDelayHours:
               data.initialDelayHours,
            repeatEveryHours:
               data.repeatEveryHours,
            enabled: data.enabled
         });

      } catch (err) {

         console.error(err);

         message.error(
            "Failed to load settings"
         );

      } finally {

         setLoading(false);
      }
   };

   const handleSubmit =
      async (values) => {

         try {

            setSaving(true);

            await updateFollowUpSetting(
               values
            );

            message.success(
               "Settings saved successfully"
            );

         } catch (err) {

            console.error(err);

            message.error(
               "Failed to save settings"
            );

         } finally {

            setSaving(false);
         }
      };

   return (
      <div
         style={{
            padding: 20
         }}
      >
         <Card
            title="Follow-Up Settings"
         >

            <Spin spinning={loading}>



               <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
               >

                  <Form.Item
                     label="Enable Follow-up System"
                     name="enabled"
                     valuePropName="checked"
                  >
                     <Switch
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                     />
                  </Form.Item>
                  <Form.Item
                     label="Reminder Message"
                     name="message"
                     rules={[
                        {
                           required: true,
                           message:
                              "Please enter reminder message"
                        }
                     ]}
                  >
                     <TextArea
                        rows={5}
                        disabled={!Form.useWatch("enabled", form)}
                        placeholder="Enter reminder message"
                     />
                  </Form.Item>

                  <Form.Item
                     label="Initial Delay (Hours)"
                     name="initialDelayHours"
                     rules={[
                        {
                           required: true
                        }
                     ]}
                  >
                     <InputNumber
                        disabled={!Form.useWatch("enabled", form)}
                        min={0.01}
                        step={0.01}

                        style={{
                           width: "100%"
                        }}
                     />
                  </Form.Item>

                  <Form.Item
                     label="Repeat Every (Hours)"
                     name="repeatEveryHours"
                     rules={[
                        {
                           required: true
                        }
                     ]}
                  >
                     <InputNumber
                        disabled={!Form.useWatch("enabled", form)}
                        min={0.01}
                        step={0.01}

                        style={{
                           width: "100%"
                        }}
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