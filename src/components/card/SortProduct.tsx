import { useState, useEffect } from "react";
import { Pagination } from "antd";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../../styles/cardproduct.scss";

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

interface SortProductProps {
  sortOrder: string;
  sortRate: number;
  sortPrice:number;
}

const SortProduct = ({ sortOrder,sortRate,sortPrice }: SortProductProps) => {
  const [listBook, setListBook] = useState<Book[]>([]);
  // const [order,setOrder] = useState("default")
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 12,
    totalPages: 0,
    total: 0,
  });

  const navigate = useNavigate();


  const fetchBooks = async () => {
    
    try {
      const params = new URLSearchParams({
        page: meta.currentPage.toString(),
        size: meta.pageSize.toString(),
      });
  
      if (sortOrder!="default") {
        params.append("sort", `sellingPrice,${sortOrder}`);
      }
        if (sortRate > 0) {
        params.append("filter", `avgRate>=${sortRate} and avgRate<=${sortRate + 1}`);
      }
      if (sortPrice > 0) {
        params.append("filter", `sellingPrice>=${sortPrice} and sellingPrice<=${sortPrice + 199}`);
      }
  
      const url = `http://localhost:8080/api/books?${params.toString()}`;
      console.log(url);
      
      const response = await fetch(url);
      const json = await response.json();

      setListBook(json.data.data);
      setMeta({
        currentPage: json.data.meta.currentPage,
        pageSize: json.data.meta.pageSize,
        totalPages: json.data.meta.totalPages,
        total: json.data.meta.total,
      });
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [meta.currentPage, sortOrder,sortRate,sortPrice]);

  const handlePageChange = (page: number) => {
    setMeta((prevMeta) => ({ ...prevMeta, currentPage: page }));
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={meta.currentPage}
          pageSize={meta.pageSize}
          total={meta.total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default SortProduct;
