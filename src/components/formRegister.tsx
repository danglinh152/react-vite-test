import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Radio, Tabs } from "antd";
import Loader from "./loader";
import {
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { toast, ToastContainer } from "react-toastify";
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


const RegisterChildren = () => {
    const [listUser, setListUser] = useState<User[]>([]);
    const [form] = Form.useForm();
  
    const handleAddUser = async (values: any) => {
      try {
        const newValues = {
          ...values,
          role: { roleId: values.role },
        };
  
        const response = await fetch(`http://localhost:8080/api/users`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValues),
        });
  
  
        if (!response.ok) {
          const errorJson = await response.json();
          if(errorJson){
            
          }
          console.log(errorJson.message)
          toast.error(errorJson.message || "Registration failed");
        }else{
            const json = await response.json();
            setListUser((prev) => [...prev, json.data]);
            toast.success("User registered successfully!");
            console.log("User registered successfully!")
            form.resetFields();
        }
      }catch (error) {
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
      style={{ maxWidth: 600,marginRight:24,minWidth:400 }}
      initialValues={{ remember: true, roleId: 1 }}
      autoComplete="off"
      onFinish={handleAddUser}
    >
      <Form.Item
        label="FirstName"
        name="firstName"
        rules={[{ required: true, message: "Please input your firstName!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      label="LastName"
      name="lastName"
      rules={[{ required: true, message: "Please input your lastname!" }]}
    >
      <Input />
    </Form.Item>
      
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone No."
          name="phoneNumber"
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true }]}
          style={{ marginBottom: 5 }}
        >
          <Radio.Group>
            <Radio value="MALE">MALE</Radio>
            <Radio value="FEMALE">FEMALE</Radio>
          </Radio.Group>
        </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="role" hidden>
      <Input />
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
    
    )
  }
  
export default RegisterChildren;