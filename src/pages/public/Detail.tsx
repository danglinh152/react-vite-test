import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams<{ id: string }>(); // Lấy tham số id từ URL

  const fetchBookById = async (id: string | undefined) => {
    const response = await fetch(`http://localhost:8080/api/books/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    fetchBookById(id);
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ backgroundColor: "red", height: "100vh" }}>
          <img src="" alt="bookimage" />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button>Thêm vào giỏ hàng</button>
            <button>Mua ngay</button>
          </div>
          <b>Chính sách ưu đãi của S10.07 STORE</b>
          <div>
            <p>
              <b>Thời gian giao hàng</b>: Giao hàng nhanh và uy tín
            </p>
            <p>
              <b>Chính sách đổi trả</b>: Đổi trả miễn phí toàn quốc
            </p>
            <p>
              <b>Chính sách khách sỉ</b>: Ưu đãi khi mua số lượng lớn
            </p>
          </div>
        </div>
        <div style={{ backgroundColor: "red" }}>
          <h2>Shaman King - Tập 12 - Bìa Đôi</h2>
        </div>
      </div>
    </>
  );
};

export default Detail;
