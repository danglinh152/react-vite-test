import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fetchCallBackPaymentUrl = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/vnpay-callback`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Parse as JSON if status is 200
      const json = await response.json();
      console.log(json);
    } else {
      // Otherwise, treat it as a string
      const text = await response.text();
      alert(text);
    }
  } catch (error: any) {
    toast.error(error?.message || "Failed to fetch callback URL");
  }
};

const CheckOutFailed = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchCallBackPaymentUrl();
  }, []); // Added dependency array to avoid multiple calls

  return (
    <div>
      {" "}
      Đã hủy giao dịch. Về lại trang chủ?{" "}
      <div className="logo">
        <img
          src="http://localhost:8080/storage/upload/download.png"
          onClick={() => navigate(`/`)}
          style={{ height: 100, cursor: "pointer" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default CheckOutFailed;
