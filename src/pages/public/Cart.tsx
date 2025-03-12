
import { useState } from "react";
import { Divide, ShoppingCart, Trash } from "lucide-react";
import "../../styles/cart.scss";
import {Checkbox, Col, Divider, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadCry, faTrash } from "@fortawesome/free-solid-svg-icons";
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  { id: 1, name: "Doraemon - Movie Story Màu - Tân Nobita Và Lịch Sử Khai Phá Vũ Trụ Doraemon - Movie Story Màu - Tân Nobita Và Lịch Sử Khai Phá Vũ Trụ", price: 1200, quantity: 1,image: "http://localhost:8080/storage/upload/Screenshot_2025-02-28_201544.jpg" },
  { id: 2, name: "Headphones", price: 200, quantity: 2, image: "http://localhost:8080/storage/upload/Screenshot_2025-02-28_201544.jpg" },
  { id: 3, name: "Headphones", price: 200, quantity: 2, image: "http://localhost:8080/storage/upload/Screenshot_2025-02-28_201544.jpg" }
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const CheckboxGroup = Checkbox.Group;
  const updateQuantity = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <h2 className="cart-title">
        <ShoppingCart className="icon" /> Giỏ hàng
      </h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            flex: 7,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          {cart.length > 0 && (
              <>
          <div
            style={{
              backgroundColor: "White",
              borderRadius: "12px",
              padding: "10px 30px",
              fontSize: "17px",
            }}>
              <div >
                <Row>
                  <Col className="custom-col" span={6}>      
                   <Checkbox >
                Chọn tất cả sản phẩm
                </Checkbox></Col>
                  <Col className="custom-col" span={7}></Col>
                  <Col className="custom-col" span={4}>
                <p style={{ fontSize: 16 ,fontWeight:"bold"}}>Số lượng</p>
                  </Col>
                  <Col className="custom-col" span={4}>
                <p  style={{ fontSize: 16 ,fontWeight:"bold" }} >Thành tiền</p>
                  </Col >
                  <Col className="custom-col" span={2}></Col>

                </Row>
              </div>
            </div>
            </>)}
          <div
            style={{
              backgroundColor: "White",
              borderRadius: "12px",
              padding: "10px 30px",
              fontSize: "17px",
            }}>

              <div className="cart-card">
          
                {cart.length === 0 ? (
                  <>
                  <p className="empty-cart">
                  <FontAwesomeIcon icon={faFaceSadCry} />
                    Giỏ hàng trống</p>
                  </>
                ) : (
                  cart.map((item) => (
                      <div key={item.id} style={{ alignSelf: "center"}} >
                      <Row >
                        <Col className="custom-col"  span={1}>      
                        <Checkbox/>
                        </Col>
                        <Col className="custom-col" span={4}>
                        <img src={item.image} alt={item.name} className="cart-image" />
                        </Col>
                        <Col className="custom-col" style={{ justifyItems:"normal" }} span={8}>
                        <div className="cart-info">
                        <p className="cart-name">{item.name}</p>
                        <div>
                          <p className="cart-price">${item.price.toFixed(2)}</p>
                          <p className="price-sell">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                        </Col>
                        <Col className="custom-col" span={4}>
                        <div className="cart-quantity">
                        <button className="cart-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="cart-quantity-text">{item.quantity}</span>
                        <button className="cart-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                        </Col>
                        <Col className="custom-col" span={4}>
                        <p style={{ color:"#ff424f",fontWeight:700,fontSize:"1.2rem",lineHeight:"1.2rem" }}>${(item.price)*(item.quantity)}</p>
                        </Col>
                        <Col className="custom-col" span={2}>
                        <FontAwesomeIcon icon={faTrash} style={{cursor:"pointer",fontSize:18, color:"gray" }} onClick={() => removeItem(item.id)}/>
                        </Col>
                      </Row>
                      <Divider/>
                    </div>
                  ))
                )}
        
              </div>
          </div>
        </div>
 
            {cart.length > 0 && (
              <>
                     <div
          style={{
            flex: 3,
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            position: "sticky",
            top: 60,
            alignSelf: "flex-start",
          }}
        >
             <Divider/>
            <div className="cart-total">
              <p className="total-price">Tổng tiền: </p>
              <p className="price"> ${totalPrice.toFixed(2)}</p>
            </div>
              <button className="checkout-btn">Thanh toán</button>
             </div> 
              </>
          )}
      </div>
    </>
  );
}