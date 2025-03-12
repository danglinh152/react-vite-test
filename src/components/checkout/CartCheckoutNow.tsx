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

const CartCheckoutNow = ({ bookId }: { bookId: number }) => {
  const { token } = useAuth();
  const [listOfBooks, setListOfBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  const fetchCartDetails = async (bookId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${bookId}`);
      const book = await response.json();
      setListOfBooks((prevBooks) => [...prevBooks, book.data]); // Giả sử mỗi response có thuộc tính data
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    fetchCartDetails(bookId); // Gọi hàm fetchCartDetails khi component được mount
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading
  }

  const handleDelete = (bookId: number) => {
    // Logic to delete book from cart
    console.log(`Delete book with ID: ${bookId}`);
    // Update state to remove the book from listOfBooks
    setListOfBooks((prevBooks) =>
      prevBooks.filter((book) => book.bookId !== bookId)
    );
  };

  return (
    <div>
      <h2>Danh Sách Sách Trong Giỏ Hàng</h2>
      <ul style={{ listStyleType: "none", padding: 10 }}>
        {listOfBooks.map((book) => (
          <li
            key={book.bookId}
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
              src={`http://localhost:8080/storage/upload/${book.image}`}
              alt={book.title}
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
              <h3>{book.title}</h3>
              <p>
                <b>Tác giả:</b> {book.author}
              </p>
              <p>
                <b>Giá bán:</b> {book.sellingPrice} VNĐ
              </p>
              <p>
                <b>Giá niêm yết:</b> {book.listPrice} VNĐ
              </p>
              <p>
                <b>Đánh giá trung bình:</b> {book.avgRate}
              </p>
              <p>
                <b>Số lượng:</b>{" "}
                <InputNumber
                  min={1}
                  max={book.quantity}
                  defaultValue={1}
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
                onClick={() => handleDelete(book.bookId)} // Call delete handler
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

export default CartCheckoutNow;
