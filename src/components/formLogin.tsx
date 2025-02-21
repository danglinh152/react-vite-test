import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";

type FieldType = {
  username: string;
  password: string;
  //   remember?: string;
};

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

const FormLogin: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
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
    >
      <Input.Password />
    </Form.Item>

    {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default FormLogin;
