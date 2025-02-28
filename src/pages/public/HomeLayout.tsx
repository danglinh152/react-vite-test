import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

const { Header, Content, Footer } = Layout;

const HomeLayout: React.FC = () => {
  const location = useLocation(); // Use useLocation to get the current pathname

  // Use state to track the selected tab
  const [selectedKey, setSelectedKey] = useState(1);

  // Effect to update selectedKey based on current path
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey(1);
        break;
      case "/adventure":
        setSelectedKey(2);
        break;
      case "/about-us":
        setSelectedKey(3);
        break;
      default:
        setSelectedKey(1);
    }
  }, [location]); // Re-run effect when location changes

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey.toString()]} // Set the selected key to the state
          style={{ flex: 1, minWidth: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/">Trang Chủ</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/adventure">Phiêu Lưu</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/about-us">Về Chúng Tôi</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          minHeight: "100vh",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            // borderRadius: "20px",
            backgroundColor: "#f0f0f0",
            padding: "0 100px",
            // backgroundColor: "red",
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          borderTop: "1px solid #e8e8e8",
          width: "100%",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} S10.07 BookStore
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
