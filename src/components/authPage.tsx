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
import LoginChildren from "./formLogin";


const AuthPage: React.FC= () => {
  
    return (
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Tabs
          centered
          defaultActiveKey="1" // Dùng activeKey thay vì defaultActiveKey
          items={[
            {
              key: "1",
              label: "Login",
              children: <LoginChildren />, // Nội dung của Tab 1
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
        <Loader />
      </div>
    );
  };
  
  export default AuthPage;
  