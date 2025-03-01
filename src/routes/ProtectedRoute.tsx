// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { toast } from "react-toastify"; // Import ToastMessage
import LayoutAdmin from "../pages/admin/LayoutAdmin";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // Kiểm tra xem người dùng đã xác thực chưa
  if (!token) {
    // Hiển thị thông báo Toast
    toast.error("Bạn cần đăng nhập để truy cập trang này.");
    return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
  }

  // Kiểm tra xem token có hết hạn không
  try {
    const decodedToken = jwtDecode(token);
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
    if (decodedToken.authorities !== "admin") {
      toast.error("Bạn không có quyền truy cập trang này.");
      return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
    }
  } catch (error) {
    // Nếu có lỗi khi giải mã token
    toast.error("Có lỗi xảy ra khi xác thực token.");
    return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
  }

  // Nếu đã xác thực, render các route con
  return <LayoutAdmin />;
};
