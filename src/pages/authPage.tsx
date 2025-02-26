import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Radio, Tabs } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import RegisterChildren from "../components/formRegister";
import LoginChildren from "../components/formLogin";
import Loader from "../components/loader";
import { useLocation } from "react-router-dom";

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
          ]}
        />
        <Loader />
      </div>
    </>
  );
};

export default AuthPage;
