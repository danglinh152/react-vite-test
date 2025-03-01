import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";

const ForgotPasswd = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const handleGetOTP = async (values: any) => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/forgot-passwd?email=${values.email}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorJson = await response.json();
        toast.error(errorJson.message || "Failed to send OTP");
        console.log(errorJson.message);
      } else {
        toast.success("OTP sent successfully!");
        setEmail(values.email); // Lưu email để sử dụng khi xác minh OTP
        setIsModalVisible(true); // Hiển thị dialog nhập OTP
        form.resetFields(); // Nếu cần thiết
      }
    } catch (error) {
      toast.error("An unknown error occurred");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/verify-otp?email=${email}&otp=${otp}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        toast.error("OTP verification failed");
      } else {
        toast.success(
          "OTP verified successfully! You can now update your password."
        );
        setIsModalVisible(false); // Đóng dialog
        // Có thể thêm logic chuyển hướng đến trang cập nhật mật khẩu ở đây
      }
    } catch (error) {
      toast.error("An unknown error occurred");
      console.error(error);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginRight: 24, minWidth: 400 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleGetOTP}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Enter OTP"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleVerifyOtp}>
            Verify OTP
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter your OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        style={{
          marginTop: 60,
        }}
      />
    </>
  );
};

export default ForgotPasswd;
