import React from "react";
import { Layout } from "antd";
import "../../styles/myfooter.scss";

const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer className="my-footer">
      <div className="footer-content">
        <div className="footer-address">
          <p>
            Tòa nhà S10.07 Vinhomes GrandPark, phường Long Bình, TP.Thủ Đức,
            TP.HCM
          </p>
        </div>
        <hr className="footer-divider" />
        <div className="footer-links">
          <div className="service-section">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Dịch Vụ</p>
            <div className="links">
              <p>Điều khoản sử dụng</p>
              <p>Chính sách của chúng tôi</p>
            </div>
          </div>
          <div className="support-section">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Hỗ Trợ</p>
            <div className="links">
              <p>Liên hệ hỗ trợ</p>
              <p>Câu hỏi thường gặp</p>
            </div>
          </div>
          <div className="account-section">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Tài Khoản Của Tôi</p>
            <div className="links">
              <p>Đăng nhập</p>
              <p>Đăng ký</p>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;
