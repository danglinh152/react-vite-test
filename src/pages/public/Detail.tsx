import { Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons";

interface Book {
  bookId: number;
  title: string;
  image: string;
  author: string;
  isbn: string;
  avgRate: number;
  description: string;
  descriptionDetails: string;
  infoDetails: string;
  listPrice: number;
  sellingPrice: number;
  quantity: number;
}

const Detail = () => {
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL
  const [book, setBook] = useState<Book | null>(null);

  const fetchBookById = async (id: string | undefined) => {
    if (!id) {
      console.error("No book ID provided");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      const data = json.data;

      console.log("Data from API:", data); // Log the data received from the API

      // Destructure properties from data and set the state
      if (data) {
        const {
          bookId,
          title,
          image,
          author,
          isbn,
          avgRate,
          description,
          descriptionDetails,
          infoDetails,
          listPrice,
          sellingPrice,
          quantity,
        } = data;

        setBook({
          bookId,
          title,
          image,
          author,
          isbn,
          avgRate,
          description,
          descriptionDetails,
          infoDetails,
          listPrice,
          sellingPrice,
          quantity,
        });
      } else {
        console.error("No data found for the given ID");
      }
    } catch (error) {
      console.error("Failed to fetch book:", error);
    }
  };

  useEffect(() => {
    fetchBookById(id);
  }, [id]); // Add id to dependency array to re-fetch when id changes

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          style={{
            flex: 3,
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "20px",
            position: "sticky",
            top: 60,
            alignSelf: "flex-start",
          }}
        >
          {book ? (
            <>
              <img
                src={`http://localhost:8080/storage/upload/${book.image}`}
                alt={book.title}
                style={{ height: "450px", width: "450px", objectFit: "cover" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "15px 0",
                }}
              >
                <Button
                  danger
                  variant="outlined"
                  style={{ flex: 1, marginRight: "5px" }} // Add flex and margin to the right
                >
                  <ShoppingCartOutlined />
                  <b>Thêm vào giỏ hàng</b>
                </Button>
                <Button
                  type="primary"
                  style={{ flex: 1, backgroundColor: "red", marginLeft: "5px" }} // Add flex and margin to the left
                >
                  <b>Mua ngay</b>
                </Button>
              </div>

              <div style={{ margin: "30px 0" }}>
                <b style={{ fontSize: "16px" }}>
                  Chính sách ưu đãi của S10.07 STORE
                </b>
                <div style={{ margin: "10px 0" }}>
                  <p>
                    <b>Thời gian giao hàng</b>: Giao hàng nhanh và uy tín
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <b>Chính sách đổi trả</b>: Đổi trả miễn phí toàn quốc
                  </p>
                  <p>
                    <b>Chính sách khách sỉ</b>: Ưu đãi khi mua số lượng lớn
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading book details...</p>
          )}
        </div>
        <div
          style={{
            flex: 7,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: "White",
              borderRadius: "20px",
              padding: "10px 30px",
              fontSize: "17px",
            }}
          >
            <h2>{book ? book.title : "Loading..."}</h2>
            <p>
              <b>Tác giả:</b> {book ? book.author : "Loading..."}
            </p>
            <p style={{ marginTop: "10px" }}>
              <b>ISBN:</b> {book ? book.isbn : "Loading..."}
            </p>
            <p style={{ marginTop: "10px" }}>
              <b>Đánh giá:</b> {book ? book.avgRate : "Loading..."}
              <StarFilled style={{ marginLeft: "5px", color: "#efb943" }} />
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "red",
                  margin: "10px 10px 10px 0",
                  fontSize: "30px",
                  fontWeight: "500",
                }}
              >
                {book
                  ? (book.sellingPrice / 1000).toLocaleString("en-US", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    }) + "đ"
                  : "Loading..."}
              </p>
              <s>
                {book
                  ? (book.listPrice / 1000).toLocaleString("en-US", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    }) + "đ"
                  : "Loading..."}
              </s>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "White",
              borderRadius: "20px",
              padding: "10px 30px",
            }}
          >
            <h2>Thông tin sản phẩm</h2>
          </div>
          <div
            style={{
              backgroundColor: "White",
              borderRadius: "20px",
              padding: "10px 30px",
            }}
          >
            <h2>Thông tin chi tiết</h2>

            <div
              dangerouslySetInnerHTML={{ __html: book?.infoDetails ?? "" }}
            />
          </div>
          <div
            style={{
              backgroundColor: "White",
              borderRadius: "20px",
              padding: "10px 30px",
            }}
          >
            <h2>Mô tả sản phẩm</h2>
            <p style={{ lineHeight: 1.8 }}>
              {book ? book.description : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
