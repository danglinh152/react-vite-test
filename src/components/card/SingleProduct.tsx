import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";


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

  
  const SingleProduct = ({ bookId }: { bookId: number }) => {
    const [book, setBook] = useState<Book | null>(null);
    const navigate = useNavigate();
  
    const fetchBook = async (bookId: number) => {
      try {
        const response = await fetch(`http://localhost:8080/api/books/${bookId}`);
        const json = await response.json();
        setBook(json.data);
        console.log(json);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
  
    useEffect(() => {
      fetchBook(bookId);
    }, [bookId]);
  
    if (!book) {
      return <div>Loading...</div>;
    }
  
    return (
      <StyledWrapper>
        <div className="card_container" style={{ marginBottom: 50 }}>
          <div className="card"  onClick={() => navigate(`/detail/${book.bookId}`)} >
            <div
              className="card-img"
              style={{ backgroundImage: `url(http://localhost:8080/storage/upload/${book.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="card-info">
              <p className="text-title">{book.title}</p>
              <p className="text-body">{book.author}</p>
            </div>
            <div className="card-footer">
              <span className="text-title">${book.sellingPrice}</span>
              <div className="card-button">
                <FontAwesomeIcon style={{ fontSize: 10 }} icon={faCartPlus} />
              </div>
            </div>
          </div>
        </div>
      </StyledWrapper>
    );
  };
  
  const StyledWrapper = styled.div`
  `;

  export default SingleProduct;
  