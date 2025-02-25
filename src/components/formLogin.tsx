import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Radio, Tabs } from "antd";
import Loader from "./loader";
import {
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { toast, ToastContainer } from "react-toastify";
import RegisterChildren from "./formRegister";

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

const Login = async (username: string, password: string) => {
  const url = "http://localhost:8080/auth/sign-in"; // Your API endpoint
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ username: username, password: password }),
      credentials: "include", // Include credentials (cookies)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    window.location.replace("/");
    console.log("dang nhap thanh cong", json);
  } catch (error) {
    console.log(error);
  }
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  Login(values.username, values.password);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginChildren = () => {
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


