import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Spin } from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { useAuth } from "../../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const { Title, Text } = Typography;

interface DecodedToken {
  userId: string;
  exp?: number;
  sub: string;
  email: string;
}

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  buyingAddress: string;
  createdAt: string;
  gender: string;
  lastName: string;
  phoneNumber: string;
  shippingAddress: string;
  activate: boolean;
}

const InfoClient: React.FC = () => {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  if (!token) {
    toast.error("Bạn cần đăng nhập để truy cập trang này.");
    return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
  }

  let decodedToken: DecodedToken;
  try {
    decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp === undefined || decodedToken.exp < currentTime) {
      toast.error(
        decodedToken.exp === undefined
          ? "Token không hợp lệ."
          : "Token đã hết hạn. Bạn cần đăng nhập lại."
      );
      return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
    }
  } catch (error) {
    toast.error("Có lỗi xảy ra khi xác thực token.");
    return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${decodedToken.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin người dùng.");
        }

        const json = await response.json();

        const user: UserInfo = {
          name: `${json.data.firstName} ${json.data.lastName}`,
          email: json.data.email,
          avatar: json.data.avatar,
          buyingAddress: json.data.buyingAddress,
          createdAt: json.data.createdAt,
          gender: json.data.gender,
          lastName: json.data.lastName,
          phoneNumber: json.data.phoneNumber,
          shippingAddress: json.data.shippingAddress,
          activate: json.data.activate,
        };

        setUserInfo(user);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div
      className="container"
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        className="card"
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          padding: "20px",
          width: "400px",
          height: "100%",
        }}
      >
        <img
          src={`http://localhost:8080/storage/upload/${userInfo?.avatar}`}
          alt="Avatar"
          className="avatar"
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            marginBottom: "20px",
          }}
        />
        <Title level={3} style={{ color: "#333" }}>
          {userInfo ? userInfo.name : "Tên người dùng"}
        </Title>
        <div className="text" style={{ marginBottom: "10px" }}>
          <Text>
            Phone: {userInfo ? userInfo.phoneNumber : "Số điện thoại"}
          </Text>
        </div>
        <div className="text" style={{ marginBottom: "10px" }}>
          <Text>Email: {userInfo ? userInfo.email : "Email người dùng"}</Text>
        </div>
        <div className="text" style={{ marginBottom: "10px" }}>
          <Text>Gender: {userInfo ? userInfo.gender : "Giới tính"}</Text>
        </div>
        <div className="text" style={{ marginBottom: "20px" }}>
          <Text>Created At: {userInfo ? userInfo.createdAt : "Ngày tạo"}</Text>
        </div>
        <Row className="social-icons" justify="center">
          <Col span={6}>
            <FacebookFilled
              className="icon"
              style={{ color: "#3b5998", fontSize: "24px" }}
            />
          </Col>
          <Col span={6}>
            <InstagramFilled
              className="icon"
              style={{ color: "#e1306c", fontSize: "24px" }}
            />
          </Col>
          <Col span={6}>
            <YoutubeFilled
              className="icon"
              style={{ color: "#ff0000", fontSize: "24px" }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default InfoClient;
