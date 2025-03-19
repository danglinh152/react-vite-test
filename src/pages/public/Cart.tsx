
import { useEffect, useState } from "react";
import { Divide, ShoppingCart, Trash } from "lucide-react";
import "../../styles/cart.scss";
import {Checkbox, Col, Divider, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadCry, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../provider/authProvider";

interface Book {
  bookId: number;
  author: string;
  title: string;
  image: string;
  avgRate: number;
  isbn: string;
  sellingPrice: number;
  listPrice: number;
}

type CartItem = {
  cartDetailsId:number;
  cartId: number;
  bookId: number;
  book: Book;
  cart:Cart;
  quantity: number;
};

type Cart = {
  cartId: number;
  userId:number;
  items: CartItem[];
};


export default function Cart() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [cartDetail, setCartDetail] = useState<CartItem[]>([]);
  const [listBook, setListBook] = useState<Book[]>([]);
  const CheckboxGroup = Checkbox.Group;

 
  const fetchCarts = async (userId: number) => {
    const response = await fetch(
      `http://localhost:8080/api/carts`,
      {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const json = await response.json();
    setCart(json.data.data);  
    ;
  };

  const fetchCartsDetail = async () => {
    const response = await fetch(
      `http://localhost:8080/api/cart-details`,
      {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const json = await response.json();
    setCartDetail(json.data.data);  
    console.log(json.data.data);
    
  };

  useEffect(() => {
    fetchCartsDetail();
  }, []);

  const updateQuantity = async (id: number, amount: number) => {
    setCartDetail((prevCart) =>
      prevCart.map((item) =>
        item.cartDetailsId === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  
    try {
      const updatedItem = cartDetail.find((item) => item.cartDetailsId === id);
      if (!updatedItem) {
        console.error("❌ Không tìm thấy item để cập nhật!");
        return;
      }
  
      const newQuantity = Math.max(1, updatedItem.quantity + amount);
  
      const response = await fetch(`http://localhost:8080/api/cart-details/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartDetailsId: id,
          quantity: newQuantity,
        }),
      });
  
      const result = await response.json();
      console.log("📢 API Response:", result);
  
      if (!response.ok) {
        console.error("❌ Lỗi cập nhật số lượng:", result);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gửi request:", error);
    }
  };
  

  const removeItem = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart-details/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCartDetail((prevCart) => prevCart.filter((item) => item.cartDetailsId !== id));
      } else {
        console.error("Xóa sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const totalPrice = cartDetail.reduce((acc, item) => acc + item.book.sellingPrice * item.quantity, 0);

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
          {cartDetail.length > 0 && (
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
          
                {cartDetail.length === 0 ? (
                  <>
                  <p className="empty-cart">
                  <FontAwesomeIcon icon={faFaceSadCry} />
                    Giỏ hàng trống</p>
                  </>
                ) : (
                  cartDetail.map((item) => (
                      <div key={item.cartDetailsId} style={{ alignSelf: "center"}} >
                      <Row >
                        <Col className="custom-col"  span={1}>      
                        <Checkbox/>
                        </Col>
                        <Col className="custom-col" span={4}>
                        <img src={`http://localhost:8080/storage/upload/${item.book.image}`} alt={item.book.title} className="cart-image"/>                        </Col>
                        <Col className="custom-col" style={{ justifyItems:"normal" }} span={8}>
                        <div className="cart-info">
                        <p className="cart-name">{item.book.title}</p>
                        <div>
                          <p className="cart-price">${item.book.listPrice}</p>
                          <p className="price-sell">${item.book.sellingPrice}</p>
                        </div>
                      </div>
                        </Col>
                        <Col className="custom-col" span={4}>
                        <div className="cart-quantity">
                        <button className="cart-btn" onClick={() => updateQuantity(item.cartDetailsId, -1)}>-</button>
                        <span className="cart-quantity-text">{item.quantity}</span>
                        <button className="cart-btn" onClick={() => updateQuantity(item.cartDetailsId, 1)}>+</button>
                      </div>
                        </Col>
                        <Col className="custom-col" span={4}>
                        <p style={{ color:"#ff424f",fontWeight:700,fontSize:"1.2rem",lineHeight:"1.2rem" }}>${(item.book.sellingPrice)*(item.quantity)}</p>
                        </Col>
                        <Col className="custom-col" span={2}>
                        <FontAwesomeIcon icon={faTrash} style={{cursor:"pointer",fontSize:18, color:"gray" }} onClick={() => { console.log("🛠 cartDetailsId:", item.cartDetailsId); removeItem(item.cartDetailsId)}}/>
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
              <p className="price"> ${totalPrice}</p>
            </div>
              <button className="checkout-btn">Thanh toán</button>
             </div> 
              </>
          )}
      </div>
    </>
  );
}