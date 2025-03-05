import React from "react";
import { Col, Layout, Row } from "antd";
import "../../styles/myfooter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";

const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer >
      {/* <div className="footer-content">
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
      </div> */}
      <Row justify="space-between" gutter={16}>
        <Col span={5} style={{ color: "#787878", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <p style={{ fontWeight: "bold", transition: "color 0.3s" , padding: "10px 0"}} >Về công ty</p>
          <p className="hover-effect">Thông tin về công ty</p>
          <p className="hover-effect">Chính sách bảo mật</p>
          <p className="hover-effect">Liên hệ</p>
          <p className="hover-effect">Chính sách bảo mật</p>
          <p className="hover-effect">Chính sách đổi trả</p>

        </Col>
        
        <Col span={5} style={{ color: "#787878", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <p style={{ fontWeight: "bold", transition: "color 0.3s", padding: "10px 0"}} >Ưu đãi & tiện ích</p>
          <p className="hover-effect">Giảm giá đặc biệt</p>
          <p className="hover-effect">Quà tặng hấp dẫn</p>
        </Col>

        <Col span={5} style={{ color: "#787878", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <p style={{ fontWeight: "bold", transition: "color 0.3s", padding: "10px 0" }} >Tài khoản của tôi</p>
          <p className="hover-effect">Đăng nhập/Tạo mới tài khoản</p>
          <p className="hover-effect">Thay đổi địa chỉ khách hàng</p>
          <p className="hover-effect">Chi tiết tài khoản</p>
          <p className="hover-effect">Lịch sử mua hàng</p>

        </Col>

        <Col span={5} style={{ color: "#787878", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <p style={{ fontWeight: "bold", transition: "color 0.3s" , padding: "10px 0"}} >Liên hệ hỗ trợ</p>
          <p className="hover-effect">Hotline: 1900 1234</p>
          <p className="hover-effect">Email: cskh@s1007.com.vn</p>
          <p className="hover-effect">Câu hỏi thường gặp</p>
        </Col>
      </Row>
      <p style={{display:"flex",justifyContent:"center",paddingTop:12,fontWeight:600,color:"rgba(0,0,0,0.3)" }}>
      <FontAwesomeIcon icon={faMapLocation} />
            Tòa nhà S10.07 Vinhomes GrandPark, phường Long Bình, TP.Thủ Đức,
            TP.HCM
      </p>
    </Footer>
  );
};

export default MyFooter;
