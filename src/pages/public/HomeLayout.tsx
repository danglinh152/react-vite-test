import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Row,
  theme,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Input } from "antd";
import type { GetProps, MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBoxesPacking,
  faCartPlus,
  faCircleInfo,
  faGift,
  faHeadset,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import MyFooter from "../../components/layout/MyFooter";
import HoverTable from "../../components/hoverCategory/hoverCategory";
import { ShoppingCart } from "lucide-react";

interface User {
  firstName: string;
  lastName: string;
  avatar: string;
}

const { Header, Content } = Layout;

const HomeLayout: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:8080/auth/refresh", {
        method: "GET",
        credentials: "include",
      });

      // Kiểm tra xem phản hồi có hợp lệ không
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Response status: ${response.status}, Message: ${errorMessage}`
        );
      }

      const json = await response.json();
      localStorage.setItem("access_token", json.data.access_token);
      return true; // Trả về true nếu thành công
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false; // Trả về false nếu có lỗi
    }
  };

  const getAccount = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8080/auth/get-account", {
        method: "GET",
        credentials: "include",
      });

      // if (!response.ok) {
      //   const errorMessage = await response.text();
      //   throw new Error(
      //     `Response status: ${response.status}, Message: ${errorMessage}`
      //   );
      // }

      const json = await response.json();
      console.log(json);

      const newObject = {
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        avatar: json.data.avatar,
      };

      setUser(newObject);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshToken(); // Chờ cho refreshToken hoàn thành
        await getAccount(); // Sau đó mới gọi getAccount
      } catch (error) {
        console.error("Error during fetching data:", error);
      }
    };

    fetchData();

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
        setSelectedKey(0);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

  const items: MenuProps["items"] =
    user?.firstName && user?.lastName
      ? [
          {
            key: "avatar",
            label: (
              <img
                src={`http://localhost:8080/storage/upload/${user.avatar}`}
                alt="User Avatar"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  marginBottom: "10px",
                  objectFit: "cover",
                }}
              />
            ),
            disabled: false,
          },
          {
            type: "divider",
          },
          {
            key: "1",
            label: (
              <Link to={"information"}>
                {user.firstName} {user.lastName}
              </Link>
            ),
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
        ]
      : [
          {
            key: "login",
            label: "Log In",
            onClick: () => navigate("/auth"),
          },
        ];

  return (
    <Layout>
      <div style={{ position: "sticky", top: 0, zIndex: 2, width: "100%" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="logo">
            <img
              src="http://localhost:8080/storage/upload/logo.png"
              onClick={() => navigate(`/`)}
              style={{ height: 100, cursor: "pointer" }}
              alt=""
            />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey.toString()]}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faBell}
              style={{
                cursor: "pointer",
                color: "white",
                fontSize: 16,
                marginLeft: 32,
              }}
            />
            <ShoppingCart
              style={{
                cursor: "pointer",
                color: "white",
                width: 28,
                height: 28,
                marginLeft: 32,
              }}
              onClick={() => navigate("/cart")}
            />
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                    color: "white",
                  }}
                />
              </a>
            </Dropdown>
          </div>
        </Header>
        <div
          style={{
            background: "#f0f2f5",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Row justify="space-between" gutter={16}>
            <Col span={7}>
              {" "}
              <div
                style={{
                  color: "#787878",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: 50,
                }}
              >
                <FontAwesomeIcon icon={faList} />
                Danh mục sản phẩm
              </div>
            </Col>
            <Col
              span={17}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Col
                span={3}
                style={{
                  color: "#787878",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon icon={faCircleInfo} />
                Trợ giúp
              </Col>
              <Col
                span={5}
                style={{
                  color: "#787878",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon icon={faGift} />
                Ưu đãi & tiện ích
              </Col>
              <Col
                span={5}
                style={{
                  color: "#787878",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon icon={faBoxesPacking} />
                Kiểm tra đơn hàng
              </Col>
              <Col
                span={5}
                style={{
                  color: "#787878",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon icon={faHeadset} />
                Hotline: 1900 1234
              </Col>
            </Col>
          </Row>
        </div>
      </div>
      <Content style={{ minHeight: "100vh", padding: 0, paddingBottom: 20 }}>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <MyFooter />
    </Layout>
  );
};

export default HomeLayout;
