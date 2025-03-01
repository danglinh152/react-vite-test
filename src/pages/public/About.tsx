import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
const About = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
      }}
    >
      <h1 style={{ fontSize: "45px", color: "rgb(17 94 190)" }}>
        VỀ CHÚNG TÔI
      </h1>

      <div style={{ display: "flex", gap: "50px" }}>
        <div style={{ flex: 5, display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "#333",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <i>
              "Chào mừng bạn đến với S10.07, một trong những website bán sách
              online hàng đầu tại Việt Nam! Tại S10.07, chúng tôi tự hào mang
              đến cho bạn một kho tàng sách phong phú và đa dạng, từ những tác
              phẩm văn học kinh điển đến các cuốn sách mới nhất trên thị trường.
              Với giao diện thân thiện và dễ sử dụng, bạn có thể dễ dàng tìm
              kiếm và lựa chọn những cuốn sách yêu thích chỉ với vài cú click
              chuột. Chúng tôi cam kết cung cấp sản phẩm chất lượng cao với giá
              cả hợp lý, cùng nhiều chương trình khuyến mãi hấp dẫn dành cho
              khách hàng. Đội ngũ nhân viên nhiệt tình và chuyên nghiệp của
              S10.07 luôn sẵn sàng hỗ trợ bạn trong việc chọn lựa sách cũng như
              giải đáp mọi thắc mắc. Ngoài ra, S10.07 còn có dịch vụ giao hàng
              nhanh chóng và an toàn, đảm bảo bạn nhận được sách ngay tại nhà.
              Hãy truy cập S10.07 ngay hôm nay để khám phá thế giới sách thú vị
              và tìm cho mình những cuốn sách tuyệt vời nhất!"
            </i>
            <i
              style={{
                display: "block",
                margin: "20px 0 0 400px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Nhà Sách S10.07
            </i>
          </div>
        </div>
        <hr />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5572695031115!2d106.83709737512935!3d10.84515365792213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317521d28bd24323%3A0x6e003b0f1ab73e2f!2sOrigami%20Zen%20S10.07!5e0!3m2!1sen!2s!4v1740839621950!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: "0", flex: 5 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div
        style={{
          fontSize: "30px",
          display: "flex",
          gap: "10px",
          marginTop: "25px",
        }}
      >
        <a href="https://www.facebook.com/timetochilllllll">
          <FacebookFilled style={{ color: "blue" }} />
        </a>

        <a href="https://www.instagram.com/fahasa_official/">
          <InstagramFilled style={{ color: "brown" }} />
        </a>

        <a href="https://www.youtube.com/@noitinhyeubocdau">
          <YoutubeFilled style={{ color: "red" }} />
        </a>
      </div>
    </div>
  );
};

export default About;
