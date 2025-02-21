import React, { useState, useEffect } from "react";
import {
  BookOutlined,
  DiffOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const { Header, Sider } = Layout;

interface User {
  firstName: string;
  lastName: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

    switch (location.pathname) {
      case "/":
        setCurrPage(1);
        break;
      case "/book":
        setCurrPage(2);
        break;
      case "/order":
        setCurrPage(3);
        break;
      default:
        setCurrPage(1);
    }
  }, [location]);

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
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/book">Book</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DiffOutlined />}>
            <Link to="/order">Order</Link>
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
