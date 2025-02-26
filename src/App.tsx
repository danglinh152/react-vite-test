import React, { useState, useEffect } from "react";
import {
  BookOutlined,
  DiffOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./provider/authProvider";

const { Header, Sider } = Layout;

interface User {
  firstName: string;
  lastName: string;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const refreshToken = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/auth/refresh`, {
        method: "GET", // Đảm bảo phương thức là GET
        credentials: "include", // Gửi cookie tự động
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Response status: ${response.status}, Message: ${errorMessage}`
        );
      }

      const json = await response.json();
      localStorage.setItem("access_token", json.data.access_token);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  const getAccount = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/auth/get-account`, {
        method: "GET", // Đảm bảo phương thức là GET
        credentials: "include", // Gửi cookie tự động
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Response status: ${response.status}, Message: ${errorMessage}`
        );
      }

      const json = await response.json();
      const newObject = {
        firstName: json.data.firstName,
        lastName: json.data.lastName,
      };

      setUser(newObject);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  useEffect(() => {
    getAccount();
    refreshToken();

    switch (location.pathname) {
      case "/admin/":
        setCurrPage(1);
        break;
      case "/admin/book":
        setCurrPage(2);
        break;
      case "/admin/order":
        setCurrPage(3);
        break;
      default:
        setCurrPage(1);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Gửi token để xác thực
        },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi logout");
      }

      localStorage.removeItem("access_token");

      navigate("/auth");
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label:
        (user?.firstName ?? "") + " " + (user?.lastName ?? "") ||
        "Chưa Đăng Nhập",
      disabled: false,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ height: "98vh" }}>
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

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ borderRadius: "15px" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currPage.toString()]}
          style={{ borderRadius: "15px" }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/admin/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/admin/book">Book</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DiffOutlined />}>
            <Link to="/admin/order">Order</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
            </a>
          </Dropdown>
        </Header>

        <div
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "87vh",
            background: "transparent",
            borderRadius: "20px",
          }}
        >
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
