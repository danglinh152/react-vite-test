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
import "../../styles/information.scss";

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
  }, [decodedToken.userId, token]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <Card className="card">
        <img src={`http://localhost:8080/storage/upload/${userInfo?.avatar}`} alt="Avatar" className="avatar" />
        <Title level={3}>{userInfo ? userInfo.name : "Tên người dùng"}</Title>
        <div className="text">
          <Text>Phone: {userInfo ? userInfo.phoneNumber : "Số điện thoại"}</Text>
        </div>
        <div className="text">
          <Text>Email: {userInfo ? userInfo.email : "Email người dùng"}</Text>
        </div>
        <div className="text">
          <Text>Gender: {userInfo ? userInfo.gender : "Giới tính"}</Text>
        </div>
        <div className="text">
          <Text>Created At: {userInfo ? userInfo.createdAt : "Ngày tạo"}</Text>
        </div>
        <Row className="social-icons">
          <Col span={8}>
            <FacebookFilled className="icon" style={{ color: "#3b5998" }} />
          </Col>
          <Col span={8}>
            <InstagramFilled className="icon" style={{ color: "#e1306c" }} />
          </Col>
          <Col span={8}>
            <YoutubeFilled className="icon" style={{ color: "#ff0000" }} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default InfoClient;
