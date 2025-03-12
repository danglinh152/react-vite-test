import { useEffect, useState } from "react";
import { useAuth } from "../../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Input,
  Select,
  Table,
  message,
} from "antd";
import CardProduct from "../../components/card/CardProduct";
import { toast } from "react-toastify";
import CartCheckout from "../../components/checkout/CartCheckout";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface UserInfo {
  name: string;
  email: string;
  buyingAddress: string;
  shippingAddress: string;
  lastName: string;
  phoneNumber: string;
}

const Checkout = () => {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [decodedToken, setDecodedToken] = useState<any | null>(null);
  const [address, setAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async (userId: string) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin người dùng.");
        }

        const json = await response.json();

        const user: UserInfo = {
          name: `${json.data.firstName} ${json.data.lastName}`,
          email: json.data.email,
          buyingAddress: json.data.buyingAddress,
          lastName: json.data.lastName,
          phoneNumber: json.data.phoneNumber,
          shippingAddress: json.data.shippingAddress,
        };

        setUserInfo(user);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      // Check if exp exists and if the token is expired
      if (decodedToken.exp === undefined || decodedToken.exp < currentTime) {
        setDecodedToken(null);
      } else {
        setDecodedToken(decodedToken);
        fetchUserInfo(decodedToken.userId); // Fetch user info after decoding
      }
    } else {
      setLoading(false); // Set loading to false if there's no token
    }
  }, [token]);

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const vnpay = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/vnpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderInfo: "kkkk", amount: 50000 }), //mai mốt sửa lại
      });

      const json = await response.json();

      // Ensure that paymentUrl is an absolute URL
      const paymentUrl = new URL(json.data.paymentUrl);

      // Navigate to the absolute payment URL
      window.location.href = paymentUrl.href; // or use navigate(paymentUrl.href) if you're using a routing library
    } catch (error: any) {
      toast.error(error?.message || "failed");
    } finally {
      setLoading(false);
    }
  };
  const zalopay = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/zalopay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderInfo: "kkkk", amount: 50000 }), //mai mốt sửa lại
      });

      const json = await response.json();

      // Ensure that paymentUrl is an absolute URL
      const paymentUrl = new URL(json.data.paymentUrl);

      // Navigate to the absolute payment URL
      window.location.href = paymentUrl.href; // or use navigate(paymentUrl.href) if you're using a routing library
    } catch (error: any) {
      toast.error(error?.message || "failed");
    } finally {
      setLoading(false);
    }
  };

  const momo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/momo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderInfo: "kkkk", amount: 50000 }), //mai mốt sửa lại
      });

      const json = await response.json();

      // Ensure that paymentUrl is an absolute URL
      const paymentUrl = new URL(json.data.paymentUrl);

      // Navigate to the absolute payment URL
      window.location.href = paymentUrl.href; // or use navigate(paymentUrl.href) if you're using a routing library
    } catch (error: any) {
      toast.error(error?.message || "failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!address || !shippingMethod || !paymentMethod) {
      message.error("Please fill in all required fields!");
    } else {
      message.success("Order confirmed!");
      // Handle order confirmation logic here
    }

    if (paymentMethod === "VNPay") {
      console.log("vnpay");
      await vnpay();
    } else if (paymentMethod === "Momo") {
      console.log("momo");
      await momo();
    } else if (paymentMethod === "ZaloPay") {
      console.log("zalopay");
      await zalopay();
    } else {
      console.log("tiền mặt");
    }
  };

  // Data for the order summary table
  const dataSource = [
    {
      key: "1",
      item: "Địa chỉ giao hàng",
      detail: address,
    },
    {
      key: "2",
      item: "Phương thức vận chuyển",
      detail: shippingMethod,
    },
    {
      key: "3",
      item: "Mã khuyến mãi",
      detail: promoCode,
    },
    {
      key: "4",
      item: "Phương thức thanh toán",
      detail: paymentMethod,
    },
  ];

  const columns = [
    {
      title: "Thông Tin",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Chi Tiết",
      dataIndex: "detail",
      key: "detail",
    },
  ];

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 20px",
          margin: "15px 0",
        }}
      >
        <CartCheckout />
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 20px",
          margin: "15px 0",
        }}
      >
        <h2>ĐỊA CHỈ GIAO HÀNG</h2>
        <Select
          placeholder="Nhập địa chỉ giao hàng"
          onChange={setAddress}
          style={{ width: "100%" }}
          disabled={loading || !userInfo} // Disable if loading or userInfo is null
        >
          <Option value={userInfo?.buyingAddress}>
            {userInfo?.buyingAddress}
          </Option>
          <Option value={userInfo?.shippingAddress}>
            {userInfo?.shippingAddress}
          </Option>
        </Select>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 20px",
          margin: "15px 0",
        }}
      >
        <h2>PHƯƠNG THỨC VẬN CHUYỂN</h2>
        <Select
          placeholder="Chọn phương thức vận chuyển"
          value={shippingMethod}
          onChange={setShippingMethod}
          style={{ width: "100%" }}
        >
          <Option value="Hỏa tốc">Vận chuyển hỏa tốc</Option>
          <Option value="Tiết kiệm">Vận chuyển tiết kiệm</Option>
          <Option value="Nhanh">Vận chuyển nhanh</Option>
        </Select>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 20px",
          margin: "15px 0",
        }}
      >
        <h2>MÃ KHUYẾN MÃI</h2>
        <Input
          placeholder="Nhập mã khuyến mãi"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 20px",
          margin: "15px 0",
        }}
      >
        <h2>PHƯƠNG THỨC THANH TOÁN</h2>
        <Select
          placeholder="Chọn phương thức thanh toán"
          value={paymentMethod}
          onChange={setPaymentMethod}
          style={{ width: "100%" }}
        >
          <Option value="Tiền mặt">Tiền mặt</Option>
          <Option value="Momo">Momo</Option>
          <Option value="VNPay">VNPay</Option>
          <Option value="ZaloPay">ZaloPay</Option>
        </Select>
      </div>
      <div
        style={{ backgroundColor: "white", padding: "20px", margin: "15px 0" }}
      >
        <h2>KIỂM TRA LẠI ĐƠN HÀNG</h2>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          style={{ backgroundColor: "white" }}
        />
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            margin: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Checkbox onChange={onChange}>
            Tôi đồng ý các điều khoản của nhà sách S10.07
          </Checkbox>
          <Button
            color="danger"
            variant="solid"
            style={{ fontWeight: "700" }}
            onClick={handleSubmit}
          >
            XÁC NHẬN THANH TOÁN
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
