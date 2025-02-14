import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import React, { useState, useEffect } from "react";
import {
  CalculatorOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Todolist from "./pages/todolist.tsx";
import Counter from "./pages/counter.tsx";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const location = useLocation(); // Get the current location

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // Set current page based on the URL
    switch (location.pathname) {
      case "/":
        setCurrPage(1);
        break;
      case "/todo":
        setCurrPage(2);
        break;
      case "/counter":
        setCurrPage(3);
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
          <Menu.Item key="2" icon={<OrderedListOutlined />}>
            <Link to="/todo">To Do List</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CalculatorOutlined />}>
            <Link to="/counter">Counter</Link>
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/todo",
        element: <Todolist />,
      },
      {
        path: "/counter",
        element: <Counter />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
