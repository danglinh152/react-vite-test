import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

interface Book {
    bookId: number;
    image:string,
    author: string;
    title: string;
    avgRate: number;
    isbn: string;
    sellingPrice: number;
    listPrice: number;
    quantity: number;
  }

const CardProduct = () => {
    const [listBook, setListBook] = useState<Book[]>([]);
    
    const [meta, setMeta] = useState({
        currentPage: 1,
        pageSize: 5,
        totalPages: 0,
        total: 0,
      });

    const navigate = useNavigate();


    const fetchBooks = async () => {
        const response = await fetch(
          `http://localhost:8080/api/books?page=${meta.currentPage}&size=${meta.pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
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
    }, [meta.currentPage, meta.pageSize]);
    
    return (
        <StyledWrapper>
          {listBook.map((book) => (
            <div className="card" key={book.bookId} onClick={() => navigate(`/detail/${book.bookId}`)} style={{ cursor: "pointer" }}>
            <div
                className="card-img"
                style={{ backgroundImage: `url(http://localhost:8080/storage/avatar/${book.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="card-info">
                <p className="text-title">{book.title}</p>
                <p className="text-body">{book.author}</p>
              </div>
              <div className="card-footer">
                <span className="text-title">${book.sellingPrice}</span>
                <div className="card-button">
                  <FontAwesomeIcon style={{  fontSize: 10 }} icon={faCartPlus} />
                </div>
              </div>
            </div>
          ))}    
        </StyledWrapper>

    );      
}

const StyledWrapper = styled.div`
  .card {
    display:block;
   width: 190px;
   height: 360px;
   padding: .8em;
   background: #f5f5f5;
   position: relative;
   overflow: visible;
   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .card-img {
   background-color: #ffcaa6;
   height: 75%;
   width: 100%;
   border-radius: .5rem;
  }
  .card-info {
   padding-top: 2%;
    height: 15%;
  }

  svg {
   width: 20px;
   height: 20px;
  }

  .card-footer {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-top: 10px;
    height: 10%;
   border-top: 1px solid #ddd;
  }

  /*Text*/
  .text-title {
   font-weight: 900;
   font-size: 1.2em;
   line-height: 1.5;
  }

  .text-body {
   font-size: .9em;
   padding-bottom: 10px;
  }

  /*Button*/
  .card-button {
   border: 1px solid #252525;
   display: flex;
   padding: .3em;
   cursor: pointer;
   border-radius: 50px;
   transition: .3s ease-in-out;
  }

  .card-button:hover {
   border: 1px solid #ffcaa6;
   background-color: #ffcaa6;
  }`;

export default CardProduct;
