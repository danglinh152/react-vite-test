import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

type FieldType = {
  username: string;
  password: string;
};

const LoginChildren = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const Login = async (username: string, password: string) => {
    const url = "http://localhost:8080/auth/sign-in";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include credentials (cookies)
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      // Save token to localStorage and update state
      localStorage.setItem("access_token", json.data.access_token);
      setToken(json.data.access_token); // Update token immediately

      // Decode the token to check the role
      const decodedToken = jwtDecode(json.data.access_token);

      // Check if the user is an admin
      if (decodedToken.authorities === "admin") {
        navigate("/admin"); // Redirect to /admin if admin
      } else {
        navigate("/"); // Redirect to home for non-admins
      }
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    Login(values.username, values.password);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginRight: 24, minWidth: 400 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        style={{ marginBottom: 12 }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginChildren;
