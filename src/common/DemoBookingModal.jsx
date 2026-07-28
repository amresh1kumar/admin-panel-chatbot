import { useState } from "react";
import {
   Modal,
   Form,
   Input,
   DatePicker,
   TimePicker,
   Button,
   Row,
   Col,
   message,
} from "antd";
import dayjs from "dayjs";
import { createDemoBooking } from "../services/demoBookingService";

const { TextArea } = Input;

const DemoBookingModal = ({ open, onClose }) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (values) => {
      try {
         setLoading(true);

         const payload = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            company: values.company || "",
            preferredDate: values.preferredDate.format("YYYY-MM-DD"),
            preferredTime: values.preferredTime.format("hh:mm A"),
            message: values.message || "",
         };

         const res = await createDemoBooking(payload);

         message.success(
            res?.data?.message || "Demo booked successfully."
         );

         form.resetFields();
         onClose();
      } catch (error) {
         console.log("Axios Error:", error);
         console.log("Response:", error.response);
         console.log("Code:", error.code);
         console.log("Message:", error.message);
         message.error(
            error?.response?.data?.message || "Something went wrong."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal
         title={
            <h2 className="text-2xl font-bold">
               📅 Book a Demo
            </h2>
         }
         open={open}
         onCancel={() => {
            form.resetFields();
            onClose();
         }}
         footer={null}
         centered
         width={650}
         destroyOnClose
      >
         <p className="text-gray-500 mb-6">
            Fill in your details and we'll get in touch with you shortly.
         </p>

         <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
         >
            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     label="Full Name"
                     name="name"
                     rules={[
                        {
                           required: true,
                           message: "Please enter your name",
                        },
                     ]}
                  >
                     <Input placeholder="John Doe" size="large" />
                  </Form.Item>
               </Col>

               <Col span={12}>
                  <Form.Item
                     label="Company"
                     name="company"
                  >
                     <Input
                        placeholder="Company Name"
                        size="large"
                     />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     label="Email"
                     name="email"
                     rules={[
                        {
                           required: true,
                           type: "email",
                           message: "Enter valid email",
                        },
                     ]}
                  >
                     <Input
                        placeholder="john@example.com"
                        size="large"
                     />
                  </Form.Item>
               </Col>

               <Col span={12}>
                  <Form.Item
                     label="Phone Number"
                     name="phone"
                     rules={[
                        {
                           required: true,
                           message: "Please enter phone number",
                        },
                     ]}
                  >
                     <Input
                        placeholder="+91 9876543210"
                        size="large"
                     />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     label="Preferred Date"
                     name="preferredDate"
                     rules={[
                        {
                           required: true,
                           message: "Select a date",
                        },
                     ]}
                  >
                     <DatePicker
                        size="large"
                        className="w-full"
                        disabledDate={(current) =>
                           current &&
                           current < dayjs().startOf("day")
                        }
                     />
                  </Form.Item>
               </Col>

               <Col span={12}>
                  <Form.Item
                     label="Preferred Time"
                     name="preferredTime"
                     rules={[
                        {
                           required: true,
                           message: "Select a time",
                        },
                     ]}
                  >
                     <TimePicker
                        use12Hours
                        format="hh:mm A"
                        size="large"
                        className="w-full"
                     />
                  </Form.Item>
               </Col>
            </Row>

            <Form.Item
               label="Message"
               name="message"
            >
               <TextArea
                  rows={4}
                  placeholder="Tell us about your requirements..."
               />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
               <Button
                  size="large"
                  onClick={() => {
                     form.resetFields();
                     onClose();
                  }}
               >
                  Cancel
               </Button>

               <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
               >
                  Book Demo
               </Button>
            </div>
         </Form>
      </Modal>
   );
};

export default DemoBookingModal;