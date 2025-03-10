
import { useState } from "react";
import { ShoppingCart, Trash } from "lucide-react";
import "../../styles/cart.scss";
import { Col, Row } from "antd";
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  { id: 1, name: "Laptop", price: 1200, quantity: 1, image: "/laptop.jpg" },
  { id: 2, name: "Headphones", price: 200, quantity: 2, image: "/headphones.jpg" },
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

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
    <Row >
        <Col span={16}>
        <div className="cart-container">
      <h2 className="cart-title">
        <ShoppingCart className="icon" /> Giỏ hàng
      </h2>
      <div className="cart-card">
        {cart.length === 0 ? (
          <p className="empty-cart">Giỏ hàng trống</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-info">
                <p className="cart-name">{item.name}</p>
                <p className="cart-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-quantity">
                <button className="cart-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span className="cart-quantity-text">{item.quantity}</span>
                <button className="cart-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button className="cart-remove" onClick={() => removeItem(item.id)}>
                <Trash className="icon" />
              </button>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div className="cart-total">
            <p className="total-price">Tổng tiền: ${totalPrice.toFixed(2)}</p>
            <button className="checkout-btn">Thanh toán</button>
          </div>
        )}
      </div>
    </div>
        </Col>
        <Col span={8}>
        </Col>
    </Row>
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
         hi
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
          </div>     
         </div>
      </div>
    </>
  );
}