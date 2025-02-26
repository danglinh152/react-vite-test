import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Radio, Tabs } from "antd";
import Loader from "./loader";
import {
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { toast, ToastContainer } from "react-toastify";
import RegisterChildren from "./formRegister";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username: string;
  password: string;
  //   remember?: string;
};

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  username: string;
  role: { roleId: number };
}



const LoginChildren = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Kiểm tra token sau khi đăng nhập thành công
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("access_token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      console.log("dm");
      
    }
  }, [token]);

  const Login = async (username: string, password: string, navigate: (path: string) => void) => {
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
      console.log("Đăng nhập thành công", json);
  
      // Lưu token vào localStorage hoặc sessionStorage
      localStorage.setItem("access_token", json.access_token);
      setToken(json.access_token);
      // Điều hướng đến /user
      navigate("/")
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    Login(values.username, values.password, navigate);
  };
  
    
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600,marginRight:24,minWidth:400 }}
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
    <a style={{ float: 'right'}} href="">
            Forgot password
    </a>
    {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default LoginChildren;


