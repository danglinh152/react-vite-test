import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Tabs } from "antd";
import Loader from "./loader";
import {
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

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
    <a style={{ float: 'right',marginTop: 12 }} href="">
            Forgot password
    </a>
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
  )
}

const RegisterChildren = () => {
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
  )
}




const FormLogin: React.FC = () => (
  <>
  <div className="container" style={{
    display: "flex",
    justifyContent: "center",  
    alignItems: "center",     
    height: "100vh",     
    // background: "#f0f2f5"      
  }}
  >
    <Tabs centered
    defaultActiveKey="1"
    items={[
      {
        key: "1",
        label: "Login",
        children:<LoginChildren />, // Nội dung của Tab 1
        icon: <LoginOutlined />,
      },
      
      {
        key: "2",
        label: "Register",
        children: <RegisterChildren />, // Nội dung của Tab 2
        icon: <UserAddOutlined />,
      },
    ]}
  />

  <Loader/>
  </div>
  </>
);

export default FormLogin;
