import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Radio, Tabs } from "antd";
import {
  LoginOutlined,
  QuestionCircleFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import LoginChildren from "../../components/auth/formLogin";
import { useLocation } from "react-router-dom";
import RegisterChildren from "../../components/auth/formRegister";
import Loader from "../../components/Loader";
import ForgotPasswd from "../../components/auth/formForgotPasswd";

const AuthPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Kiểm tra nếu có thông báo từ URL và chưa hiển thị toast
    if (location.state?.fromProtectedRoute) {
      toast.error("Bạn cần đăng nhập để truy cập trang này.");
      window.history.replaceState({}, "");
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
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
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Login",
              children: <LoginChildren />,
              icon: <LoginOutlined />,
            },
            {
              key: "2",
              label: "Register",
              children: <RegisterChildren />,
              icon: <UserAddOutlined />,
            },
            {
              key: "3",
              label: "Forgot Password",
              children: <ForgotPasswd />,
              icon: <QuestionCircleFilled />,
            },
          ]}
        />
        <Loader />
      </div>
    </>
  );
};

export default AuthPage;
