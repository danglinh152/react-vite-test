import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { toast } from "react-toastify"; // Import ToastMessage
import App from "../App";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // Kiểm tra xem người dùng đã xác thực chưa
  if (token === undefined || !token) {
    // Hiển thị thông báo Toast
    toast.error("Bạn cần đăng nhập để truy cập trang này.");

    // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
    return <Navigate to="/auth" state={{ fromProtectedRoute: true }} />;
  }

  // Nếu đã xác thực, render các route con
  return <App />;
};
