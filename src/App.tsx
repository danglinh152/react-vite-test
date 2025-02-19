import React, { useState, useEffect } from "react";
import {
  BookOutlined,
  CalculatorOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const location = useLocation(); // Get the current location

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const Login = async () => {
    const url = "http://localhost:8080/auth/sign-in"; // Your API endpoint
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const account = {
      username: "danglinh152",
      password: "admin",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(account),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      localStorage.setItem("access_token", json.data.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Login();
    // Set current page based on the URL
    switch (location.pathname) {
      case "/":
        setCurrPage(1);
        break;
      case "/book":
        setCurrPage(2);
        break;
      default:
        setCurrPage(1);
    }
  }, [location]);

  return (
    <Layout style={{ height: "98vh" }}>
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
          selectedKeys={[currPage.toString()]} // Highlight the current page
          style={{ borderRadius: "15px" }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/book">Book</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
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
