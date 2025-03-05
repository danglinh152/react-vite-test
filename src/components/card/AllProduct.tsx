import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cardproduct.scss";
import { Pagination } from "antd";

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

  return (
    <>
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
              <span className="text-title">${book.sellingPrice}</span>
              <div
                className="card-button"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Thêm giỏ hàng");
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
