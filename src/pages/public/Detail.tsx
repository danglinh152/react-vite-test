import { Button, Input, Tabs, Rate } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import NewestFeedback from "./NewestFeedback";
import TopFeedback from "./TopFeedback";
import AllProduct from "../../components/card/AllProduct";
import { useAuth } from "../../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

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
  const [expand, setExpand] = useState<boolean>(false);
  const [decodedToken, setDecodedToken] = useState<any | null>(null);
  const { token } = useAuth();
  const [feedbackText, setFeedbackText] = useState<string>(""); // State for feedback text
  const [rating, setRating] = useState<number>(0);
  const [refreshFeedbacks, setRefreshFeedbacks] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNewFeedback = () => {
    setRefreshFeedbacks((prev) => !prev); // Toggle to trigger re-fetch
  };

  const handleAddToCart: any = async () => {
    if (!decodedToken) {
      toast.error("Bạn cần đăng nhập để mua hàng.");
      // setTimeout(() => {
      //   navigate("/auth");
      // }, 2000);
    } else {
      try {
        const response = await fetch(`http://localhost:8080/api/add-to-cart`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: decodedToken.userId,
            bookId: id,
          }),
        });

        console.log(response);

        toast.success("Đã thêm vào giỏ hàng!"); // Confirmation message
      } catch (error) {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại."); // Improved error message
      }
    }
  };

  const handleBuyNow = () => {
    navigate(`/check-out-now/${id}`);
  };

  const fetchBookById = async (id: string | undefined) => {
    if (!id) {
      console.error("No book ID provided");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      const data = json.data;

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

  const expandDesc = () => {
    const block = document.getElementById("desc-block");

    if (block) {
      // Toggle height based on the current state
      block.style.height = expand ? "160px" : ""; // Set height or reset it
      setExpand(!expand); // Toggle the expand state
    }
  };

  const handleAddFeedback = async () => {
    if (!feedbackText) {
      alert("Vui lòng nhập nhận xét và đánh giá."); // Alert if fields are empty
      return;
    }

    const feedbackValue = {
      feedback: feedbackText,
      rate: rating,
      book: { bookId: book?.bookId }, // Get bookId from the book state
      user: { userId: decodedToken?.userId }, // Get userId from decoded token
    };

    try {
      const response = await fetch(`http://localhost:8080/api/feedbacks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackValue),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      // Reset the input fields after successful submission
      setFeedbackText("");
      setRating(0);
      handleNewFeedback();
      toast.success("Cảm ơn bạn đã gửi nhận xét!"); // Confirmation message
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại."); // Improved error message
    }
  };

  useEffect(() => {
    fetchBookById(id);

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

      // Kiểm tra xem exp có tồn tại không
      if (decodedToken.exp === undefined) {
        setDecodedToken(null);
      } else {
        if (decodedToken.exp < currentTime) {
          // Token đã hết hạn
          setDecodedToken(null);
        }
      }
      setDecodedToken(decodedToken);
    }
  }, [id, token]); // Add token to dependency array to decode when it changes

  return (
    <>
      <ToastContainer
        position="top-center" // Change to top-left or top-right as needed
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        draggablePercent={60}
        theme="colored"
      />

      <div style={{ display: "flex", gap: "20px" }}>
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
                  onClick={handleAddToCart}
                >
                  <ShoppingCartOutlined />
                  <b>Thêm vào giỏ hàng</b>
                </Button>
                <Button
                  type="primary"
                  style={{ flex: 1, backgroundColor: "red", marginLeft: "5px" }} // Add flex and margin to the left
                  onClick={handleBuyNow}
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

            <div style={{ display: "flex", alignItems: "center" }}>
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
            id="container-detail"
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "10px 30px",
            }}
          >
            <div
              id="desc-block"
              style={{
                height: "160px", // Adjust height based on state
                overflow: "hidden",
              }}
            >
              <h2>Mô tả sản phẩm</h2>

              <p style={{ lineHeight: 1.8 }}>
                {book ? book.description : "Loading..."}
              </p>
            </div>
            <div className="mt-2">
              <Button
                style={{
                  border: "none",
                  margin: "0 auto",
                  display: "block",
                  color: "black",
                  fontWeight: "500",
                  fontStyle: "italic",
                }}
                onClick={expandDesc}
              >
                {expand ? "Thu gọn..." : "Mở Rộng..."}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "White",
          margin: "20px 0",
          borderRadius: "20px",
          padding: "10px 30px",
        }}
      >
        <h2>Đánh giá sản phẩm</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 5 }}>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Mới nhất",
                  children: (
                    <NewestFeedback bookId={id} refresh={refreshFeedbacks} />
                  ),
                },
                {
                  key: "2",
                  label: "Yêu thích nhất",
                  children: (
                    <TopFeedback bookId={id} refresh={refreshFeedbacks} />
                  ),
                },
              ]}
            />
          </div>
          <div style={{ flex: 5 }}>
            {decodedToken ? (
              <div>
                <Input.TextArea
                  rows={4}
                  placeholder="Nhập nhận xét của bạn..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)} // Update feedback text
                  style={{ borderRadius: "10px" }}
                />
                <Rate
                  onChange={setRating} // Update rating
                  value={rating}
                  style={{ marginTop: "10px" }}
                />
                <Button
                  type="primary"
                  style={{ margin: "10px 0 0 15px" }}
                  onClick={handleAddFeedback}
                >
                  Gửi nhận xét
                </Button>
              </div>
            ) : (
              <p style={{ color: "red", marginTop: "20px" }}>
                Bạn hãy đăng nhập/đăng ký để có thể nhận xét sản phẩm.
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "relative", // Change to relative for proper layout
          borderRadius: "20px",
          overflow: "hidden", // Ensures content is contained within the border radius
          backgroundImage:
            "url('https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/banner_personalization.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "20px", // Add padding for spacing
          minHeight: "300px", // Ensure a minimum height for the container
        }}
      >
        <div
          style={{
            position: "relative", // Keep this relative for child positioning
            marginTop: "150px", // Adjust margin instead of top for better control
            zIndex: 1, // Ensure it appears above the background
          }}
        >
          <AllProduct />
        </div>
      </div>
    </>
  );
};

export default Detail;
