import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { useAuth } from "../../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useState } from "react";
const InfoClient = () => {
  const { token } = useAuth();

  if (!token) {
    // Hiển thị thông báo Toast
    toast.error("Bạn cần đăng nhập để truy cập trang này.");
    return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
  }

  try {
    var decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

    // Kiểm tra xem exp có tồn tại không
    if (decodedToken.exp === undefined) {
      toast.error("Token không hợp lệ.");
      return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
    }

    if (decodedToken.exp < currentTime) {
      // Token đã hết hạn
      toast.error("Token đã hết hạn. Bạn cần đăng nhập lại.");
      return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
    }
    // Kiểm tra vai trò có phải admin không
  } catch (error) {
    // Nếu có lỗi khi giải mã token
    toast.error("Có lỗi xảy ra khi xác thực token.");
    return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
  }

  return decodedToken ? decodedToken.sub : "information page";
};

export default InfoClient;
