import { useEffect, useState } from "react";
import { useAuth } from "../../provider/authProvider";
import { Button, InputNumber, InputNumberProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// Định nghĩa kiểu cho chi tiết giỏ hàng
interface CartDetail {
  bookId: number; // Giả sử bookId là kiểu number
  quantity: number; // Giả sử quantity là kiểu number
  book: Book;
}

// Định nghĩa kiểu cho sách
interface Book {
  bookId: number;
  image: string;
  author: string;
  title: string;
  avgRate: number;
  isbn: string;
  sellingPrice: number;
  listPrice: number;
  quantity: number;
}

const CartCheckout = () => {
  const [listOfCartDetails, setListOfCartDetails] = useState<CartDetail[]>([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/carts/1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart details");
      }
      const json = await response.json();

      const cartDetails = json.data.listOfCartdetails; // Lưu trữ danh sách chi tiết giỏ hàng vào biến
      setListOfCartDetails(cartDetails); // Cập nhật state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart(); // Gọi hàm fetchCart khi component được mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading
  }

  return (
    <div>
      <h2>Danh Sách Sách Trong Giỏ Hàng</h2>
      <ul style={{ listStyleType: "none", padding: 10 }}>
        {listOfCartDetails.map((cartDetail) => (
          <li
            key={cartDetail.book.bookId}
            style={{
              display: "flex",
              gap: "100px",
              alignItems: "center",
              border: "1px solid #ccc",
              margin: "10px",
              borderRadius: "5px",
            }}
          >
            <img
              src={`http://localhost:8080/storage/upload/${cartDetail.book.image}`}
              alt={cartDetail.book.title}
              style={{ width: "200px", height: "200px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "16px",
                marginBottom: "25px",
              }}
            >
              <h3>{cartDetail.book.title}</h3>
              <p>
                <b>Tác giả:</b> {cartDetail.book.author}
              </p>
              <p>
                <b>Giá bán:</b> {cartDetail.book.sellingPrice} VNĐ
              </p>
              <p>
                <b>Giá niêm yết:</b> {cartDetail.book.listPrice} VNĐ
              </p>
              <p>
                <b>Đánh giá trung bình:</b> {cartDetail.book.avgRate}
              </p>
              <p>
                <b>Số lượng:</b>{" "}
                <InputNumber
                  min={1}
                  max={cartDetail.quantity}
                  defaultValue={cartDetail.quantity}
                  onChange={onChange}
                />
              </p>
            </div>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "100px",
              }}
            >
              <Button
                color="danger"
                variant="solid"
                style={{ fontWeight: "700" }}
                // onClick={handleSubmit}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartCheckout;
