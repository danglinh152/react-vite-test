import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cardproduct.scss";
import { Pagination } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { s } from "framer-motion/client";
import { useAuth } from "../../provider/authProvider";
import { jwtDecode } from "jwt-decode";

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

const AllProduct = () => {
  const [listBook, setListBook] = useState<Book[]>([]);
  const [expand, setExpand] = useState<boolean>(false);
  const [decodedToken, setDecodedToken] = useState<any | null>(null);
  const { token } = useAuth();
    const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 12,
    totalPages: 0,
    total: 0,
  });

  const navigate = useNavigate();

  const fetchBooks = async () => {
    const response = await fetch(
      `http://localhost:8080/api/books?page=${meta.currentPage}&size=${meta.pageSize}`
    );
    const json = await response.json();

    setListBook(json.data.data);
    setMeta({
      currentPage: json.data.meta.currentPage,
      pageSize: json.data.meta.pageSize,
      totalPages: json.data.meta.totalPages,
      total: json.data.meta.total,
    });
  };

  useEffect(() => {
    fetchBooks();
  }, [meta.currentPage]); // Fetch books only when currentPage changes

  const handlePageChange = (page: number) => {
    setMeta((prevMeta) => ({ ...prevMeta, currentPage: page })); // Update currentPage
  };

  const handleAddToCart = async (bookId: number) => {
 
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
            } else {
              setDecodedToken(decodedToken);
            }
          }
        }
    if (!decodedToken) {
      toast.error("Bạn cần đăng nhập để mua hàng.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/add-to-cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: decodedToken.userId,
          bookId: bookId,
        }),
      });
      console.log(decodedToken.userId || "null");
      
      console.log("📡 API Response:", response);
  
      if (!response.ok) {
        const errorText = await response.text();
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }
  
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  

  
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
      <div className="card_container" style={{ marginBottom: 50 }}>
        {listBook.map((book) => (
          <div
            className="card"
            key={book.bookId}
            onClick={() => navigate(`/detail/${book.bookId}`)}
            style={{ cursor: "pointer", margin: "20px 10px" }}
          >
            <div
              className="card-img"
              style={{
                backgroundImage: `url(http://localhost:8080/storage/upload/${book.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="card-info">
              <p className="text-title">{book.title}</p>
              <p className="text-body">{book.author}</p>
            </div>
            <div className="card-footer">
              <div>
              <span className="text-listPrice">${book.listPrice}</span>
              <span className="text-sellprice">${book.sellingPrice}</span>
              </div>
              <div
                className="card-button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToCart(book.bookId)

                }}
              >
                <FontAwesomeIcon style={{ fontSize: 10 }} icon={faCartPlus} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          current={meta.currentPage}
          pageSize={meta.pageSize}
          total={meta.total}
          onChange={handlePageChange} // Handle page change
          showSizeChanger={false} // Optional: Hide page size changer if not needed
        />
      </div>
    </>
  );
};

export default AllProduct;
